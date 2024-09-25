import TablePeopleCKP from 'src/views/tables/TablePeopleCKP'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

const CkpPegawaiPPViews = props => {
  const router = useRouter()

  const [cardP, setCardP] = useState(props.data)
  const [dataTpp, setdataTpp] = useState(props.dataTpp)
  const session = useSession()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>Daftar Pegawai</Typography>
        </Grid>

        <Grid item md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
            <TablePeopleCKP dataUser={cardP} dataTpp={dataTpp}></TablePeopleCKP>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default CkpPegawaiPPViews
