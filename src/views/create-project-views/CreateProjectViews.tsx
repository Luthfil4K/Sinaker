// react import
import { forwardRef, SetStateAction, useEffect, useState } from 'react'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { Autocomplete } from '@mui/lab'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
})

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const CreateProjectViews = () => {
  const [selectedDate, setSelectedDate] = useState(null)

  const projectRutin = [
    'PENGELOLAAN WEB',
    'SURVEI IBS BULANAN',
    'SURVEI IBS TAHUNAN',
    'SURVEI',
    'SAKERNAS SEMESTERAN',
    'SAKERNAS TAHUNAN'
  ]

  const pegawai = ['Pegawai1', 'Pegawai2', 'Pegawai3', 'Pegawai4']
  return (
    <Card>
      <Grid container spacing={5} sx={{ padding: '32px' }}>
        <Grid item xs={12}>
          <Typography variant='h5'>Create Project</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={projectRutin}
            renderInput={params => <TextField {...params} label='Project Name' />}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <DatePicker
            selected={selectedDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='DD-MM-YYYY'
            onChange={setSelectedDate}
            dateFormat='dd/MM/yyyy'
            className='custom-datepicker'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <DatePicker
            selected={selectedDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='DD-MM-YYYY'
            onChange={setSelectedDate}
            dateFormat='dd/MM/yyyy'
            className='custom-datepicker'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={3} label='Project Description' placeholder='Description' />
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant='h6' sx={{ py: '5px' }}>
            Project Manager
          </Typography>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={pegawai}
            renderInput={params => <TextField {...params} label='Project Leader' />}
          />
        </Grid>
        <TableAddParticipant></TableAddParticipant>
        <Divider sx={{ margin: 0 }} />
        <Grid item xs={12} md={3} lg={3}>
          <Button size='medium' type='submit' variant='contained'>
            Create Project
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CreateProjectViews
