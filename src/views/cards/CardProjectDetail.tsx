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

// next
import { useRouter } from 'next/dist/client/router'

// icon
import ClipboardCheck from 'mdi-material-ui/ClipboardCheck'
import AccountCog from 'mdi-material-ui/AccountCog'
import AccountGroup from 'mdi-material-ui/AccountGroup'

// circular bar
import CircularProgress from '@mui/material/CircularProgress'

const ParticipantPeople = () => {
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
        Nama Peserta proyeks
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
            Total Tim
          </Typography>
          <Typography textAlign={'center'} variant='body1' component='span' sx={{ display: 'inline' }}>
            30
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

const CardProjectDetail = () => {
  const router = useRouter()
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Card sx={{ height: 350 }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='card navigation example'>
            <Tab value='1' label='Informasi' />
            <Tab value='2' label='Timeline' />
            <Tab value='3' label='Deskripsi' />
            <Tab value='4' label='Pegawai' />
          </TabList>
          <CardContent>
            <TabPanel value='1' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <TabPanel1 />
            </TabPanel>

            <TabPanel value='2' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <TabPanel2 />
            </TabPanel>
            <TabPanel value='3' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <TabPanel3 />
            </TabPanel>
            <TabPanel value='4' sx={{ p: 0, height: 170, overflowY: 'scroll' }}>
              <TabPanel4 />
            </TabPanel>
            <Divider sx={{ marginTop: 3.5 }} />

            <Grid container sx={{ mt: 3 }} spacing={4}>
              <Grid item>
                <Link onClick={e => router.push('/task-manage')}>
                  <Button component='div' variant='contained'>
                    Pengaturan Tim
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                {/* <Button component='div' variant='contained'>
                  Buat rapat
                </Button> */}
              </Grid>
            </Grid>
          </CardContent>
        </TabContext>
      </Card>
    </>
  )
}

export default CardProjectDetail
