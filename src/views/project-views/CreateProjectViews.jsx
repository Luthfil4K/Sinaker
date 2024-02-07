// react import
import { useState, forwardRef, useEffect } from 'react'
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
import { pink } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { DataGrid } from '@mui/x-data-grid'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Mulai' autoComplete='on' />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Berakhir' autoComplete='off' />
})

const CreateProjectViews = props => {
  const [dataUser, setDataUser] = useState(props.data)
  // console.log(dataUser)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const [disabled, setDisabled] = useState({
    jan: false,
    feb: false,
    mar: false,
    apr: false,
    may: false,
    june: false,
    july: false,
    aug: false,
    sep: false,
    oct: false,
    nov: false,
    dec: false
  })
  const [values, setValues] = useState({
    kegNama: '',
    kegRentang: '',
    kegGajiPml: '',
    kegGajiPcl: '',
    kegFungsi: '',
    kegDesk: '',
    kegKetua: ''
  })
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [bulan, setBulan] = useState({
    jan: false,
    feb: false,
    mar: false,
    apr: false,
    may: false,
    june: false,
    july: false,
    aug: false,
    sep: false,
    oct: false,
    nov: false,
    dec: false
  })

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
  ]

  const handleChangeBulan = event => {
    setBulan({
      ...bulan,
      [event.target.name]: event.target.checked
    })
    // console.log(bulan)
  }

  useEffect(() => {
    setBulan(prevBulan => {
      // nguubah semua checkbox bulan jadi uncheked
      const newBulan = {}
      Object.keys(prevBulan).map(key => {
        newBulan[key] = false
      })
      return newBulan
    })

    let tmp = values.kegRentang
    tmp === 59
      ? setBulan(prevBulan => {
          // nguubah semua checkbox bulan jadi uncheked
          const newBulan = {}
          Object.keys(prevBulan).map(key => {
            newBulan[key] = true
          })
          return newBulan
        })
      : 0
  }, [values.kegRentang])

  useEffect(() => {
    let tmp = values.kegRentang

    const bulanValues = Object.values(bulan) // pake object.values buat dapetin nilai dari masing masing key, kalo dapetin keynya ada apa aja pake object.key
    const bulanKeys = Object.keys(bulan)
    const bulanentries = Object.entries(bulan)

    const newBulanFalse = bulanentries.reduce((acc, apalah) => {
      if (!apalah[1]) {
        acc.push(apalah[0])
      }
      return acc
    }, [])

    const newBulanTrue = bulanentries.reduce((acc, apalah) => {
      if (apalah[1]) {
        acc.push(apalah[0])
      }
      return acc
    }, [])

    // newBulanFalse sekarang berisi daftar key bulan yang memiliki nilai false
    // console.log(newBulanFalse)

    const bulanTrueValues = bulanValues.filter(value => value === true)
    const jumlahBulanTrue = bulanTrueValues.length

    jumlahBulanTrue == 0
      ? setDisabled(prevState => {
          const newState = {}
          for (const key in prevState) {
            newState[key] = false
          }
          return newState
        })
      : tmp === 60 && jumlahBulanTrue < 4
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: false // Ubah nilai hanya untuk bulan November
          }))
        })
      : tmp === 61 && jumlahBulanTrue < 2
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: false // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0

    tmp === 62 && jumlahBulanTrue == 1
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: true // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0

    tmp === 60 && jumlahBulanTrue >= 4
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: true // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0

    tmp === 61 && jumlahBulanTrue >= 2
      ? newBulanFalse.map(idx => {
          setDisabled(prevState => ({
            ...prevState,
            [idx]: true // Ubah nilai hanya untuk bulan November
          }))
        })
      : 0
  }, [bulan])

  const handleDateChange = date => {
    setSelectedDate(date)
    // console.log(date)
  }
  const handleDateChangeE = date => {
    setSelectedDateE(date)
    // console.log(date)
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
    // console.log(values)
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
          bulan,
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
              <InputLabel id='demo-simple-select-helper-label'>Periode Waktu</InputLabel>
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
          <Grid item xs={12} md={12} sx={{ backgroundColor: 'primary' }}>
            {/* <Checkbox label='aselole' defaultChecked />
            <Checkbox label='aselole' defaultChecked color='secondary' />
            <Checkbox label='aselole' defaultChecked color='success' />
            <Checkbox label='aselole' defaultChecked color='default' />
            <Checkbox
              defaultChecked
              sx={{
                color: pink[800],
                '&.Mui-checked': {
                  color: pink[600]
                }
              }}
            /> */}

            <FormGroup row>
              <FormControlLabel
                value='Januari'
                control={
                  <Checkbox disabled={disabled.jan} checked={bulan.jan} onChange={handleChangeBulan} name='jan' />
                }
                label='Jan'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Februari'
                control={
                  <Checkbox disabled={disabled.feb} checked={bulan.feb} onChange={handleChangeBulan} name='feb' />
                }
                label='Feb'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Maret'
                control={
                  <Checkbox disabled={disabled.mar} checked={bulan.mar} onChange={handleChangeBulan} name='mar' />
                }
                label='Mar'
                labelPlacement='top'
              />
              <FormControlLabel
                value='April'
                control={
                  <Checkbox disabled={disabled.apr} checked={bulan.apr} onChange={handleChangeBulan} name='apr' />
                }
                label='Apr'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Mei'
                control={
                  <Checkbox disabled={disabled.may} checked={bulan.may} onChange={handleChangeBulan} name='may' />
                }
                label='May'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Juni'
                control={
                  <Checkbox disabled={disabled.june} checked={bulan.june} onChange={handleChangeBulan} name='june' />
                }
                label='June'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Juli'
                control={
                  <Checkbox disabled={disabled.july} checked={bulan.july} onChange={handleChangeBulan} name='july' />
                }
                label='July'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Agustus'
                control={
                  <Checkbox disabled={disabled.aug} checked={bulan.aug} onChange={handleChangeBulan} name='aug' />
                }
                label='Aug'
                labelPlacement='top'
              />
              <FormControlLabel
                value='September'
                control={
                  <Checkbox disabled={disabled.sep} checked={bulan.sep} onChange={handleChangeBulan} name='sep' />
                }
                label='Sep'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Oktober'
                control={
                  <Checkbox disabled={disabled.oct} checked={bulan.oct} onChange={handleChangeBulan} name='oct' />
                }
                label='Oct'
                labelPlacement='top'
              />
              <FormControlLabel
                value='November'
                control={
                  <Checkbox disabled={disabled.nov} checked={bulan.nov} onChange={handleChangeBulan} name='nov' />
                }
                label='Nov'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Desember'
                control={
                  <Checkbox disabled={disabled.dec} checked={bulan.dec} onChange={handleChangeBulan} name='dec' />
                }
                label='Dec'
                labelPlacement='top'
              />
            </FormGroup>
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
              label='Deskripsi Kegiatan'
              placeholder='Description'
              value={values.kegDesk}
              onChange={handleChange('kegDesk')}
              name='kegaitanDesk'
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
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
                customInput={<CustomInputStart />}
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
                customInput={<CustomInputEnd />}
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
          <Grid item xs={12} md={12} lg={12}>
            <Autocomplete
              multiple
              id='tags-filled'
              options={dataUser.map(option => option.name)}
              defaultValue={[dataUser[2].name]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
              }
              renderInput={params => (
                <TextField {...params} variant='filled' label='freeSolo' placeholder='Favorites' />
              )}
            />
          </Grid>
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
