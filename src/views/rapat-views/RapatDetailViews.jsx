import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'

import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'
import router from 'next/router'

// tab
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// export pdf undangan
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const RapatDetailViews = props => {
  const pdfRef = useRef()
  const [value, setValue] = useState('1')
  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  const session = useSession()
  console.log(session)

  const UndanganRapat = () => {
    const Img = styled('img')(({ theme }) => ({ height: 110 }))
    return (
      <>
        <Paper>
          <Grid container sx={{ height: 1000 }}>
            <Grid item xs={12} bgcolor={'primary.main'}>
              <Grid ref={pdfRef} container sx={{ height: 1000 }}>
                <Grid item xs={1} bgcolor={'primary.dark'}></Grid>
                <Grid item xs={10}>
                  <Grid container>
                    <Grid sx={{ height: 150 }} item xs={12} bgcolor={'success.main'}>
                      <Img alt='Stumptown Roasters' src='/images/logos/logobpsBogor.png' />
                    </Grid>
                    {/* nomor dan perihal */}
                    <Grid sx={{ height: 100 }} item xs={12} bgcolor={'success.main'}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}>
                          <Typography color={'black'} variant={'body2'}>
                            Nomor
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Lampiran
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Perihal
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography color={'black'} variant={'body2'}>
                            : B-406/32010/PL.200/{(new Date().getMonth() + 1).toString().padStart(2, '0')}/
                            {new Date().getFullYear()}
                            {/* menambahkan karakter tertentu ke awal sebuah string sehingga panjang total string tersebut menjadi setidaknya sama dengan panjang target yang ditentukan.
                             Jika panjang string awal sudah mencapai atau melebihi panjang target, maka metode padStart tidak melakukan apa pun. */}
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            : 1 (Satu Lembar) Lembar
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            : Undangan {props.dataRapat.namaRapat}
                          </Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'end'} item xs={2}>
                          <Typography color={'black'} variant={'body2'}>
                            {/* Bogor, 16 Maret 2024 */}
                            Bogor,{' '}
                            {new Date().toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'end'} item xs={1}></Grid>
                      </Grid>
                    </Grid>
                    {/* isi */}
                    <Grid sx={{ height: 600 }} item xs={12} bgcolor={'success.light'}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <Typography color={'black'} variant={'body2'}>
                            Kepada yang Terhormat:
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            Seluruh Pegawai BPS Kabupaten Bogor
                          </Typography>
                          <Typography color={'black'} variant={'body2'}>
                            di
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <Typography sx={{ marginLeft: 10 }} color={'black'} variant={'body2'}>
                            Tempat
                          </Typography>
                        </Grid>
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                          <Typography color={'black'} variant={'body2'}>
                            {/* Kegiatan Jumat Smart BPS Kabupaten Bogor akan diisi dengan knowledge sharing dari hasil
                            tesis yang akan disampaikan oleh Inda Dwi Setiawati, dengan materi "Peran dan Permintaan
                            Pariwisata pada Ekonomi Regional Indonesia". Terkait dengan kegiatan tersebut, seluruh
                            pegawai diundang untuk hadir pada: */}
                            {props.dataRapat.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={12} height={20}></Grid>
                        {/* haritanggal rapat, dll */}
                        <Grid item xs={2}></Grid>
                        <Grid item xs={9}>
                          <Grid container>
                            <Grid item xs={3}>
                              <Typography color={'black'} variant={'body2'}>
                                Hari/Tanggal
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                Pukul
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                Agenda Rapat
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                Narasumber
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                Tempat
                              </Typography>
                            </Grid>
                            <Grid item xs={9}>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date().toLocaleDateString('id-ID', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                :{' '}
                                {new Date(props.dataRapat.startDate).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}{' '}
                                -
                                {new Date(props.dataRapat.endDate).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}{' '}
                                WIB
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                : Knowledge sharing
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                : kesekian
                              </Typography>
                              <Typography color={'black'} variant={'body2'}>
                                : {props.dataRapat.tempatRapat}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        {/* Penutup */}
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                          <Typography color={'black'} variant={'body2'}>
                            Demikian surat ini disampaikan, atas perhatiannya terima kasih.
                          </Typography>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        {/* ttd */}
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={12} height={20}></Grid>
                        <Grid item xs={12} height={20}></Grid>
                        <Grid container>
                          <Grid item xs={8}></Grid>
                          <Grid item xs={3}>
                            <Typography textAlign={'center'} color={'black'} variant={'body2'}>
                              Kepala Badan Pusat Statistik
                            </Typography>
                            <Typography textAlign={'center'} color={'black'} variant={'body2'}>
                              Kabupaten Bogor
                            </Typography>
                            <Grid mt={5} container>
                              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                {props.dataRapat.status === 'disetujui' ? (
                                  <>
                                    <img alt='Stumptown Roasters' src='/images/logos/e-ttd.png' />
                                  </>
                                ) : (
                                  ''
                                )}
                              </Grid>
                            </Grid>
                            <Typography mt={5} textAlign={'center'} color={'black'} variant={'body2'}>
                              Kepala BPS Kabupaten Bogor
                            </Typography>
                          </Grid>
                          <Grid item xs={1}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid sx={{ height: 150 }} item xs={12} bgcolor={'success.dark'}></Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={1} bgcolor={'primary.dark'}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  }
  const handleDelete = id => () => {
    Swal.fire({
      title: 'Hapus Rapat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus Rapat',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/rapat/${id}`)
          .then(async res => {
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Rapat Dihapus'
            })
            router.push('/timeline')
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong'
            })
          })
      }
    })
  }
  const handleUnduhUndangan = () => {
    const input = pdfRef.current
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save('invoice.pdf')
    })
  }

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Detail Rapat</Typography>
        </Grid>
      </Grid>
      <Card>
        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
                {props.dataRapat.namaRapat}
              </Typography>
            </Grid>
            <Grid item xs={6} flexDirection={'column'} display={'flex'} alignItems={'end'}>
              <Chip
                label={
                  props.dataRapat.status === 'diajukan'
                    ? 'Diajukan'
                    : props.dataRapat.status === 'ditolak'
                    ? 'Ditolak'
                    : 'Disetujui'
                }
                color={
                  props.dataRapat.status === 'diajukan'
                    ? 'warning'
                    : props.dataRapat.status === 'ditolak'
                    ? 'error'
                    : 'success'
                }
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  width: 100,
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { fontWeight: 500 }
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 0 }} />
          <TabContext value={value}>
            <TabList variant='fullWidth' onChange={handleChangeTab} aria-label='card navigation example'>
              <Tab value='1' label='Informasi Rapat' />
              <Tab value='2' label='Undangan Rapat' />
              <Tab value='3' label='Notulensi Rapat' />
            </TabList>
            <TabPanel value='1' sx={{ p: 0, height: 335 }}>
              <Grid container mt={4} spacing={6}>
                <Grid item xs={12} sm={5} md={4} lg={3}>
                  <StyledBox>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Meeting Start</Typography>
                    </Box>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Meeting End</Typography>
                    </Box>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Description</Typography>
                    </Box>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Meeting Place</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2'>Participant</Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={9}>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {new Date(props.dataRapat.startDate).toLocaleDateString('id')} :{' '}
                      {new Date(props.dataRapat.startDate).getHours() +
                        ':' +
                        new Date(props.dataRapat.startDate).getMinutes()}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {new Date(props.dataRapat.endDate).toLocaleDateString('id')}{' '}
                      {new Date(props.dataRapat.endDate).getHours() +
                        ':' +
                        new Date(props.dataRapat.endDate).getMinutes()}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>{props.dataRapat.description}</Typography>
                  </Box>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <a style={{ textDecoration: 'none' }} target='_blank' rel='noreferrer'>
                      <Typography variant='body2' sx={{ color: 'blue' }}>
                        {props.dataRapat.tempatRapat}
                      </Typography>
                    </a>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {props.dataPesertaRapat.map(pr => {
                        return pr.user.name + ', '
                      })}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: 2.5 }} />
              {session.status === 'authenticated' && session.data.uid === 1099999 && (
                <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button
                    onClick={e => router.push(`/edit-meeting/${props.dataRapat.id}`)}
                    size='medium'
                    type='submit'
                    sx={{ mr: 2 }}
                    variant='contained'
                    disabled={props.dataRapat.status === 'disetujui' ? true : false}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDelete(props.dataRapat.id)}
                    size='medium'
                    color='error'
                    type='submit'
                    sx={{ mr: 2 }}
                    variant='contained'
                  >
                    Delete
                  </Button>
                </CardActions>
              )}
            </TabPanel>
            <TabPanel value='2' sx={{ p: 0, height: 335 }}>
              <Grid mt={4} container spacing={4}>
                <Grid display={'flex'} justifyContent={'center'} item xs={5} height={330} bgcolor={'primary.main'}>
                  <Card sx={{ width: 300, height: 300 }}>
                    <CardContent sx={{ width: 200 }}></CardContent>
                  </Card>
                </Grid>
                <Grid item xs={7} height={330} bgcolor={'white'}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant='body2'>Peserta Rapat:</Typography>
                      <Typography variant='body2'>
                        {props.dataPesertaRapat.map(pr => {
                          return pr.user.name + ', '
                        })}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button size='small' variant='contained'>
                        Kirim undangan
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={handleUnduhUndangan} mt={4} size='small' variant='contained'>
                        Unduh undangan
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='3' sx={{ p: 0, height: 335 }}></TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      <br />
      <UndanganRapat></UndanganRapat>
    </>
  )
}

export default RapatDetailViews
