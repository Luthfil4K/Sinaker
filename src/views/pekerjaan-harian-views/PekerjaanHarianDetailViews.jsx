// Mui Import
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import TablePekerjaanHarianPegawai from 'src/views/pekerjaan-harian-views/TablePekerjaanHarianPegawai'

const ProjectListViews = props => {
  const dataPH = props.data
  let totalMenitKerja = 0
  props.data.forEach(menit => {
    const selisihWaktu = new Date(menit.selesai) - new Date(menit.mulai)
    const durasiMenit = Math.floor(selisihWaktu / (1000 * 60)) // Hitung total menit
    totalMenitKerja += durasiMenit
  })

  // Konversi total menit menjadi jam dan menit
  const durasiJam = Math.floor(totalMenitKerja / 60) // Jam
  const durasiMenit = totalMenitKerja % 60 // Menit sisa

  const totalDurasi = props.data.length > 0 ? `${durasiJam} jam ${durasiMenit} menit` : 0 + ' menit'
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Typography variant='h5'>
            Detail Pekerjaan {props.data ? (props.data[0] ? props.data[0].user.name : '') : ''}
          </Typography>

          <Typography mt={3}>Jumlah menit kerja keseluruhan = {totalDurasi ? totalDurasi : 0 + 'menit'}</Typography>
        </Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}></Grid>
        <Grid item md={12} mt={5}>
          <TablePekerjaanHarianPegawai dataPH={dataPH} withAction={false}></TablePekerjaanHarianPegawai>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectListViews
