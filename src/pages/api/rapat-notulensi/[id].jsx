// pages/api/upload.js

import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../services/db'

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}-${Math.random().toString(36).substring(7)}-${file.originalname}`)
    }
  })
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  const { method } = req
  if (req.method !== 'POST') return res.status(404).end()
  // Gunakan try-catch di dalam callback untuk menangani kesalahan upload
  upload.single('file')(req, res, async err => {
    try {
      if (err) {
        throw new Error(err.message) // Lempar kesalahan untuk ditangani di catch
      }

      // Dapatkan informasi file yang diunggah
      const fileName = req.file.originalname
      const filePath = req.file.path
      const id = req.query.id

      // Simpan informasi file ke database menggunakan Prisma
      const file = await prisma.notulensi_meet.create({
        data: {
          taskfile: fileName,
          meetId: Number(id)
        }
      })

      // Kirim respons berhasil
      return res.status(201).json({ message: 'File uploaded successfully' })
    } catch (error) {
      // Tangani kesalahan yang mungkin terjadi dalam proses upload atau penyimpanan
      console.error('Error during file upload:', error)
      return res.status(400).json({ error: error.message || 'Something went wrong' })
    }
  })
}
