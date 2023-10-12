import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// other
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/dist/client/router'
import Swal from 'sweetalert2'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const rows2 = [
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
  }
]

const TableMitra = props => {
  // const { dataMitra } = props.data
  const [mitra, setMitra] = useState(props.data)
  const rows = mitra.map(row => ({
    id: row.id,
    nik: row.nik,
    name: row.name,
    jenisKelamin: row.jenisKelamin,
    tanggalLahir: row.tanggalLahir,
    umur: row.umur,
    pendidikan: row.pendidikan,
    email: row.email,
    status: row.status
  }))
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
    { field: 'nik', headerName: 'NIK', width: 200 },
    { field: 'name', headerName: 'Nama', width: 200 },
    { field: 'jenisKelamin', headerName: 'Jenis Kelamin', width: 150 },
    { field: 'tanggalLahir', headerName: 'Tanggal Lahir', type: 'string', width: 150 },
    { field: 'umur', headerName: 'Umur', type: 'string', width: 150 },
    { field: 'pendidikan', headerName: 'Pendidikan', type: 'string', width: 150 },
    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'status', headerName: 'Mitra Internal/External ', type: 'string', width: 140 },
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
              e.preventDefault()
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
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rowHeight={45}
            rows={rows}
            columns={columns}
            sx={{
              height: rows.length > 3 ? '70vh' : '45vh',
              overflowY: 'auto',
              width: '100%'
            }}
          />
        </Box>
      </Card>
    </>
  )
}

export default TableMitra
