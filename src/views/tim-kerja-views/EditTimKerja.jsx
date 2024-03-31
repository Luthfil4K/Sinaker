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

import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'

import { DataGrid } from '@mui/x-data-grid'
import TableAddParticipant from 'src/views/tables/TableAddParticipant'
import { number } from 'mathjs'

const statusObj = {
  0: { color: 'error', status: 'Overload' },
  1: { color: 'success', status: 'Available' }
}
const jenisFungsi = {
  2: { bagFungsi: 'Bagian Umum', color: 'warning' },
  3: { bagFungsi: 'Statistik Sosial', color: 'warning' },
  4: { bagFungsi: 'Statistik Produksi', color: 'warning' },
  5: { bagFungsi: 'Statistik Distribusi', color: 'warning' },
  6: { bagFungsi: 'Neraca Wilayah dan Analisis Statistik', color: 'warning' },
  7: { bagFungsi: 'Integrasi Pengolahan dan Diseminasi Statistik', color: 'warning' }
}

const CreateKegiatanPerusahaanViews = props => {
  const [timMember, setTimMember] = useState(props.data.timKerjaPegawai)

  const [values, setValues] = useState({
    idGroup: props.data.id,
    kegFungsi: props.data.fungsi,
    kegNama: props.data.nama,
    kegKetua: props.data.ketuaTim
  })

  const [participants, setParticipants] = useState(
    props.dataUser.map(users => {
      if (timMember.some(elem => elem.userId === users.id)) {
        return { ...users, checked: true }
      } else {
        return { ...users, checked: false }
      }
    })
  )

  const [tpp, setTpp] = useState(props.dataTpp)

  const handlePJ = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegKetua: event.target.value // Perbarui nilai kegRentang
    }))
    participants.map(users => {
      if (users.id === event.target.value) {
        return { ...users, checked: true }
      }
    })
  }

  const rows = participants.map(row => {
    const gajiBulanIni = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.task.duedate)
        const currentDate = new Date()
        return (
          tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
        )
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const gajiBulanSblm = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.task.duedate)
        const currentDate = new Date()
        return currentDate.getMonth != 0
          ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
              tppDueDate.getMonth() === currentDate.getMonth() - 1
          : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const gajiBulanDepan = tpp
      .filter(tppRow => tppRow.pmlId === row.id)
      .filter(tppRow => {
        const tppDueDate = new Date(tppRow.task.duedate)
        const currentDate = new Date()
        return currentDate.getMonth != 11
          ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
              tppDueDate.getMonth() === currentDate.getMonth() + 1
          : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
      })
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const bebanKerja = row.beban_kerja_pegawai[0].bebanKerja
    const nilaiBebanKerja = number(bebanKerja).toFixed(2)
    const jamKerja = row.pekerjaan_harian.reduce((total, item) => total + item.durasi, 0)

    return {
      id: row.id,
      nama: row.name,
      fungsi: row.fungsi,
      jumlahKegiatan: row.TaskOrganik.length,
      jumlahTimKerja: row.TimKerjaPegawai.length,
      jumlahJamKerja: jamKerja,
      // gajiBulanIni,
      // gajiBulanSblm,
      // gajiBulanDepan,
      bebanKerja: nilaiBebanKerja,
      // over: gajiBulanIni,
      checked: row.checked
    }
  })

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', minWidth: 40 },
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
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200,
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/pegawai-detail-gaji/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.nama}
          </Typography>
        </Link>
      )
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].status}
            color={statusObj[params.row.jumlahKegiatan < 15 ? 1 : 0].color}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              width: 100,
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        </>
      ),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Status Bulan Ini
        </Typography>
      ),
      type: 'string',
      width: 140
    },

    // {
    //   field: 'gajiBulanIni',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Ini
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Ini ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    // {
    //   field: 'gajiBulanSblm',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Sebelumnya
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Sebelumnya ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    // {
    //   field: 'gajiBulanDepan',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Gaji Bulan Depan
    //     </Typography>
    //   ),
    //   headerName: 'Gaji Bulan Depan ',
    //   type: 'string',
    //   width: 140,
    //   renderCell: params => (
    //     <>
    //       <Typography
    //         color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
    //         sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
    //       >
    //         {`Rp ${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
    //       </Typography>
    //     </>
    //   )
    // },
    {
      field: 'fungsi',
      headerName: 'Fungsi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Fungsi</Typography>
      ),

      minWidth: 170,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {' '}
          {jenisFungsi[parseInt(params.row.fungsi)].bagFungsi}
        </Typography>
      )
    },
    {
      field: 'jumlahKegiatan',
      headerName: 'Jumlah Kegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Pekerjaan
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'jumlahJamKerja',
      headerName: 'Jam Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jam Kerja
        </Typography>
      ),
      minWidth: 150
    },
    {
      field: 'jumlahTimKerja',
      headerName: 'Jumlah Tim Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Tim Kerja
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'bebanKerja',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Beban Kerja
        </Typography>
      ),

      minWidth: 150
    }
  ]

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleFungsiChange = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      kegFungsi: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleKegiatanPerusahaan = async e => {
    e.preventDefault()
    const ketuadanParticipants = participants.map(row => {
      if (row.id === values.kegKetua) {
        if (!row.checked) {
          return { ...row, checked: true }
        }
      }
      return { ...row }
    })

    const ketuaChange = 0
    if (values.kegKetua != props.data.ketuaTim) {
      ketuaChange = 1
    }

    const namaChange = 0
    if (values.kegNama != props.data.nama) {
      namaChange = 1
    }

    const timBaru = ketuadanParticipants.filter(user => user.checked)
    const daftarTambah = timBaru.filter(item2 => !timMember.some(item1 => item1.userId === item2.id))
    const daftarHapus = timMember.filter(item1 => !timBaru.some(item2 => item2.id === item1.userId))

    try {
      while (true) {
        const res = await axios.put(`/tim-kerja/${values.idGroup}`, {
          namaChange: namaChange,
          ketuaChange: ketuaChange,
          nama: values.kegNama,
          ketuaTim: values.kegKetua,
          daftarTambah: daftarTambah,
          daftarHapus: daftarHapus
        })

        if (res.status === 201) {
          // Swal.fire({
          //   title: 'Ubah Tim Kerja Success',
          //   text: 'Press OK to continue',
          //   icon: 'success',
          //   confirmButtonColor: '#68B92E',
          //   confirmButtonText: 'OK'
          // }).then(router.push(`/tim-kerja-detail/${values.idGroup}`))
          Swal.fire({
            title: 'Ubah Tim Kerja Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonColor: '#68B92E',
            confirmButtonText: 'OK'
          }).then(router.push(`/tim-kerja-list`))

          setValues({
            kegNama: '',
            kegKetua: 0
          })
        }

        break
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Tim Kerja Failed',
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
            <Typography variant='h5'>Ubah Tim Kerja</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              value={values.kegNama}
              onChange={handleChange('kegNama')}
              multiline
              label='Nama Tim Kerja'
              name='namaKegiatan'
            />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <Typography variant='h6' sx={{ py: '5px' }}></Typography>

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
                {participants.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Divider></Divider>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rowHeight={65}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'checked', sort: 'desc' }]
                  }
                }}
                rows={rows}
                columns={columns}
                sx={{
                  height: rows.length > 3 ? '80vh' : '45vh',
                  // overflowY: 'auto',
                  width: '100%'
                }}
              />
            </Box>
          </Grid>
        </Grid>
        {/* <TableAddParticipant></TableAddParticipant> */}
        <Divider sx={{ margin: 0 }} />
        <Grid item m={4} display={'flex'} justifyContent={'end'}>
          <Button size='medium' type='submit' variant='contained' onClick={handleKegiatanPerusahaan}>
            Ubah Tim Kerja
          </Button>
        </Grid>
      </form>
    </Card>
  )
}

export default CreateKegiatanPerusahaanViews
