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
      jenisSample,
      month,
      year,
      projectId,
      userId,
      notes,
      participants
    } = req.body

    try {
      const task = await prisma.task.create({
        data: {
          title,
          jenisKeg,
          target,
          unitTarget,
          duedate,
          description,
          realisasi,
          jenisSample,
          month,
          year,
          notes,
          projectId: Number(projectId),
          userId
        }
      })

      if (jenisKeg == 65) {
        participants.map(async participant => {
          if (participant.checked) {
            const tpp = await prisma.TaskPerusahaanProduksi.create({
              data: {
                taskId: task.id,
                perusahaanId: participant.id,
                target: 0,
                realisasi: 0,
                hasilPencacahan: '',
                duedate: participant.tanggal
              }
            })
          }
        })
      }

      return res.status(201).json({ success: true, data: task })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
