import * as React from 'react'
import { useState, useEffect, forwardRef } from 'react'

// import xlsx
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx/xlsx.mjs'

// import TemplateExcel from './asd.pdf'

const EXTENSIONS = ['xlsx', 'xls', 'csv']

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// mui
import Chip from '@mui/material/Chip'
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
  const CustomInputStart = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Berakhir' autoComplete='on' />
  })

  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const session = useSession()
  const [project, setProject] = useState(propss.data)
  const [timkerja, setTimkerja] = useState(propss.dataTimKerja)
  const [group, setGroup] = useState(propss.dataPerusahaan)
  const [participants, setParticipants] = useState([])
  const [participantsTimKerja, setParticipantsTimKerja] = useState([])
  const [tpp, setTpp] = useState(propss.dataTaskPerusahaan)
  console.log(project.fungsi)

  const [selectedDateE, setSelectedDateE] = useState(null)
  const [values, setValues] = useState({
    subKegNama: '',
    subKegJenis: '',
    subKegTarget: '',
    subKegUnitTarget: '',
    subKegJenisSample: '',
    subKegSamplePerusahaan: '',
    subKegSampleTimKerja: '',
    subKegDl: '',
    subKegDesk: '',
    subKegProjectId: project.id,
    subKegProjectFungsi: project.fungsi,
    subKegUserId: project.projectLeaderId,
    subKegMonth: '',
    subKegYear: ''
  })

  useEffect(() => {
    let dataGroup = []
    group.map(dataG => {
      dataG.id == values.subKegSamplePerusahaan ? (dataGroup = dataG.Perusahaangroup) : []
    })
    setParticipants(dataGroup)
  }, [values])
  // console.log(participants)

  useEffect(() => {
    let dataTimkerja = []
    timkerja.map(dataG => {
      dataG.id == values.subKegSampleTimKerja ? (dataTimkerja = dataG.timKerjaPegawai) : []
    })
    setParticipantsTimKerja(dataTimkerja)
  }, [values])

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

  const handleSampleTimKerja = e => {
    setValues(values => ({
      ...values,
      subKegSampleTimKerja: e.target.value
    }))
  }

  // useEffect(() => {
  //   values.subKegJenisSample === 0
  //     ? rows.map(row => {
  //         setRows(values => ({
  //           ...values,
  //           checked: false
  //         }))
  //       })
  //     : console.log('a')
  // }, [values])

  // intinya disini pas mau add ke db, value-value
  const handleAddTask = async e => {
    e.preventDefault()
    let dataPCL = []
    rowsM.map(a => {
      if (a.checked) {
        dataPCL.push(a)
      }
    })

    let pegawaiOrganik = []
    rowsO.map(a => {
      if (a.checked) {
        console.log('')
        pegawaiOrganik.push(a)
      }
    })

    try {
      while (true) {
        const res = await axios.post('/task', {
          title: values.subKegNama,
          jenisKeg: values.subKegJenis,
          target: parseInt(values.subKegTarget),
          unitTarget: values.subKegUnitTarget,
          duedate: values.subKegDl ? values.subKegDl : new Date(),
          bulan: new Date(values.subKegDl).getMonth(),
          jenisSample: values.subKegJenis == 65 || values.subKegJenis == 67 ? values.subKegJenisSample : 0,
          participants: rows,
          peserta: dataPCL,
          persertaOrganik: pegawaiOrganik,
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
        title: 'Tambah Sub Kegiatan Gagal',
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
    // {
    //   id: 64,
    //   nama: 'Persiapan'
    // },
    {
      id: 65,
      nama: 'Lapangan'
    },

    {
      id: 67,
      nama: 'Pengolahan '
    },
    // {
    //   id: 68,
    //   nama: 'Evaluasi '
    // },
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

  const [dataMitra, setDataMitra] = useState(
    propss.dataMitra.map(meetra => {
      return {
        ...meetra,
        checked: false
      }
    })
  )

  const [dataOrganik, setDataOrganik] = useState(
    propss.dataOrganik.map(meetra => {
      return {
        ...meetra,
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
      namaDesa: perusahaan.namaDesa,
      kecamatan: perusahaan.kecamatan,
      namaKec: perusahaan.namaKec,
      alamat: perusahaan.alamat,
      checked: perusahaan.checked,
      realisasi: 0,
      target: 0,
      hasilPencacahan: '',
      tanggal: new Date()
    }))
  )

  const [rowsM, setRowsM] = useState(
    dataMitra.map(row => {
      const gajiBulanIniPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanIniPML = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

      // Gabungkan total gaji dari kedua kasus
      const gajiBulanIni = gajiBulanIniPCL + gajiBulanIniPML

      const gajiBulanSblmPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanSblmPML = tpp
        .filter(tppRow => tppRow.pmlId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)
      const gajiBulanSblm = gajiBulanSblmPML + gajiBulanSblmPCL

      const gajiBulanDepanPCL = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanDepanPML = tpp
        .filter(tppRow => tppRow.pclId === row.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const gajiBulanDepan = gajiBulanDepanPCL + gajiBulanDepanPML

      return {
        id: row.id,
        nik: row.nik.toString(),
        name: row.name,
        gajiBulanIni,
        gajiBulanSblm,
        gajiBulanDepan,
        over: gajiBulanIni
      }
    })
  )

  const [rowsO, setRowsO] = useState(
    dataOrganik.map(row => {
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

      return {
        id: row.id,
        nip: row.nip.toString(),
        name: row.name,
        gajiBulanIni,
        gajiBulanSblm,
        gajiBulanDepan,
        over: gajiBulanIni
      }
    })
  )

  useEffect(() => {
    // Saat participants berubah, periksa dan ubah status checked jika cocok
    const updatedRows = rows.map(row => {
      const participantExists = participants.some(participant => participant.perusahaan.id === row.id)
      return { ...row, checked: participantExists }
    })
    setRows(updatedRows)
  }, [participants])

  useEffect(() => {
    // Saat participants berubah, periksa dan ubah status checked jika cocok
    const updatedRowsO = rowsO.map(row => {
      const participantTimKerjaExists = participantsTimKerja.some(participant => participant.userId_fkey.id === row.id)
      return { ...row, checked: participantTimKerjaExists }
    })
    setRowsO(updatedRowsO)
  }, [participantsTimKerja])

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

  const columnsM = [
    {
      field: 'checked',
      sortable: true,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rowsM.filter(participant => participant.checked === true).length === rowsM.length}
              onChange={e => {
                let checked = e.target.checked
                setRowsM(
                  rowsM.map(participant => {
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
                setRowsM(
                  rowsM.map(participant => {
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
      field: 'nik',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIK</Typography>
      ),
      headerName: 'NIK',
      width: 200
    },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.gajiBulanIni < 3000000 ? 1 : 0].status}
            color={statusObj[params.row.gajiBulanIni < 3000000 ? 1 : 0].color}
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

    {
      field: 'gajiBulanIni',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Ini
        </Typography>
      ),
      headerName: 'Gaji Bulan Ini ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanSblm',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Sebelumnya
        </Typography>
      ),
      headerName: 'Gaji Bulan Sebelumnya ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanDepan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Depan
        </Typography>
      ),
      headerName: 'Gaji Bulan Depan ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    }
  ]

  const columnsO = [
    {
      field: 'checked',
      sortable: true,
      headerName: 'List',
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              checked={rowsO.filter(participant => participant.checked === true).length === rowsO.length}
              onChange={e => {
                let checked = e.target.checked
                setRowsO(
                  rowsO.map(participant => {
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
                setRowsO(
                  rowsO.map(participant => {
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
      field: 'nip',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>NIP</Typography>
      ),
      headerName: 'NIP',
      width: 200
    },
    {
      field: 'name',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.gajiBulanIni < 3000000 ? 1 : 0].status}
            color={statusObj[params.row.gajiBulanIni < 3000000 ? 1 : 0].color}
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

    {
      field: 'gajiBulanIni',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Ini
        </Typography>
      ),
      headerName: 'Gaji Bulan Ini ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanSblm',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Sebelumnya
        </Typography>
      ),
      headerName: 'Gaji Bulan Sebelumnya ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanDepan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Gaji Bulan Depan
        </Typography>
      ),
      headerName: 'Gaji Bulan Depan ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp ${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    }
  ]

  const columnsRT = [
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
      field: 'nomorBlokSensus',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nomor Blok Sensus
        </Typography>
      ),
      minWidth: 200,
      flex: 1
    }
  ]
  // ini kebawah buat keperluan import excel,csv
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState({
    id: 1,
    kodeDesa: '',
    kodeKecamatan: '',
    namaDesa: '',
    namaKecamatan: '',
    namaPerusahaan: ''
  })

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
  // sampe sini import excel kelar
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
            required
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
                  <MenuItem key={''} value={''}>
                    {''}
                  </MenuItem>
                  {jenisSubKegiatan.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {session.status === 'authenticated' &&
              (session.data.uid === 9988 || values.subKegJenis === 65 || values.subKegJenis === 67) && (
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
                        <MenuItem key={''} value={''}>
                          {''}
                        </MenuItem>
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
                label='Dokumen/Responden'
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
                  customInput={<CustomInputStart />}
                  dateFormat='dd/MM/yyyy'
                  className='custom-datepicker'
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item md={12} xs={12}>
              {' '}
              {/* <TextField
                name='deskripsiSubKeg'
                value={values.subKegDesk}
                onChange={handleChange('subKegDesk')}
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi Sub Kegiatan'
                placeholder='Deskripsi Sub Kegiatan'
              /> */}
              <Divider mt={2}></Divider>
            </Grid>

            {session.status === 'authenticated' && (session.data.uid === 999 || values.subKegJenisSample === 1) && (
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
                      <MenuItem key={''} value={''}>
                        {''}
                      </MenuItem>
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
                            // overflowY: 'auto',
                            width: '100%'
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {session.status === 'authenticated' && (session.data.uid === 999 || values.subKegJenisSample === 0) && (
              <>
                <Grid item md={6} xs={12}>
                  <Typography variant={'h6'} mb={4}>
                    Sample Perusahaan
                  </Typography>
                </Grid>
                <Grid mt={2} mb={2} xs={12} md={12} style={{ paddingLeft: 18 }}>
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
                  <Button
                    style={{ marginLeft: 30 }}
                    variant='contained'
                    target='_blank'
                    href='https://docs.google.com/spreadsheets/d/1drqslfn5KY6GhR5N2Bc_ZbyMJWg4IF5SDVo6umsBlho/edit?usp=sharing'
                  >
                    Template Table
                  </Button>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%' }}>
                        <DataGrid
                          initialState={{
                            sorting: {
                              sortModel: [{ field: 'nama', sort: 'asc' }]
                            }
                          }}
                          rows={data}
                          columns={columnsRT}
                          pprioritySize={5}
                          sx={{
                            height: rows.length > 3 ? '70vh' : '45vh',
                            overflowY: 'disabled',
                            width: '100%'
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {session.status === 'authenticated' &&
              (session.data.uid === 9988 || values.subKegJenis === 65 || values.subKegJenis === 67) && (
                <>
                  <Grid item md={6} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Mitra
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                          <DataGrid
                            initialState={{
                              sorting: {
                                sortModel: [{ field: 'checked', sort: 'desc' }]
                              }
                            }}
                            rows={rowsM}
                            columns={columnsM}
                            pprioritySize={5}
                            rowsPerPpriorityOptions={[5]}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            sx={{
                              height: rowsM.length > 3 ? '70vh' : '45vh',
                              width: '100%'
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Tim Kerja
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-helper-label'>Tim Kerja</InputLabel>
                      <Select
                        fullWidth
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        label='Group Perusahaan'
                        onChange={handleSampleTimKerja}
                        value={values.subKegSampleTimKerja}
                      >
                        <MenuItem key={''} value={''}>
                          {''}
                        </MenuItem>
                        {timkerja.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography variant={'h6'} mb={4}>
                      Organik
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                          <DataGrid
                            initialState={{
                              sorting: {
                                sortModel: [{ field: 'checked', sort: 'desc' }]
                              }
                            }}
                            rows={rowsO}
                            columns={columnsO}
                            pprioritySize={5}
                            rowsPerPpriorityOptions={[5]}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            sx={{
                              height: rowsO.length > 3 ? '70vh' : '45vh',
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
