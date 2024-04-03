import prisma from '../../../services/db'
// groupperusahaan
export default async function handler(req, res) {
  const { method } = req
  const id = req.query.id

  if (method === 'PUT') {
    // update info pencairan seperti tahapanId, status, tanggal selesai
    const { tahapanChange, statusChange, SPMChange, tahapanId, status, tanggalSelesai, tanggalSPM, taskId } = req.body
    try {
      if (tahapanChange) {
        const pencairan = await prisma.pencairan.updateMany({
          data: {
            tahapanId
          },
          where: {
            id: Number(id),
            sub_kegiatanId: Number(taskId)
          }
        })
      }
      if (SPMChange) {
        const pencairan = await prisma.pencairan.updateMany({
          data: {
            tahapanId,
            tanggalSPM
          },
          where: {
            id: Number(id),
            sub_kegiatanId: Number(taskId)
          }
        })
      }
      if (statusChange) {
        const pencairanP = await prisma.pencairan.updateMany({
          data: {
            status,
            tanggalSelesai
          },
          where: {
            id: Number(id),
            sub_kegiatanId: Number(taskId)
          }
        })
      }

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: gP })
  }
}
