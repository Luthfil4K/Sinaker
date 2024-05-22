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
        dataPerusahaan={dataEdit.perusahaanTask}
        dataMitra={dataEdit.mitraTask}
        dataPML={dataEdit.pegawai}
        dataPH={dataEdit.pekerjaanHarian}
        dataMitraLimit={dataEdit.mitraLimitHonor}
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

  // mitras = await prisma.mitra.findMany({
  //   where: {
  //     id: {
  //       not: 0
  //     }
  //   },
  //   include: {
  //     TaskPeserta: {
  //       select: {
  //         id: true,
  //         task: true
  //       }
  //     },
  //     beban_kerja_mitra: {
  //       select: {
  //         bebanKerja: true
  //       }
  //     }
  //   }
  // })

  const pegawai = await prisma.user.findMany({
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

  const perusahaanTask = await prisma.data_target_realisasi.findMany({
    where: {
      taskId: parseInt(context.params.id)
    }
  })

  // const mitraTask = await prisma.sub_kegiatan_mitra.findMany({
  //   where: {
  //     taskId: parseInt(context.params.id)
  //   },
  //   include: {
  //     mitra: true
  //   }
  // })

  const mitraTask = await prisma.mitra.findMany({
    where: {
      id: {
        not: 0
      }
    }
  })

  // const organik = await prisma.sub_kegiatan_user.findMany({
  //   where: {
  //     taskId: parseInt(context.params.id)
  //   },
  //   include: {
  //     organik: true
  //   }
  // })

  const arrayOfIds = mitraTask.map(task => task.id)

  const mitraLimitHonor = []

  // console.log(arrayOfIds)
  for (const id of arrayOfIds) {
    const result = await prisma.data_target_realisasi.findMany({
      where: {
        OR: [{ pmlId: parseInt(id) }, { pclId: parseInt(id) }]
      },
      select: {
        id: true,
        pmlId: true,
        pclId: true,
        gajiPml: true,
        gajiPcl: true,
        task: true
      }
    })
    //console.log(result)

    //console.log('result')

    if (result.length > 0) {
      // Cek apakah id sudah ada di mitraLimitHonor
      //console.log('masuk ke if result')

      for (const res of result) {
        //console.log('masuk ke for result')
        const existingEntry = mitraLimitHonor.find(entry => entry.id === res.id)

        if (!existingEntry) {
          mitraLimitHonor.push(res)
        } else {
          // Jika tidak ada hasil, tambahkan entri dengan nilai default
          mitraLimitHonor.push({
            id,
            pmlId: parseInt(id),
            pclId: parseInt(id),
            gajiPml: 0,
            gajiPcl: 0
          })
        }
      }
    } else {
      //console.log('masuk ke else result')
      mitraLimitHonor.push({
        id,
        pmlId: parseInt(id),
        pclId: parseInt(id),
        gajiPml: 0,
        gajiPcl: 0
      })
    }
  }

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

  const data = {
    task,
    template,
    templateKolom,
    perusahaanTask,
    mitraTask,
    pegawai,
    pekerjaanHarian,
    mitraLimitHonor
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskManageEdit
