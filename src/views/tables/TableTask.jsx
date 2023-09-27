import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from 'react'

const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}

const TableTask = props => {
  const router = useRouter()
  const [task, setTask] = useState(props.data)

  console.log(task)
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'taskName',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.taskName}
          </Typography>
        </Link>
      ),

      headerName: 'Task',
      width: 250
    },
    {
      field: 'kegiatanName',
      headerName: 'Kegiatan',
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/project-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ textDecoration: 'underline', fontWeight: 500, fontSize: '0.875rem !important' }}>
            {params.row.kegiatanName}
          </Typography>
        </Link>
      ),
      width: 140
    },
    {
      field: 'target',
      headerName: 'Target',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.target}
        </Typography>
      ),
      width: 100
    },
    {
      field: 'realisasi',
      headerName: 'Realisasi',
      renderCell: params => (
        <Typography textAlign={'center'} sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.row.realisasi}
        </Typography>
      ),
      width: 100
    },

    {
      field: 'status',
      renderCell: params => (
        <Chip
          label={statusObj[params.row.target / params.row.realisasi === 1 ? 1 : 0].status}
          color={statusObj[params.row.target / params.row.realisasi === 1 ? 1 : 0].color}
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
    {
      field: 'deadline',
      headerName: 'Deadline',
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.row.deadline}</Typography>
      ),
      type: 'string',
      width: 180
    }
  ]

  const data = []

  const rows = task.map(task => ({
    id: task.id,
    taskName: task.title,
    kegiatanName: task.project.title,
    kegiatanNameid: task.project.id,
    target: task.target,
    realisasi: task.realisasi,
    status: 'see',
    deadline: new Date(task.duedate).toLocaleDateString('id'),
    userId: task.userId
  }))
  return (
    <>
      <Typography variant={'h5'} mb={5}>
        {' '}
        Sub Kegiatan Anda
      </Typography>
      <Grid item md={12}>
        <Card>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'deadline', sort: 'asc' }]
              }
            }}
            rows={rows}
            columns={columns}
            sx={{
              overflowY: 'auto',
              width: '100%'
            }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableTask
