// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// MUI
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import SendIcon from 'mdi-material-ui/Send'
import AccountIcon from 'mdi-material-ui/Account'
import { useSession } from 'next-auth/react'

import { useState } from 'react'

import TablePerusahaanTaskDetails from 'src/views/tables/TablePerusahaanTaskDetails'
import CardTaskDetail from 'src/views/cards/CardTaskDetail'
import CardTaskComment from 'src/views/cards/CardTaskComment'

const TaskDetailViews = props => {
  const [participants, setParticipants] = useState(props.dataPerusahaan)
  const session = useSession()
  const [values, setValues] = useState({
    id: props.data.id,
    target: props.data.target,
    realisasi: props.data.realisasi,
    notes: props.data.notes,
    notesSubKeg: props.data.notes,
    jenisKeg: props.data.jenisKeg
  })

  const handleChange = props => event => {
    setValues({ ...values, [props]: event.target.value })
  }

  const handleSimpan = e => {
    const data = {
      realisasi: parseInt(values.realisasi),
      notes: values.notesSubKeg,
      target: parseInt(values.target)
    }
    values.realisasi <= values.target
      ? axios
          .put(`/taskdetail/${values.id}`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      : Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(
          setValues(values => ({
            ...values, // Pertahankan nilai properti lainnya
            realisasi: values.target // Perbarui nilai kegRentang
          }))
        )
  }

  const handleSimpanPerusahaan = e => {
    // const data = {
    //   target: rows.id.target,
    //   realisasi:rows.id.realisasi,
    //   hasilPencacahan: rows.id.hasilPencacahan,
    //   duedate: rows.id.tanggalDob
    // }
    values.realisasi <= values.target
      ? axios
          .put(`/taskdetail/${values.id}`, data)
          .then(res => {
            Swal.fire({
              title: 'Success!',
              text: 'Berhasil disimpan',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      : Swal.fire({
          title: 'Error!',
          text: 'Realisasi lebih besar dari target',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(
          setValues(values => ({
            ...values, // Pertahankan nilai properti lainnya
            realisasi: values.target // Perbarui nilai kegRentang
          }))
        )
  }

  const s = () => {
    console.log(values.realisasi)
    console.log(values.target)
    console.log(values.id)
    console.log(values.notes)
  }
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <CardTaskDetail data={props.data}></CardTaskDetail>
            </Grid>
            <Grid item md={4}>
              <form onSubmit={e => e.preventDefault()}>
                <Card>
                  <Grid container p={4}>
                    <Grid item xs={12} md={12}>
                      <Typography color={'primary.dark'} variant={'h5'}>
                        Pekerjaan Anda
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} mt={2} display={'flex'} alignItems={'start'}>
                      <Typography variant={'body2'}>Unit Target: {props.data.unitTarget}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} mt={3}>
                      <TextField
                        value={values.realisasi}
                        size='small'
                        fullWidth
                        type={'number'}
                        label='Realisasi'
                        onChange={handleChange('realisasi')}
                        placeholder='Realisasi'
                      />
                    </Grid>

                    <Grid item xs={12} md={12} mt={2}>
                      <TextField
                        value={values.target}
                        size='small'
                        fullWidth
                        multiline
                        label='Target'
                        type={'number'}
                        onChange={handleChange('target')}
                        placeholder='Target'
                      />
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ marginTop: 4 }}>
                  <Grid container p={4} height={200} spacing={2} overflow={'auto'}>
                    <Grid item xs={1} md={1} display={'inline'}>
                      <AccountIcon></AccountIcon>
                    </Grid>
                    <Grid item xs={11} md={11} display={'inline'}>
                      <Typography color={'primary.dark'} variant={'body1'}>
                        Note
                      </Typography>
                    </Grid>
                    <Grid mt={1} display={'flex'} justifyContent={'center'} xs={12} item md={12}>
                      <FormControl fullWidth sx={{ overflowY: 'auto' }}>
                        <OutlinedInput
                          name='notesSubKeg'
                          value={values.notesSubKeg}
                          onChange={handleChange('notesSubKeg')}
                          minRows={3}
                          multiline
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                type='submit'
                                onClick={handleSimpan}
                                edge='end'
                                aria-label='toggle password visibility'
                              >
                                <SendIcon></SendIcon>
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
                <Grid container spacing={3}>
                  <Grid justifyContent={'center'} mt={2} item xs={12} md={12}>
                    <Button type='submit' variant={'contained'} onClick={handleSimpan} fullWidth>
                      Simpan
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        {}
        <Grid item md={12}>
          <Card>
            {session.status === 'authenticated' && (session.data.uid === 99 || values.jenisKeg === 65) && (
              <TablePerusahaanTaskDetails
                data={participants}
                dataProjectFungsi={props.data.project.fungsi}
                dataId={values.id}
              ></TablePerusahaanTaskDetails>
              // <Button type='submit' variant={'contained'} onClick={handleSimpan} fullWidth>
              //   Simpan
              // </Button>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TaskDetailViews
