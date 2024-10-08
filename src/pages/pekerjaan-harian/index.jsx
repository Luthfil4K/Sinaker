// view
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import PekerjaanHarianViews from 'src/views/pekerjaan-harian-views/PekerjaanHarianViews'

const PekerjaanHarian = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  return (
    <>
      <PekerjaanHarianViews data={user} />
    </>
  )
}
export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  // if (token?.uid !== 103212 && token?.uid !== 1099999) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

  // const pekerjaanHarian = await prisma.pekerjaan_harian.findMany({
  //   where: {
  //     taskId: parseInt(context.params.id)
  //   },
  //   select: {
  //     id: true,
  //     namaKegiatan: true,
  //     mulai: true,
  //     selesai: true,
  //     tanggalSubmit: true,
  //     userId: true
  //   }
  // })

  const organik = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      pekerjaan_harian: {
        select: {
          user: true,
          tanggalSubmit: true,
          mulai: true,
          selesai: true,
          durasi: true,
          taskId: true,
          task: true
        }
      }
    }
  })

  return {
    props: {
      data: JSON.stringify(organik)
    }
  }
}

export default PekerjaanHarian
