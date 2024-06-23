import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'
import router from 'next/router'
import { DataGrid } from '@mui/x-data-grid'

import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const RapatApproveList = props => {
  const session = useSession()
  // const dataAjuan = props.dataRapat
  const [dataAjuan, setDataAjuan] = useState(
    props.dataRapat.map(rapat => ({
      id: rapat.id,
      namaRapat: rapat.namaRapat,
      meetDate: rapat.meetDate,
      startTime: rapat.startTime,
      endTime: rapat.endTime,
      tempatRapat: rapat.tempatRapat,
      createdBy: rapat.createdBy,
      description: rapat.description,
      status: rapat.status
    }))
  )

  const handleSetujui = id => () => {
    const filteredData = dataAjuan.filter(rapat => rapat.id === id)
    console.log('filteredData')
    console.log(filteredData)
    console.log('filteredData')
    console.log(filteredData)
    const aidi = id
    Swal.fire({
      title: 'Setujui Rapat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          namaRapat: filteredData[0].namaRapat,
          meetDate: filteredData[0].meetDate,
          startTime: filteredData[0].startTime,
          endTime: filteredData[0].endTime,
          duration: filteredData[0].namaRapat,
          tempatRapat: filteredData[0].tempatRapat,
          description: filteredData[0].description,
          status: 'disetujui'
        }
        axios
          .put(`/rapat-approve/${id}`, data)
          .then(async res => {
            await Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Rapat Disetujui'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong'
            })
          })
        setDataAjuan(prevDataAjuan => {
          return prevDataAjuan.map(rapat => {
            if (rapat.id === aidi) {
              // Jika id cocok, kita akan mengganti namaRapat dengan nilai baru
              return {
                ...rapat,
                status: 'disetujui'
              }
            }
            // Jika id tidak cocok, kita akan kembalikan rapat tanpa mengubahnya
            return rapat
          })
        })
      }
    })
  }
  const handleTolak = id => () => {
    const aidi = id
    const filteredData = dataAjuan.filter(rapat => rapat.id === id)

    Swal.fire({
      title: 'Tolak Rapat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          namaRapat: filteredData[0].namaRapat,
          meetDate: filteredData[0].meetDate,
          startTime: filteredData[0].startTime,
          endTime: filteredData[0].endTime,
          duration: filteredData[0].namaRapat,
          tempatRapat: filteredData[0].tempatRapat,
          description: filteredData[0].description,
          status: 'ditolak'
        }
        axios
          .put(`/rapat-approve/${id}`, data)
          .then(async res => {
            await Swal.fire({
              icon: 'success',
              title: '',
              text: 'Rapat Ditolak'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong'
            })
          })
        setDataAjuan(prevDataAjuan => {
          return prevDataAjuan.map(rapat => {
            if (rapat.id === aidi) {
              // Jika id cocok, kita akan mengganti namaRapat dengan nilai baru
              return {
                ...rapat,
                status: 'ditolak'
              }
            }
            // Jika id tidak cocok, kita akan kembalikan rapat tanpa mengubahnya
            return rapat
          })
        })
        // console.log(dataAjuan)
      }
    })
  }

  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', maxWidth: 20 },
    {
      field: 'namaRapat',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 200,
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/rapat-detail/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.namaRapat}
          </Typography>
        </Link>
      )
    },

    // },
    {
      field: 'waktu',
      headerName: 'Jumlah Kegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Waktu Rapat
        </Typography>
      ),

      minWidth: 190
    },
    {
      field: 'tempatRapat',
      headerName: 'Beban Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tempat Rapat
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'description',
      headerName: 'Bahasan ',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tema Bahasan
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'createdBy',
      headerName: 'Diajukan Oleh',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Diajukan Oleh
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Status</Typography>
      ),

      renderCell: params => (
        <>
          <Chip
            label={
              params.row.status === 'diajukan' ? 'Diajukan' : params.row.status === 'ditolak' ? 'Ditolak' : 'Disetujui'
            }
            color={params.row.status === 'diajukan' ? 'warning' : params.row.status === 'ditolak' ? 'error' : 'success'}
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

      minWidth: 150
    },

    {
      field: 'action',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Persetujuan
        </Typography>
      ),

      minWidth: 250,
      flex: 1,
      renderCell: params => (
        <>
          <Grid container>
            <Grid item xs={6}>
              <Button
                onClick={handleSetujui(params.row.id)}
                disabled={params.row.status == 'disetujui' ? true : false}
                color={'success'}
                size='small'
                type='submit'
                variant='outlined'
              >
                Setujui
              </Button>
            </Grid>
            <Button onClick={handleTolak(params.row.id)} color={'error'} size='small' type='submit' variant='outlined'>
              Tolak
            </Button>
            <Grid item xs={6}></Grid>
          </Grid>
          {/* <Button
            onClick={e => {
              router.push(`/people-edit/${params.row.id}`)
            }}
            type='submit'
            sx={{ mr: 1 }}
            color='info'
            variant='text'
          >
            <PencilOutline />
          </Button> */}

          {/* <Button onClick={handleDelete} type='submit' sx={{ mr: 1 }} color='error' variant='text'>
            <DeleteOutline />
          </Button> */}
        </>
      ),
      hide: true
    }
  ]

  const rows = dataAjuan.map(row => {
    return {
      id: row.id,
      namaRapat: row.namaRapat,
      waktu:
        new Date(row.meetDate).toLocaleDateString('en') +
        ' (' +
        new Date(row.startTime).getHours() +
        ':' +
        new Date(row.startTime).getMinutes() +
        '-' +
        new Date(row.endTime).getHours() +
        ':' +
        new Date(row.endTime).getMinutes() +
        ')',

      tempatRapat: row.tempatRapat,
      createdBy: row.createdBy.name,
      description: row.description,
      status: row.status
    }
  })

  return (
    <>
      <Grid container spacing={5}>
        {/* <Typography mb={4} variant={'h5'}>
          Daftar Rapat
        </Typography> */}
      </Grid>
      <Grid container spacing={5}>
        <Grid item md={12} xs={12}>
          <Card sx={{ padding: 4 }}>
            <Box
              sx={{
                overflowX: 'auto',

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
                rowHeight={65}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'nama', sort: 'asc' }]
                  }
                }}
                rows={rows}
                columns={columns}
                sx={{
                  height: rows.length > 3 ? '80vh' : '45vh',
                  // overflowY: 'auto',
                  width: '100%'
                }}
                columnVisibilityModel={{
                  action:
                    session.status === 'authenticated' &&
                    (session.data.uid === 1099999 || session.data.role == 'pimpinan')
                      ? true
                      : false
                }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default RapatApproveList
