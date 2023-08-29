import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
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
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>Task A</Typography>
        </Link>
      ),
      headerName: 'Task',
      width: 250
    },
    { field: 'project', headerName: 'Project', width: 140 },
    { field: 'priority', headerName: 'Priority', width: 160 },
    { field: 'status', headerName: 'Status', type: 'string', width: 140 },
    { field: 'deadline', headerName: 'Deadline', type: 'string', width: 180 }
  ]

  const rows = [
    {
      id: 1,
      task: 5,
      project: 'Doe',
      priority: 'John',
      status: 'done',
      deadline: '22/09/2023'
    },
    { id: 2, task: 'task ke sekian', project: 'Smith', priority: 'Jane', status: 'done', deadline: '22/09/2023' },
    { id: 3, task: 'task ke sekian', project: 'Johnson', priority: 'James', status: 'done', deadline: '22/09/2023' },
    { id: 4, task: 'task ke sekian', project: 'Brown', priority: 'Emily', status: 'done', deadline: '22/09/2023' },
    { id: 5, task: 'task ke sekian', project: 'Davis', priority: 'Michael', status: 'done', deadline: '22/09/2023' }
  ]
  return (
    <>
      <Grid item md={12}>
        <Typography variant={'h5'} mb={5}>
          {' '}
          Apa
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
