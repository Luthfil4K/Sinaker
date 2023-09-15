import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

import { useRouter } from 'next/dist/client/router'
import Swal from 'sweetalert2'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const data = [
  {
    id: 1,
    subKegiatan: 'Sub Kegiatan  1',
    jenisKegiatan: 64,
    realisasi: 10,
    target: 80,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 2,
    subKegiatan: 'Sub Kegiatan  2',
    jenisKegiatan: 67,
    realisasi: 10,
    target: 10,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 3,
    subKegiatan: 'Sub Kegiatan  3',
    jenisKegiatan: 65,
    realisasi: 30,
    target: 50,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 4,
    subKegiatan: 'Sub Kegiatan  4',
    jenisKegiatan: 66,
    realisasi: 10,
    target: 20,
    status: 0,
    deadline: '22/09/2023'
  },
  {
    id: 5,
    subKegiatan: 'Sub Kegiatan  5',
    jenisKegiatan: 69,
    realisasi: 60,
    target: 60,
    status: 1,
    deadline: '22/09/2023'
  }
]

const rows = data.map(row => ({
  id: row.id,
  subKegiatan: row.subKegiatan,
  jenisKegiatan: row.jenisKegiatan,
  realisasi: row.realisasi,
  target: row.target,
  status: row.status,
  deadline: row.deadline
}))

const jenisSub = {
  64: { namaJenisSub: 'Persiapan', color: 'warning' },
  66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
  65: { namaJenisSub: 'Pengawasan', color: 'warning' },
  67: { namaJenisSub: 'Pengolahan', color: 'warning' },
  68: { namaJenisSub: 'Evaluasi', color: 'warning' },
  69: { namaJenisSub: 'Diseminasi', color: 'warning' }
}
const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}

console.log(statusObj[1].color)

const TableManageTaskList = () => {
  const router = useRouter()
  const tim = ['Tim']
  const handleDelete = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk menghapus tim ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus tim !'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/people')
      } else {
        router.push('/pople')
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'subKegiatan',
      headerName: 'Sub Kegiatan',

      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.subKegiatan}
          </Typography>
        </Link>
      ),
      width: 200
    },
    {
      field: 'jenisKegiatan',
      headerName: 'Jenis Kegiatan',
      width: 150,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {jenisSub[params.row.jenisKegiatan].namaJenisSub}
        </Typography>
      )
    },

    {
      field: 'realisasi',
      width: 70,
      headerName: 'Realisasi',
      type: 'string'
    },

    { field: 'target', headerName: 'Target', type: 'string', width: 70 },
    {
      field: 'status',
      renderCell: params => (
        <Chip
          label={statusObj[params.value].status}
          color={statusObj[params.value].color}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            width: 100,
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ),
      width: 120,
      headerName: 'Status',
      type: 'string'
    },
    { field: 'deadline', headerName: 'Deadline', width: 140, type: 'string' },
    {
      field: 'action',
      width: 150,
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),

      renderCell: () => (
        <>
          <Link>
            <Button
              onClick={e => {
                router.push('/task-manage-edit')
              }}
              type='submit'
              sx={{ mr: 1 }}
              color='info'
              variant='text'
            >
              <PencilOutline />
            </Button>
          </Link>

          <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline />
          </Button>
        </>
      )
    }
  ]

  return (
    <>
      <Grid item md={12} xs={12}>
        <Card>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'deadline', sort: 'asc' }]
              }
            }}
            rows={rows}
            columns={columns}
            sx={{ overflowX: 'scroll' }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableManageTaskList
