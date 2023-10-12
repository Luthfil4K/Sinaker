import { useState, useEffect, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

//other
import { useRouter } from 'next/dist/client/router'

import TableMitra from 'src/views/tables/TableMitra'

const MitraListViews = props => {
  const router = useRouter()

  const [mitra, setMitra] = useState(props.data)
  console.log(mitra)

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Daftar Mitra</Typography>
        </Grid>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
          <Link onClick={e => router.push(`/mitra-add`)}>
            <Button variant={'contained'}> Tambah Mitra</Button>
          </Link>
        </Grid>
        {/* <Typography>{gaji.toLocaleString('id-ID', { currency: 'IDR' })}</Typography> */}
        <Grid item md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
            <TableMitra data={mitra}></TableMitra>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default MitraListViews
