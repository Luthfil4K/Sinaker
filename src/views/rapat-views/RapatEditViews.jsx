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

// datepicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const RapatCreateViews = props => {
  const [selectedDate, setSelectedDate] = useState(new Date(props.dataRapatEdit.meetDate))
  const [selectedTimeS, setSelectedTimeS] = useState(new Date(props.dataRapatEdit.startTime))
  const [selectedTimeE, setSelectedTimeE] = useState(new Date(props.dataRapatEdit.endTime))
  const session = useSession()

  const [dataUser, setDataUser] = useState(props.dataUser)

  console.log(props.dataRapatEdit)

  const aaa = props.dataPesertaRapat.map(a => {
    return a.user.name
  })
  const [isiAll, setIsiAll] = useState('0')

  const [values, setValues] = useState({
    rapatId: props.dataRapatEdit.id,
    namaRapat: props.dataRapatEdit.namaRapat,
    nomor: props.dataRapatEdit.nomor,
    perihal: props.dataRapatEdit.perihal,
    lampiran: props.dataRapatEdit.lampiran,
    ditujukan: props.dataRapatEdit.ditujukan,
    tempatRapat: props.dataRapatEdit.tempatRapat,
    deskRapat: props.dataRapatEdit.description,
    pesertaRapat: 7,

    kegAnggotaId: '',
    kegAnggota: aaa
  })

  console.log(values.kegAnggotaId)

  let button
  button = <></>

  const handleTempatRapat = e => {
    setValues(values => ({
      ...values,
      tempatRapat: e.target.value
    }))
  }

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
  const handleTimeChangeS = date => {
    setSelectedTimeS(date)
  }
  const handleTimeChangeE = date => {
    setSelectedTimeE(date)
  }

  // buat nyimpen di [values] dari input pilih tim kerja sama anggota tim (intinya handle tim dan anggotanya)

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

  // cek input isi all
  useEffect(() => {
    const allFilled = Object.values(values).every(
      value =>
        (typeof value === 'string' && value.trim() !== '') ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'number' && value !== null)
    )
    setIsiAll(allFilled ? '1' : '0')
  }, [values])

  const handleEditRapat = async e => {
    e.preventDefault()

    try {
      if (isiAll == '1') {
        const res = await axios.put(`/rapat-edit/${values.rapatId}`, {
          namaRapat: values.namaRapat,
          meetDate: selectedDate,
          startTime: selectedTimeS,
          endTime: selectedTimeE,
          duration: selectedTimeE - selectedTimeS,
          tempatRapat: values.tempatRapat,
          description: values.deskRapat,
          createdById: session.data.uid,
          pesertaRapatId: values.kegAnggotaId,
          nomor: values.nomor,
          lampiran: values.lampiran,
          perihal: values.perihal,
          ditujukan: values.ditujukan
        })

        if (res.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil disimpan',
            showConfirmButton: false,
            timer: 1000,
            width: 300
          }).then(router.push(`/rapat-detail/${props.dataRapatEdit.id}`))
        }
      } else {
        Swal.fire({
          title: 'Form belum lengkap',
          text: 'Pastika semua field telah terisi',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal Disimpan',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }
  const handleCreate = e => {
    Swal.fire({
      text: 'Edit Rapat?',
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
  const CustomInputDateStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Hari/Tanggal Rapat' autoComplete='on' />
  })

  const CustomInputTimeStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Waktu Mulai' autoComplete='off' />
  })

  const CustomInputTimeEnd = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Waktu Selesai' autoComplete='off' />
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
          <Typography variant='h5'>Ajukan Rapat</Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            value={values.namaRapat}
            onChange={handleChange('namaRapat')}
            fullWidth
            multiline
            label='Tema Rapat'
            placeholder='Tema Rapat'
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            value={values.nomor}
            onChange={handleChange('nomor')}
            fullWidth
            multiline
            label='Nomor Surat'
            placeholder='Nomor Surat'
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            value={values.lampiran}
            onChange={handleChange('lampiran')}
            fullWidth
            multiline
            label='Lampiran'
            placeholder='Lampiran'
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            value={values.perihal}
            onChange={handleChange('perihal')}
            fullWidth
            multiline
            label='Perihal'
            placeholder='Perihal'
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            value={values.ditujukan}
            onChange={handleChange('ditujukan')}
            fullWidth
            multiline
            label='Ditujukan kepada'
            placeholder='Seluruh Pegawai BPS Kabupaten Bogor'
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={4}>
          <DatePickerWrapper>
            <DatePicker
              sx={{ width: 1000 }}
              selected={selectedDate}
              showYearDropdown
              showMonthDropdown
              placeholderText='Hari/Tanggal Rapat'
              value={selectedDate}
              onChange={handleDateChange}
              dateFormat='dd/MM/yyyy'
              className='custom-datepicker'
              customInput={<CustomInputDateStart />}
              name='tanggalMulai'
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedTimeS}
              sx={{ width: 1000 }}
              showTimeSelect
              showTimeSelectOnly
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='HH:mm'
              value={selectedTimeS}
              onChange={handleTimeChangeS}
              className='custom-datepicker'
              customInput={<CustomInputTimeStart />}
              name='tanggalBerakhir'
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedTimeE}
              sx={{ width: 1000 }}
              showTimeSelect
              showTimeSelectOnly
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='HH:mm'
              placeholderText='Waktu Selesai'
              value={selectedTimeE}
              onChange={handleTimeChangeE}
              className='custom-datepicker'
              customInput={<CustomInputTimeEnd />}
              name='tanggalBerakhir'
            />
          </DatePickerWrapper>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Meeting Place</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              label='Meeting Place'
              onChange={handleTempatRapat}
              value={values.tempatRapat}
            >
              <MenuItem key={''} value={''}>
                {''}
              </MenuItem>
              <MenuItem value={'Ruang Kepala'}>Ruang Kepala</MenuItem>
              <MenuItem value={'Aula BPS Kabupaten Bogor'}>Aula BPS Kabupaten Bogor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={values.deskRapat}
            onChange={handleChange('deskRapat')}
            multiline
            minRows={3}
            label='Isi surat'
            placeholder='Isi surat'
          />
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
          <Button onClick={handleEditRapat} size='medium' type='submit' variant='contained'>
            Simpan
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RapatCreateViews
