// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'

import {
  GridRowModes,
  GridToolbar,
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator'

const roles = ['Market', 'Finance', 'Development']
const randomRole = () => {
  return randomArrayItem(roles)
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = 100000 + randomId()
    setRows(oldRows => [...oldRows, { id, kip: '', nama: '', desa: '', alamat: '', kecamatan: '', isNew: true }])
    setRowModesModel(oldModel => ({
      ...oldModel,

      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  )
}

const TableGroupPerusahaan = props => {
  const [idAja, setidAja] = useState(props.dataId)
  const [mitra, setMitra] = useState(props.dataMitra)
  const [pml, setPML] = useState(props.dataPML)
  const [participants, setParticipants] = useState(props.data)
  const fungsi = props.dataProjectFungsi
  const jenisKeg = props.dataJenisKeg
  const jenisSample = props.dataTaskSample
  const [pmlAutoComplete, setPmlAutoComplete] = useState({})
  const [pclAutoComplete, setPclAutoComplete] = useState({})

  const templateTable = participants.length > 0 ? participants[0].templateTable : 5
  const [kolomLP, setKolomLP] = useState({
    kol1: 'nbs',
    kol2: 'nks'
  })
  useEffect(() => {
    const findKolomLV = props.dataTemplateKolom.filter(item => item.templateTableId == templateTable)

    setKolomLP(kolomLP => ({
      ...kolomLP,
      kol1: findKolomLV[0].kolomTable, //kol1
      kol2: findKolomLV[1].kolomTable // kol2
    }))
  }, [])

  const hitungTotalGaji = dataMitraLimitHonor => {
    const totalGajiPerMitra = {}
    const bulanSekarang = new Date().getMonth()
    const [pclAc, setPclAc] = useState()

    dataMitraLimitHonor.forEach(mitra => {
      const { pmlId, pclId, gajiPml, gajiPcl, task } = mitra

      // Periksa apakah bulan duedate dari task sama dengan bulan sekarang
      const taskBulan = task?.dueDate ? new Date(task.dueDate).getMonth() : new Date().getMonth()

      if (taskBulan === bulanSekarang) {
        // console.log('ini bulan sekarang : ' + new Date().getMonth())
        // console.log('ini bulan dl subkeg: ' + new Date(taskBulan).getMonth())
        totalGajiPerMitra[pmlId] = (totalGajiPerMitra[pmlId] || 0) + gajiPml
        totalGajiPerMitra[pclId] = (totalGajiPerMitra[pclId] || 0) + gajiPcl
      }
    })

    const totalGajiArray = Object.entries(totalGajiPerMitra).map(([id, total]) => ({
      id: parseInt(id),
      totalGaji: total
    }))

    return totalGajiArray
  }

  // const totalGajiMitra = hitungTotalGaji(props.dataMitraLimitHonor)
  const totalGajiMitra = props.dataMitraLimitHonor

  const [organikMitra, setOrganikMitra] = useState({
    value: '',
    label: ''
  })
  const optionPCL = useMemo(
    () =>
      props.dataMitraLimitHonor.map(mi => ({
        value: mi.mitraId,
        label: mi.nama + ', total Gaji :  Rp' + mi.totalGaji
      })),
    [props.dataMitraLimitHonor]
  )
  const optionPML = pml.map(pml => ({
    value: pml.id,
    label: pml.name + ' - Organik'
  }))

  const combinedOptions = [...optionPCL, ...optionPML]
  const apapa = props.dataProjectFungsi
  const initialRows = participants.map(row => ({
    id: row.id,
    desa: row.desa,
    namadesa: row.namadesa,
    kecamatan: row.kecamatan,
    namaKec: row.namaKec,
    target: row.target,
    pmlId: row.pmlId,
    pclId: row.pclId,
    gajiPml: row.gajiPml,
    gajiPcl: row.gajiPcl,
    kol1: row.kol1,
    kol2: row.kol2,
    realisasi: row.realisasi,
    persentase:
      row.target > 0 || row.target > 0 ? `${Math.round(100 * (Number(row.realisasi) / Number(row.target)))}%` : 0,
    hasilPencacahan: row.hasilPencacahan,
    tanggalDob: new Date(row.duedate)
  }))

  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
    processRowUpdate
  }

  const handleEditClick = id => () => {
    console.log('edit')
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = id => () => {
    console.log('handlesaveclick')
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    const jenisSub = {
      64: { namaJenisSub: 'Persiapan', color: 'warning' },
      66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
      65: { namaJenisSub: 'Pengawasan', color: 'warning' },
      67: { namaJenisSub: 'Pengolahan', color: 'warning' },
      68: { namaJenisSub: 'Evaluasi', color: 'warning' },
      69: { namaJenisSub: 'Diseminasi', color: 'warning' }
    }
  }

  // useEffect(() => {
  // }, [rows])

  const handleDeleteClick = id => () => {
    Swal.fire({
      title: 'Hapus Baris?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/task/task-tarel-progress/${id}`)
          .then(res => {
            console.log(res.message)
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Berhasil dihapus',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
            setRows(rows.filter(row => row.id !== id))
          })

          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', 'Perusahaan is not deleted. Press "OK" to continue.', 'error')
      }
    })
  }

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find(row => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter(row => row.id !== id))
    }
  }

  // useEffect(() => {
  //   console.log('ini pcl autocomplete')
  //   console.log(pclAutoComplete)
  //   console.log('ini pcl autocomplete')
  //   console.log(pclAutoComplete)
  //   console.log('ini pcl autocomplete')
  //   console.log(pclAutoComplete)
  // }, [pclAutoComplete])

  // const processRowUpdate = newRow => {
  //   const updatedRow = { ...newRow, isNew: false }
  //   setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
  //   return updatedRow
  // }

  const [snackbar, setSnackbar] = React.useState(null)

  const handleCloseSnackbar = () => setSnackbar(null)
  const handleProcessRowUpdateError = React.useCallback(error => {
    setSnackbar({ children: error.message, severity: 'error' })
  }, [])

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }
    console.log('ini update row')
    console.log(updatedRow)

    // Cari data mitra yang sesuai dengan pmlId dari updatedRow
    const mitraToUpdatePml = totalGajiMitra.find(mitra => mitra.id === updatedRow.pmlId)
    console.log('ini mitra to update pml')
    console.log(mitraToUpdatePml)
    // Hitung total gaji setelah update untuk pmlId
    const newTotalGajiPml = mitraToUpdatePml
      ? mitraToUpdatePml.totalGaji + (updatedRow.gajiPml || 0)
      : updatedRow.gajiPml // gajiPml dari updatedRow atau 0 jika tidak ada
    console.log('ini gaji total pml')
    console.log(newTotalGajiPml)
    // Cari data mitra yang sesuai dengan pclId dari updatedRow
    const mitraToUpdatePcl = updatedRow.pclId ? totalGajiMitra.find(mitra => mitra.id === updatedRow.pclId) : undefined
    console.log('mitra to update pcl')
    console.log(mitraToUpdatePcl)

    // Hitung total gaji setelah update untuk pclId
    const newTotalGajiPcl = mitraToUpdatePcl ? mitraToUpdatePcl.totalGaji + (updatedRow.gajiPcl || 0) : 0 // gajiPcl dari updatedRow atau 0 jika tidak ada
    console.log('newTotalGajiPcl')
    console.log(newTotalGajiPcl)
    // Validasi total gaji untuk pmlId dan pclId
    const isPmlValid = newTotalGajiPml ? newTotalGajiPml <= 4000000 : true
    const isPclValid = newTotalGajiPcl <= 4000000
    // console.log('isPmlValid')
    // console.log(isPmlValid)
    // console.log('isPclValid')
    // console.log(isPclValid)

    // Lakukan pengecekan dan pengiriman permintaan AJAX di sini
    const data = {
      target: updatedRow.target ? updatedRow.target : 0,
      realisasi: updatedRow.realisasi ? updatedRow.realisasi : 0,
      hasilPencacahan: updatedRow.hasilPencacahan ? updatedRow.hasilPencacahan : '',
      duedate: updatedRow.tanggalDob ? updatedRow.tanggalDob : new Date(),
      taskId: props.dataSubKegId,

      desa: updatedRow.desa ? updatedRow.desa : '',
      namadesa: updatedRow.namadesa ? updatedRow.namadesa : '',
      kecamatan: updatedRow.kecamatan ? updatedRow.kecamatan : '',
      namaKec: updatedRow.namaKec ? updatedRow.namaKec : '',
      templateTable: templateTable,
      pmlId: updatedRow.pmlId ? updatedRow.pmlId : 0,
      gajiPml: updatedRow.gajiPml ? updatedRow.gajiPml : 0,
      pclId: updatedRow.pclId ? updatedRow.pclId : 0,
      gajiPcl: updatedRow.gajiPcl ? updatedRow.gajiPcl : 0,
      kol1: updatedRow.kol1 ? updatedRow.kol1 : 0,
      kol2: updatedRow.kol2 ? updatedRow.kol2 : 0
    }

    if (updatedRow.id < 100000) {
      if (data.realisasi <= data.target) {
        if (isPmlValid && isPclValid) {
          axios
            .put(`/task/task-tarel-progress/${updatedRow.id}`, data)
            .then(res => {
              console.log(res.message)
              Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Berhasil Disimpan',
                showConfirmButton: false,
                timer: 1000,
                width: 300
              })
            })
            .catch(err => {
              console.log(err)
              Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Honor yang anda inputkan melebihi akumulai bulanan mitra ',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          setRows(rows.map(row => (row.id === updatedRow.id ? { ...row, gajipml: 0 } : row)))

          setValues(values => ({
            ...values, // Pertahankan nilai properti lainnya
            templateTable: event.target.value // Perbarui nilai kegRentang
          }))
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    } else {
      if (jenisSample === 1) {
        axios
          .post(`/task/task-tarel-progress`, data)
          .then(res => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'Berhasil Disimpan',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Berhasil Disimpan',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      } else if (jenisSample === 0) {
        axios
          .post(`/task/task-tarel-progress`, data)
          .then(res => {
            Swal.fire({
              position: 'bottom-end',
              icon: 'Berhasil disimpan',
              title: '',
              showConfirmButton: false,
              timer: 1000,
              width: 300
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      }
    }

    // Update state rows
    setRows(rows.map(row => (row.id === updatedRow.id ? updatedRow : row)))

    return updatedRow
  }

  const [summary, setSummary] = useState({
    totalTarget: 0,
    totalRealisasi: 0,
    totalSample: 0,
    totalPcl: 0,
    totalPml: 0,
    totalMasuk: 0,
    totalTidakDitemukan: 0,
    totalGajiPcl: 0,
    totalGajiPml: 0
  })

  useEffect(() => {
    props.dataUpdateTarget(summary.totalRealisasi, summary.totalTarget)
  }, [summary])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     props.dataUpdateTarget(4567)
  //   }, 2000) // 5000 milliseconds, atau 5 detik

  //   // Membersihkan interval pada unmount atau saat useEffect berubah
  //   return () => clearInterval(intervalId)
  // }, [summary])

  useEffect(() => {
    setSummary(prevSummary => ({
      ...prevSummary,
      totalGajiPml: rows.reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0),
      totalGajiPcl: rows.reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0),
      totalPml: optionPML.length,
      totalPcl: optionPCL.length,
      totalTarget: rows.reduce((totalTarget, tppRow) => totalTarget + tppRow.target, 0),
      totalRealisasi: rows.reduce((totalRealisasi, tppRow) => totalRealisasi + tppRow.realisasi, 0),
      totalSample: rows.length,
      totalSample: rows.length
    }))
  }, [rows])

  // re(summary)
  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    {
      field: 'kecamatan',
      headerName: 'Kode Kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Kecamatan
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'namaKec',
      headerName: 'Nama Kecamatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Kecamatan
        </Typography>
      ),
      renderCell: params => (
        <Typography color={'secondary.main'} sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
          {params.row.namaKec}
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'desa',
      headerName: 'Kode Desa',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Kode Desa
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'namadesa',
      headerName: 'Nama Desa ',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Desa
        </Typography>
      ),
      renderCell: params => (
        <Typography color={'secondary.main'} sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
          {params.row.namadesa}
        </Typography>
      ),
      width: 130,
      editable: true
    },
    {
      field: 'kol1',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {kolomLP.kol1}
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      editable: true
    },

    {
      field: 'kol2',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {kolomLP.kol2}
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: 'realisasi',
      headerName: 'Realisasi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Realisasi
        </Typography>
      ),
      type: 'number',
      width: 100,
      editable: true
    },
    {
      field: 'target',
      type: 'number',
      headerName: 'Target',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Target</Typography>
      ),
      width: 100,
      editable: true
    },
    {
      field: 'persentase',
      headerName: 'Persentase',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Persentase
        </Typography>
      ),
      width: 100,
      editable: false
    },

    {
      field: 'pmlId',
      headerName: 'PML',
      type: 'singleSelect',
      valueOptions: combinedOptions.sort((a, b) => {
        // Periksa apakah label mengandung "organik"
        const isAOrganik = a.label.toLowerCase().includes('organik')
        const isBOrganik = b.label.toLowerCase().includes('organik')

        if (isAOrganik && !isBOrganik) {
          return -1 // Pindahkan label a ke atas
        } else if (!isAOrganik && isBOrganik) {
          return 1 // Pindahkan label b ke atas
        } else {
          // Urutkan berdasarkan label
          return a.label.localeCompare(b.label)
        }
      }),
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'PML'
            : 'Operator'}
        </Typography>
      ),
      width: 180,
      editable: true
    },
    {
      field: 'gajiPml',
      headerName: 'Honor PML',
      type: 'number',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'Honor PML'
            : 'Honor Operator'}
        </Typography>
      ),
      width: 120,
      editable: true
    },
    {
      field: 'pclId',
      headerName: 'PCL',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {' '}
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'PCL'
            : 'Operator'}
        </Typography>
      ),
      type: 'singleSelect',
      valueOptions: optionPCL.sort((a, b) => a.label.localeCompare(b.label)),
      // renderEditCell: params => {
      //   return (
      //
      //     <Autocomplete
      //       value={params.row.pclId != 0 ? optionPCL.find(a => a.value === params.row.pclId).label : 0}
      //       disablePortal
      //       id='combo-box-demo'
      //       // options={optionPCL}
      //       onChange={(event, newValue) => {
      //         setPclAutoComplete({ ...pclAutoComplete, rowId: params.row.id, namaPcl: newValue })
      //       }}
      //       // setValues({ ...values, target: trgt, realisasi })
      //       options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //       sx={{ width: 300 }}
      //       renderInput={params => <TextField {...params} sx={500} />}
      //     />
      //   )
      // },

      width: 180,
      editable: true
    },
    {
      field: 'gajiPcl',
      headerName: 'Honor PCL',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisKeg === 65 //Produksi or Distribusi
            ? 'Honor PCL'
            : 'Honor Operator'}
        </Typography>
      ),
      type: 'number',
      width: 120,
      editable: true
    },
    {
      field: 'hasilPencacahan',
      headerName: 'Proses',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisSample === 1 ? 'Proses' : 'Proses'}
        </Typography>
      ),
      type: 'singleSelect',
      valueOptions:
        jenisSample === 1
          ? jenisKeg === 65 //Produksi or Distribusi
            ? ['Masuk', 'Menunggu Masuk', 'Tutup', 'Tidak Aktif', 'Tidak Ditemukan', 'Non Respon']
            : ['Proses', 'Selesai']
          : ['Proses', 'Selesai'],

      width: 180,
      editable: true
      // renderCell: params => {
      //   return (
      //     <Autocomplete
      //       value={'asd'}
      //       disablePortal
      //       id='combo-box-demo'
      //       // options={optionPCL}
      //       options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //       sx={{ width: 300 }}
      //       renderInput={params => <TextField {...params} sx={500} />}
      //     />
      //   )
      // },
      // renderEditCell: params => {
      //   return (
      //     // <Autocomplete
      //     //   // options={optionPCL}
      //     //   autoComplete
      //     //   options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //     //   sx={{ width: 3003 }}
      //     //   renderInput={params => <TextField {...params} sx={{ width: 450 }} />}
      //     // />
      //     <Autocomplete
      //       value={params.row.pcl}
      //       disablePortal
      //       id='combo-box-demo'
      //       // options={optionPCL}

      //       options={optionPCL.sort((a, b) => a.label.localeCompare(b.label))}
      //       sx={{ width: 300 }}
      //       renderInput={params => <TextField {...params} sx={500} />}
      //     />
      //   )
      // }
    },
    {
      field: 'tanggalDob',
      headerName: jenisSample === 0 ? 'Tanggal Terima Dok Dikab' : 'Tanggal Selesai Pengerjaan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          {jenisSample === 1 ? 'Tanggal Selesai Pengerjaan' : 'Tanggal Selesai Pengerjaan'}
        </Typography>
      ),
      type: 'date',
      width: 180,
      editable: true
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Actions</Typography>
      ),
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
        ]
      }
    }
  ]

  return (
    <>
      {' '}
      <Grid mt={4} item md={12} xs={12}>
        <Card>
          {' '}
          <Box
            sx={{
              overflowX: 'auto',
              height: 100,
              width: '100%',
              padding: 6
            }}
          >
            <Grid container spacing={4}>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Sample</Typography>
                <Typography variant='caption'>{summary.totalSample}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Realisasi/Target</Typography>
                <Typography variant='caption'>
                  {summary.totalRealisasi}/{summary.totalTarget}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Organik</Typography>
                <Typography variant='caption'>{summary.totalPml} orang</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Mitra</Typography>
                <Typography variant='caption'>{summary.totalPcl} orang</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Honor Pml</Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPml.toLocaleString('id-ID')} </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Total Honor PCL</Typography>
                <Typography variant='caption'>Rp{summary.totalGajiPcl.toLocaleString('id-ID')}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Grid mt={4} item md={12} xs={12}>
        <Card>
          <Box
            sx={{
              overflowX: 'auto',
              height: 700,
              width: '100%',
              '& .actions': {
                color: 'text.secondary'
              },
              '& .textPrimary': {
                color: 'text.primary'
              }
            }}
          >
            <DataGrid
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } }
              }}
              pageSizeOptions={[10, 15, 25]}
              rowHeight={35}
              rows={rows}
              columns={columns}
              editMode='row'
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              slots={{
                toolbar: EditToolbar
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel, showQuickFilter: true }
              }}
            />
          </Box>
        </Card>
      </Grid>{' '}
    </>
  )
}

export default TableGroupPerusahaan
