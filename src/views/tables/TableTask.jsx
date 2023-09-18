import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

const statusObj = {
  0: { color: 'warning', status: 'On Progress' },
  1: { color: 'success', status: 'Done' }
}

const TableTask = () => {
  const router = useRouter()

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
          label={statusObj[params.value].status}
          color={statusObj[params.value].color}
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

  const data = [
    {
      id: 1,
      task: 'task ke 2',
      kegiatanName: 'Kegiatan L',
      kegiatanId: 1,
      priority: 'normal',
      status: 1,
      deadline: '22/10/2023',
      userId: 2,
      target: 10,
      realisasi: 10
    },
    {
      id: 2,
      task: 'task abc',
      kegiatanName: 'Kegiatan A',
      kegiatanId: 1,
      priority: 'tinggi',
      status: 0,
      deadline: '16/09/2023',
      userId: 2,
      target: 90,
      realisasi: 10
    },
    {
      id: 3,
      task: 'task ke sekian',
      kegiatanName: 'Kegiatan C',
      kegiatanId: 1,
      priority: 'normal',
      status: 1,
      deadline: '19/09/2023',
      userId: 2,
      target: 20,
      realisasi: 20
    },
    {
      id: 4,
      task: 'task ke sekian',
      kegiatanName: 'Kegiatan G',
      kegiatanId: 1,
      priority: 'rendah',
      status: 0,
      deadline: '27/09/2023',
      userId: 2,
      target: 90,
      realisasi: 30
    },
    {
      id: 5,
      task: 'task ke sekian',
      kegiatanName: 'Kegiatan B',
      kegiatanId: 1,
      priority: 'normal',
      status: 1,
      deadline: '22/09/2023',
      userId: 2,
      target: 90,
      realisasi: 90
    }
  ]

  const rows = data.map(row => ({
    id: row.id,
    taskName: row.task,
    kegiatanName: row.kegiatanName,
    kegiatanNameid: row.kegiatanId,
    target: row.target,
    realisasi: row.realisasi,
    status: row.status,
    deadline: row.deadline,
    userId: row.userId
  }))
  return (
    <>
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
    </>
  )
}

export default TableTask
