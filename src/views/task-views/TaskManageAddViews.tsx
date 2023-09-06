import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

const TaskManageAddViews = () => {
  const router = useRouter()
  const ProjectParticipant = ['pegawai1', 'pegawai2', 'pegawai3']
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Add Task
          </Typography>
          {/* <Typography variant='body2'>Fill this blank field below</Typography> */}
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='namaTugas' label='Nama Tugas' sx={{ marginBottom: 4 }} />
          <Autocomplete
            sx={{ marginBottom: 4 }}
            disablePortal
            id='combo-box-demo'
            options={ProjectParticipant}
            renderInput={params => <TextField {...params} label='Tugaskan Kepada' />}
          />

          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField autoFocus fullWidth id='deadline' label='DeadLine' sx={{ marginBottom: 4 }} />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <InputLabel id='form-layouts-separator-select-label'>Prioritas</InputLabel>
                <Select
                  sx={{ height: 50 }}
                  label='Prioritas'
                  id='form-layouts-separator-fungsi'
                  labelId='form-layouts-separator-fungsi-label'
                >
                  <MenuItem value='Low'>Low</MenuItem>
                  <MenuItem value='Normal'>Normal</MenuItem>
                  <MenuItem value='High'>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField autoFocus fullWidth id='target' label='Target' sx={{ marginBottom: 4 }} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField autoFocus fullWidth id='unitTarget' label='Unit Target' sx={{ marginBottom: 4 }} />
            </Grid>
          </Grid>
          <TextField fullWidth multiline minRows={3} label='Task Description' placeholder='Deskripsi Task' />

          <Button
            fullWidth
            onClick={e => {
              router.push('/task-manage')
            }}
            size='medium'
            variant='contained'
            sx={{ marginTop: 4 }}
          >
            Buat Tugas
          </Button>
        </form>
      </Card>
    </>
  )
}

export default TaskManageAddViews
