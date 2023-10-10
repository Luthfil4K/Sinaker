// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
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
    const id = randomId()
    setRows(oldRows => [...oldRows, { id, kip: '', nama: 'www', desa: '', alamat: '', kecamatan: '', isNew: true }])
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
  const [participants, setParticipants] = useState(props.data)
  const apapa = props.dataProjectFungsi
  const initialRows = participants.map(row => ({
    id: row.id,
    kip: row.perusahaan.kip,
    nama: row.perusahaan.nama,
    desa: row.perusahaan.desa,
    kecamatan: row.perusahaan.kecamatan,
    alamat: row.perusahaan.alamat,
    target: row.target,
    realisasi: row.realisasi,
    persentase:
      row.target > 0 || row.target > 0 ? `${Math.round(100 * (Number(row.realisasi) / Number(row.target)))}%` : 0,
    hasilPencacahan: row.hasilPencacahan,
    tanggalDob: new Date(row.duedate)
  }))
  // console.log(initialRows
  const initialRow2s = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole()
    }
  ]

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
    // console.log(id)
    // console.log(id - 1)
    // console.log(rows[id - 1].id)
    // console.log(rows)
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
      confirmButtonText: 'Yes, Delete Project',
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
      target: updatedRow.target,
      realisasi: updatedRow.realisasi,
      hasilPencacahan: updatedRow.hasilPencacahan,
      duedate: updatedRow.tanggalDob
    }

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

    // Update state rows
    setRows(rows.map(row => (row.id === updatedRow.id ? updatedRow : row)))

    return updatedRow
  }

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    {
      field: 'kip',
      headerName: 'KIP',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    { field: 'nama', headerName: 'Name', width: 200, editable: false },
    { field: 'desa', headerName: 'Desa', width: 80, editable: false },
    { field: 'kecamatan', headerName: 'Kecamatan', width: 80, editable: false },
    { field: 'alamat', headerName: 'Alamat', width: 200, editable: true },
    { field: 'realisasi', headerName: 'Realisasi', width: 100, editable: true },
    { field: 'target', headerName: 'Target', width: 100, editable: true },
    { field: 'persentase', headerName: 'Persentase', width: 100, editable: false },
    {
      field: 'hasilPencacahan',
      headerName: 'Hasil Pencacahan',
      type: 'singleSelect',
      valueOptions: ['Masuk', 'Menunggu Masuk', 'Tutup', 'Tidak Aktif', 'Tidak Ditemukan', 'Non Respon'],
      width: 180,
      editable: true
    },
    {
      field: 'tanggalDob',
      headerName: 'Tanggal Terima Dok Dikab',
      type: 'date',
      width: 180,
      editable: true
    },
    // {
    //   field: 'role',
    //   headerName: 'Department',
    //   width: 220,
    //   editable: true,
    //   type: 'singleSelect',
    //   valueOptions: ['Market', 'Finance', 'Development']
    // },
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
          // slots={{
          //   toolbar: EditToolbar
          // }}
          slotProps={{
            toolbar: { setRows, setRowModesModel }
          }}
        />
      </Box>
    </>
  )
}

export default TableGroupPerusahaan
