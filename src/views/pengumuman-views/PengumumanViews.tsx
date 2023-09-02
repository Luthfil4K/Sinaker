import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import CardPengumuman from 'src/views/cards/CardPengumuman'

const PengumumanViews = () => {
  return (
    <>
      <Typography variant={'h4'} mb={4}>
        Pengumuman
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={12}>
          <CardPengumuman></CardPengumuman>
        </Grid>
        <Grid item md={12}>
          <CardPengumuman></CardPengumuman>
        </Grid>
      </Grid>
    </>
  )
}

export default PengumumanViews
