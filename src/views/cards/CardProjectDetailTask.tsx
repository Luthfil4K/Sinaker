// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import CardHeader from '@mui/material/CardHeader'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

// icon
import ClipboardCheck from 'mdi-material-ui/ClipboardCheck'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import AccountCog from 'mdi-material-ui/AccountCog'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import { height } from '@mui/system'

// circular bar
import CircularProgress from '@mui/material/CircularProgress'

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

const CardProjectDetailTask = () => {
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

export default CardProjectDetailTask
