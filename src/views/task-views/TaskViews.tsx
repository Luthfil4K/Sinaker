import TableTask from '../tables/TableTask'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

const TaskViews = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Typography variant={'h5'} mb={5}>
          {' '}
          Sub Kegiatan Anda
        </Typography>
        <Grid item md={12}>
          <Card>
            <TableTask></TableTask>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default TaskViews
