import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

import { useState } from 'react'

const CardTaskSubmit = props => {
  const [values, setValues] = useState({
    target: props.data.target,
    realisasi: props.data.realisasi
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleSimpan = () => {
    console.log(values.realisasi)
  }
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
            <TextField
              value={values.realisasi}
              size='small'
              fullWidth
              label='Realisasi'
              onChange={handleChange('realisasi')}
              placeholder='Realisasi'
            />
          </Grid>
          <Grid item xs={3} md={3} mt={3}>
            <Typography textAlign={'center'} variant={'body2'}>
              {props.data.unitTarget}
            </Typography>
          </Grid>
          <Grid item xs={9} md={9} mt={2}>
            <TextField
              value={values.target}
              size='small'
              fullWidth
              multiline
              label='Target'
              onChange={handleChange('target')}
              placeholder='Target'
            />
          </Grid>
          <Grid item xs={3} md={3} mt={2}>
            <Typography textAlign={'center'} variant={'body2'}>
              {props.data.unitTarget}
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
              <Button variant={'contained'} onClick={handleSimpan} fullWidth>
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
