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
import Link from '@mui/material/Link'

import { useRouter } from 'next/dist/client/router'
// ** Icons Imports

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import InputAdornment from '@mui/material/InputAdornment'

const FormMitra = () => {
  const router = useRouter()
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Mitra
          </Typography>
          <Typography variant='body2'>Fill this blank field below</Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='nama' label='Nama' sx={{ marginBottom: 4 }} />
          <TextField autoFocus fullWidth id='noWa' label='Nomo Whatsapp' sx={{ marginBottom: 4 }} />
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
          <Link>
            <Button
              onClick={e => {
                router.push(`/mitra`)
              }}
              fullWidth
              size='medium'
              variant='contained'
              sx={{ marginTop: 4 }}
            >
              Tambah
            </Button>
          </Link>
        </form>
      </Card>
    </>
  )
}

export default FormMitra
