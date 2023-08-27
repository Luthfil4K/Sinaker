// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'No', type: 'string', width: 70 },
  { field: 'task', headerName: 'Task', width: 250 },
  { field: 'assignto', headerName: 'Assign To', width: 140 },
  { field: 'priority', headerName: 'Priority', width: 160 },
  { field: 'status', headerName: 'Status', type: 'string', width: 140 },
  { field: 'deadline', headerName: 'Deadline', type: 'string', width: 180 }
]

const rows = [
  { id: 1, task: 'task ke1', assignto: 'Doe', priority: 'John', status: 'done', deadline: '22/09/2023' },
  { id: 2, task: 'task ke sekian', assignto: 'Smith', priority: 'Jane', status: 'done', deadline: '22/09/2023' },
  { id: 3, task: 'task ke sekian', assignto: 'Johnson', priority: 'James', status: 'done', deadline: '22/09/2023' },
  { id: 4, task: 'task ke sekian', assignto: 'Brown', priority: 'Emily', status: 'done', deadline: '22/09/2023' },
  { id: 5, task: 'task ke sekian', assignto: 'Davis', priority: 'Michael', status: 'done', deadline: '22/09/2023' }
]

const TableProjectDetailTask = () => {
  return (
    <>
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

export default TableProjectDetailTask
