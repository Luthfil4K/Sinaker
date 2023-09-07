import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

const CardTaskSubmit = () => {
  return (
    <>
      <Card>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <Grid container p={4}>
          <Grid item xs={12} md={12}>
            <Typography color={'primary.dark'} variant={'h5'}>
              Pekerjaan Anda
            </Typography>
          </Grid>
          <Grid item xs={9} md={9} mt={3}>
            <TextField size='small' fullWidth multiline label='Realisasi' placeholder='Realisasi' />
          </Grid>
          <Grid item xs={3} md={3} mt={3}>
            <Typography textAlign={'center'} variant={'body2'}>
              Laporan
            </Typography>
          </Grid>
          <Grid item xs={9} md={9} mt={2}>
            <TextField size='small' fullWidth multiline label='Target' value={30} placeholder='Target' />
          </Grid>
          <Grid item xs={3} md={3} mt={2}>
            <Typography textAlign={'center'} variant={'body2'}>
              Laporan
            </Typography>
          </Grid>
          {/* <Grid mt={3} display={'flex'} justifyContent={'center'} item xs={12} md={12}>
            <Box
              width={'100%'}
              sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}
              height={120}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'grey.200'}
            >
              <Typography variant={'body2'}>File</Typography>
            </Box>
          </Grid> */}
          {/* <Grid justifyContent={'center'} mt={2} item xs={12} md={12}>
            <Button variant={'contained'} fullWidth>
              Submit
            </Button>
          </Grid> */}
          <Grid container spacing={3}>
            <Grid justifyContent={'center'} mt={2} item xs={12} md={12}>
              <Button variant={'contained'} fullWidth>
                Simpan
              </Button>
            </Grid>
            {/* <Grid justifyContent={'center'} mt={2} item xs={12} md={6}>
              <Button variant={'contained'} fullWidth>
                Revisi
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardTaskSubmit
