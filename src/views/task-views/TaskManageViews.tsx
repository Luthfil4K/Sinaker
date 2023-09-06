import TableManageTaskList from 'src/views/tables/TableManageTaskList'
import TableManageTaskPeople from 'src/views/tables/TableManageTaskPeople'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

import { useRouter } from 'next/dist/client/router'

const TaskManageViews = () => {
  const router = useRouter()
  return (
    <>
      <Grid container spacing={4}>
        <Grid display={'flex'} item md={6} mb={4}>
          <Typography fontWeight={500} variant={'h5'} mx={2} my={2}>
            Pengaturan Tugas
          </Typography>
        </Grid>
        <Grid display={'flex'} justifyContent={'end'} item md={6} mb={4}>
          <Link>
            <Button
              onClick={e => {
                router.push('/task-manage-add')
              }}
              variant={'contained'}
            >
              Tambah Task
            </Button>
          </Link>
        </Grid>
        <Grid item md={12} xs={12}>
          <Card sx={{ paddingTop: 2 }}>
            <Typography fontWeight={500} variant={'h6'} mx={2} my={2}>
              Daftar Tugas in this Project
            </Typography>
            <TableManageTaskList></TableManageTaskList>
          </Card>
        </Grid>
        <Grid item md={12} xs={12}>
          <Card sx={{ paddingTop: 2 }}>
            <Typography fontWeight={500} variant={'h6'} mx={2} my={2}>
              Daftar Pegawai in this Project
            </Typography>
            <TableManageTaskPeople></TableManageTaskPeople>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TaskManageViews
