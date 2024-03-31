import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'

import TaskDetailViews from 'src/views/task-views/TaskDetailViews'

const TaskDetail = ({ data }) => {
  const [task, setTask] = useState(JSON.parse(data))
  // console.log(task.mitraTask)
  return (
    <>
      <TaskDetailViews
        data={task.task}
        dataPerusahaan={task.perusahaanTask}
        dataMitra={task.mitraTask}
        dataPML={task.pegawai}
        dataPH={task.pekerjaanHarian}
      ></TaskDetailViews>
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
  const task = await prisma.sub_kegiatan.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      project: {
        include: {
          UserProject: {
            include: {
              user: true
            }
          }
        }
      },
      user: true
    }
  })

  const pekerjaanHarian = await prisma.pekerjaan_harian.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    select: {
      id: true,
      namaKegiatan: true,
      durasi: true,
      userId: true
    }
  })

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      perusahaan: true
    }
  })

  const mitraTask = await prisma.sub_kegiatan_mitra.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      mitra: true
    }
  })

  const pegawai = await prisma.sub_kegiatan_user.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      organik: true
    }
  })

  const data = {
    task,
    perusahaanTask,
    mitraTask,
    pegawai,
    pekerjaanHarian
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}
export default TaskDetail
