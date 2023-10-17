// ** React Imports
import { useState } from 'react'
// next
import { useRouter } from 'next/dist/client/router'
// ** MUI Imports
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const MitraDetailGajiViews = props => {
  const statusObj = {
    0: { color: 'error', status: 'Overload' },
    1: { color: 'success', status: 'Available' }
  }
  const router = useRouter()
  const [tpp, setTpp] = useState(props.dataTpp)
  const [values, setValues] = useState({
    id: props.data[0].id,
    mitraNama: props.data[0].name,
    mitraNIK: props.data[0].nik,
    mitraJenisKelamin: props.data[0].jenisKelamin,
    mitraUmur: props.data[0].umur,
    mitraPendidikan: props.data[0].pendidikan,
    mitraEmail: props.data[0].email,
    mitraStatus: props.data[0].status,
    mitraTanggalLahir: props.data[0].tanggalLahir
  })

  // const [oktober, setOktober] = useState(() => {
  //   console.log(tpp)
  //   const totalGajiOktober = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

  //   const perusahaan = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .map(data => data.nama)

  //   const subKeg = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .reduce((uniqueItems, data) => {
  //       const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

  //       if (existingItem) {
  //         existingItem.taskTotalGaji += data.gajiPcl
  //         existingItem.listPerusahaan.push(data.nama)
  //         existingItem.gajiPerusahaan.push(data.gajiPcl)
  //       } else {
  //         uniqueItems.push({
  //           nama: data.task.title,
  //           taskId: data.taskId,
  //           taskTotalGaji: data.gajiPcl,
  //           listPerusahaan: [data.nama],
  //           gajiPerusahaan: [data.gajiPcl]
  //         })
  //       }

  //       return uniqueItems
  //     }, [])
  //   const totalGajiSubkeg = tpp
  //     .filter(tppRow => tppRow.pclId === values.id)
  //     .filter(tppRow => {
  //       const tppDueDate = new Date(tppRow.task.duedate)
  //       return tppDueDate.getMonth() === 9 // Oktober memiliki indeks bulan 9
  //     })
  //     .map(data => data.task.title)
  //     .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

  //   return { totalGajiOktober, perusahaan, subKeg, totalGajiSubkeg }
  // })

  const [bulanData, setBulanData] = useState(() => {
    const bulanData = []

    for (let bulan = 0; bulan < 12; bulan++) {
      const totalGajiBulan = tpp
        .filter(tppRow => tppRow.pclId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan
        })
        .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

      const subKeg = tpp
        .filter(tppRow => tppRow.pclId === values.id)
        .filter(tppRow => {
          const tppDueDate = new Date(tppRow.task.duedate)
          return tppDueDate.getMonth() === bulan
        })
        .reduce((uniqueItems, data) => {
          const existingItem = uniqueItems.find(item => item.taskId === data.taskId)

          if (existingItem) {
            existingItem.taskTotalGaji += data.gajiPcl
            existingItem.listPerusahaan.push(data.nama)
            existingItem.gajiPerusahaan.push(data.gajiPcl)
          } else {
            uniqueItems.push({
              nama: data.task.title,
              taskId: data.taskId,
              taskTotalGaji: data.gajiPcl,
              listPerusahaan: [data.nama],
              gajiPerusahaan: [data.gajiPcl]
            })
          }

          return uniqueItems
        }, [])

      bulanData.push({ totalGajiBulan, subKeg })
    }

    return bulanData
  })

  function BulanCard({ namaBulan, totalGaji, subKegData }) {
    const [collapse, setCollapse] = useState(false)

    const handleClick = () => {
      setCollapse(!collapse)
    }

    return (
      <Grid item md={4} xs={6}>
        <Card>
          <CardMedia sx={{ height: '0.5rem' }} image='/images/cards/paper-boat.png' />
          <CardContent>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
              {namaBulan}
            </Typography>
            <Divider sx={{ margin: 0 }} />
            <p>Total Gaji: Rp{totalGaji.toLocaleString('id-ID')}</p>

            {subKegData.map(subKeg => (
              <div key={subKeg.taskId}>
                <Typography>
                  {subKeg.nama}: Rp{subKeg.taskTotalGaji.toLocaleString('id-ID')}
                </Typography>
                <ul>
                  {subKeg.listPerusahaan.map((nama, index) => (
                    <li key={nama}>
                      <p>Nama Perusahaan: {nama}</p>
                      <p>Gaji Perusahaan: {subKeg.gajiPerusahaan[index]}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
          <CardActions className='card-action-dense'>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button onClick={handleClick}>Details</Button>
              <IconButton size='small' onClick={handleClick}>
                {collapse ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
              </IconButton>
            </Box>
          </CardActions>
          <Collapse in={collapse}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Typography variant='body2'></Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    )
  }

  const totalGaji = tpp
    .filter(tppRow => tppRow.pclId === values.id)
    .reduce((totalGaji, tppRow) => totalGaji + tppRow.gajiPcl, 0)

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: '6.625rem' }} image='/images/cards/background-user.png' />
        <Avatar
          alt='Robert Meyer'
          src='/images/avatars/jisoo.png'
          sx={{
            width: 75,
            height: 75,
            left: '1.313rem',
            top: '4.28125rem',
            position: 'absolute',
            border: theme => `0.25rem solid ${theme.palette.common.white}`
          }}
        />
        <CardContent>
          <Box
            // bgcolor={'success.main'}
            sx={{
              mt: 5.75,
              mb: 1.75,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Grid container spacing={6}>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>NIK</Typography>
                <Typography variant='caption'>{values.mitraNIK}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Nama</Typography>
                <Typography variant='caption'>{values.mitraNama}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Email</Typography>
                <Typography variant='caption'>{values.mitraEmail}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Jenis Kelamin</Typography>
                <Typography variant='caption'>{values.mitraJenisKelamin}</Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Tanggal Lahir</Typography>
                <Typography variant='caption'>
                  {new Date(values.mitraTanggalLahir).toLocaleDateString('id-ID')}
                </Typography>
              </Grid>

              <Grid item md={2} xs={6}>
                <Typography variant='body1'>Status Bulan Ini</Typography>
                <Chip
                  label={statusObj[totalGaji < 100000 ? 1 : 0].status}
                  color={statusObj[totalGaji < 100000 ? 1 : 0].color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    width: 100,
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500 }
                  }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Divider sx={{ marginTop: 1.5, marginBottom: 1.75 }} />
              </Grid>
              <Grid item md={6} xs={6} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                <Typography variant='h6'>Total Gaji : Rp</Typography>
                <Typography
                  sx={{ marginRight: 30, fontWeight: 500, fontSize: '1.2rem !important', textAlign: 'center' }}
                >
                  {`${totalGaji.toLocaleString('id-ID')}`}
                </Typography>
              </Grid>
              <Grid item md={6} xs={6} display={'flex'} justifyContent={'end'}>
                <Button
                  onClick={e => {
                    e.preventDefault()
                    router.push(`/mitra-edit/${props.data[0].id}`)
                  }}
                  variant='contained'
                >
                  Edit Mitra
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Grid container spacing={4} mt={5}>
        {bulanData.map((data, index) => (
          <BulanCard
            key={index}
            namaBulan={`Bulan ${index + 1}`}
            totalGaji={data.totalGajiBulan}
            subKegData={data.subKeg}
          />
        ))}
      </Grid>
      {/* <Grid container spacing={4} mt={5}>
        <Grid item md={3} xs={6}>
          <Card>
            <CardMedia sx={{ height: '0.5rem' }} image='/images/cards/paper-boat.png' />
            <CardContent>
              <Typography variant='h5' sx={{ marginBottom: 2 }}>
                Oktober
              </Typography>
              <Divider sx={{ margin: 0 }} />
              <p>Total Gaji: Rp{oktober.totalGajiOktober.toLocaleString('id-ID')}</p>

              {oktober.subKeg.map(subKeg => (
                <>
                  <Typography key={subKeg.taskId}>
                    {subKeg.nama}: Rp{subKeg.taskTotalGaji.toLocaleString('id-ID')}
                  </Typography>
                  <ul>
                    {subKeg.listPerusahaan.map((nama, index) => (
                      <li key={nama}>
                        <p>Nama Perusahaan: {nama}</p>
                        <p>Gaji Perusahaan: {subKeg.gajiPerusahaan[index]}</p>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button onClick={handleClick}>Details</Button>
                <IconButton size='small' onClick={handleClick}>
                  {collapse ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </Box>
            </CardActions>
            <Collapse in={collapse}>
              <Divider sx={{ margin: 0 }} />
              <CardContent>
                <Typography variant='body2'>
                  I&prime;m a thing. But, like most politicians, he promised more than he could deliver. You won&prime;t
                  have time for sleeping, soldier, not with all the bed making you&prime;ll be doing. Then we&prime;ll
                  go with that data file! Hey, you add a one and two zeros to that or we walk! You&prime;re going to do
                  his laundry? I&prime;ve got to find a way to escape.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid> */}
    </>
  )
}

export default MitraDetailGajiViews