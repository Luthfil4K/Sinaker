// ** MUI Imports

import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const rows = [
  { id: 1, task: '', assignto: 'pegawai 1', priority: 'tinggi', status: 'selesai', deadline: '22/09/2023' },
  { id: 2, task: '', assignto: 'pegawai 1', priority: 'normal', status: 'on progress', deadline: '22/09/2023' },
  { id: 3, task: '', assignto: 'pegawai 1', priority: 'normal', status: 'selesai', deadline: '26/09/2023' },
  { id: 4, task: '', assignto: 'pegawai 1', priority: 'tinggi', status: 'assigned', deadline: '28/09/2023' },
  { id: 5, task: '', assignto: 'pegawai 1', priority: 'tinggi', status: 'selesai', deadline: '29/09/2023' }
]

const TableProjectDetailTask = () => {
  const router = useRouter()
  const tasks = ['Kegiatan A']
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'task',
      headerName: 'Task',
      minwidth: 250,
      flex: 1,
      renderCell: () => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
            {tasks.map(task => {
              return `Sub ${task}`
            })}
          </Typography>
        </Link>
      )
    },
    { field: 'assignto', headerName: 'Assign To', width: 140 },
    { field: 'priority', headerName: 'Prioritas', width: 160 },
    {
      field: 'status',
      renderCell: () => (
        <Chip
          label={'dikerjakan'}
          color={'warning'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            width: 100,
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ),
      headerName: 'Status',
      type: 'string',
      width: 140
    },
    { field: 'deadline', headerName: 'Deadline', type: 'string', width: 180 }
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

export default TableProjectDetailTask
