import prisma from '../../../services/db'

export default async function handler(req, res) {
  console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const projects = await prisma.project.findMany()
    if (!projects) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: projects })
  }

  if (method === 'POST') {
    const {
      title,
      startdate,
      enddate,
      description,
      projectLeaderId,
      createdById,
      fungsi,
      rentangWaktu,
      bulan,
      anggotaTimId
    } = req.body
    console.log('asdwadad')
    console.log(anggotaTimId)
    console.log('asdwadad')
    console.log(projectLeaderId)
    try {
      const project = await prisma.project.create({
        data: {
          title,
          startdate,
          enddate,
          description,
          isArchived: false,
          projectLeaderId,
          fungsi,
          rentangWaktu,
          createdById
        }
      })

      const isLeader = await prisma.userProject.create({
        data: {
          isLeader: 1,
          userId: projectLeaderId,
          projectId: project.id
        }
      })

      anggotaTimId.map(async anggota => {
        const usP = await prisma.userProject.create({
          data: {
            userId: anggota,
            projectId: project.id,
            isLeader: 0
          }
        })
      })

      // const userProject = await prisma.userProject.create({

      //   data: {
      //     userId: projectLeaderId,
      //     projectId: project.id,

      //   }
      // })

      return res.status(201).json({ success: true, data: project })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
