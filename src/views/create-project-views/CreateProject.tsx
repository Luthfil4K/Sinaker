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
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { Autocomplete } from '@mui/lab'

import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'
import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'

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
        {/* <Grid item xs={12} md={6}>
          <TextField fullWidth label='Project Name' placeholder='carterLeonard' />
        </Grid> */}
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align='right'>Calories</TableCell>
                <TableCell align='right'>Fat (g)</TableCell>
                <TableCell align='right'>Carbs (g)</TableCell>
                <TableCell align='right'>Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.calories}</TableCell>
                  <TableCell align='right'>{row.fat}</TableCell>
                  <TableCell align='right'>{row.carbs}</TableCell>
                  <TableCell align='right'>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
