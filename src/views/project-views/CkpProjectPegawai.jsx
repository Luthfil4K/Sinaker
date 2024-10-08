import TableCkpKegiatan from 'src/views/tables/TableCkpKegiatan'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

const CkpProjectPegawai = props => {
  const router = useRouter()
  const [cardP, setCardP] = useState(props.data)
  const [dataTpp, setdataTpp] = useState(props.dataTpp)
  const session = useSession()
  console.log(session)

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'}>
          <Typography variant={'h5'}>{props.data.title}</Typography>
        </Grid>
        <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
          {session.status === 'authenticated' && (session.data.uid === 1099999 || session.data.role == 'admin') && (
            <>
              <Link onClick={e => router.push(`/add-people`)}>
                <Button variant={'contained'}> Tambah Pegawai</Button>
              </Link>
            </>
          )}
        </Grid>
        <Grid item md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
            <TableCkpKegiatan dataUser={cardP.UserProject_member}></TableCkpKegiatan>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default CkpProjectPegawai
