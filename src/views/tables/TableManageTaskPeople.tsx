import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const columns = [
  { field: 'id', headerName: 'No', type: 'string', width: 40 },
  { field: 'nama', headerName: 'Nama', width: 130 },
  { field: 'nip', headerName: 'NIP', width: 200 },
  { field: 'fungsi', headerName: 'Fungsi', type: 'string', width: 180 },
  { field: 'projectAssign', headerName: 'ProjectAssign', width: 160 },
  { field: 'taskAssign', headerName: 'TaskAssign', type: 'string', width: 140 }
]

const rows = [
  {
    id: 1,
    nama: 'Pegawai1',
    nip: '22204511221',
    fungsi: 'Distribusi',
    projectAssign: '5',
    taskAssign: '6',
    role: '22/09/2023'
  },
  {
    id: 2,
    nama: 'Pegawai2',
    nip: '22223011221',
    fungsi: 'IPDS',
    projectAssign: '4',
    taskAssign: '2',
    role: '22/09/2023'
  },
  {
    id: 3,
    nama: 'Pegawai3',
    nip: '22201122311',
    fungsi: 'IPDS',
    projectAssign: '4',
    taskAssign: '5',
    role: '22/09/2023'
  },
  {
    id: 4,
    nama: 'pegawai4',
    nip: '011221',
    fungsi: 'Produksi',
    projectAssign: '2',
    taskAssign: '4',
    role: '22/09/2023'
  }
]

const TableManageTaskList = () => {
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
