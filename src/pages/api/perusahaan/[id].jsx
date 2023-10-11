import prisma from '../../../services/db'
// update tarel di taskdetail
export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const taskPerusahaanProduksi = await prisma.taskPerusahaanProduksi.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!taskPerusahaanProduksi) {
      return res.status(400).json({ success: false, message: 'Perusahaan not found' })
    }

    return res.status(200).json({ success: true, data: taskPerusahaanProduksi })
  } else if (method === 'PUT') {
    const { target, realisasi, duedate, hasilPencacahan } = req.body
    console.log('bukan wo yg pasti')
    try {
      console.log(target, realisasi, duedate, hasilPencacahan)
      const taskPerusahaanProduksi = await prisma.taskPerusahaanProduksi.update({
        where: {
          id: Number(id)
        },
        data: {
          target: Number(target),
          realisasi: Number(realisasi),
          hasilPencacahan,
          duedate
        }
      })

      return res.status(200).json({ success: true, data: taskPerusahaanProduksi })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const taskPerusahaanProduksi = await prisma.taskPerusahaanProduksi.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Project deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Project not found' })
    }
  }
}
