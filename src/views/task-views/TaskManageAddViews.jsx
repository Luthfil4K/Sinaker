import * as React from 'react'
import { useState, useEffect } from 'react'

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
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { DataGrid } from '@mui/x-data-grid'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const TaskManageAddViews = propss => {
  const session = useSession()
  const [project, setProject] = useState(propss.data)
  const [show, setShow] = useState(0)
  const [group, setGroup] = useState(propss.dataPerusahaan)
  const [participants, setParticipants] = useState([])

  const [selectedDateE, setSelectedDateE] = useState(null)
  const [values, setValues] = useState({
    subKegNama: '',
    subKegJenis: '',
    subKegTarget: '',
    subKegUnitTarget: '',
    subKegJenisSample: '',
    subKegSamplePerusahaan: 1,
    subKegDl: '',
    subKegDesk: '',
    subKegProjectId: project.id,
    subKegUserId: project.projectLeaderId,
    subKegMonth: '',
    subKegYear: ''
  })

  useEffect(() => {
    // console.log(values.subKegJenis)
  }, [values.subKegJenis])

  useEffect(() => {
    let dataGroup = []
    group.map(dataG => {
      dataG.id == values.subKegSamplePerusahaan ? (dataGroup = dataG.Perusahaangroup) : []
    })
    setParticipants(dataGroup)
  }, [values])
  console.log(participants)

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

  const handleJenisSubKeg = eeee => {
    setValues(values => ({
      ...values,
      subKegJenis: eeee.target.value
    }))
  }

  const handleJenisSample = e => {
    setValues(values => ({
      ...values,
      subKegJenisSample: e.target.value
    }))
  }

  const handleSamplePerusahaan = e => {
    setValues(values => ({
      ...values,
      subKegSamplePerusahaan: e.target.value
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
          jenisSample: values.subKegJenis == 65 ? values.subKegJenisSample : 0,
          participants: rows,
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
            title: 'Tambah Sub Kegiatan Success',
            text: 'Tekan OK untuk lanjut',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/project-detail/${values.subKegProjectId}`))

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
  const jenisSample = [
    {
      id: 1,
      nama: 'Perusahaan'
    },
    {
      id: 0,
      nama: 'Non Perusahaan'
    }
  ]
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

  const [company, setCompany] = useState(
    propss.dataAllPerusahaan.map(perusahaan => {
      return {
        ...perusahaan,
        checked: false
      }
    })
  )

  // const rows = company.map(perusahaan => ({
  //   id: perusahaan.id,
  //   nama: perusahaan.nama,
  //   desa: perusahaan.desa,
  //   kecamatan: perusahaan.kecamatan,
  //   alamat: perusahaan.alamat,
  //   checked: perusahaan.checked
  // }))

  const [rows, setRows] = useState(
    company.map(perusahaan => ({
      id: perusahaan.id,
      nama: perusahaan.nama,
      desa: perusahaan.desa,
      kecamatan: perusahaan.kecamatan,
      alamat: perusahaan.alamat,
      checked: perusahaan.checked,
      realisasi: 0,
      target: 0,
      hasilPencacahan: '',
      tanggal: new Date()
    }))
  )

  useEffect(() => {
    // Saat participants berubah, periksa dan ubah status checked jika cocok
    const updatedRows = rows.map(row => {
      const participantExists = participants.some(participant => participant.perusahaan.id === row.id)
      return { ...row, checked: participantExists }
    })
    setRows(updatedRows)
  }, [participants])

  const columns = [
    {
      field: 'checked',
      sortable: true,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rows.filter(participant => participant.checked === true).length === rows.length}
              onChange={e => {
                let checked = e.target.checked
                setRows(
                  rows.map(participant => {
                    return {
                      ...participant,
                      checked: checked
                    }
                  })
                )
              }}
            />
          }
          label='All'
        />
      ),
      minWidth: 30,
      renderCell: params => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.value}
              onChange={e => {
                let checked = e.target.checked
                setRows(
                  rows.map(participant => {
                    if (participant.id === params.id) {
                      participant.checked = checked
                    }

                    return participant
                  })
                )
              }}
            />
          }
          label=''
        />
      ),
      align: 'left'
    },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Name</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'desa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Desa</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kecamatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'alamat',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Alamat</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    }
  ]

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
            {session.status === 'authenticated' && (session.data.uid === 99 || values.subKegJenis === 65) && (
              <>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-helper-label'>Jenis Sample</InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      label='Rentang Waktu'
                      onChange={handleJenisSample}
                      value={values.subKegJenisSample}
                    >
                      {jenisSample.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.nama}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

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
              <Divider mt={2}></Divider>
            </Grid>

            {session.status === 'authenticated' && (session.data.uid === 99 || values.subKegJenisSample === 1) && (
              <>
                <Grid item md={6} xs={12}>
                  <Typography variant={'h6'} mb={4}>
                    Sample Perusahaan
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-helper-label'>Group Perusahaan</InputLabel>
                    <Select
                      fullWidth
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select-helper'
                      label='Group Perusahaan'
                      onChange={handleSamplePerusahaan}
                      value={values.subKegSamplePerusahaan}
                    >
                      {group.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.nama}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%' }}>
                        <DataGrid
                          initialState={{
                            // filter: {
                            //   filterModel: {
                            //     items: [{ field: 'nama', value: 'antam' }]
                            //   }
                            // }
                            sorting: {
                              sortModel: [{ field: 'checked', sort: 'desc' }]
                            }
                          }}
                          rows={rows}
                          columns={columns}
                          pprioritySize={5}
                          rowsPerPpriorityOptions={[5]}
                          disableSelectionOnClick
                          experimentalFeatures={{ newEditingApi: true }}
                          sx={{
                            height: rows.length > 3 ? '70vh' : '45vh',
                            overflowY: 'auto',
                            width: '100%'
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
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
