// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Link from '@mui/material/Link'
import { useRouter } from 'next/dist/client/router'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// icon
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import LockOutline from 'mdi-material-ui/LockOutline'

const ProjectCard = () => {
  return (
    <>
      <Card>
        <Grid md={6}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={7}>
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
                <Typography variant='h5' sx={{ marginBottom: 3.5, fontWeight: 600 }}>
                  Nama Kegiatan
                </Typography>
                <Typography variant='body2'>project deskripsi</Typography>
                <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <StyledBox>
                      <Box sx={{ mb: 10, mt: 3, display: 'flex', alignItems: 'center' }}>
                        <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                        <Typography variant='body2' sx={{ fontSize: '12px' }}>
                          Start Date: <strong>tanggal sekian</strong>
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                        <Typography variant='body2' sx={{ fontSize: '12px' }}>
                          Members: <strong>sekian People</strong>
                        </Typography>
                      </Box>
                    </StyledBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 10, mt: 3, display: 'flex', alignItems: 'center' }}>
                      <LockOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                      <Typography variant='body2' sx={{ fontSize: '12px' }}>
                        End Date: <strong>deadlne</strong>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ClipboardFileOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                      <Typography variant='body2' sx={{ fontSize: '12px' }}>
                        Total Task: <strong>sekian Task</strong>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Grid
              item
              sm={5}
              xs={12}
              sx={{
                paddingTop: ['0 !important', '1.5rem !important'],
                paddingLeft: ['1.5rem !important', '0 !important']
              }}
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'action.hover',
                  padding: theme => `${theme.spacing(18, 5, 16)} !important`
                }}
              >
                <Box>
                  <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                      {Math.round(Number(30))}%
                    </Typography>
                  </Box>
                  <Typography variant='body2' sx={{ mb: 10, mt: 8, display: 'flex', flexDirection: 'column' }}>
                    {/* <span>{leader[0].toUpperCase()}</span> */}
                    <span>
                      <strong>got </strong>
                    </span>
                    <span>Project Manager</span>
                  </Typography>
                  <Button variant='contained'>View More</Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

const CardProject = () => {
  const router = useRouter()
  return (
    <Card>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant='h5' sx={{ marginBottom: 3.5, fontWeight: 600 }}>
              Nama
            </Typography>
            <Typography variant='body2'>Deskripsi kegiatan</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                {Math.round(Number(30))}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 4.5, marginBottom: 4.75 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <StyledBox>
              <Box sx={{ mb: 10, mt: 3, display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Start Date: <strong>tanggal sekian</strong>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                  Members: <strong>sekian People</strong>
                </Typography>
              </Box>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 10, mt: 3, display: 'flex', alignItems: 'center' }}>
              <LockOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
              <Typography variant='body2' sx={{ fontSize: '12px' }}>
                End Date: <strong>deadlne</strong>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ClipboardFileOutline sx={{ color: 'primary.main', marginRight: 2.25 }} fontSize='small' />
              <Typography variant='body2' sx={{ fontSize: '12px' }}>
                Total Task: <strong>sekian Task</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 4.5, marginBottom: 1.75 }} />
        <Grid justifyContent='end' display='flex'>
          <Link onClick={e => router.push(`/project-detail`)}>
            <Button sx={{ mt: 5 }} variant='contained'>
              View More
            </Button>
          </Link>
        </Grid>
      </CardContent>
    </Card>
  )
}
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {}
}))
const ProjectListViews = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <CardProject></CardProject>
        </Grid>
        <Grid item md={6} xs={12}>
          <CardProject></CardProject>
        </Grid>
        <Grid item md={6} xs={12}>
          <CardProject></CardProject>
        </Grid>
        <Grid item md={6} xs={12}>
          <CardProject></CardProject>
        </Grid>
        <Grid item md={6} xs={12}>
          <CardProject></CardProject>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectListViews
