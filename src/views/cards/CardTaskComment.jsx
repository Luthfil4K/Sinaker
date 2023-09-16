import Button from '@mui/material/Button'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import SendIcon from 'mdi-material-ui/Send'
import AccountIcon from 'mdi-material-ui/Account'

const CardTaskComent = () => {
  const [values, setValues] = useState({
    notesSubKeg: ''
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleSimpan = () => {
    console.log(values.notesSubKeg)
  }
  return (
    <>
      <Card sx={{ marginTop: 4 }}>
        {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
        <Grid container p={4} spacing={2}>
          <Grid item md={1} display={'inline'}>
            <AccountIcon></AccountIcon>
          </Grid>
          <Grid item md={11} display={'inline'}>
            <Typography color={'primary.dark'} variant={'body1'}>
              Note
            </Typography>
          </Grid>
          <Grid mt={1} display={'flex'} justifyContent={'center'} item md={12}>
            <FormControl fullWidth sx={{ overflowY: 'auto' }}>
              <OutlinedInput
                name='notesSubKeg'
                value={values.notesSubKeg}
                onChange={handleChange('notesSubKeg')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={handleSimpan} edge='end' aria-label='toggle password visibility'>
                      <SendIcon></SendIcon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CardTaskComent
