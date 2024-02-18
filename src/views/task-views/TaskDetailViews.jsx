// axios
import axios from 'src/pages/api/axios'

// swall
import Swal from 'sweetalert2'

// MUI

import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
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

// tab
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'

import TablePerusahaanTaskDetails from 'src/views/tables/TablePerusahaanTaskDetails'
import CardTaskDetail from 'src/views/cards/CardTaskDetail'
import CardTaskComment from 'src/views/cards/CardTaskComment'

// chartjs dan visualiasi lain
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)
import LinearProgress from '@mui/material/LinearProgress'

const TaskDetailViews = props => {
  const statusObj = {
    0: { color: 'warning', status: 'On Progress' },
    1: { color: 'success', status: 'Done' }
  }
  const [participants, setParticipants] = useState(props.dataPerusahaan)
  const [mitra, setMitra] = useState(props.dataMitra)
  const [pegawai, setPegawai] = useState(props.dataPML)
  const session = useSession()
  const [values, setValues] = useState({
    id: props.data.id,
    target: props.data.target,
    realisasi: props.data.realisasi,
    notes: props.data.notes,
    notesSubKeg: props.data.notes,
    jenisKeg: props.data.jenisKeg,
    jenisSample: props.data.jenisSample
  })
  // console.log(participants)

  const [value, setValue] = useState('1')
  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  // ganti tarel di your task sesuai dengan tabel dibawah
  const handleTaskUpdate = (realisasi, trgt) => {
    setValues({ ...values, target: trgt, realisasi })
  }

  const getRealisasi = target => {}
  // console.log(values)

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
    // console.log(values.realisasi)
    // console.log(values.target)
    // console.log(values.id)
    // console.log(values.notes)
  }

  // untuk chart

  // State Line

  const [labelTaRel, setLabeTaRel] = useState({
    target: props.dataPerusahaan.map(pr => pr.target),
    realisasi: props.dataPerusahaan.map(pr => pr.realisasi),
    label: props.dataPerusahaan.map(pr => 'NBS ' + pr.nbs)
  })
  console.log(labelTaRel)

  const dataLine = {
    labels: labelTaRel.label,
    datasets: [
      {
        label: 'Target',
        data: labelTaRel.target,
        backgroundColor: ['rgba(255, 99, 132, 1)']
      },
      {
        label: 'Realisasi',
        data: labelTaRel.realisasi,
        backgroundColor: ['rgba(25, 19, 132, 1)']
      }
    ]
  }
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={12}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card>
                {/* <CardHeader title='Nama Project' sx={{ color: 'primary.dark' }}></CardHeader> */}
                <Grid container p={4} height={450}>
                  <Grid item xs={8} md={10}>
                    <Typography color={'primary.dark'} variant={'h4'}>
                      {props.data.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={2} display={'flex'} justifyContent={'end'}>
                    <Chip
                      label={statusObj[props.data.target / props.data.realisasi === 1 ? 1 : 0].status}
                      color={statusObj[props.data.target / props.data.realisasi === 1 ? 1 : 0].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        width: 100,
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </Grid>
                  <Grid mt={1} item md={12}>
                    <Typography variant={'body1'}></Typography>
                  </Grid>
                  <Grid justifyContent={'start'} mt={2} xs={6} item md={6}>
                    <Typography textAlign={'start'} variant={'body1'}>
                      {/* Target Kegiatan : 900 */}
                    </Typography>
                  </Grid>
                  <Grid justifyContent={'end'} mt={2} xs={6} item md={6}>
                    <Typography textAlign={'end'} variant={'body2'}>
                      Due Date: {new Date(props.data.duedate).toLocaleDateString('id')}
                    </Typography>
                  </Grid>

                  <Grid mt={2} item xs={12} md={12} height={335} overflow={'auto'}>
                    <Divider sx={{ marginTop: 3.5 }} />

                    <Typography variant={'body2'}>{props.data.description}</Typography>
                    <TabContext value={value}>
                      <TabList variant='fullWidth' onChange={handleChangeTab} aria-label='card navigation example'>
                        <Tab value='1' label='Grafik' />
                        <Tab value='2' label='Catatan' />
                      </TabList>
                      <TabPanel value='1' sx={{ p: 0, height: 170 }}>
                        <Typography mt={4} textAlign={'center'} variant={'body1'}>
                          Total Target dan Realisasi Bulan Ini
                        </Typography>
                        <Grid item md={12} xs={12}>
                          <Line
                            datasetIdKey='id'
                            data={dataLine}
                            width={500}
                            height={140}
                            options={{
                              responsive: true,
                              scales: {
                                x: {
                                  ticks: {
                                    display: true
                                  }
                                }
                              },
                              plugins: {
                                legend: {
                                  position: 'top'
                                },
                                title: {
                                  display: true,
                                  text: ` `
                                }
                              }
                            }}
                          />
                        </Grid>
                      </TabPanel>
                      <TabPanel value='2' sx={{ p: 0, height: 170 }}>
                        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                          Catatan
                        </Typography>
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </Grid>
              </Card>
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

        {session.status === 'authenticated' &&
          (session.data.uid === 99 || values.jenisKeg === 65 || values.jenisKeg === 67) && (
            <TablePerusahaanTaskDetails
              data={participants}
              dataProjectFungsi={props.data.project.fungsi}
              dataId={values.id}
              dataMitra={mitra}
              dataPML={pegawai}
              dataTaskSample={values.jenisSample}
              dataJenisKeg={values.jenisKeg}
              dataUpdateTarget={handleTaskUpdate}
            ></TablePerusahaanTaskDetails>
            // <Button type='submit' variant={'contained'} onClick={handleSimpan} fullWidth>
            //   Simpan
            // </Button>
          )}
      </Grid>
    </>
  )
}

export default TaskDetailViews
