import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
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
  { id: 1, tim: 'tim ke 1', pml: 'pegawai1', pcl: 20, deadline: '22/09/2023' },
  { id: 2, tim: 'tim ke 2', pml: 'pegawai2', pcl: 30, deadline: '22/09/2023' },
  { id: 3, tim: 'tim ke 3', pml: 'pegawai3', pcl: 7, deadline: '22/09/2023' },
  { id: 4, tim: 'tim ke 4', pml: 'pegawai4', pcl: 15, deadline: '22/09/2023' },
  { id: 5, tim: 'tim ke 5', pml: 'pegawai5', pcl: 12, deadline: '22/09/2023' }
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

  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'tim',
      headerName: 'Tim',
      minwidth: 250,
      flex: 1,
      renderCell: () => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
            {tim.map(team => {
              return `${team} ke-sekian`
            })}
          </Typography>
        </Link>
      )
    },
    { field: 'pml', headerName: 'PML', width: 140 },
    { field: 'pcl', headerName: 'PCL', width: 100 },
    { field: 'deadline', headerName: 'Deadline', type: 'string', width: 180 },
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
