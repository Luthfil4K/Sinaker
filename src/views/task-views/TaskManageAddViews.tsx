import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import { useRouter } from 'next/dist/client/router'
import { Autocomplete } from '@mui/lab'

import TableAddParticipant from 'src/views/tables/TableAddParticipant'

const TaskManageAddViews = () => {
  const router = useRouter()
  const ProjectParticipant = ['pegawai1', 'pegawai2', 'pegawai3']
  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Tambah Tim
          </Typography>
          {/* <Typography variant='body2'>Fill this blank field below</Typography> */}
        </Box>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <TextField autoFocus fullWidth id='namaTim' label='Nama Tim' sx={{ marginBottom: 4 }} />
          <Autocomplete
            sx={{ marginBottom: 4 }}
            disablePortal
            id='combo-box-demo'
            options={ProjectParticipant}
            renderInput={params => <TextField {...params} label='PML' />}
          />
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField autoFocus fullWidth id='target' label='Target' sx={{ marginBottom: 4 }} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField autoFocus fullWidth id='unitTarget' label='Unit Target' sx={{ marginBottom: 4 }} />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField autoFocus fullWidth id='deadline' label='Dead Line' sx={{ marginBottom: 4 }} />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
          <TextField fullWidth multiline minRows={3} label='Task Description' placeholder='Deskripsi Task' />

          <TableAddParticipant></TableAddParticipant>
          <Button
            fullWidth
            onClick={e => {
              router.push('/task-manage')
            }}
            size='medium'
            variant='contained'
            sx={{ marginTop: 4 }}
          >
            Buat Tim
          </Button>
        </form>
      </Card>
    </>
  )
}

export default TaskManageAddViews
