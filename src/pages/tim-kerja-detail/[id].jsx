import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import TimKerjaDetailViews from 'src/views/tim-kerja-views/TimKerjaDetailViews'

const TimKerjaDetail = ({ data }) => {
  const [timKerja, setTimKerja] = useState(JSON.parse(data))
  // console.log(TimKerja)
  return (
    <>
      <TimKerjaDetailViews
        data={timKerja.timkerja}
        dataUser={timKerja.user}
        dataTpp={timKerja.perusahaanTask}
        dataKriteria={timKerja.kriteria}
      />
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

  let timkerja

  timkerja = await prisma.timKerja.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      timKerjaPegawai: {
        select: {
          id: true,
          userId_fkey: {
            include: {
              UserProject: true,
              taskToDo: true,
              beban_kerja_pegawai: {
                select: {
                  bebanKerja: true
                }
              },
              TaskOrganik: true,
              pekerjaan_harian: {
                include: {
                  task: true
                }
              }
            }
          }
        }
      },
      userId_fkey: true
    }
  })

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      perusahaan: true,
      task: true
    }
  })

  const kriteria = await prisma.kriteria_beban_kerja_pegawai.findUnique({
    where: { id: 1 }
  })

  const data = {
    perusahaanTask,
    kriteria,
    timkerja
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TimKerjaDetail
