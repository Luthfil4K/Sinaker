import { useState, useEffect, useRef } from 'react'
import * as React from 'react'
// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'

// other, swall

import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'

// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// icon
import AddIcon from '@mui/icons-material/Add'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import CancelIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'

import router from 'next/router'

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

const TablePeople = props => {
  const session = useSession()
  const [role, setRole] = useState()
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const { dataUser } = props
  console.log(dataUser)

  const initialRows = dataUser
    .filter(row => row.role !== 'admin' && row.role !== 'superAdmin') // Filter role selain admin atau superadmin
    .map(row => {
      return {
        id: row.user.id,
        nama: row.user.name,
        fungsi: row.user.fungsi,
        ckpKegiatan: row.ckpKegiatan,
        role: row.user.role,
        projectId: row.projectId
      }
    })

  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
    processRowUpdate
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
  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleProcessRowUpdateError = React.useCallback(error => {
    setSnackbar({ children: error.message, severity: 'error' })
  }, [])

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel)
  }

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false }

    const data = {
      id: updatedRow.id,
      ckpKegiatan: updatedRow.ckpKegiatan ? updatedRow.ckpKegiatan : 0,
      projectId: updatedRow.projectId
    }

    axios
      .put(`/project/ckp-kegiatan`, data)
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
          text: err,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
    setRows(rows.map(row => (row.id === updatedRow.id ? updatedRow : row)))

    return updatedRow
  }

  const columns = [
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 270,
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
      field: 'ckpKegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          CKP Kegiatan
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
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
          />
        ]
      }
    }
  ]

  return (
    <>
      <Card sx={{ padding: 4 }}>
        {/* <DataGrid
          rowHeight={65}
          initialState={{
            sorting: {
              sortModel: [{ field: 'nama', sort: 'asc' }]
            }
          }}
          rows={rows}
          columns={
            session.status === 'authenticated' && (session.data.uid === 1099999 || session.data.role == 'admin')
              ? columnsAdmin
              : columns
          }
          sx={{
            height: rows.length > 3 ? '80vh' : '45vh',
            // overflowY: 'auto',
            width: '100%'
          }}
          columnVisibilityModel={{
            action: session.status === 'authenticated' ? true : false
          }}
          slots={{
            toolbar: GridToolbar
          }}
          slotProps={{
            toolbar: { showQuickFilter: true }
          }}
        /> */}
      </Card>
      <Card sx={{ padding: 4 }}>
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
      </Card>
    </>
  )
}

export default TablePeople
