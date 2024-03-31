import prisma from '../../../services/db'

export default async function handler(req, res) {
  console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const projects = await prisma.meet.findMany()
    if (!projects) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: projects })
  }

  if (method === 'POST') {
    const {
      namaRapat,
      startDate,
      endDate,
      duration,
      tempatRapat,
      description,
      pesertaRapatId,
      createdById,
      nomor,
      lampiran,
      perihal,
      ditujukan
    } = req.body

    try {
      const rapat = await prisma.meet.create({
        data: {
          namaRapat,
          startDate,
          endDate,
          duration,
          tempatRapat,
          status: 'diajukan',
          description,
          nomor,
          lampiran,
          perihal,
          ditujukan,
          createdById
        }
      })

      pesertaRapatId.map(async anggota => {
        const pri = await prisma.user_meet.create({
          data: {
            userId: anggota,
            meetId: rapat.id
          }
        })
      })

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
