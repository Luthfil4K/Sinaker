import prisma from '../../../services/db'
import { mailOptions, sendMailMeetCreated } from 'src/services/sendEmail'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'PUT') {
    const {
      namaRapat,
      meetDate,
      startTime,
      endTime,
      duration,
      tempatRapat,
      description,
      pesertaRapatId,
      createdById,
      nomor,
      lampiran,
      perihal,
      ditujukan,
      fileUndangan
    } = req.body

    const daftarEmail = pesertaRapatId.map(a => {
      return a.user.email
    })

    try {
      const rapat = await prisma.meet.update({
        where: {
          id: Number(id)
        },
        data: {
          statusSendEmail: 1
        }
      })
      // const rapat = await prisma.meet.get({})

      // mailOptions.to = participants.map(participant => {
      //   if (participant.checked) {
      //     return participant.email
      //   }
      // })

      mailOptions.to = ['jelakora141516@gmail.com', 'akaishuichi141516@gmail.com']

      console.log(fileUndangan.file)
      mailOptions.subject = namaRapat
      mailOptions.title = namaRapat
      mailOptions.description = description
      mailOptions.meetDate = new Date(meetDate).toLocaleDateString('id-ID')
      mailOptions.starttime =
        new Date(startTime).getHours() +
        ':' +
        (new Date(startTime).getMinutes() < 10 ? '0' : '') +
        new Date(startTime).getMinutes()
      mailOptions.endtime =
        new Date(endTime).getHours() +
        ':' +
        (new Date(endTime).getMinutes() < 10 ? '0' : '') +
        new Date(endTime).getMinutes() +
        ' WIB'
      console.log(mailOptions.starttime)
      mailOptions.endTime = new Date(meetDate).toLocaleDateString('id-ID')
      mailOptions.link = tempatRapat
      mailOptions.duration = duration
      mailOptions.id = id
      mailOptions.undanganNama = fileUndangan[0].filename
      mailOptions.undanganPath = fileUndangan[0].path
      mailOptions.undanganId = fileUndangan[0].id

      sendMailMeetCreated(mailOptions)

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}