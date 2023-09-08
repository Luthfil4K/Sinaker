// ** MUI Imports

import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const rows = [
  {
    id: 1,
    subKegiatan: '',
    jenisKegiatan: 'Persiapan ',
    pcl: 40,
    realisasi: 'selesai',
    target: 33,
    deadline: '22/09/2023'
  },
  {
    id: 2,
    subKegiatan: '',
    jenisKegiatan: 'Diseminasi ',
    pcl: 20,
    realisasi: 'on progress',
    target: 75,
    deadline: '22/09/2023'
  },
  {
    id: 3,
    subKegiatan: '',
    jenisKegiatan: 'pengolahan',
    pcl: 20,
    realisasi: 'selesai',
    target: 130,
    deadline: '26/09/2023'
  },
  {
    id: 4,
    subKegiatan: '',
    jenisKegiatan: 'pengolahan',
    pcl: 60,
    realisasi: 'assigned',
    target: 27,
    deadline: '28/09/2023'
  },
  {
    id: 5,
    subKegiatan: '',
    jenisKegiatan: 'Pengawasan',
    pcl: 60,
    realisasi: 'selesai',
    target: 10,
    deadline: '29/09/2023'
  }
]

const TableProjectDetailTask = () => {
  const router = useRouter()
  const subKegiatan = ['Sub Kegiatan']
  const columns = [
    { field: 'id', headerName: 'No', type: 'string', width: 70 },
    {
      field: 'subKegiatan',
      headerName: 'Sub Kegiatan',
      minwidth: 250,
      flex: 1,
      renderCell: () => (
        <Link
          onClick={async e => {
            router.push(`/task-detail`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
            {subKegiatan.map(team => {
              return `${team} `
            })}
          </Typography>
        </Link>
      )
    },
    { field: 'jenisKegiatan', headerName: 'Jenis Kegiatan', width: 150 },

    {
      field: 'realisasi',
      renderCell: () => (
        <Chip
          label={'7'}
          color={'warning'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            width: 100,
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ),
      headerName: 'Realisasi',
      type: 'string',
      width: 140
    },
    { field: 'target', headerName: 'Target', type: 'string', width: 100 },
    { field: 'deadline', headerName: 'Deadline', type: 'string', width: 180 }
  ]

  return (
    <>
      <Grid item md={12} xs={12}>
        <Card>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'deadline', sort: 'asc' }]
              }
            }}
            rows={rows}
            columns={columns}
            sx={{ overflowX: 'auto' }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default TableProjectDetailTask
