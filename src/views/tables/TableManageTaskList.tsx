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
  { id: 1, task: 'task ke1', assignto: 'Doe', priority: 'John', status: 'done', deadline: '22/09/2023' },
  { id: 2, task: 'task ke sekian', assignto: 'Smith', priority: 'Jane', status: 'done', deadline: '22/09/2023' },
  { id: 3, task: 'task ke sekian', assignto: 'Johnson', priority: 'James', status: 'done', deadline: '22/09/2023' },
  { id: 4, task: 'task ke sekian', assignto: 'Brown', priority: 'Emily', status: 'done', deadline: '22/09/2023' },
  { id: 5, task: 'task ke sekian', assignto: 'Davis', priority: 'Michael', status: 'done', deadline: '22/09/2023' }
]

const TableManageTaskList = () => {
  const router = useRouter()

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Untuk menghapus tugas ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus tugas !'
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
    { field: 'task', headerName: 'Task', width: 150 },
    { field: 'assignto', headerName: 'Assign To', width: 140 },
    { field: 'priority', headerName: 'Priority', width: 100 },
    { field: 'status', headerName: 'Status', type: 'string', width: 100 },
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
