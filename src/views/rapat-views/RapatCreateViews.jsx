// react import
import { useState, forwardRef, useEffect } from 'react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// usesession
import { useSession } from 'next-auth/react'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

// datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const RapatCreateViews = props => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateE, setSelectedDateE] = useState(new Date())
  const session = useSession()
  console.log(session)
  const [timKerja, setTimKerja] = useState(props.dataTim)
  const [dataUser, setDataUser] = useState(props.data)
  const [values, setValues] = useState({
    namaRapat: '',
    tempatRapat: '',
    deskRapat: '-',
    pesertaRapat: 7,
    kegTim: '',
    kegAnggotaId: '',
    kegAnggota: [dataUser[3].name, dataUser[1].name],
    kegKetuaId: ''
  })

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegTim: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleDateChange = date => {
    setSelectedDate(date)
  }
  const handleDateChangeE = date => {
    setSelectedDateE(date)
  }

  // buat nyimpen di [values] dari input pilih tim kerja sama anggota tim (intinya handle tim dan anggotanya)
  useEffect(() => {
    const dataAnggota = {}
    const dataAnggotaId = []
    const ketuaTimId = 0

    timKerja.map(data => {
      data.id === values.kegTim ? (dataAnggota = data.timKerjaPegawai) : 0
    })

    timKerja.map(data => {
      data.id === values.kegTim ? (ketuaTimId = data.ketuaTim) : 0
    })

    if (Object.keys(dataAnggota).length > 0) {
      dataAnggota.map(member => {
        dataAnggotaId.push(member.userId)
      })
    }

    const userNames = dataUser
      .map(pengguna => (dataAnggotaId.includes(parseInt(pengguna.id)) ? pengguna.name : null))
      .filter(id => id !== null)

    // const userIds = dataUser
    //   .map(pengguna => (dataAnggotaId.includes(parseInt(pengguna.id)) ? pengguna.id : null))
    //   .filter(id => id !== null)

    setValues({ ...values, kegAnggota: userNames, kegKetuaId: ketuaTimId })
  }, [values.kegTim])

  // masih nyambung sama atas, input autocomplete cuma handle berdasar dropdown tim kerja,
  // disini diatur lagi kalo misal ada inputan pegawai lain di luar anggota tim
  useEffect(() => {
    const tmpId = []
    const testId = dataUser.map(itemB => {
      // Periksa apakah nama pada itemB ada di arrayA
      if (values.kegAnggota.includes(itemB.name)) {
        // klo ad push ngab
        tmpId.push(itemB.id)
      }
    })

    setValues({ ...values, kegAnggotaId: tmpId })
  }, [values.kegAnggota])
  const router = useRouter()

  useEffect(() => {
    console.log(selectedDateE - selectedDate)
  }, [values])
  const handleCreateRapat = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/rapat', {
          namaRapat: values.namaRapat,
          startDate: selectedDate,
          endDate: selectedDateE,
          duration: selectedDateE - selectedDate,
          tempatRapat: values.tempatRapat,
          description: values.deskRapat,
          createdById: session.data.uid,
          pesertaRapatId: values.kegAnggotaId
        })

        if (res.status === 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rapat Berhasil Dibuat',
            showConfirmButton: false,
            timer: 1000,
            width: 300
          }).then(router.push('/rapat-create'))

          setValues({
            namaRapat: '',
            tempatRapat: '',
            deskRapat: '-',
            pesertaRapat: 7,
            kegTim: '',
            kegAnggotaId: '',
            kegAnggota: [dataUser[3].name, dataUser[1].name],
            kegKetuaId: ''
          })

          setSelectedDate(new Date())
          setSelectedDateE(new Date())
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Rapat Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }
  const handleCreate = e => {
    Swal.fire({
      text: 'Buat Rapat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/project-list')
      } else {
        router.push('/create-project')
      }
    })
  }
  const CustomInputStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='DD-MM-YYYY, HH:MM' autoComplete='on' />
  })

  const CustomInputEnd = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='DD-MM-YYYY, HH:MM' autoComplete='off' />
  })

  const projectRutin = [
    'PENGELOLAAN WEB',
    'SURVEI IBS BULANAN',
    'SURVEI IBS TAHUNAN',
    'SURVEI',
    'SAKERNAS SEMESTERAN',
    'SAKERNAS TAHUNAN'
  ]
  const jenisKegiatan = ['Pengolahan', 'Pelaksanaan', 'evaluasi', 'persiapan']

  const pegawai = ['Pegawai1', 'Pegawai2', 'Pegawai3', 'Pegawai4']
  return (
    <Card>
      <Grid container spacing={5} sx={{ padding: '32px' }}>
        <Grid item xs={12}>
          <Typography variant='h5'>Buat Rapat</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            value={values.namaRapat}
            onChange={handleChange('namaRapat')}
            fullWidth
            multiline
            label='Meeting Name'
            placeholder='Meeting Name'
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <DatePickerWrapper>
            <DatePicker
              sx={{ width: 1000 }}
              selected={selectedDate}
              showYearDropdown
              showMonthDropdown
              showTimeSelect
              placeholderText='DD-MM-YYYY, HH:MM'
              value={selectedDate}
              onChange={handleDateChange}
              dateFormat='Pp'
              className='custom-datepicker'
              customInput={<CustomInputStart />}
              name='tanggalMulai'
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedDateE}
              sx={{ width: 1000 }}
              showYearDropdown
              showMonthDropdown
              showTimeSelect
              placeholderText='DD-MM-YYYY, HH:MMr'
              value={selectedDateE}
              onChange={handleDateChangeE}
              dateFormat='Pp'
              className='custom-datepicker'
              customInput={<CustomInputEnd />}
              name='tanggalBerakhir'
            />
          </DatePickerWrapper>
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={values.tempatRapat}
            onChange={handleChange('tempatRapat')}
            fullWidth
            multiline
            label='Meeting Place'
            placeholder='Meeting Place'
          />
          {/* <FormControl fullWidth>
            <InputLabel id='link'>Meeting Place</InputLabel>
            <Select labelId='Link' id='demo-simple-select' label='Meeting Place'>
              <MenuItem value={10}>Link 1</MenuItem>
              <MenuItem value={20}>Link 2</MenuItem>
              <MenuItem value={30}>Link 3</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={values.deskRapat}
            onChange={handleChange('deskRapat')}
            multiline
            minRows={3}
            label='Deskripsi Rapat'
            placeholder='Description'
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {/* <Typography variant='h6' sx={{ py: '5px' }}>
              Penanggung Jawab Kegiatan
            </Typography> */}

          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Peserta Rapat</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={values.kegTim}
              onChange={handlePJ}
              label='Peserta Rapat'
              name='pesertaRapat'
            >
              {timKerja.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Autocomplete
            multiple
            // options={dataUser}
            id='tags-filled'
            value={values.kegAnggota}
            // options={dataPengguna}
            options={dataUser.map(data => data.name)}
            onChange={(event, newValue) => {
              setValues({ ...values, kegAnggota: newValue })
            }}
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
            }
            renderInput={params => (
              <TextField {...params} variant='outlined' label='Peserta Rapat' placeholder='Tambah Peserta Rapat' />
            )}
          />
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item xs={12} md={3} lg={3}>
          <Button onClick={handleCreateRapat} size='medium' type='submit' variant='contained'>
            Buat Rapat
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RapatCreateViews
