import prisma from '../../../services/db'
import nextConnect from 'next-connect'
import multer from 'multer'
import fs from 'fs'

const bodyParser = require('body-parser')

const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}-${Math.random().toString(36).substring(7)}-${file.originalname}`)
    }
  })
})

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error)
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

apiRoute.post(upload.single('file'), async (req, res) => {
  const id = req.query.id

  const existTask = await prisma.task.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      project: true,
      user: true
    }
  })

  if (!existTask) {
    return res.status(400).json({ success: false, message: 'Task not found' })
  }

  const taskfile = req.file.filename

  // remove old file
  if (existTask.taskfile && existTask.taskfile != taskfile) {
    try {
      await unlinkAsync(`./public/uploads/${existTask.taskfile}`)
    } catch (error) {
      console.log(error)
    }
  }

  const task = await prisma.task.update({
    where: {
      id: Number(id)
    },
    data: {
      taskfile: taskfile,
      status: 2
    }
  })

  const projectLeader = await prisma.user.findUnique({
    where: {
      id: existTask.project.projectLeaderId
    }
  })

  const userProject = await prisma.user.findUnique({
    where: {
      id: existTask.userId
    }
  })

  const notif = await prisma.notification.create({
    data: {
      userId: Number(projectLeader.id),
      title: existTask.title,
      message: `${existTask.user.name} has submitted a task`,
      type: 'T'
    }
  })

  // tambahin logic untuk kirim email ke project manager
  mailOptions.to = projectLeader.email
  mailOptions.subject = `New Task Submission`
  mailOptions.title = existTask.title
  mailOptions.user = userProject.name
  mailOptions.leader = projectLeader.name
  mailOptions.link = `${process.env.BASE_URL}/project-detail/${existTask.project.id}`

  sendMailTaskSubmitted(mailOptions)

  return res.status(200).json({ success: true, data: task })
})

apiRoute.put(bodyParser.json(), async (req, res) => {
  const id = req.query.id

  // const { title, duedate, priority, description, status, userId } = req.body
  const title = req.body?.title
  const duedate = req.body?.duedate
  const priority = req.body?.priority
  const description = req.body?.description
  const status = req.body?.status
  const userId = req.body?.userId
  const helper = req.body?.helper

  // untuk unsubmit task
  if (status && helper == 'unsubmit') {
    const existTask = await prisma.task.findUnique({
      where: {
        id: Number(id)
      }
    })

    try {
      await unlinkAsync(`./public/uploads/${existTask.taskfile}`)
    } catch (error) {
      console.log(error)
    }

    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: status,
        taskfile: ''
      }
    })

    return res.status(200).json({ success: true, data: task })
  }

  // untuk on progress task
  if (status && helper == 'onprogress') {
    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: status
      },
      include: {
        user: true,
        project: true
      }
    })

    const notif = await prisma.notification.create({
      data: {
        userId: Number(task.project.projectLeaderId),
        title: task.title,
        message: `${task.user.name} started working`,
        type: 'T'
      }
    })

    return res.status(200).json({ success: true, data: task })
  }

  // untuk revise task
  if (status && helper == 'revise') {
    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: status
      }
    })

    const userProject = await prisma.user.findUnique({
      where: {
        id: task.userId
      }
    })

    const notif = await prisma.notification.create({
      data: {
        userId: Number(userProject.id),
        title: task.title,
        message: 'Revise your task',
        type: 'RT'
      }
    })

    mailOptions.to = userProject.email
    mailOptions.user = userProject.name
    mailOptions.title = task.title
    mailOptions.link = `${process.env.BASE_URL}/task-detail/${task.id}`
    mailOptions.status = 'Need Revision'
    mailOptions.colorbg = '#EB891B'
    mailOptions.subject = `Task Revision`

    sendMailTaskStatus(mailOptions)

    return res.status(200).json({ success: true, data: task })
  }

  // untuk accept task
  if (status && helper == 'accept') {
    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        status: status
      }
    })

    const userProject = await prisma.user.findUnique({
      where: {
        id: task.userId
      }
    })

    const notif = await prisma.notification.create({
      data: {
        userId: Number(userProject.id),
        title: task.title,
        message: 'Your task has been accepted',
        type: 'AT'
      }
    })

    mailOptions.to = userProject.email
    mailOptions.user = userProject.name
    mailOptions.title = task.title
    mailOptions.link = `${process.env.BASE_URL}/task-detail/${task.id}`
    mailOptions.status = 'Accepted'
    mailOptions.colorbg = '#56CA00'
    mailOptions.subject = `Task Accepted`

    sendMailTaskStatus(mailOptions)

    return res.status(200).json({ success: true, data: task })
  }

  try {
    const task = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        duedate,
        priority: Number(priority),
        description,
        userId: Number(userId)
      }
    })

    console.log('ini', duedate)

    const notif = await prisma.notification.create({
      data: {
        userId: Number(userId),
        title: `Task Updated`,
        message: task.title,
        type: 'T'
      }
    })

    return res.status(200).json({ success: true, data: task })
  } catch (error) {
    console.log(error)

    return res.status(400).json({ success: false })
  }
})

apiRoute.get(bodyParser.json(), async (req, res) => {
  const id = req.query.id

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!task) {
    return res.status(400).json({ success: false, message: 'Task not found' })
  }

  return res.status(200).json({ success: true, data: task })
})

apiRoute.delete(bodyParser.json(), async (req, res) => {
  const id = req.query.id

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!task) {
    return res.status(400).json({ success: false, message: 'Task not found' })
  }

  try {
    await unlinkAsync(`./public/uploads/${task.taskfile}`)
  } catch (error) {}

  const deletedTask = await prisma.task.delete({
    where: {
      id: Number(id)
    }
  })

  return res.status(200).json({ success: true, data: deletedTask })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false
  }
}

// export default async function handler(req, res) {
//   const id = req.query.id

//   const { method } = req

//   if (method === 'GET') {
//     const task = await prisma.task.findUnique({
//       where: {
//         id: Number(id)
//       }
//     })

//     if (!task) {
//       return res.status(400).json({ success: false, message: 'Task not found' })
//     }

//     return res.status(200).json({ success: true, data: task })
//   } else if (method === 'POST') {
//     console.log('POST')
//     try {
//       const { fields, files } = await parseForm(req)

//       console.log(fields)
//       console.log(files)

//       return res.status(200).json({ success: true, data: fields })
//     } catch (err) {
//       console.log(err)

//       return res.status(400).json({ success: false })
//     }

//     return res.status(200).json({ success: true, data: req.body })
//   } else if (method === 'PUT') {
//     const { title, duedate, priority, description, status, taskfile, projectId, userId } = req.body

//     try {
//       const task = await prisma.task.update({
//         where: {
//           id: Number(id)
//         },
//         data: {
//           title,
//           duedate,
//           priority: Number(priority),
//           description,
//           status: Number(status),
//           taskfile: '',
//           projectId: Number(projectId),
//           userId: Number(userId)
//         }
//       })

//       return res.status(200).json({ success: true, data: task })
//     } catch (error) {
//       console.log(error)

//       return res.status(400).json({ success: false })
//     }
//   } else if (method === 'DELETE') {
//     try {
//       const task = await prisma.task.delete({
//         where: {
//           id: Number(id)
//         }
//       })

//       return res.status(200).json({ success: true, message: 'Task deleted' })
//     } catch (error) {
//       console.log(error)

//       return res.status(400).json({ success: false, message: 'Task not found' })
//     }
//   }
// }
