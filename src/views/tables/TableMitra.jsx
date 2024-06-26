import { useState, useEffect, useRef } from 'react'

// axios
import axios from 'src/pages/api/axios'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
// other
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useRouter } from 'next/dist/client/router'
import Swal from 'sweetalert2'
import Link from '@mui/material/Link'
import { useSession } from 'next-auth/react'

// icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const rows2 = [
  {
    id: 1,
    nama: 'Mitra A',
    gajiBulanan: 21000,
    gajiTriwulanan: 34000,
    gajiSemesteran: 76000,
    gajiTahunan: 67000,
    jumlahKegiatan: '3',
    jumlahSubkegiatan: '7'
  },
  {
    id: 2,
    nama: 'Mitra B',
    gajiBulanan: 95000,
    gajiTriwulanan: 39000,
    gajiSemesteran: 40000,
    gajiTahunan: 100000,
    jumlahKegiatan: '5',
    jumlahSubkegiatan: '5'
  }
]

const TableMitra = props => {
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }

  const [mitra, setMitra] = useState(props.data)
  const [tpp, setTpp] = useState(props.dataTpp)
  const session = useSession()

  const rows = mitra.map(row => {
    let honorTetapBulanIni = 0
    let honorTetapBulanLalu = 0
    let honorTetapBulanDepan = 0

    if (props.dataMitraHonorTetap && props.dataMitraHonorTetap.length > 0) {
      const HonorTetapBulan = props.dataMitraHonorTetap
        .filter(tppRow => tppRow.mitraId === row.id)
        .filter(data => {
          const tppDueDate = new Date(data.task.duedate)
          const currentDate = new Date()
          return (
            tppDueDate.getFullYear() === currentDate.getFullYear() && tppDueDate.getMonth() === currentDate.getMonth()
          )
        })
        .reduce((totalGaji, data) => totalGaji + data.honor, 0)
      const honorLalu = props.dataMitraHonorTetap
        .filter(tppRow => tppRow.mitraId === row.id)
        .filter(data => {
          const tppDueDate = new Date(data.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 0
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() - 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() - 1 && tppDueDate.getMonth() === 12
        })
        .reduce((totalGaji, data) => totalGaji + data.honor, 0)

      const honorDepan = props.dataMitraHonorTetap
        .filter(tppRow => tppRow.mitraId === row.id)
        .filter(data => {
          const tppDueDate = new Date(data.task.duedate)
          const currentDate = new Date()
          return currentDate.getMonth != 11
            ? tppDueDate.getFullYear() === currentDate.getFullYear() &&
                tppDueDate.getMonth() === currentDate.getMonth() + 1
            : tppDueDate.getFullYear() === currentDate.getFullYear() + 1 && tppDueDate.getMonth() === 0
        })
        .reduce((totalGaji, data) => totalGaji + data.honor, 0)

      honorTetapBulanIni += HonorTetapBulan // Tambahkan HonorTetapBulanIni ke gajiBulanIni
      honorTetapBulanLalu += honorLalu // Tambahkan HonorTetapBulanIni ke gajiBulanIni
      honorTetapBulanDepan += honorDepan // Tambahkan HonorTetapBulanIni ke gajiBulanIni
    }

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
    const gajiBulanIni = gajiBulanIniPCL + gajiBulanIniPML + honorTetapBulanIni

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
    const gajiBulanSblm = gajiBulanSblmPML + gajiBulanSblmPCL + honorTetapBulanLalu

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
      .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPml, 0)

    const gajiBulanDepan = gajiBulanDepanPCL + gajiBulanDepanPML + 0

    const bebanKerja = row.beban_kerja_mitra.length == mitra.length ? row.beban_kerja_mitra[0].bebanKerja : 0
    const nilaiBebanKerja = Number(bebanKerja).toFixed(2)

    return {
      id: row.id,
      nik: row.nik.toString(),
      name: row.name,
      jenisKelamin: row.jenisKelamin,
      tanggalLahir: new Date(row.tanggalLahir).toLocaleDateString('id'),
      umur: new Date().getFullYear() - new Date(row.tanggalLahir).getFullYear(),
      pendidikan: row.pendidikan,
      jumlahKegiatan: row.TaskPeserta.length,
      // bebanKerja: nilaiBebanKerja,
      email: row.email,
      status: row.status,
      gajiBulanIni,
      gajiBulanSblm,
      gajiBulanDepan,
      over: gajiBulanIni
    }
  })
  // console.log(rows)
  const handleDelete = async id => {
    axios
      .delete(`mitra/${id}`)
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Berhasil dihapus'
        })
        router.reload()
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      })
  }
  const router = useRouter()
  const columns = [
    // { field: 'id', headerName: 'No', type: 'string', width: 40 },
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
      width: 200,
      renderCell: params => (
        <Link
          onClick={async e => {
            router.push(`/mitra-detail-gaji/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
            {params.row.name}
          </Typography>
        </Link>
      )
    },
    {
      field: 'over',
      renderCell: params => (
        <>
          <Chip
            label={statusObj[params.row.gajiBulanIni < 4000000 ? 1 : 0].status}
            color={statusObj[params.row.gajiBulanIni < 4000000 ? 1 : 0].color}
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
      field: 'jumlahKegiatan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jumlah Kegiatan
        </Typography>
      ),
      headerName: 'Jumlah Kegiatan',
      width: 150
    },

    {
      field: 'gajiBulanIni',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Honor Bulan Ini
        </Typography>
      ),
      headerName: 'Honor Bulan Ini ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanIni < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp${params.row.gajiBulanIni.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanSblm',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Honor Bulan Sebelumnya
        </Typography>
      ),
      headerName: 'Honor Bulan Sebelumnya ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanSblm < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp${params.row.gajiBulanSblm.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    {
      field: 'gajiBulanDepan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Honor Bulan Depan
        </Typography>
      ),
      headerName: 'Honor Bulan Depan ',
      type: 'string',
      width: 140,
      renderCell: params => (
        <>
          <Typography
            color={params.row.gajiBulanDepan < 3000000 ? 'secondary.main' : 'error.main'}
            sx={{ fontWeight: 500, fontSize: '0.875rem !important', textAlign: 'center' }}
          >
            {`Rp${params.row.gajiBulanDepan.toLocaleString('id-ID')}`}
          </Typography>
        </>
      )
    },
    // {
    //   field: 'bebanKerja',
    //   renderHeader: () => (
    //     <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
    //       Beban Kerja
    //     </Typography>
    //   ),
    //   headerName: 'Beban Kerja',
    //   width: 150
    // },
    {
      field: 'jenisKelamin',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Jenis Kelamin
        </Typography>
      ),
      headerName: 'Jenis Kelamin',
      width: 150
    },

    {
      field: 'tanggalLahir',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Tanggal Lahir
        </Typography>
      ),
      headerName: 'Tanggal Lahir',
      type: 'string',
      width: 150
    },
    {
      field: 'umur',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Umur</Typography>
      ),
      headerName: 'Umur',
      type: 'string',
      width: 150
    },
    {
      field: 'pendidikan',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Pendidikan
        </Typography>
      ),
      headerName: 'Pendidikan',
      type: 'string',
      width: 150
    },
    {
      field: 'email',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Email</Typography>
      ),
      headerName: 'Email',
      width: 250
    },
    {
      field: 'status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Mitra Internal/Eksternal
        </Typography>
      ),
      headerName: 'Mitra Internal/Eksernal ',
      type: 'string',
      width: 140
    },

    {
      field: 'action',
      renderHeader: () =>
        session.status === 'authenticated' && (session.data.uid === 1099999 || session.data.role == 'admin') ? (
          <>
            <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
              Action
            </Typography>
          </>
        ) : (
          <></>
        ),
      minWidth: 215,
      flex: 1,
      renderCell: params =>
        session.status === 'authenticated' && (session.data.uid === 1099999 || session.data.role == 'admin') ? (
          <>
            <Button
              onClick={e => {
                e.preventDefault()
                router.push(`/mitra-edit/${params.row.id}`)
              }}
              type='submit'
              sx={{ mr: 1 }}
              color='info'
              variant='text'
            >
              <PencilOutline />
            </Button>

            <Button
              onClick={() => {
                Swal.fire({
                  title: 'Hapus Mitra?',
                  text: '',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ya, Hapus Mitra'
                }).then(result => {
                  if (result.isConfirmed) {
                    handleDelete(params.row.id)
                  }
                })
              }}
              type='submit'
              sx={{ mr: 1 }}
              color='error'
              variant='text'
            >
              <DeleteOutline />
            </Button>
          </>
        ) : (
          <></>
        )
    }
  ]
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rowHeight={45}
            rows={rows}
            columns={columns}
            sx={{
              height: rows.length > 3 ? '70vh' : '45vh',
              // overflowY: 'auto',
              width: '100%'
            }}
            columnVisibilityModel={{
              action:
                session.status === 'authenticated' && (session.data.uid === 1099999 || session.data.role == 'admin')
                  ? true
                  : false
            }}
            slots={{
              toolbar: GridToolbar
            }}
            slotProps={{
              toolbar: { showQuickFilter: true }
            }}
          />
        </Box>
      </Card>
    </>
  )
}

export default TableMitra
