import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

const CardTaskDetail = () => {
  return (
    <>
      <Card>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <Grid container p={4}>
          <Grid item md={12}>
            <Typography color={'primary.dark'} variant={'h4'}>
              Nama Task - Nama Projek
            </Typography>
          </Grid>
          <Grid mt={1} item md={12}>
            <Typography variant={'body1'}>Pembuat Projek - tanggal dibuat</Typography>
          </Grid>
          <Grid justifyContent={'end'} mt={2} item md={12}>
            <Typography textAlign={'end'} variant={'body2'}>
              Due Apr 20, 2024
            </Typography>
            <Divider sx={{ marginTop: 3.5 }} />
          </Grid>
          <Grid mt={2} item md={12}>
            <Typography variant={'body1'}>Deskripsi Projek</Typography>
            <Typography variant={'body2'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardTaskDetail
