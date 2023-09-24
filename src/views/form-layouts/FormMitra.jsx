import { useState } from 'react'

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
  const [values, setValues] = useState({
    mitraId: '',
    mitraNoWa: '',
    mitraNama: '',
    mitraKecamatan: '',
    mitraDesa: '',
    mitraJabatan: ''
  })
  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleMitraJabatan = event => {
    setValues(values => ({
      ...values, // Pertahankan nilai properti lainnya
      mitraJabatan: event.target.value // Perbarui nilai kegRentang
    }))
  }

  const handleAddButton = () => {
    console.log(values)
    // router.push(`/mitra`)
  }
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
          <TextField
            autoFocus
            fullWidth
            id='nama'
            value={values.mitraNama}
            onChange={handleChange('mitraNama')}
            label='Nama'
            sx={{ marginBottom: 4 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel id='demo-simple-select-helper-label'>Jabatan</InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={values.mitraJabatan}
              onChange={handleMitraJabatan}
              label='Jabatan'
              name='jabatan'
            >
              <MenuItem value={16}>PPL</MenuItem>
              <MenuItem value={17}>PML</MenuItem>
              <MenuItem value={18}>Editor</MenuItem>
              <MenuItem value={19}>Operator</MenuItem>
            </Select>
          </FormControl>{' '}
          <TextField
            autoFocus
            fullWidth
            id='noWa'
            value={values.mitraNoWa}
            onChange={handleChange('mitraNoWa')}
            label='Nomor Whatsapp'
            type={'number'}
            sx={{ marginBottom: 4 }}
          />
          <TextField
            autoFocus
            fullWidth
            id='kecamatan'
            value={values.mitraKecamatan}
            onChange={handleChange('mitraKecamatan')}
            label='Kecamatan'
            sx={{ marginBottom: 4 }}
          />
          <TextField
            autoFocus
            fullWidth
            id='Desa'
            value={values.mitraDesa}
            onChange={handleChange('mitraDesa')}
            label='Desa'
            sx={{ marginBottom: 4 }}
          />
          <Link>
            <Button onClick={handleAddButton} fullWidth size='medium' variant='contained' sx={{ marginTop: 4 }}>
              Tambah
            </Button>
          </Link>
        </form>
      </Card>
    </>
  )
}

export default FormMitra
