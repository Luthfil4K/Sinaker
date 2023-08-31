// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Autocomplete } from '@mui/lab'

const CardProjectEdit = () => {
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
    <>
      <Grid container spacing={5} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Typography variant='h5'>Edit Project</Typography>
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
          {/* <DatePicker
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
          /> */}
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

        <Divider sx={{ margin: 0 }} />
      </Grid>
    </>
  )
}

export default CardProjectEdit
