import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

// other, swall
import { DataGrid } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import router from 'next/router'

const TabelPekerjaanHarianPages = props => {
  const [isPekerjaan, setIsPekerjaan] = useState(1)

  const [rows, setRows] = useState([])
  const getFilteredRows = () => {
    const filteredRows = props.data.map(row => {
      const pekerjaanHarianFiltered = row.pekerjaan_harian.filter(data => {
        if (props.periode == 1) {
          return new Date(data.tanggalSubmit).getDate() == new Date().getDate()
        } else if (props.periode == 2) {
          return new Date(data.tanggalSubmit).getMonth() == new Date().getMonth()
        } else if (props.periode == 3) {
          return new Date(data.tanggalSubmit).getFullYear() == new Date().getFullYear()
        } else return true
      })

      let totalMenitKerja = 0
      pekerjaanHarianFiltered.forEach(menit => {
        const selisihWaktu = new Date(menit.selesai) - new Date(menit.mulai)
        const durasiMenit = Math.floor(selisihWaktu / (1000 * 60)) // Hitung total menit
        totalMenitKerja += durasiMenit
      })

      // Konversi total menit menjadi jam dan menit
      const durasiJam = Math.floor(totalMenitKerja / 60) // Jam
      const durasiMenit = totalMenitKerja % 60 // Menit sisa

      const totalDurasi = pekerjaanHarianFiltered.length > 0 ? `${durasiJam} jam ${durasiMenit} menit` : [0]

      const durasi = pekerjaanHarianFiltered.length > 0 ? pekerjaanHarianFiltered.durasi : 0
      return {
        id: row.id,
        nama: row.name,
        menitKerja: totalDurasi,
        durasi: durasi
      }
    })
    return filteredRows
  }

  useEffect(() => {
    const updatedRows = getFilteredRows()
    setRows(updatedRows)

    // Check if any pekerjaan exists
    const adaPekerjaan = updatedRows.some(row => row.durasi !== 0)

    // console.log('Ada pekerjaan:', adaPekerjaan) // Debugging to check if there's actual work
    setIsPekerjaan(adaPekerjaan ? 1 : 0)
  }, [props.periode, props.data])

  const columns = [
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Nama</Typography>
      ),
      headerName: 'Nama',
      width: 300,
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
      field: 'menitKerja',
      headerName: 'Menit Kerja',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Menit Kerja
        </Typography>
      ),

      minWidth: 250
    },
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
            onClick={async e => {
              router.push(`/pekerjaan-harian-detail/${params.row.id}`)
            }}
            type='submit'
            sx={{ mr: 1 }}
            color='success'
            variant='contained'
          >
            Detail
          </Button>
        </>
      )
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

  return (
    <>
      {isPekerjaan > 0 ? (
        <DataGrid
          rowHeight={65}
          initialState={{
            sorting: {
              sortModel: [{ field: 'durasi', sort: 'asc' }]
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
            durasi: false
          }}
        />
      ) : (
        <Typography>Belum Ada Pekerjaan Hari Ini </Typography>
      )}
    </>
  )
}

export default TabelPekerjaanHarianPages
