import TablePeople from 'src/views/tables/TablePeople'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const PeopleViews = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Daftar Pegawai</Typography>
        </Grid>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
          <Button variant={'contained'}> Tambah Pegawai</Button>
        </Grid>
        <Grid item md={12} xs={12}>
          <TablePeople></TablePeople>
        </Grid>
      </Grid>
    </>
  )
}

export default PeopleViews
