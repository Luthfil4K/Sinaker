import BebanKerjaPegawai from 'src/views/beban-kerja-views/BebanKerjaPegawai'
import BebanKerjaMitra from 'src/views/beban-kerja-views/BebanKerjaMitra'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import Account from 'mdi-material-ui/Account'
import IconButton from '@mui/material/IconButton'
import Group from 'mdi-material-ui/AccountBox'

const PeopleViews = props => {
  const router = useRouter()
  const [user, setUser] = useState(props.dataOrganik)
  const [mitra, setMitra] = useState(props.dataMitra)
  const [dataTpp, setdataTpp] = useState(props.dataTpp)
  const [viewData, setViewData] = useState(1)

  const handleViewDataGrid = params => {
    setViewData(1)
  }
  const handleViewDataTable = params => {
    setViewData(2)
  }
  const session = useSession()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item md={6}>
          <Button
            onClick={handleViewDataGrid}
            sx={{
              width: 10,
              paddingLeft: 8
            }}
            size='medium'
            color={viewData == 2 ? 'warning' : 'primary'}
            variant='contained'
            startIcon={<Account />}
          ></Button>

          <Button
            onClick={handleViewDataTable}
            sx={{
              marginLeft: 2,
              width: 10,
              paddingLeft: 8
            }}
            size='medium'
            variant='contained'
            color={viewData == 1 ? 'warning' : 'primary'}
            startIcon={<Group />}
          ></Button>
        </Grid>
        <Grid item md={6} display={'flex'} justifyContent={'end'}>
          <Typography sx={{ textAlign: 'center' }} variant={'h5'}>
            Beban Kerja {viewData == 1 ? 'Pegawai' : 'Mitra'}
          </Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <Card>
            <Box sx={{ width: '100%' }}>
              {viewData == 1 ? (
                <BebanKerjaPegawai dataUser={user} dataTpp={dataTpp}></BebanKerjaPegawai>
              ) : (
                <BebanKerjaMitra data={mitra} dataTpp={dataTpp}></BebanKerjaMitra>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PeopleViews
