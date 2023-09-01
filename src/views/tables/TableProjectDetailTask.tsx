// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const rows = [
  { id: 1, task: '', assignto: 'pegawai 1', priority: 'important', status: 'done', deadline: '22/09/2023' },
  { id: 2, task: '', assignto: 'pegawai 1', priority: 'standard', status: 'on progress', deadline: '22/09/2023' },
  { id: 3, task: '', assignto: 'pegawai 1', priority: 'standard', status: 'done', deadline: '26/09/2023' },
  { id: 4, task: '', assignto: 'pegawai 1', priority: 'important', status: 'assigned', deadline: '28/09/2023' },
  { id: 5, task: '', assignto: 'pegawai 1', priority: 'important', status: 'done', deadline: '29/09/2023' }
]

const TableProjectDetailTask = () => {
  const router = useRouter()
  const tasks = ['Task A', 'Task B', 'Task C', 'Task D', 'Task E']
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'task',
      headerName: 'Task',
      minwidth: 250,
      renderCell: () => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
            {tasks.map(task => {
              return `tugas ke ${task}`
            })}
          </Typography>
        </Link>
      )
    },
    { field: 'assignto', headerName: 'Assign To', width: 140 },
    { field: 'priority', headerName: 'Priority', width: 160 },
    { field: 'status', headerName: 'Status', type: 'string', width: 140 },
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
