import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import { useRouter } from 'next/dist/client/router'

import TableMasterKode from 'src/views/tables/TableMasterKode'

const MasterKodeViews = () => {
  return (
    <>
      <TableMasterKode></TableMasterKode>
    </>
  )
}

export default MasterKodeViews
