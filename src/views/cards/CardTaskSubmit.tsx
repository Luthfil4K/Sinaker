import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'

const CardTaskSubmit = () => {
  return (
    <>
      <Card>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <Grid container p={4}>
          <Grid item md={12}>
            <Typography color={'primary.dark'} variant={'h5'}>
              Pekerjaan Anda
            </Typography>
          </Grid>
          <Grid mt={1} display={'flex'} justifyContent={'center'} item md={12}>
            <Box width={275} sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }} height={120}></Box>
          </Grid>
          <Grid justifyContent={'center'} mt={2} item md={12}>
            <Button variant={'contained'} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardTaskSubmit
