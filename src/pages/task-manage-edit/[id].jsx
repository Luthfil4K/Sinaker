import * as React from 'react'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskManageEditViews from 'src/views/task-views/TaskManageEditViews'

const TaskManageEdit = ({ data }) => {
  const [dataEdit, setDataEdit] = useState(JSON.parse(data))
  return (
    <>
      <TaskManageEditViews
        data={dataEdit.task}
        dataT={dataEdit.template}
        dataTK={dataEdit.templateKolom}
      ></TaskManageEditViews>
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
  let mitras

  mitras = await prisma.mitra.findMany({
    where: {
      id: {
        not: 0
      }
    },
    include: {
      TaskPeserta: {
        select: {
          id: true,
          task: true
        }
      },
      beban_kerja_mitra: {
        select: {
          bebanKerja: true
        }
      }
    }
  })

  let oraganik

  oraganik = await prisma.user.findMany({
    where: {
      id: {
        not: 99
      }
    },
    include: {
      UserProject: {
        select: {
          id: true,
          project: true
        }
      },
      TaskOrganik: {
        select: {
          id: true,
          task: true
        }
      },
      TimKerjaPegawai: true,
      taskToDo: true,
      beban_kerja_pegawai: {
        select: {
          bebanKerja: true
        }
      },
      pekerjaan_harian: true
    }
  })

  const template = await prisma.template_table.findMany({})
  const templateKolom = await prisma.template_table_kolom.findMany({})
  const data = { task, template, mitras, oraganik, templateKolom }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskManageEdit
