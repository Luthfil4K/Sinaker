import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useRouter } from 'next/dist/client/router'

import TableMasterIndukKegiatan from 'src/views/tables/TableMasterIndukKegiatan'

const MasterIndukKegiatanViews = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Typography variant={'h4'}>Master Induk Kegiatan</Typography>
        </Grid>
        <Grid item md={12}>
          <TableMasterIndukKegiatan></TableMasterIndukKegiatan>
        </Grid>
      </Grid>
    </>
  )
}

export default MasterIndukKegiatanViews
