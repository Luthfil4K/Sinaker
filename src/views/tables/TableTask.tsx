import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

const TableTask = () => {
  const router = useRouter()

  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'task',
      renderCell: () => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>Sub Kegiatan A</Typography>
        </Link>
      ),

      headerName: 'Task',
      width: 250
    },
    { field: 'project', headerName: 'Kegiatan', width: 140 },
    { field: 'priority', headerName: 'Priority', width: 160 },
    {
      field: 'status',
      renderCell: () => (
        <Chip
          label={'selesai'}
          color={'success'}
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

  const rows = [
    {
      id: 1,
      task: 5,
      project: 'Kegiatan L',
      priority: 'normal',
      status: 'selesa',
      deadline: '22/09/2023'
    },
    {
      id: 2,
      task: 'task ke sekian',
      project: 'Kegiatan A',
      priority: 'tinggi',
      status: 'dikerjakan',
      deadline: '22/09/2023'
    },
    {
      id: 3,
      task: 'task ke sekian',
      project: 'Kegiatan C',
      priority: 'normal',
      status: 'selesai',
      deadline: '22/09/2023'
    },
    {
      id: 4,
      task: 'task ke sekian',
      project: 'Kegiatan G',
      priority: 'rendah',
      status: 'ditugaskan',
      deadline: '22/09/2023'
    },
    {
      id: 5,
      task: 'task ke sekian',
      project: 'Kegiatan B',
      priority: 'normal',
      status: 'selesai',
      deadline: '22/09/2023'
    }
  ]
  return (
    <>
      <Grid item md={12}>
        <Typography variant={'h5'} mb={5}>
          {' '}
          Sub Kegiatan Anda
        </Typography>

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
