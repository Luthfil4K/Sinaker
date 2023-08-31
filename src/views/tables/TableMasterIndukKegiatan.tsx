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

// other
import { DataGrid } from '@mui/x-data-grid'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const columns = [
  { field: 'id', headerName: 'No', type: 'string', width: 40 },
  { field: 'kode', headerName: 'Kode', width: 230 },
  { field: 'indukKegiatan', headerName: 'IndukKegiatan', width: 200 },
  { field: 'fungsi', headerName: 'Fungsi', type: 'string', width: 100 },
  {
    field: 'action',
    renderHeader: () => (
      <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Action</Typography>
    ),
    minWidth: 215,
    flex: 1,
    renderCell: () => (
      <>
        <Button type='submit' sx={{ mr: 1 }} color='info' variant='text'>
          <PencilOutline />
        </Button>

        <Button type='submit' sx={{ mr: 1 }} color='error' variant='text'>
          <DeleteOutline />
        </Button>
      </>
    )
  }
]

const rows = [
  {
    id: 1,
    kode: 'Doe ke1',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  },
  {
    id: 2,
    kode: 'Doe ke1',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  },
  {
    id: 3,
    kode: 'Doe ke1',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  },
  {
    id: 4,
    kode: 'Doe ke1',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  },
  {
    id: 5,
    kode: 'Doe ke1',
    indukKegiatan: '22204511221',
    fungsi: 'IPDS'
  }
]

const TableMasterIndukKegiatan = () => {
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
              alignItems: 'center'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableMasterIndukKegiatan
