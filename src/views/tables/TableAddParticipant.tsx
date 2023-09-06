import * as React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// other
import { DataGrid } from '@mui/x-data-grid'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const columns = [
  { field: 'id', headerName: 'No', type: 'string', width: 40 },
  {
    field: 'checked',
    renderCell: () => (
      <Checkbox
        onChange={e => {
          let checked = e.target.checked
        }}
      />
    ),
    headerName: 'All',
    type: 'string',
    width: 80
  },
  { field: 'nama', headerName: 'Nama', width: 230 },
  { field: 'gajiBulanan', headerName: 'Gaji Bulanan', width: 200 },
  { field: 'gajiTriwulanan', headerName: 'Gaji Triwulanan', type: 'string', width: 100 },
  { field: 'gajiSemesteran', headerName: 'Gaji Semesteran', type: 'string', width: 100 },
  { field: 'gajiTahunan', headerName: 'Gaji Tahunan', type: 'string', width: 100 },
  { field: 'jumlahKegiatan', headerName: 'Jumlah Kegiatan ', width: 160 },
  { field: 'jumlahSubkegiatan', headerName: 'Jumlah Subkegiatan ', type: 'string', width: 140 }
]

const rows = [
  {
    id: 1,
    nama: 'Mitra1',
    gajiBulanan: '22204511221',
    gajiTriwulanan: 'IPDS',
    jumlahKegiatan: '3',
    jumlahSubkegiatan: '7'
  },
  {
    id: 2,
    nama: 'Mitra2',
    gajiBulanan: '22223011221',
    gajiTriwulanan: 'IPDS',
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '5'
  },
  {
    id: 3,
    nama: 'Mitra3',
    gajiBulanan: '22201122311',
    gajiTriwulanan: 'IPDS',
    jumlahKegiatan: '2',
    jumlahSubkegiatan: '7'
  },
  {
    id: 4,
    nama: 'Mitra4',
    gajiBulanan: '011221',
    gajiTriwulanan: 'IPDS',
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '4'
  }
]

const TableAddParticipant = () => {
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Typography variant={'h6'} mt={1} mb={1}>
          Pilih Mitra
        </Typography>
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

export default TableAddParticipant
