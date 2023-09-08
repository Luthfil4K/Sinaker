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

const rows = [
  { id: 1, tim: 'tim ke 1', jenisKegiatan: 'Pengawasan', target: 80, deadline: '22/09/2023' },
  { id: 2, tim: 'tim ke 2', jenisKegiatan: 'pengolahan', target: 10, deadline: '22/09/2023' },
  { id: 3, tim: 'tim ke 3', jenisKegiatan: 'evaluasi', target: 50, deadline: '22/09/2023' },
  { id: 4, tim: 'tim ke 4', jenisKegiatan: 'diseminasi', target: 20, deadline: '22/09/2023' },
  { id: 5, tim: 'tim ke 5', jenisKegiatan: 'pengolahan', target: 60, deadline: '22/09/2023' }
]

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
  const subKegiatan = ['Sub Kegiatan']

  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'subKegiatan',
      headerName: 'Sub Kegiatan',
      width: 250,
      flex: 1,
      renderCell: () => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
            {subKegiatan.map(team => {
              return `${team} `
            })}
          </Typography>
        </Link>
      )
    },
    { field: 'jenisKegiatan', headerName: 'Jenis Kegiatan', width: 150 },

    {
      field: 'realisasi',
      renderCell: () => (
        <Chip
          label={'7'}
          color={'warning'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            width: 100,
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ),
      headerName: 'Realisasi',
      type: 'string',
      width: 100
    },
    { field: 'target', headerName: 'Target', type: 'string', width: 100 },
    { field: 'deadline', headerName: 'Deadline', type: 'string', width: 140 },
    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),
      minWidth: 215,
      flex: 1,
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
            sx={{ overflowX: 'auto' }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableManageTaskList
