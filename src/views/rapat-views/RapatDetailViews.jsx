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

import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'
import router from 'next/router'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const RapatDetailViews = props => {
  const session = useSession()
  console.log(session)

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

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Detail Rapat</Typography>
        </Grid>
      </Grid>
      <Card>
        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
          <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
            {props.dataRapat.namaRapat}
          </Typography>
          <br></br>
          <Grid container spacing={6}>
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
                <Typography variant='body2'>{new Date(props.dataRapat.startDate).toLocaleDateString('id')}</Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>{new Date(props.dataRapat.endDate).toLocaleDateString('id')}</Typography>
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
          {session.status === 'authenticated' && session.data.uid === 1099999 && (
            <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                onClick={e => router.push(`/edit-meeting/${props.data.id}`)}
                size='medium'
                type='submit'
                sx={{ mr: 2 }}
                variant='contained'
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete(props.dataRapat.id)}
                size='medium'
                type='submit'
                sx={{ mr: 2 }}
                variant='contained'
              >
                Delete
              </Button>
            </CardActions>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default RapatDetailViews
