// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Grid from '@mui/material/Grid'

import Divider from '@mui/material/Divider'

import CardHeader from '@mui/material/CardHeader'
import * as React from 'react'

// circular bar
import CircularProgress from '@mui/material/CircularProgress'

const CardProjectDetailProgress = () => {
  return (
    <>
      <Card sx={{ height: 350, overflowY: 'scroll' }}>
        <CardHeader
          title='Project Progress'
          titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        />
        <CardContent>
          <Grid container>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid
                // bgcolor={'primary.light'}
                justifyContent='center'
                alignItems='center'
                display={'flex'}
                item
                md={12}
                style={{ position: 'relative' }}
              >
                <Typography
                  textAlign={'center'}
                  mt={0}
                  variant='h1'
                  sx={{
                    fontWeight: 600,
                    fontSize: '3.5rem !important',
                    position: 'absolute',
                    zIndex: 1
                  }}
                >
                  {Math.round(Number(30))}%
                </Typography>
                <CircularProgress size={170} value={80} variant='indeterminate' sx={{ marginBottom: 1 }} />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 3.5 }} />
          <Typography textAlign={'center'} mt={4} variant={'body2'}>
            "this is for quote lorem ipsum dolor dolor si Amet"
          </Typography>
          <Typography textAlign={'center'} variant={'body2'}>
            - aabbcc
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default CardProjectDetailProgress
