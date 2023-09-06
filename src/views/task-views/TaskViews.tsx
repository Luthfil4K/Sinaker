import TableTask from '../tables/TableTask'
import Grid from '@mui/material/Grid'

const TaskViews = () => {
  return (
    <>
      <Grid container spacing={4}>
        <TableTask></TableTask>
      </Grid>
    </>
  )
}

export default TaskViews
