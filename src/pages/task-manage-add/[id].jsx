import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskManageAddViews from 'src/views/task-views/TaskManageAddViews'

const TaskManageAdd = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <TaskManageAddViews
        data={project.project}
        dataPerusahaan={project.companies}
        dataAllPerusahaan={project.perusahaans}
        dataMitra={project.mitras}
        dataTaskPerusahaan={project.perusahaanTask}
      ></TaskManageAddViews>
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

  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      Task: {
        include: {
          user: true
        }
      },
      projectLeader: true,
      UserProject: {
        include: {
          user: true
        }
      }
    }
  })

  let companies

  companies = await prisma.groupPerusahaan.findMany({
    select: {
      id: true,
      Perusahaangroup: {
        select: {
          id: true,
          perusahaan: true
        }
      },
      nama: true,
      fungsi: true
    }
  })

  let perusahaans

  perusahaans = await prisma.perusahaan.findMany({
    select: {
      id: true,
      kip: true,
      nama: true,
      desa: true,
      namaDesa: true,
      kecamatan: true,
      namaKec: true,
      alamat: true
    }
  })

  const perusahaanTask = await prisma.taskPerusahaanProduksi.findMany({
    include: {
      task: true,
      perusahaan: true
    }
  })

  let mitras

  mitras = await prisma.mitra.findMany({
    where: {
      id: {
        not: 0
      }
    }
  })

  const data = {
    project,
    companies,
    perusahaans,
    mitras,
    perusahaanTask
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskManageAdd
