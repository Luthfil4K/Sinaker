// ** MUI Components
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

// ** Icons Imports

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import InputAdornment from '@mui/material/InputAdornment'

const PeopleAddViews = () => {
  const handleAddPegawai = event => {
    event.preventDefault()
    console.log(event.target.nama.value)
  }

  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Add People
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={handleAddPegawai}>
          <FormControl fullWidth>
            <TextField autoFocus fullWidth name='nama' id='nama' label='Nama' sx={{ marginBottom: 4 }} />
          </FormControl>
          <TextField autoFocus fullWidth id='nip' label='Nip' sx={{ marginBottom: 4 }} />
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel id='form-layouts-separator-select-label'>Fungsi</InputLabel>
            <Select
              sx={{ height: 50 }}
              label='Fungsi'
              id='form-layouts-separator-fungsi'
              labelId='form-layouts-separator-fungsi-label'
            >
              <MenuItem value='umum'>Umum</MenuItem>
              <MenuItem value='ipds'>Ipds</MenuItem>
              <MenuItem value='produksi'>Produksi</MenuItem>
              <MenuItem value='neraca'>Neraca</MenuItem>
              <MenuItem value='distribusi'>Distribusi</MenuItem>
              <MenuItem value='sosial'>Sosial</MenuItem>
            </Select>
          </FormControl>
          <TextField autoFocus fullWidth id='email' label='Email' sx={{}} />
          <FormControl fullWidth sx={{ marginTop: 4 }}>
            <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              id='auth-login-password'
              type={'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton edge='end' aria-label='toggle password visibility'>
                    <EyeOffOutline />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button type='submit' fullWidth size='medium' variant='contained' sx={{ marginTop: 4 }}>
            Login
          </Button>
        </form>
      </Card>
    </>
  )
}

export default PeopleAddViews
