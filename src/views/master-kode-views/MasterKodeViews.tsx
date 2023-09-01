import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import TableMasterKode from 'src/views/tables/TableMasterKode'

const MasterKodeViews = () => {
  const router = useRouter()
  return (
    <>
      <Grid container spacing={4}>
        <Grid item display={'flex'} justifyContent={'end'} md={12}>
          <Link>
            <Button
              onClick={e => {
                router.push('/master-kode-add')
              }}
              variant={'contained'}
            >
              Tambah Kode
            </Button>
          </Link>
        </Grid>
        <TableMasterKode></TableMasterKode>
      </Grid>
    </>
  )
}

export default MasterKodeViews
