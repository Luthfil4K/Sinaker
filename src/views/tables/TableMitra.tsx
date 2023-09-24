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

const data = [
  {
    id: 1,
    nama: 'Mitra A',
    kecamatan: 'Bojonggede',
    desa: 'Bojonggede',
    totalGaji: '7',
    gajiBulanan: 21000,
    gajiTriwulanan: 34000,
    gajiSemesteran: 76000,
    gajiTahunan: 67000,
    jabatan: 'PML',
    jumlahKegiatan: '3'
  },
  {
    id: 2,
    nama: 'Mitra B',
    kecamatan: 'Bojonggede',
    desa: 'Bojonggede',
    totalGaji: '5',
    gajiBulanan: 95000,
    gajiTriwulanan: 39000,
    gajiSemesteran: 40000,
    gajiTahunan: 100000,
    jabatan: 'PML',
    jumlahKegiatan: '5'
  },
  {
    id: 3,
    nama: 'Mitra3',
    kecamatan: 'Bojonggede',
    desa: 'Bojonggede',
    totalGaji: '7',
    gajiBulanan: 26000,
    gajiTriwulanan: 38000,
    gajiSemesteran: 19000,
    gajiTahunan: 69000,
    jabatan: 'PML',
    jumlahKegiatan: '2'
  },
  {
    id: 4,
    nama: 'Mitra4',
    kecamatan: 'Bojonggede',
    desa: 'Bojonggede',
    totalGaji: '4',
    gajiBulanan: 28000,
    gajiTriwulanan: 39000,
    gajiSemesteran: 40000,
    gajiTahunan: 60000,
    jabatan: 'PML',
    jumlahKegiatan: '5'
  }
]

const rows = data.map(row => ({
  id: row.id,
  nama: row.nama,
  kecamatan: row.kecamatan,
  desa: row.desa,
  totalGaji: row.totalGaji,
  gajiBulanan: row.gajiBulanan,
  gajiTriwulanan: row.gajiTriwulanan,
  gajiSemesteran: row.gajiSemesteran,
  gajiTahunan: row.gajiTahunan,
  jabatan: row.jabatan,
  jumlahKegiatan: row.jumlahKegiatan
  // jumlahSubkegiatan: row.jumlahSubkegiatan,
}))

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
    {
      field: 'id',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>No</Typography>
      ),
      type: 'string',
      width: 40
    },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      width: 200
    },
    {
      field: 'kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kecamatan
        </Typography>
      ),
      width: 200
    },
    {
      field: 'desa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Desa</Typography>
      ),
      width: 200
    },
    {
      field: 'gajiBulanan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulanan
        </Typography>
      ),
      width: 150
    },
    {
      field: 'gajiTriwulanan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Triwulan
        </Typography>
      ),
      type: 'string',
      width: 150
    },
    {
      field: 'gajiSemesteran',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Semesteran
        </Typography>
      ),
      type: 'string',
      width: 150
    },
    {
      field: 'gajiTahunan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Tahunan
        </Typography>
      ),
      type: 'string',
      width: 150
    },
    {
      field: 'jumlahKegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Kegiatan
        </Typography>
      ),
      width: 160
    },
    {
      field: 'jabatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Jabatan</Typography>
      ),
      type: 'string',
      width: 140
    },
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
