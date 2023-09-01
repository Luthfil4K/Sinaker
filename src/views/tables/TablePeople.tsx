import * as React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// other, swall
import { DataGrid } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import { useRouter } from 'next/dist/client/router'

// icon

import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import router from 'next/router'

const rows = [
  {
    id: 1,
    nama: 'Doe ke1',
    nip: '22204511221',
    fungsi: 'IPDS',
    projectAssign: 'John',
    taskAssign: 'done',
    role: '22/09/2023',
    action: 'edit/delete'
  },
  {
    id: 2,
    nama: 'Doeasd',
    nip: '22223011221',
    fungsi: 'IPDS',
    projectAssign: 'John',
    taskAssign: 'done',
    role: '22/09/2023',
    action: 'edit/delete'
  },
  {
    id: 3,
    nama: 'Doeert',
    nip: '22201122311',
    fungsi: 'IPDS',
    projectAssign: 'John',
    taskAssign: 'done',
    role: '22/09/2023',
    action: 'edit/delete'
  },
  {
    id: 4,
    nama: 'apa',
    nip: '011221',
    fungsi: 'IPDS',
    projectAssign: 'John',
    taskAssign: 'done',
    role: '22/09/2023',
    action: 'edit/delete'
  }
]

const TablePeople = () => {
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    { field: 'nama', headerName: 'Nama', minWidth: 130 },
    { field: 'nip', headerName: 'NIP', minWidth: 100 },
    { field: 'fungsi', headerName: 'Fungsi', type: 'string', minWidth: 100 },
    { field: 'projectAssign', headerName: 'ProjectAssign', minWidth: 160 },
    { field: 'taskAssign', headerName: 'TaskAssign', type: 'string', minWidth: 140 },
    {
      field: 'role',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Role</Typography>
      ),
      minWidth: 160,
      flex: 1,
      renderCell: () => (
        <form>
          <FormControl fullWidth>
            <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
            <Select
              sx={{ height: 50 }}
              label='role'
              id='form-layouts-separator-role'
              labelId='form-layouts-separator-role-label'
            >
              <MenuItem value='admin'>Supervisor</MenuItem>
              <MenuItem value='employee'>Staff</MenuItem>
            </Select>
          </FormControl>
        </form>
      )
    },
    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
      ),
      minWidth: 215,
      flex: 1,
      renderCell: () => (
        <>
          <Button
            onClick={e => {
              router.push('/people-edit')
            }}
            type='submit'
            sx={{ mr: 1 }}
            color='info'
            variant='text'
          >
            <PencilOutline />
          </Button>

          <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline />
          </Button>
        </>
      )
    }
  ]

  // const router = useRouter()
  // const handleEdit = () => {
  //   Swal.fire({
  //     title: 'Input email address',
  //     input: 'email',
  //     inputLabel: 'Your email address',
  //     inputPlaceholder: 'Enter your email address'
  //   })
  // }
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Untuk menghapus akun ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hapus akun !'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/people')
      } else {
        router.push('/people')
      }
    })
  }

  return (
    <>
      <Grid item md={12}>
        <Card>
          <DataGrid
            rowHeight={65}
            initialState={{
              sorting: {
                sortModel: [{ field: 'deadline', sort: 'asc' }]
              }
            }}
            rows={rows}
            columns={columns}
            sx={{
              overflowY: 'auto',
              width: '100%',
              alignItems: 'start'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TablePeople
