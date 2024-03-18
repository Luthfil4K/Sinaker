import prisma from '../../../services/db'

export default async function handler(req, res) {
  const id = req.query.id
  console.log('ini id')
  console.log(id)
  const { method } = req

  if (method === 'GET') {
    const ph = await prisma.meet.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!ph) {
      return res.status(400).json({ success: false, message: 'Rapat not found' })
    }

    return res.status(200).json({ success: true, data: ph })
  } else if (method === 'PUT') {
    const { status } = req.body
    console.log(status)
    try {
      const rapat = await prisma.meet.update({
        where: {
          id: Number(id)
        },
        data: {
          status
        }
      })

      return res.status(200).json({ success: true, data: rapat })
    } catch (error) {
      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const ph = await prisma.meet.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Kegiatan Harian Dihapus' })
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Kegiatan Harian Dihapus' })
    }
  }
}
