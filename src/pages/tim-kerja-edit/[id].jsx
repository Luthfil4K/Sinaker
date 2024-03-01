import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import EditTimKerja from 'src/views/tim-kerja-views/EditTimKerja'

const TimKerjaEdit = ({ data }) => {
  const [timKerja, setTimKerja] = useState(JSON.parse(data))
  // console.log(TimKerja)
  return (
    <>
      <EditTimKerja data={timKerja.timkerja} dataUser={timKerja.user} dataTpp={timKerja.perusahaanTask} />
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
          userId: true,
          userId_fkey: {
            include: {
              UserProject: true,
              taskToDo: true,
              beban_kerja_pegawai: {
                select: {
                  bebanKerja: true
                }
              },
              TaskOrganik: true
            }
          }
        }
      },
      userId_fkey: true
    }
  })

  let user

  user = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      UserProject: true,
      taskToDo: true,
      TaskOrganik: true,
      TimKerjaPegawai: true,
      beban_kerja_pegawai: {
        select: {
          bebanKerja: true
        }
      },
      pekerjaan_harian: true
    }
  })

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      perusahaan: true,
      task: true
    }
  })

  const data = {
    perusahaanTask,
    user,
    timkerja
  }
  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TimKerjaEdit
