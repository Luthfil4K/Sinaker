import * as React from 'react'
import { useState } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

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

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const TaskManageAddViews = propss => {
  const [project, setProject] = useState(propss.data)
  // console.log(project)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [values, setValues] = useState({
    subKegNama: '',
    subKegJenis: '',
    subKegTarget: '',
    subKegUnitTarget: '',
    subKegDl: '',
    subKegDesk: '',
    subKegProjectId: project.id,
    subKegUserId: project.projectLeaderId,
    subKegMonth: '',
    subKegYear: ''
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleDateChangeE = date => {
    const dates = new Date(date) // Ganti tanggal dengan tanggal yang sesuai
    const localizedDateString = date.toLocaleDateString('id')
    setSelectedDateE(date)
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      subKegMonth: dates.getMonth() + 1,
      subKegYear: dates.getFullYear(),
      subKegDl: date // Perbarui nilai kegRentang
    }))
  }
  console.log(values.subKegMonth)
  console.log(values.subKegYear)
  const handleJenisSubKeg = eeee => {
    setValues(values => ({
      ...values,
      subKegJenis: eeee.target.value
    }))
  }
  const handleAddTask = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/task', {
          title: values.subKegNama,
          jenisKeg: values.subKegJenis,
          target: parseInt(values.subKegTarget),
          unitTarget: values.subKegUnitTarget,
          duedate: values.subKegDl,
          description: values.subKegDesk,
          realisasi: 0,
          month: parseInt(values.subKegMonth),
          year: parseInt(values.subKegYear),
          projectId: values.subKegProjectId,
          userId: values.subKegUserId,
          notes: '-'
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Tambah Pegawai Success',
            text: 'Tekan OK untuk lanjut',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          })

          setValues({
            subKegNama: '',
            subKegJenis: '',
            subKegTarget: '',
            subKegUnitTarget: '',
            subKegDl: '',
            subKegDesk: '',
            subKegProjectId: project.id,
            subKegUserId: project.projectLeaderId,
            subKegMonth: '',
            subKegYear: ''
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Tambah Pegawai Gagal',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const router = useRouter()
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
  // console.log(values.subKegJenis)
  // console.log(values)
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Sub Kegiatan
          </Typography>
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
                type={'number'}
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
          <Button fullWidth onClick={handleAddTask} size='medium' variant='contained' sx={{ marginTop: 4 }}>
            Buat Sub Kegiatan
          </Button>
        </form>
      </Card>
    </>
  )
}

export default TaskManageAddViews
