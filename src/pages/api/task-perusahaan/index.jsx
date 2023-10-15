import prisma from '../../../services/db'

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const tpp = await prisma.taskPerusahaanProduksi.findMany()
    if (!tpp) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: tpp })
  }

  if (method === 'POST') {
    console.log('dah sampe post')
    // target: updatedRow.target ? updatedRow.target : 0,
    //   realisasi: updatedRow.realisasi ? updatedRow.realisasi : 0,
    //   hasilPencacahan: updatedRow.hasilPencacahan ? updatedRow.hasilPencacahan : '',
    //   duedate: updatedRow.tanggalDob ? updatedRow.tanggalDob : new Date(),
    //   taskId: props.dataId,
    //   perusahaanId: props.dataId,
    //   kip: updatedRow.kip ? updatedRow.kip : '',
    //   nama: updatedRow.nama ? updatedRow.nama : '',
    //   desa: updatedRow.desa ? updatedRow.desa : '',
    //   namadesa: updatedRow.namadesa ? updatedRow.namadesa : '',
    //   kecamatan: updatedRow.kecamatan ? updatedRow.kecamatan : '',
    //   namaKec: updatedRow.namaKec ? updatedRow.namaKec : '',
    //   alamat: updatedRow.alamat ? updatedRow.alamat : '',
    //   pmlId: updatedRow.pmlId ? updatedRow.pmlId : 0,
    //   gajiPml: updatedRow.gajiPml ? updatedRow.gajiPml : 0,
    //   pclId: updatedRow.pclId ? updatedRow.pclId : 0,
    //   gajiPcl: updatedRow.gajiPcl ? updatedRow.gajiPml : 0,
    //   nbs: updatedRow.nbs ? updatedRow.nbs : '',
    //   idSls: updatedRow.idSls ? updatedRow.idSls : '',
    //   idSbr: updatedRow.idSbr ? updatedRow.idSbr : '',
    //   nks: updatedRow.nks ? updatedRow.nks : '',
    //   nbs: updatedRow.nbs ? updatedRow.nbs : ''
    const {
      target,
      realisasi,
      hasilPencacahan,
      perusahaanId,
      duedate,
      taskId,
      nama,
      desa,
      namadesa,
      kecamatan,
      namaKec,
      alamat,
      pmlId,
      gajiPml,
      pclId,
      gajiPcl,
      nbs,
      idSls,
      idSbr,
      nks,
      nus
    } = req.body

    console.log('masuk ke wodb')
    try {
      const tpp = await prisma.TaskPerusahaanProduksi.create({
        data: {
          taskId: taskId,
          target: Number(target),
          realisasi: Number(realisasi),
          hasilPencacahan: hasilPencacahan,
          perusahaanId,
          duedate: duedate,
          nama,
          desa,
          namadesa,
          kecamatan,
          namaKec,
          alamat,
          pmlId,
          gajiPml,
          pclId,
          gajiPcl,
          nbs,
          idSls,
          idSbr,
          nks,
          nus
        }
      })

      return res.status(201).json({ success: true, data: tpp })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
