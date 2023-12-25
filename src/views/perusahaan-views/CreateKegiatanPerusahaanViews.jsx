// react import
import { useState } from 'react'
import * as React from 'react'

// import xlsx
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx/xlsx.mjs'

// import TemplateExcel from './asd.pdf'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// ** Third Party Imports

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// Mui Import
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CardContent from '@mui/material/CardContent'

import MenuItem from '@mui/material/MenuItem'

import { DataGrid } from '@mui/x-data-grid'
import Link from '@mui/material/Link'
import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const CreateKegiatanPerusahaanViews = props => {
  const [participants, setParticipants] = useState(
    props.data.map(perusahaan => {
      return {
        ...perusahaan,
        checked: false
      }
    })
  )

  const [values, setValues] = useState({
    kegFungsi: '',
    kegNama: ''
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
    // console.log(values)
  }

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleKegiatanPerusahaan = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/perusahaan', {
          nama: values.kegNama,
          fungsi: values.kegFungsi,
          participants: participants
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Create Group Perusahaan Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`perusahaan-group-list`))

          setValues({
            kegNama: ''
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Group Perusahaan Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleKegiatanPerusahaanNew = async e => {
    e.preventDefault()

    try {
      while (true) {
        const res = await axios.post('/perusahaan/new', {
          nama: values.kegNama,
          fungsi: values.kegFungsi,
          participants: data
        })

        if (res.status === 201) {
          Swal.fire({
            title: 'Create Group Perusahaan Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`perusahaan-group-list`))

          setValues({
            kegNama: ''
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Group Perusahaan Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const [value, setValue] = useState('1')

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const rows = participants.map(perusahaan => ({
    id: perusahaan.id,
    nama: perusahaan.nama,
    desa: perusahaan.desa,
    kecamatan: perusahaan.kecamatan,
    alamat: perusahaan.alamat,
    checked: perusahaan.checked
  }))

  const columns = [
    {
      field: 'checked',
      sortable: true,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={participants.filter(participant => participant.checked === true).length === participants.length}
              onChange={e => {
                let checked = e.target.checked
                setParticipants(
                  participants.map(participant => {
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
                setParticipants(
                  participants.map(participant => {
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
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Perusahaan
        </Typography>
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

  const router = useRouter()

  // import excel,csv
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState({
    id: 1,
    kodeDesa: '',
    kodeKecamatan: '',
    namaDesa: '',
    namaKecamatan: '',
    namaPerusahaan: '',
    alamat: ''
  })
  // const [rowsNew, setRowsNew] = useState()

  const rowsNew = [
    {
      id: 1,
      namaPerusahaan: '',
      kodeDesa: '',
      kodeKecamatan: '',
      alamat: ''
    }
  ]

  const getExention = file => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)
    })
    return rows
  }

  const importExcel = e => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = event => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: 'binary' })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      // console.log(fileData)
      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head }))
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)

      setData(convertToJson(headers, fileData))
    }
    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert('Invalid file input, Select Excel, CSV file')
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  // console.log(data)
  const columnsNew = [
    {
      field: 'kodeDesa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Desa
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'kodeKecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Kecamatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'namaDesa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Desa
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'namaKecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Kecamatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },

    {
      field: 'namaPerusahaan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Perusahaan
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    },
    {
      field: 'alamat',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Alamat</Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]

  return (
    <Card>
      {/* <TableAddParticipant></TableAddParticipant> */}

      <TabContext value={value}>
        <TabList onChange={handleChangeTab} aria-label='card navigation example'>
          <Tab value='1' label='Input Perusahaan Baru' />
          <Tab value='2' label='Gunakan Data yang Sudah Ada' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0, height: 800, overflowY: 'scroll' }}>
            {' '}
            <form action='post' onSubmit={e => e.preventDefault()}>
              <Grid container spacing={4} sx={{ padding: '32px' }}>
                <Grid item xs={12}>
                  <Typography variant='h5'>Buat Kegiatan Perusahaan</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    value={values.kegNama}
                    onChange={handleChange('kegNama')}
                    multiline
                    size='small'
                    label='Nama Group Kegiatan Perusahaan'
                    name='namaKegiatan'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                      size='small'
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
                <Grid mt={5} mb={5} xs={12} md={12} style={{ paddingLeft: 18 }}>
                  {/* <input type='file' onChange={importExcel} /> */}
                  <input
                    style={{ display: 'none' }}
                    id='raised-button-file'
                    multiple
                    type='file'
                    onChange={importExcel}
                  />
                  <label htmlFor='raised-button-file'>
                    <Button variant='contained' component='span'>
                      Upload
                    </Button>
                  </label>
                  {/* <a id='unduhTemplate' style={{ display: 'none' }}></a>
                  <label htmlFor='unduhTemplate'>
                    <Button
                      variant='raised'
                      component='span'
                      
                      href='https://docs.google.com/spreadsheets/d/1cw4eBNZ5YZSgpJINsWdGosmgOLhlg61g/edit?usp=sharing&ouid=103239761030372990422&rtpof=true&sd=true'
                    >
                      template
                    </Button>
                  </label> */}
                  <Button
                    style={{ marginLeft: 30 }}
                    variant='contained'
                    target='_blank'
                    href='https://docs.google.com/spreadsheets/d/1drqslfn5KY6GhR5N2Bc_ZbyMJWg4IF5SDVo6umsBlho/edit?usp=sharing'
                  >
                    Template Table
                  </Button>

                  {/* <a href={TemplateExcel} download='Example-PDF-document' target='_blank' rel='noopener noreferrer'>
                    <button>Download .pdf file</button>
                  </a> */}
                </Grid>
                {/* <MaterialTable title='Olympic Data' data={data} columns={colDefs} /> */}
                <Grid item xs={12} md={12}>
                  <Box sx={{ width: '100%' }}>
                    <DataGrid
                      initialState={{
                        // filter: {
                        //   filterModel: {
                        //     items: [{ field: 'nama', value: 'antam' }]
                        //   }
                        // }
                        sorting: {
                          sortModel: [{ field: 'nama', sort: 'asc' }]
                        }
                      }}
                      rows={data}
                      columns={columnsNew}
                      pprioritySize={5}
                      // rowsPerPpriorityOptions={[5]}
                      // disableSelectionOnClick
                      // experimentalFeatures={{ newEditingApi: true }}
                      sx={{
                        height: rows.length > 3 ? '70vh' : '45vh',
                        overflowY: 'disabled',
                        width: '100%'
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item m={4} display={'flex'} justifyContent={'end'}>
                <Button size='small' type='submit' variant='contained' onClick={handleKegiatanPerusahaanNew}>
                  Buat Kegiatan Perusahaan
                </Button>
              </Grid>
            </form>
          </TabPanel>

          <TabPanel value='2' sx={{ p: 0, height: 770, overflowY: 'scroll' }}>
            <form action='post' onSubmit={e => e.preventDefault()}>
              <Grid container spacing={4} sx={{ padding: '32px' }}>
                <Grid item xs={12}>
                  <Typography variant='h5'>Buat Kegiatan Perusahaan</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    value={values.kegNama}
                    onChange={handleChange('kegNama')}
                    multiline
                    size='small'
                    label='Nama Group Kegiatan Perusahaan'
                    name='namaKegiatan'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                      size='small'
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
                <Divider></Divider>
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
                          sortModel: [{ field: 'nama', sort: 'asc' }]
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
                        overflowY: 'disabled',
                        width: '100%'
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item m={4} display={'flex'} justifyContent={'end'}>
                <Button size='small' type='submit' variant='contained' onClick={handleKegiatanPerusahaan}>
                  Buat Kegiatan Perusahaan
                </Button>
              </Grid>
            </form>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
