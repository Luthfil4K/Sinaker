// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import LinearProgress from '@mui/material/LinearProgress'
import * as React from 'react'

// tabel
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// next
import { useRouter } from 'next/dist/client/router'

import { useSession } from 'next-auth/react'
// icon
import ClipboardCheck from 'mdi-material-ui/ClipboardCheck'
import AccountCog from 'mdi-material-ui/AccountCog'
import AccountGroup from 'mdi-material-ui/AccountGroup'

// circular bar
import CircularProgress from '@mui/material/CircularProgress'

const ParticipantPeople = props => {
  return (
    <Grid
      justifyContent='center'
      sx={{ alignContent: 'center', alignItems: 'center' }}
      item
      flexDirection={'column'}
      xs={6}
      md={3}
      display={'flex'}
      // bgcolor={'secondary.dark'}
    >
      <Avatar
        sx={{
          boxShadow: 3,
          width: 60,
          height: 60,
          color: 'common.white',
          backgroundColor: `primary.main`
        }}
      >
        {<AccountGroup />}
      </Avatar>
      <Typography textAlign={'center'} variant='body2'>
        {props.data.name}
      </Typography>
    </Grid>
  )
}

const TabPanel1 = () => {
  return (
    <>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Nama Projek
      </Typography>
      <Grid container display={'flex'} spacing={3}>
        <Grid
          justifyContent='center'
          sx={{ alignContent: 'center', alignItems: 'center' }}
          item
          flexDirection={'column'}
          md={4}
          xs={12}
          display={'flex'}
        >
          <Avatar
            sx={{
              boxShadow: 3,
              width: 60,
              height: 60,
              color: 'common.white',
              backgroundColor: `warning.main`
            }}
          >
            {<AccountCog />}
          </Avatar>
          <Typography variant='body2'>Penanggung Jawab</Typography>
          <Typography variant='body1'>Sabaody</Typography>
        </Grid>
        <Grid
          justifyContent='center'
          sx={{ alignContent: 'center', alignItems: 'center' }}
          item
          flexDirection={'column'}
          md={4}
          xs={12}
          display={'flex'}
        >
          <Avatar
            sx={{
              boxShadow: 3,
              width: 60,
              height: 60,
              color: 'common.white',
              backgroundColor: `primary.main`
            }}
          >
            {<AccountGroup />}
          </Avatar>
          <Typography textAlign={'center'} variant='body2' component='span' sx={{ display: 'inline' }}>
            Peserta Kegiatan
          </Typography>
          <Typography textAlign={'center'} variant='body1' component='span' sx={{ display: 'inline' }}>
            100
          </Typography>
        </Grid>
        <Grid
          justifyContent='center'
          sx={{ alignContent: 'center', alignItems: 'center' }}
          item
          flexDirection={'column'}
          md={4}
          xs={12}
          display={'flex'}
        >
          <Avatar
            sx={{
              boxShadow: 3,
              width: 60,
              height: 60,
              color: 'common.white',
              backgroundColor: `success.main`
            }}
          >
            {<ClipboardCheck />}
          </Avatar>
          <Typography textAlign={'center'} variant='body2' component='span' sx={{ display: 'inline' }}>
            Total Sub Kegiatan
          </Typography>
          <Typography textAlign={'center'} variant='body1' component='span' sx={{ display: 'inline' }}>
            3
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

const TabPanel2 = () => {
  return (
    <>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Timeline
      </Typography>
      <Grid container>
        <Grid height={50} item xs={6}>
          <Typography variant='body1'>Date Started</Typography>
          <Typography variant='body2'>22/09/2023</Typography>
        </Grid>

        <Grid height={50} item xs={6}>
          <Typography textAlign={'end'} variant='body1'>
            Date Ended
          </Typography>
          <Typography textAlign={'end'} variant='body2'>
            23/10/2023
          </Typography>
        </Grid>
      </Grid>
      <LinearProgress sx={{ height: 10 }} color='success' value={37} variant='determinate'></LinearProgress>
      <Typography mt={5} variant='body1'>
        Time Left :
      </Typography>
      <Typography variant='body2'>2 Hari</Typography>
    </>
  )
}

const TabPanel3 = () => {
  return (
    <>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Deskripsi
      </Typography>
      <Typography variant='body2' sx={{ marginBottom: 4 }}>
        Icing cake macaroon macaroon jelly chocolate bar. Chupa chups dessert dessert soufflé chocolate bar jujubes
        gummi bears lollipop.
      </Typography>
    </>
  )
}

const TabPanel4 = () => {
  return (
    <>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Peserta Kegiatan
      </Typography>
      <Grid container spacing={2}>
        <ParticipantPeople />
        <ParticipantPeople />
        <ParticipantPeople />
        <ParticipantPeople />
        <ParticipantPeople />
        <ParticipantPeople />
      </Grid>
    </>
  )
}

const CardProjectDetail = props => {
  const [project, setProject] = useState(props.data)
  const [userProject, setUserProject] = useState(props.data.UserProject)
  const [arrId, setArrId] = useState(props.dataArrayIdProjectMember)

  // kegiatan harian
  const [dataPHreal, setDataPHreal] = useState(props.dataPH)
  const session = useSession()

  console.log(session)
  const valueProgressBar =
    Math.ceil((new Date(project.enddate) - new Date()) / (1000 * 3600 * 24)) >= 0
      ? parseInt(
          `${Math.ceil(
            (100 * ((new Date() - new Date(project.startdate)) / (1000 * 3600 * 24))) /
              ((new Date(project.enddate) - new Date(project.startdate)) / (1000 * 3600 * 24))
          )}`
        )
      : 100
  const router = useRouter()
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // const a = [103214]

  const a = [1, 2, 3, 4, 5]
  const b = 3

  // pekerjaan harian
  const rowsPH = dataPHreal.map(row => {
    const dateObjectTanggal = new Date(row.tanggalSubmit)

    // Ambil nilai tanggal (tahun, bulan, hari)
    const tanggal = dateObjectTanggal.toISOString().split('T')[0]

    // Waktu Mulai
    const dateObjectMulai = new Date(row.mulai)

    // Ambil nilai jam dan menit (UTC)
    const jamMulai = String(dateObjectMulai.getUTCHours()).padStart(2, '0') // Tambah leading zero jika diperlukan
    const menitMulai = String(dateObjectMulai.getUTCMinutes()).padStart(2, '0')

    const waktuMulai = jamMulai + '.' + menitMulai

    // Waktu Selesai
    const dateObjectSelesai = new Date(row.selesai)

    // Ambil nilai jam dan menit (UTC)
    const jamSelesai = String(dateObjectSelesai.getUTCHours()).padStart(2, '0') // Tambah leading zero jika diperlukan
    const menitSelesai = String(dateObjectSelesai.getUTCMinutes()).padStart(2, '0')

    const waktuSelesai = jamSelesai + '.' + menitSelesai

    // durasi
    const selisihWaktu = new Date(row.selesai) - new Date(row.mulai)

    // Konversi selisih waktu ke dalam jam dan menit
    const durasiJam = Math.floor(selisihWaktu / (1000 * 60 * 60)) // Konversi ke jam
    const durasiMenit = Math.floor((selisihWaktu % (1000 * 60 * 60)) / (1000 * 60)) // Sisanya ke menit

    const durasi = durasiJam + ' jam ' + durasiMenit + ' menit'

    return {
      id: row.id,
      pegawai: row.user.name,
      nama: row.namaKegiatan,
      mulai: waktuMulai,
      selesai: waktuSelesai,
      durasi: durasi,
      tanggalSubmit: tanggal
    }
  })

  const columnsPH = [
    {
      field: 'pegawai',
      headerName: 'Pegawai',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Pegawai</Typography>
      ),

      minWidth: 150
    },
    {
      field: 'nama',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Nama Pekerjaan
        </Typography>
      ),
      headerName: 'Nama Pekerjaan',
      width: 200
      // renderCell: params => (
      //   <Link
      //     onClick={async e => {
      //       router.push(`/pegawai-detail-gaji/${params.row.id}`)
      //     }}
      //     sx={{ cursor: 'pointer' }}
      //   >
      //     <Typography sx={{ fontWeight: 500, textDecoration: 'underline', fontSize: '0.875rem !important' }}>
      //       {params.row.nama}
      //     </Typography>
      //   </Link>
      // )
    },
    {
      field: 'tanggalSubmit',
      headerName: 'Tanggal',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Tanggal</Typography>
      ),

      minWidth: 150
    },
    {
      field: 'mulai',
      headerName: 'Waktu Mulai',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Waktu Mulai
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'selesai',
      headerName: 'Waktu Selesai',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Waktu Selesai
        </Typography>
      ),

      minWidth: 150
    },
    {
      field: 'durasi',
      headerName: 'Durasi',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Durasi</Typography>
      ),

      minWidth: 150
    }
  ]

  return (
    <>
      <Card sx={{ height: 350 }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='card navigation example'>
            <Tab value='1' label='Informasi' />
            <Tab value='2' label='Timeline' />
            <Tab value='3' label='Deskripsi' />
            <Tab value='4' label='Pegawai' />
            {session.status === 'authenticated' &&
              (session.data.role == 'teamleader' || session.data.role == 'admin') &&
              arrId.includes(session.data.uid) && <Tab value='5' label='Pekerjaan Pegawai' />}
          </TabList>
          <CardContent>
            <TabPanel value='1' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                {project.title}
              </Typography>
              <Grid container display={'flex'} spacing={3}>
                <Grid
                  justifyContent='center'
                  sx={{ alignContent: 'center', alignItems: 'center' }}
                  item
                  flexDirection={'column'}
                  md={4}
                  xs={12}
                  display={'flex'}
                >
                  <Avatar
                    sx={{
                      boxShadow: 3,
                      width: 60,
                      height: 60,
                      color: 'common.white',
                      backgroundColor: `warning.main`
                    }}
                  >
                    {<AccountCog />}
                  </Avatar>
                  <Typography variant='body2'>Penanggung Jawab</Typography>
                  <Typography variant='body1'>{project.projectLeader.name}</Typography>
                </Grid>
                <Grid
                  justifyContent='center'
                  sx={{ alignContent: 'center', alignItems: 'center' }}
                  item
                  flexDirection={'column'}
                  md={4}
                  xs={12}
                  display={'flex'}
                >
                  <Avatar
                    sx={{
                      boxShadow: 3,
                      width: 60,
                      height: 60,
                      color: 'common.white',
                      backgroundColor: `primary.main`
                    }}
                  >
                    {<AccountGroup />}
                  </Avatar>
                  <Typography textAlign={'center'} variant='body2' component='span' sx={{ display: 'inline' }}>
                    Peserta Kegiatan
                  </Typography>
                  <Typography textAlign={'center'} variant='body1' component='span' sx={{ display: 'inline' }}>
                    {project.UserProject_member.length}
                  </Typography>
                </Grid>
                <Grid
                  justifyContent='center'
                  sx={{ alignContent: 'center', alignItems: 'center' }}
                  item
                  flexDirection={'column'}
                  md={4}
                  xs={12}
                  display={'flex'}
                >
                  <Avatar
                    sx={{
                      boxShadow: 3,
                      width: 60,
                      height: 60,
                      color: 'common.white',
                      backgroundColor: `success.main`
                    }}
                  >
                    {<ClipboardCheck />}
                  </Avatar>
                  <Typography textAlign={'center'} variant='body2' component='span' sx={{ display: 'inline' }}>
                    Total Sub Kegiatan
                  </Typography>
                  <Typography textAlign={'center'} variant='body1' component='span' sx={{ display: 'inline' }}>
                    {project.Task.length}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value='2' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                Timeline
              </Typography>
              <Grid container>
                <Grid height={50} item xs={6}>
                  <Typography variant='body1'>Date Started</Typography>
                  <Typography variant='body2'>{new Date(project.startdate).toLocaleDateString('id')}</Typography>
                </Grid>

                <Grid height={50} item xs={6}>
                  <Typography textAlign={'end'} variant='body1'>
                    Date Ended
                  </Typography>
                  <Typography textAlign={'end'} variant='body2'>
                    {new Date(project.enddate).toLocaleDateString('id')}
                  </Typography>
                </Grid>
              </Grid>
              <LinearProgress
                sx={{ height: 10 }}
                color='success'
                value={valueProgressBar}
                variant='determinate'
              ></LinearProgress>
              <Typography mt={5} variant='body1'>
                Time Left :
              </Typography>
              <Typography variant='body2'>
                {Math.ceil((new Date(project.enddate) - new Date()) / (1000 * 3600 * 24)) >= 0
                  ? `${Math.ceil((new Date(project.enddate) - new Date()) / (1000 * 3600 * 24))} days`
                  : 'Project has been finished'}
              </Typography>
            </TabPanel>
            <TabPanel value='3' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                Deskripsi
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 4 }}>
                {project.description}
              </Typography>
            </TabPanel>
            <TabPanel value='4' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <>
                <Grid
                  justifyContent='center'
                  sx={{ alignContent: 'center', alignItems: 'center' }}
                  container
                  flexDirection={'row'}
                  display={'flex'}
                  // bgcolor={'secondary.light'}
                >
                  {project.UserProject_member.map((projek, index) => (
                    <Grid
                      key={index}
                      item
                      md={3}
                      xs={6}
                      justifyContent='center'
                      sx={{ alignContent: 'center', alignItems: 'center' }}
                      flexDirection={'column'}
                      display={'flex'}
                    >
                      <Avatar
                        sx={{
                          boxShadow: 3,
                          width: 60,
                          height: 60,
                          color: 'common.white',
                          backgroundColor: `primary.main`
                        }}
                      >
                        {<AccountGroup />}
                      </Avatar>
                      <Typography marginLeft={0} mb={4} textAlign={'start'} variant='body2'>
                        {projek.user.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </>
            </TabPanel>
            {session.status === 'authenticated' &&
              (session.data.role == 'teamleader' || session.data.role == 'admin') &&
              arrId.includes(session.data.uid) && (
                <TabPanel value='5' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
                  {dataPHreal.length > 0 ? (
                    <DataGrid
                      rowHeight={65}
                      initialState={{
                        sorting: {
                          sortModel: [{ field: 'nama', sort: 'asc' }]
                        }
                      }}
                      rows={rowsPH}
                      columns={columnsPH}
                      sx={{
                        height: rowsPH.length > 3 ? '80vh' : '45vh',
                        // overflowY: 'auto',
                        width: '100%'
                      }}
                    />
                  ) : (
                    // dataPHreal.map(ph => (
                    //   <>
                    //     {' '}
                    //     <List key={ph.id}>
                    //       <ListItem
                    //         secondaryAction={
                    //           <IconButton
                    //             onClick={() => {
                    //               Swal.fire({
                    //                 title: 'Hapus Kegiatan Harian?',
                    //                 text: '',
                    //                 icon: 'warning',
                    //                 showCancelButton: true,
                    //                 confirmButtonColor: '#3085d6',
                    //                 cancelButtonColor: '#d33',
                    //                 confirmButtonText: 'Yes'
                    //               }).then(result => {
                    //                 if (result.isConfirmed) {
                    //                   handleDeleteKegiatanHarian(ph.id)
                    //                 }
                    //               })
                    //             }}
                    //             edge='end'
                    //             aria-label='delete'
                    //           >
                    //             <DeleteIcon />
                    //           </IconButton>
                    //         }
                    //       >
                    //         <ListItemAvatar>
                    //           <Avatar>
                    //             <FolderIcon />
                    //           </Avatar>
                    //         </ListItemAvatar>
                    //         <ListItemText primary={ph.namaKegiatan + ' (' + ph.mulai + ' jam)'} />
                    //       </ListItem>
                    //     </List>
                    //   </>
                    // ))
                    <>
                      <Typography>Belum Ada Pekerjaan Harian Pada Kegiatan Ini</Typography>
                    </>
                  )}
                </TabPanel>
              )}
            <Divider sx={{ marginTop: 3.5 }} />
            {/* {session.status === 'authenticated' && (arrId.includes(session.data.uid) || session.data.uid === 1099999) && ( */}
            {session.status === 'authenticated' && (session.data.role == 'teamleader' || session.data.role == 'admin') && (
              <>
                <Grid container sx={{ mt: 3 }} spacing={4}>
                  <Grid item>
                    {/* <Link onClick={e => router.push(`/task-manage/${project.id}`)}>
                      <Button component='div' variant='contained'>
                        Pengaturan Sub Kegiatan
                      </Button>
                    </Link> */}
                    <Button
                      onClick={e => {
                        router.push(`/task-manage-add/${project.id}`)
                      }}
                      variant={'contained'}
                      disabled={arrId.includes(session.data.uid) ? false : true}
                    >
                      Tambah Sub Kegiatan
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={e => {
                        router.push(`/project-ckp-pegawai/${project.id}`)
                      }}
                      component='div'
                      variant={'contained'}
                      disabled={arrId.includes(session.data.uid) ? false : true}
                    >
                      CKP Pegawai
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </TabContext>
      </Card>
    </>
  )
}

export default CardProjectDetail
