import prisma from '../../../services/db'

export default async function handler(req, res) {
  // console.log('asdwadad')
  const { method } = req

  if (method === 'GET') {
    const users = await prisma.task.findMany()
    if (!users) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: users })
  }

  if (method === 'POST') {
    // console.log('dah sampe post')
    const {
      title,
      jenisKeg,
      targetTotal,
      unitTarget,
      duedate,
      description,
      realisasi,
      jenisSample,
      month,
      fungsi,
      year,
      projectId,
      userId,
      notes,
      participants,
      peserta,
      persertaOrganik,
      gaji
    } = req.body
    console.log('dah sampe post')
    console.log(fungsi)
    try {
      if (jenisKeg == 65 || jenisKeg == 67 || jenisKeg == 70) {
        console.log('masuk656770 data task')
        const task = await prisma.task.create({
          data: {
            title,
            jenisKeg,
            target: targetTotal,
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
        if (jenisSample === 1) {
          if (jenisKeg == 65 || jenisKeg == 67) {
            // ini misal sample perusahaam
            participants.map(async participant => {
              if (participant.checked) {
                const tpp = await prisma.TaskPerusahaanProduksi.create({
                  data: {
                    taskId: task.id,
                    perusahaanId: participant.id,
                    nama: participant.nama,
                    desa: participant.desa,
                    namadesa: participant.namaDesa,
                    kecamatan: participant.kecamatan,
                    namaKec: participant.namaKec,
                    alamat: participant.alamat,
                    target: 0,
                    realisasi: 0,
                    hasilPencacahan: '',
                    duedate: participant.tanggal,
                    pmlId: 0,
                    pclId: 0,
                    gajiPml: gaji,
                    gajiPcl: gaji,
                    idSls: '',
                    nbs: '',
                    nks: '',
                    idSbr: '',
                    nus: ''
                  }
                })
              }
            })

            // buat add peserta disini

            peserta.map(async peserta => {
              const tp = await prisma.TaskPeserta.create({
                data: {
                  taskId: task.id,
                  mitraId: peserta.id
                }
              })
            })

            persertaOrganik.map(async peserta => {
              // console.log(peserta.id)
              const to = await prisma.TaskOrganik.create({
                data: {
                  taskId: task.id,
                  organikId: peserta.id
                }
              })
            })
          }
        } else if (jenisSample == 0) {
          // ini misal sample non perusahaam
          if (jenisKeg == 65 || jenisKeg == 67) {
            participants.map(async participant => {
              const tnp = await prisma.TaskPerusahaanProduksi.create({
                data: {
                  taskId: task.id,
                  perusahaanId: 9999999,
                  nama: '',
                  desa: participant.kodeDesa.toString(),
                  namadesa: participant.namaDesa,
                  kecamatan: participant.kodeKecamatan.toString(),
                  namaKec: participant.namaKecamatan,
                  alamat: fungsi == 4 || fungsi == 5 ? participant.alamat : '',
                  target: 0,
                  realisasi: 0,
                  hasilPencacahan: '',
                  duedate: new Date(),
                  pmlId: 0,
                  pclId: 0,
                  gajiPml: 0,
                  gajiPcl: 0,
                  idSls: fungsi == 6 || fungsi == 7 ? participant.idSls : '',
                  nbs: fungsi == 6 || fungsi == 7 || fungsi == 3 ? participant.nbs : '',
                  nks: fungsi == 3 ? participant.nks : '',
                  idSbr: '',
                  nus: ''
                }
              })
            })

            peserta.map(async peserta => {
              // console.log(peserta.id)
              const tp = await prisma.TaskPeserta.create({
                data: {
                  taskId: task.id,
                  mitraId: peserta.id
                }
              })
            })

            persertaOrganik.map(async peserta => {
              // console.log(peserta.id)
              const to = await prisma.TaskOrganik.create({
                data: {
                  taskId: task.id,
                  organikId: peserta.id
                }
              })
            })
          }
        } else {
          console.log('nothing return or connect')
        }
      } else if (jenisKeg == 63) {
        const task = await prisma.task.create({
          data: {
            title,
            jenisKeg,
            target: 1,
            unitTarget: '-',
            duedate,
            description,
            realisasi: 0,
            jenisSample: 0,
            month,
            year,
            notes,
            projectId: Number(projectId),
            userId
          }
        })
      }

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
