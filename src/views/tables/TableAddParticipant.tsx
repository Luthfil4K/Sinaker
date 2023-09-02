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
  { field: 'nip', headerName: 'NIP', width: 200 },
  { field: 'fungsi', headerName: 'Fungsi', type: 'string', width: 100 },
  { field: 'jumlahKegiatan', headerName: 'Jumlah Kegiatan ', width: 160 },
  { field: 'jumlahSubkegiatan', headerName: 'Jumlah Subkegiatan ', type: 'string', width: 140 }
]

const rows = [
  {
    id: 1,
    nama: 'pegawai1',
    nip: '22204511221',
    fungsi: 'IPDS',
    jumlahKegiatan: '3',
    jumlahSubkegiatan: '7'
  },
  {
    id: 2,
    nama: 'pegawai2',
    nip: '22223011221',
    fungsi: 'IPDS',
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '5'
  },
  {
    id: 3,
    nama: 'pegawai3',
    nip: '22201122311',
    fungsi: 'IPDS',
    jumlahKegiatan: '2',
    jumlahSubkegiatan: '7'
  },
  {
    id: 4,
    nama: 'pegawai4',
    nip: '011221',
    fungsi: 'IPDS',
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '4'
  }
]

const TableAddParticipant = () => {
  return (
    <>
      <Grid item md={12}>
        <Typography variant={'h6'} mt={1} mb={1}>
          Pilih pegawai
        </Typography>
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

export default TableAddParticipant
