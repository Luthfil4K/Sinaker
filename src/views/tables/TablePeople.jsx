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

const data = [
  {
    id: 1,
    nama: 'Pegawai1',
    fungsi: 'Nerwilis',
    totalGaji: 100000,
    gajiBulanan: 10000,
    gajiTriwulanan: 110000,
    gajiSemesteran: 150000,
    gajiTahunan: 210000,
    jumlahKegiatan: 10,
    jumlahSubkegiatan: 10
  },
  {
    id: 2,
    nama: 'Pegawai2',
    fungsi: 'IPDS',
    totalGaji: 140000,
    gajiBulanan: 310000,
    gajiTriwulanan: 550000,
    gajiSemesteran: 230000,
    gajiTahunan: 23000,
    jumlahKegiatan: 5
    // jumlahSubkegiatan: 14
  }
]
const rows = data.map(row => ({
  id: row.id,
  nama: row.nama,
  fungsi: row.fungsi,
  totalGaji: row.totalGaji,
  gajiBulanan: row.gajiBulanan,
  gajiTriwulanan: row.gajiTriwulanan,
  gajiSemesteran: row.gajiSemesteran,
  gajiTahunan: row.gajiTahunan,
  jumlahKegiatan: row.jumlahKegiatan
  // jumlahSubkegiatan: row.jumlahSubkegiatan,
}))

const TablePeople = params => {
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
    {
      field: 'nama',
      headerName: 'Nama',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.nama}
        </Typography>
      ),
      minWidth: 130
    },
    {
      field: 'fungsi',
      headerName: 'Fungsi',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.fungsi}
        </Typography>
      ),
      type: 'string',
      minWidth: 100
    },
    {
      field: 'totalGaji',
      headerName: 'Total Gaji',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.totalGaji}
        </Typography>
      ),
      type: 'string',
      minWidth: 170
    },
    {
      field: 'gajiBulanan',
      headerName: 'Gaji Bulanan',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.gajiBulanan}
        </Typography>
      ),
      width: 150
    },
    {
      field: 'gajiTriwulanan',
      headerName: 'Gaji Triwulanan',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.gajiTriwulanan}
        </Typography>
      ),
      type: 'string',
      width: 150
    },
    {
      field: 'gajiSemesteran',
      headerName: 'Gaji Semesteran',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.gajiSemesteran}
        </Typography>
      ),
      type: 'string',
      width: 150
    },
    {
      field: 'gajiTahunan',
      headerName: 'Gaji Tahunan',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.gajiTahunan}
        </Typography>
      ),
      type: 'string',
      width: 150
    },
    {
      field: 'jumlahKegiatan',
      headerName: 'Jumlah Kegiatan',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.jumlahKegiatan}
        </Typography>
      ),
      minWidth: 150
    },

    {
      field: 'role',
      renderHeader: () => <Typography sx={{ fontSize: '0.875rem !important', textAlign: 'center' }}>Role</Typography>,
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
              <MenuItem value='1'>Ketua Tim</MenuItem>
              <MenuItem value='2'>Staff</MenuItem>
            </Select>
          </FormControl>
        </form>
      )
    },
    {
      field: 'action',
      renderHeader: () => <Typography sx={{ fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>,
      minWidth: 250,
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

  const handleDelete = () => {
    Swal.fire({
      title: 'Apa Anda Yakin?',
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
