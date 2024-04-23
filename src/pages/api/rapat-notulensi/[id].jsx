import prisma from '../../../services/db'
import nextConnect from 'next-connect'
import multer from 'multer'
import fs from 'fs'

export default async function handler(req, res) {
  const { method } = req
  const id = req.query.id

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

  if (method === 'POST') {
    apiRoute.post(upload.single('file'), async (req, res) => {
      const id = req.query.id

      // const existTask = await prisma.task.findUnique({
      //   where: {
      //     id: Number(id)
      //   }
      // })

      // if (!existTask) {
      //   return res.status(400).json({ success: false, message: 'Task not found' })
      // }

      const taskfile = req.file.filename
      console.log(taskfile)
      // // remove old file
      // if (existTask.taskfile && existTask.taskfile != taskfile) {
      //   try {
      //     await unlinkAsync(`./public/uploads/${existTask.taskfile}`)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }

      const task = await prisma.notulensi_meet.create({
        data: {
          taskfile: req.file.filename,
          meetId: req.query.id
        }
      })

      return res.status(200).json({ success: true, data: task })
    })

    return res.status(200).json({ success: true, data: req.body })
  }
}
