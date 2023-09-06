// react import
import { useState } from 'react'

// swall
import Swal from 'sweetalert2'

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

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const CreateProjectViews = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateE, setSelectedDateE] = useState(null)
  const router = useRouter()

  const handleCreate = () => {
    Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Periksa kembali untuk memastikan tidak ada yang salah',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Buat Kegiatan!'
    }).then(result => {
      if (result.isConfirmed) {
        router.push('/project-list')
      } else {
        router.push('/create-project')
      }
    })
  }

  const projectJenis = ['Tahunan', 'Semesteran', 'Triwulanan', 'Bulanan']
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
      <Grid container spacing={4} sx={{ padding: '32px' }}>
        <Grid item xs={12}>
          <Typography variant='h5'>Buat Kegiatan</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={projectJenis}
            renderInput={params => <TextField {...params} label='Rentang Kegiatan' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={projectRutin}
            renderInput={params => <TextField {...params} label='Project Name' />}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          {/* <DatePicker
            fullWidth
            selected={selectedDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='Tanggal Mulai'
            onChange={setSelectedDate}
            dateFormat='dd/MM/yyyy'
            className='custom-datepicker'
          /> */}
          <TextField fullWidth multiline label='Tanggal Dimulai' placeholder='Tanggal Dimulai' />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          {/* <DatePicker
            fullWidth
            selected={selectedDateE}
            showYearDropdown
            showMonthDropdown
            placeholderText='Tanggal Berakhir'
            onChange={setSelectedDateE}
            dateFormat='dd/MM/yyyy'
            className='custom-datepicker'
          /> */}
          <TextField fullWidth multiline label='Tanggal Berakhir' placeholder='Tanggal Berakhir' />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={jenisKegiatan}
            renderInput={params => <TextField {...params} label='Jenis Kegiatan' />}
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={3} label='Project Description' placeholder='Description' />
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant='h6' sx={{ py: '5px' }}>
            Penanggung Jawab Kegiatan
          </Typography>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={pegawai}
            renderInput={params => <TextField {...params} label=' Penanggung Jawab Kegiatan' />}
          />
        </Grid>
        <Grid item xs={12} md={3} lg={3}></Grid>
      </Grid>
      <TableAddParticipant></TableAddParticipant>
      <Divider sx={{ margin: 0 }} />
      <Button onClick={handleCreate} size='medium' type='submit' variant='contained'>
        Create Project
      </Button>
    </Card>
  )
}

export default CreateProjectViews
