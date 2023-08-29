import TablePeople from 'src/views/tables/TablePeople'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useRouter } from 'next/dist/client/router'

const PeopleViews = () => {
  const router = useRouter()
  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Daftar Pegawai</Typography>
        </Grid>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
          <Link onClick={e => router.push(`/add-people`)}>
            <Button variant={'contained'}> Tambah Pegawai</Button>
          </Link>
        </Grid>
        <Grid item md={12} xs={12}>
          <TablePeople></TablePeople>
        </Grid>
      </Grid>
    </>
  )
}

export default PeopleViews
