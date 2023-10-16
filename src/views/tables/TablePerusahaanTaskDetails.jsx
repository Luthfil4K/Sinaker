// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
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
    </GridToolbarContainer>
  )
}

const TableGroupPerusahaan = props => {
  const [idAja, setidAja] = useState(props.dataId)
  const [mitra, setMitra] = useState(props.dataMitra)
  const [pml, setPML] = useState(props.dataPML)
  const fungsi = props.dataProjectFungsi
  const jenisSample = props.dataTaskSample
  console.log('ini fungsi: ' + fungsi)
  console.log('ini jenisSample: ' + jenisSample)
  const optionPML = pml.map(pml => ({
    value: pml.id,
    label: pml.name
  }))
  const optionPCL = mitra.map(mi => ({
    value: mi.mitra.id,
    label: mi.mitra.name
  }))

  const [participants, setParticipants] = useState(props.data)
  const apapa = props.dataProjectFungsi
  const initialRows = participants.map(row => ({
    id: row.id,
    kip: row.perusahaan.kip,
    nama: row.nama,
    // fungsi === 4 || fungsi === 5 //produksi distribusi
    //   ? row.nama
    //   : (fungsi === 6 && jenisSample === 1) || (fungsi === 7 && jenisSample === 1) //nerwilis ipds responden
    //   ? row.nama
    //   : fungsi === 6 && jenisSample === 0 // Nerwilis Dok
    //   ? row.nbs
    //   : fungsi === 3 //Sosial
    //   ? row.nks
    //   : fungsi === 7 && jenisSample === 0 //IPDS Dok
    //   ? row.idSls
    //   : '',
    desa: row.desa,
    namadesa: row.namadesa,
    kecamatan: row.kecamatan,
    namaKec: row.namaKec,
    alamat: row.alamat,
    // fungsi === 4 || fungsi === 5
    //   ? row.alamat
    //   : fungsi === 3 || (fungsi === 7 && jenisSample === 0) //Sosial or IPDS dokumen
    //   ? row.nbs
    //   : fungsi === 6 && jenisSample === 0 // Nerwilis Dok
    //   ? row.idSls
    //   : fungsi === 7 && jenisSample === 1 // IPDS Responden
    //   ? row.idSbr
    //   : fungsi === 6 && jenisSample === 1 //Nerwilis responden
    //   ? row.nus
    //   : '',
    nbs: row.nbs,
    idSls: row.idSls,
    idSbr: row.idSbr,
    nks: row.nks,
    nus: row.nus,
    target: row.target,
    pmlId: row.pmlId,
    gajiPml: row.gajiPml,
    pclId: row.pclId,
    gajiPcl: row.gajiPcl,
    realisasi: row.realisasi,
    persentase:
      row.target > 0 || row.target > 0 ? `${Math.round(100 * (Number(row.realisasi) / Number(row.target)))}%` : 0,
    hasilPencacahan: row.hasilPencacahan,
    tanggalDob: new Date(row.duedate)
  }))
  console.log(initialRows)

  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
    processRowUpdate
  }

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    const jenisSub = {
      64: { namaJenisSub: 'Persiapan', color: 'warning' },
      66: { namaJenisSub: 'Pelaksanaan', color: 'warning' },
      65: { namaJenisSub: 'Pengawasan', color: 'warning' },
      67: { namaJenisSub: 'Pengolahan', color: 'warning' },
      68: { namaJenisSub: 'Evaluasi', color: 'warning' },
      69: { namaJenisSub: 'Diseminasi', color: 'warning' }
    }

    console.log(jenisSub)
    // const roles = ['Market', 'Finance', 'Development']
    // const randomRole = () => {
    //   return randomArrayItem(roles)
    // }
    // console.log(randomRole())
    // console.log(roles)
  }
  useEffect(() => {
    console.log('update persentase')
  }, [rows])

  const handleDeleteClick = id => () => {
    Swal.fire({
      title: 'Delete Perusahaan?',
      text: 'Press "Delete Perusahaan"',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Delete Perusahaan',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/perusahaan/${id}`)
          .then(setRows(rows.filter(row => row.id !== id)))

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

  // const processRowUpdate = newRow => {
  //   const updatedRow = { ...newRow, isNew: false }
  //   setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
  //   return updatedRow
  // }
  // console.log(rows)

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }

    // Lakukan pengecekan dan pengiriman permintaan AJAX di sini
    const data = {
      target: updatedRow.target ? updatedRow.target : 0,
      realisasi: updatedRow.realisasi ? updatedRow.realisasi : 0,
      hasilPencacahan: updatedRow.hasilPencacahan ? updatedRow.hasilPencacahan : '',
      duedate: updatedRow.tanggalDob ? updatedRow.tanggalDob : new Date(),
      taskId: props.dataId,
      perusahaanId: props.dataId,
      kip: updatedRow.kip ? updatedRow.kip : '',
      nama: updatedRow.nama ? updatedRow.nama : '',
      desa: updatedRow.desa ? updatedRow.desa : '',
      namadesa: updatedRow.namadesa ? updatedRow.namadesa : '',
      kecamatan: updatedRow.kecamatan ? updatedRow.kecamatan : '',
      namaKec: updatedRow.namaKec ? updatedRow.namaKec : '',
      alamat: updatedRow.alamat ? updatedRow.alamat : '',
      pmlId: updatedRow.pmlId ? updatedRow.pmlId : 0,
      gajiPml: updatedRow.gajiPml ? updatedRow.gajiPml : 0,
      pclId: updatedRow.pclId ? updatedRow.pclId : 0,
      gajiPcl: updatedRow.gajiPcl ? updatedRow.gajiPcl : 0,
      nbs: updatedRow.nbs ? updatedRow.nbs : '',
      idSls: updatedRow.idSls ? updatedRow.idSls : '',
      idSbr: updatedRow.idSbr ? updatedRow.idSbr : '',
      nks: updatedRow.nks ? updatedRow.nks : '',
      nus: updatedRow.nus ? updatedRow.nus : ''
    }

    if (updatedRow.id < 100000) {
      if (data.realisasi <= data.target) {
        axios
          .put(`/perusahaan/${updatedRow.id}`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
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
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    } else {
      if (fungsi === 3 || fungsi === 4) {
        axios
          .post(`/task-perusahaan/addWoDB`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
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
      } else if (fungsi === 5 || fungsi === 6 || fungsi === 7) {
        axios
          .post(`/task-perusahaan`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
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

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    { field: 'kecamatan', headerName: 'Kode Kecamatan', width: 130, editable: true },
    { field: 'namaKec', headerName: 'Nama Kecamatan', width: 130, editable: true },
    { field: 'desa', headerName: 'Kode Desa', width: 130, editable: true },
    { field: 'namadesa', headerName: 'Nama Desa ', width: 130, editable: true },
    {
      field:
        fungsi === 4 || fungsi === 5 //Produksi or Distribusi
          ? 'alamat'
          : fungsi === 3 || (fungsi === 7 && jenisSample === 0) //Sosial or IPDS dokumen
          ? 'nbs'
          : fungsi === 6 && jenisSample === 0 // Nerwilis Dok
          ? 'idSls'
          : fungsi === 7 && jenisSample === 1 // IPDS Responden
          ? 'idSbr'
          : fungsi === 6 && jenisSample === 1 //Nerwilis responden
          ? 'nus'
          : '',
      headerName:
        fungsi === 4 || fungsi === 5 //Produksi or Distribusi
          ? 'Alamat'
          : fungsi === 3 || (fungsi === 7 && jenisSample === 0) //Sosial or IPDS dokumen
          ? 'NBS'
          : fungsi === 6 && jenisSample === 0 // Nerwilis Dok
          ? 'ID SLS'
          : fungsi === 7 && jenisSample === 1 // IPDS Responden
          ? 'ID SBR'
          : fungsi === 6 && jenisSample === 1 //Nerwilis responden
          ? 'NUS'
          : '',
      width: 200,
      editable: true
    },
    {
      field:
        fungsi === 4 || fungsi === 5 //Produksi or Distribusi
          ? 'nama'
          : (fungsi === 6 && jenisSample === 1) || (fungsi === 7 && jenisSample === 1) //NerwilisResponden or IPDS Responden
          ? 'nama'
          : fungsi === 6 && jenisSample === 0 // Nerwilis Dok
          ? 'nbs'
          : fungsi === 3 //Sosial
          ? 'nks'
          : fungsi === 7 && jenisSample === 0 //IPDS Dok
          ? 'idSls'
          : '',
      headerName:
        fungsi === 4 || fungsi === 5 //Produksi or Distribusi
          ? 'Nama Perusahaan'
          : (fungsi === 6 && jenisSample === 1) || (fungsi === 7 && jenisSample === 1) //NerwilisResponden or IPDS Responden
          ? 'Nama Perusahaan'
          : fungsi === 6 && jenisSample === 0 // Nerwilis Dok
          ? 'NBS'
          : fungsi === 3 //Sosial
          ? 'NKS'
          : fungsi === 7 && jenisSample === 0 //IPDS Dok
          ? 'ID SLS'
          : '',
      width: 200,
      editable: true
    },
    { field: 'realisasi', headerName: 'Realisasi', width: 100, editable: true },
    { field: 'target', headerName: 'Target', width: 100, editable: true },
    { field: 'persentase', headerName: 'Persentase', width: 100, editable: false },
    {
      field: 'hasilPencacahan',
      headerName: 'Proses',
      type: 'singleSelect',
      valueOptions: ['Masuk', 'Menunggu Masuk', 'Tutup', 'Tidak Aktif', 'Tidak Ditemukan', 'Non Respon'],
      width: 180,
      editable: true
    },
    {
      field: 'pmlId',
      headerName: 'PML',
      type: 'singleSelect',
      valueOptions: optionPML,

      width: 180,
      editable: true
    },
    {
      field: 'gajiPml',
      headerName: 'Gaji PML',
      type: 'number',

      width: 120,
      editable: true
    },
    {
      field: 'pclId',
      headerName: 'PCL',
      type: 'singleSelect',
      valueOptions: optionPCL,

      width: 180,
      editable: true
    },
    { field: 'gajiPcl', headerName: 'Gaji PCL', type: 'number', width: 120, editable: true },
    {
      field: 'tanggalDob',
      headerName: 'Tanggal Terima Dok Dikab',
      type: 'date',
      width: 180,
      editable: true
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
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
      <Card>
        <Box
          sx={{
            overflowX: 'auto',
            height: 500,
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
            slots={{
              toolbar: EditToolbar
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel }
            }}
          />
        </Box>
      </Card>
    </>
  )
}

export default TableGroupPerusahaan
