import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'

// other, swall
import { DataGrid } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'

import router from 'next/router'

const TablePekerjaanHarianPegawai = ({ withAction, dataPH }) => {
  const session = useSession()
  const dataPHReal = dataPH

  const handleDeleteKegiatanHarian = async id => {
    axios
      .delete(`kegiatan-harian/${id}`)
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: '',
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

  const rowsPH = dataPHReal.map(row => {
    const dateObjectTanggal = new Date(row.tanggalSubmit)

    // Ambil nilai tanggal (tahun, bulan, hari)
    const tanggal = dateObjectTanggal.toISOString().split('T')[0]

    // Waktu Mulai
    const dateObjectMulai = new Date(row.mulai)

    // Ambil nilai jam dan menit (UTC)
    const jamMulai = String(dateObjectMulai.getUTCHours()).padStart(2, '0') // Tambah leading zero jika diperlukan
    const menitMulai = String(dateObjectMulai.getUTCMinutes()).padStart(2, '0')

    const waktuMulai = jamMulai + '.' + menitMulai

    // Waktu Selesai
    const dateObjectSelesai = new Date(row.selesai)

    // Ambil nilai jam dan menit (UTC)
    const jamSelesai = String(dateObjectSelesai.getUTCHours()).padStart(2, '0') // Tambah leading zero jika diperlukan
    const menitSelesai = String(dateObjectSelesai.getUTCMinutes()).padStart(2, '0')

    const waktuSelesai = jamSelesai + '.' + menitSelesai

    // durasi
    const selisihWaktu = new Date(row.selesai) - new Date(row.mulai)

    // Konversi selisih waktu ke dalam jam dan menit
    const durasiJam = Math.floor(selisihWaktu / (1000 * 60 * 60)) // Konversi ke jam
    const durasiMenit = Math.floor((selisihWaktu % (1000 * 60 * 60)) / (1000 * 60)) // Sisanya ke menit

    const durasi = durasiJam + ' jam ' + durasiMenit + ' menit'

    return {
      id: row.id,
      nama: row.namaKegiatan,
      mulai: waktuMulai,
      selesai: waktuSelesai,
      durasi: durasi,
      tanggalSubmit: tanggal
    }
  })

  const columns = [
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Pekerjaan
        </Typography>
      ),
      headerName: 'Nama Pekerjaan',
      width: 200
    },
    {
      field: 'tanggalSubmit',
      headerName: 'Tanggal',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Tanggal</Typography>
      ),

      minWidth: 150
    },
    {
      field: 'mulai',
      headerName: 'Waktu Mulai',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Waktu Mulai
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'selesai',
      headerName: 'Waktu Selesai',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Waktu Selesai
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'durasi',
      headerName: 'Durasi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Durasi</Typography>
      ),

      minWidth: 150
    }
  ]

  const actionColumn = withAction
    ? [
        {
          field: 'action',
          headerName: 'Aksi',
          renderHeader: () => (
            <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Aksi</Typography>
          ),
          minWidth: 150,
          renderCell: params => (
            <>
              <Button
                onClick={() => handleDeleteKegiatanHarian(params.row.id)}
                type='submit'
                sx={{ mr: 1 }}
                color='error'
                variant='text'
              >
                <DeleteIcon />
              </Button>
            </>
          )
        }
      ]
    : []

  // Gabungkan kolom asli dengan kolom aksi (jika ada)
  const columnsPH = [...columns, ...actionColumn]

  return (
    <>
      <DataGrid
        rowHeight={65}
        initialState={{
          sorting: {
            sortModel: [{ field: 'nama', sort: 'asc' }]
          }
        }}
        rows={rowsPH}
        columns={columnsPH}
        sx={{
          height: rowsPH.length > 2 ? '80vh' : '45vh',
          // overflowY: 'auto',
          width: '100%'
        }}
      />
    </>
  )
}

export default TablePekerjaanHarianPegawai
