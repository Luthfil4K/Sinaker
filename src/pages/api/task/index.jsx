import prisma from '../../../services/db'

export default async function handler(req, res) {
  console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.task.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    console.log('dah sampe post')
    const {
      title,
      jenisKeg,
      target,
      unitTarget,
      duedate,
      description,
      realisasi,
      month,
      year,
      projectId,
      userId,
      notes
    } = req.body
    console.log(month)
    console.log(year)

    try {
      const user = await prisma.task.create({
        data: {
          title,
          jenisKeg,
          target,
          unitTarget,
          duedate,
          description,
          realisasi,
          month,
          year,
          notes,
          projectId: Number(projectId),
          userId
        }
      })

      return res.status(201).json({ success: true, data: user })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
