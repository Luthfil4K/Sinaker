import * as React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// other
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/dist/client/router'
import Swal from 'sweetalert2'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const rows = [
  {
    id: 1,
    nama: 'Mitra A',
    gajiBulanan: 21000,
    gajiTriwulanan: 34000,
    gajiSemesteran: 76000,
    gajiTahunan: 67000,
    jumlahKegiatan: '3',
    jumlahSubkegiatan: '7'
  },
  {
    id: 2,
    nama: 'Mitra B',
    gajiBulanan: 95000,
    gajiTriwulanan: 39000,
    gajiSemesteran: 40000,
    gajiTahunan: 100000,
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '5'
  },
  {
    id: 3,
    nama: 'Mitra3',
    gajiBulanan: 26000,
    gajiTriwulanan: 38000,
    gajiSemesteran: 19000,
    gajiTahunan: 69000,
    jumlahKegiatan: '2',
    jumlahSubkegiatan: '7'
  },
  {
    id: 4,
    nama: 'Mitra4',
    gajiBulanan: 28000,
    gajiTriwulanan: 39000,
    gajiSemesteran: 40000,
    gajiTahunan: 60000,
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '4'
  }
]

const TableMitra = () => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
      text: 'Untuk menghapus mitra ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus mitra !'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/mitra')
      } else {
        router.push('/mitra')
      }
    })
  }
  const router = useRouter()
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 40 },
    { field: 'nama', headerName: 'Nama', width: 200 },
    { field: 'gajiBulanan', headerName: 'Gaji Bulanan', width: 150 },
    { field: 'gajiTriwulanan', headerName: 'Gaji Triwulanan', type: 'string', width: 150 },
    { field: 'gajiSemesteran', headerName: 'Gaji Semesteran', type: 'string', width: 150 },
    { field: 'gajiTahunan', headerName: 'Gaji Tahunan', type: 'string', width: 150 },
    { field: 'jumlahKegiatan', headerName: 'Jumlah Kegiatan ', width: 160 },
    { field: 'jumlahSubkegiatan', headerName: 'Jumlah Subkegiatan ', type: 'string', width: 140 },
    // {
    //   field: 'role',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Role</Typography>
    //   ),
    //   minWidth: 160,
    //   flex: 1,
    //   renderCell: () => (
    //     <form>
    //       <FormControl fullWidth>
    //         <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
    //         <Select
    //           sx={{ height: 50 }}
    //           label='role'
    //           id='form-layouts-separator-role'
    //           labelId='form-layouts-separator-role-label'
    //         >
    //           <MenuItem value='admin'>Supervisor</MenuItem>
    //           <MenuItem value='employee'>Staff</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </form>
    //   )
    // },
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
              router.push('/mitra-edit')
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
  return (
    <>
      <Card sx={{ padding: 4 }}>
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
    </>
  )
}

export default TableMitra
