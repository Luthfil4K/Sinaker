import prisma from '../../../services/db'

// addperusahaan di daftar perusahaan
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.kegiatan_harian.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    const { namaKegiatan, durasi, userId, taskId, tanggalSubmit } = req.body

    try {
      const kh = await prisma.pekerjaan_harian.create({
        data: {
          namaKegiatan,
          durasi,
          userId,
          taskId,
          tanggalSubmit
        }
      })

      return res.status(201).json({ success: true, data: kh })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
