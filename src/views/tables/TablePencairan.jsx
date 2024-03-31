import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

const statusObj = {
  0: { color: 'info', status: 'Belum Mulai' },
  1: { color: 'warning', status: 'On Progress' },
  2: { color: 'success', status: 'Selesai' }
}

const array_aksi = {
  0: { Aksi: 'Upload Dokumen' },
  1: { Aksi: 'Review' },
  2: { Aksi: 'Upload SPM' },
  3: { Aksi: 'Selengkapnya' },
  4: { Aksi: 'Selengkapnya' },
  99: { Aksi: 'Mulai Pencairan' }
}

const TableTask = props => {
  const router = useRouter()
  const [task, setTask] = useState(props.data)

  const handleClickPencairan = async (e, id) => {
    e.preventDefault()
    const currentDate = new Date()
    const tanggal1BulanKemudian = new Date(currentDate)
    tanggal1BulanKemudian.setMonth(tanggal1BulanKemudian.getMonth() + 1)

    try {
      while (true) {
        const res = await axios.post('/pencairan', {
          taskId: id,
          tahapanId: 0,
          status: 1,
          tanggalMulai: currentDate,
          tanggalSelesai: currentDate,
          tanggalSPM: tanggal1BulanKemudian
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Berhasil memulai proses pencairan',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/pencairan-detail/${id}`))
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal memulai proses pencairan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleSeePencairan = (e, id) => {
    e.preventDefault()
    router.push(`/pencairan-detail/${id}`)
  }

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'kegiatanName',
      headerName: 'Kegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {' '}
          Kegiatan
        </Typography>
      ),
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/project-detail/${params.row.kegiatanNameid}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ textDecoration: 'underline', fontWeight: 500, fontSize: '0.875rem !important' }}>
            {params.row.kegiatanName}
          </Typography>
        </Link>
      ),
      width: 200
    },
    {
      field: 'taskName',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/task-detail/${params.row.taskId}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.taskName}
          </Typography>
        </Link>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Sub Kegiatan
        </Typography>
      ),
      headerName: 'Sub Kegiatan',
      width: 200
    },
    {
      field: 'tahap',
      headerName: 'Tahap',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Tahap</Typography>
      ),
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.tahap}
        </Typography>
      ),
      width: 100
    },
    {
      field: 'keterangan',
      headerName: 'Keternagan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Keterangan
        </Typography>
      ),
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.keterangan}
        </Typography>
      ),
      width: 200
    },

    // {
    //   field: 'status',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Status</Typography>
    //   ),
    //   renderCell: params => (
    //     <>
    //       <Chip
    //         label={statusObj[params.row.status].status}
    //         color={statusObj[params.row.status].color}
    //         sx={{
    //           height: 24,
    //           fontSize: '0.75rem',
    //           width: 100,
    //           textTransform: 'capitalize',
    //           '& .MuiChip-label': { fontWeight: 500 }
    //         }}
    //       />
    //     </>
    //   ),
    //   headerName: 'Status',
    //   type: 'string',
    //   width: 140
    // },
    {
      field: 'aksi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Aksi</Typography>
      ),
      headerName: 'Aksi',
      renderCell: params => (
        <Link
          onClick={e =>
            params.row.aksi == 99
              ? handleClickPencairan(e, params.row.taskId)
              : handleSeePencairan(e, params.row.taskId)
          }
        >
          <Button variant='outlined'>{array_aksi[params.row.aksi].Aksi}</Button>
        </Link>
      ),
      type: 'string',
      width: 200
    }
  ]

  const data = []

  let nobaris = 1
  const rows = task.map(task => ({
    id: nobaris++,
    taskName: task.title,
    taskId: task.id,
    kegiatanName: task.project.title,
    kegiatanNameid: task.project.id,
    tahap: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapan.nama : 'Belum Dimulai') : 'Belum Dimulai',
    keterangan: task.pencairan
      ? task.pencairan[0]
        ? task.pencairan[0].tahapan.deskripsi
        : 'Belum Dimulai'
      : 'Belum Dimulai',
    status: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].status : 0) : 0,
    aksi: task.pencairan ? (task.pencairan[0] ? task.pencairan[0].tahapanId : 99) : 99,
    userId: task.userId
  }))
  return (
    <>
      <Grid item md={12}>
        <Card height={300}>
          <DataGrid
            height={300}
            // initialState={{
            //   sorting: {
            //     sortModel: [{ field: 'deadline', sort: 'asc' }]
            //   }
            // }}
            rows={rows}
            columns={columns}
            sx={{
              height: rows.length > 3 ? '81vh' : '45vh',
              width: '100%'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableTask
