import * as React from 'react'
import { useState } from 'react'
// mui
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/dist/client/router'

import { Autocomplete } from '@mui/lab'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const TaskManageEditViews = () => {
  const router = useRouter()
  const ProjectParticipant = ['pegawai1', 'pegawai2', 'pegawai3']
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [values, setValues] = useState({
    subKegNama: '',
    subKegJenis: '',
    subKegTarget: '',
    subKegUnitTarget: '',
    subKegDl: '',
    subKegDesk: ''
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleDateChangeE = date => {
    setSelectedDateE(date)
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      subKegDl: date // Perbarui nilai kegRentang
    }))
    console.log(date)
  }

  const handleJenisSubKeg = eeee => {
    setValues(values => ({
      ...values,
      subKegJenis: eeee.target.value
    }))
  }
  const jenisSubKegiatan = [
    {
      id: 64,
      nama: 'Persiapan'
    },
    {
      id: 65,
      nama: 'Pelaksanaan'
    },
    {
      id: 66,
      nama: 'Pengawasan '
    },
    {
      id: 67,
      nama: 'Pengolahan '
    },
    {
      id: 68,
      nama: 'Evaluasi '
    },
    {
      id: 69,
      nama: 'Diseminasi '
    }
  ]

  // a check b check c check
  console.log(values.subKegJenis)
  console.log(values)
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Edit Sub Kegiatan
          </Typography>
          {/* <Typography variant='body2'>Fill this blank field below</Typography> */}
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField
            name='namaSubKeg'
            value={values.subKegNama}
            onChange={handleChange('subKegNama')}
            fullWidth
            id='namaKegiatan'
            label='Nama Sub Kegiatan'
            sx={{ marginBottom: 4 }}
          />

          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>Jenis Kegiatan</InputLabel>
                <Select
                  name='jenisSubKeg'
                  fullWidth
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  label='Rentang Waktu'
                  onChange={handleJenisSubKeg}
                  value={values.subKegJenis}
                >
                  {jenisSubKegiatan.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name='targetSubKeg'
                value={values.subKegTarget}
                onChange={handleChange('subKegTarget')}
                autoFocus
                fullWidth
                id='target'
                label='Target'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name='unitTargetSubKeg'
                value={values.subKegUnitTarget}
                onChange={handleChange('subKegUnitTarget')}
                autoFocus
                fullWidth
                id='unitTarget'
                label='Unit Target'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  selected={selectedDateE}
                  sx={{ width: 1000 }}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='Tanggal Berakhir'
                  value={selectedDateE}
                  onChange={handleDateChangeE}
                  dateFormat='dd/MM/yyyy'
                  className='custom-datepicker'
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item md={12} xs={12}>
              {' '}
              <TextField
                name='deskripsiSubKeg'
                value={values.subKegDesk}
                onChange={handleChange('subKegDesk')}
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi Sub Kegiatan'
                placeholder='Deskripsi Sub Kegiatan'
              />
            </Grid>
          </Grid>

          {/* <TableAddParticipant></TableAddParticipant> */}
          <Button
            fullWidth
            onClick={e => {
              router.push('/task-manage')
            }}
            size='medium'
            variant='contained'
            sx={{ marginTop: 4 }}
          >
            Edit Sub Kegiatan
          </Button>
        </form>
      </Card>
    </>
  )
}

export default TaskManageEditViews
