// react import
import { useState } from 'react'
import * as React from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import { DataGrid } from '@mui/x-data-grid'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const CreateProjectViews = props => {
  const [dataUser, setDataUser] = useState(props.data)
  console.log(dataUser)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [values, setValues] = useState({
    kegNama: '',
    kegRentang: '',
    kegGajiPml: '',
    kegGajiPcl: '',
    kegFungsi: '',
    kegDesk: '',
    kegKetua: ''
  })

  const handleDateChange = date => {
    setSelectedDate(date)
    console.log(date)
  }
  const handleDateChangeE = date => {
    setSelectedDateE(date)
    console.log(date)
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
    console.log(values)
  }

  const handleRentangChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegRentang: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegKetua: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleProject = async e => {
    e.preventDefault()
    // console.log(
    //   values.kegNama +
    //     '||' +
    //     values.kegRentang +
    //     '||' +
    //     selectedDate +
    //     '||' +
    //     selectedDateE +
    //     '||' +
    //     values.kegFungsi +
    //     '||' +
    //     values.kegDesk +
    //     '||' +
    //     values.kegKetua
    // )
    try {
      while (true) {
        const res = await axios.post('/project', {
          title: values.kegNama,
          rentangWaktu: values.kegRentang.toString(),
          startdate: selectedDate,
          enddate: selectedDateE,
          fungsi: values.kegFungsi,
          description: values.kegDesk,
          projectLeaderId: values.kegKetua,
          createdById: 99
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Create Project Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          })

          setValues({
            kegNama: '',
            kegRentang: '',
            kegGajiPml: '',
            kegGajiPcl: '',
            kegFungsi: '',
            kegDesk: '',
            kegKetua: ''
          })

          setSelectedDate(new Date())
          setSelectedDateE(null)
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Project Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const router = useRouter()
  return (
    <Card>
      <form action='post' onSubmit={e => e.preventDefault()}>
        <Grid container spacing={4} sx={{ padding: '32px' }}>
          <Grid item xs={12}>
            <Typography variant='h5'>Buat Kegiatan</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Rentang Waktu</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={values.kegRentang}
                onChange={handleRentangChange}
                label='Rentang Waktu'
                name='rentangWaktu'
              >
                <MenuItem value={59}>Bulanan</MenuItem>
                <MenuItem value={60}>Triwulanan</MenuItem>
                <MenuItem value={61}>Semesteran</MenuItem>
                <MenuItem value={62}>Tahunan</MenuItem>
                <MenuItem value={70}>SubRound</MenuItem>
                <MenuItem value={80}>Ad-Hok</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              value={values.kegNama}
              onChange={handleChange('kegNama')}
              multiline
              label='Nama Kegiatan'
              name='namaKegiatan'
            />
          </Grid>

          {/* <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            value={values.kegGajiPml}
            type={'number'}
            onChange={handleChange('kegGajiPml')}
            label='Gaji Satuan PML'
            name='gajiPML'
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <TextField
            fullWidth
            value={values.kegGajiPcl}
            type={'number'}
            onChange={handleChange('kegGajiPcl')}
            label='Gaji Satuan PCL'
            name='gajiPCL'
          />
        </Grid> */}
          <Grid item xs={12} sm={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                onChange={handleFungsiChange}
                value={values.kegFungsi}
                id='demo-simple-select-helper'
                label='Fungsi'
                name='fungsi'
              >
                <MenuItem value={2}>Bagian Umum</MenuItem>
                <MenuItem value={3}>Statistik Sosial </MenuItem>
                <MenuItem value={4}>Statistik Produksi</MenuItem>
                <MenuItem value={5}>Statistik Distribusi</MenuItem>
                <MenuItem value={6}>Neraca Wilayah dan Analisis Statistik</MenuItem>
                <MenuItem value={7}>Integrasi Pengolahan dan Diseminasi Statistik</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label='Project Description'
              placeholder='Description'
              value={values.kegDesk}
              onChange={handleChange('kegDesk')}
              name='kegaitanDesk'
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={6} display={'flex'} justifyContent={'end'}>
            <DatePickerWrapper>
              <DatePicker
                sx={{ width: 1000 }}
                selected={selectedDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='Tanggal Mulai'
                value={selectedDate}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
                className='custom-datepicker'
                renderInput={params => <TextField {...params} fullWidth sx={{ width: 1000 }} />}
                name='tanggalMulai'
              />
            </DatePickerWrapper>
            {/* <TextField fullWidth multiline label='Tanggal Dimulai' placeholder='Tanggal Dimulai' /> */}
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
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
                name='tanggalBerakhir'
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant='h6' sx={{ py: '5px' }}>
              Penanggung Jawab Kegiatan
            </Typography>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>Penanggung Jawab</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={values.kegKetua}
                onChange={handlePJ}
                label='Penanggung Jawab'
                name='penanggungJawab'
              >
                {dataUser.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} lg={3}></Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleProject}>
            Buat Kegiatan
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateProjectViews
