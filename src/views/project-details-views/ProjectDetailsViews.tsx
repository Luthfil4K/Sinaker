import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Mui Import
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CardProjectDetail from 'src/views/cards/CardProjectDetail'
import CardProjectDetailTask from 'src/views/cards/CardProjectDetailTask'
import CardProjectDetailProgress from 'src/views/cards/CardProjectDetailProgress'

// icon

const ProjectDetailsViews = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          <CardProjectDetail></CardProjectDetail>
        </Grid>
        <Grid item sm={12} md={4}>
          <CardProjectDetailProgress></CardProjectDetailProgress>
        </Grid>
        <Grid item sm={12} md={12}>
          <CardProjectDetailTask />
        </Grid>
      </Grid>
      <Grid mt={2} container>
        <Grid item md={12} display={'flex'} justifyContent={'end'} flexDirection={'row'}>
          <Button size='medium' variant={'contained'} sx={{ margin: 2 }}>
            Edit
          </Button>
          <Button size='medium' variant={'contained'} sx={{ margin: 2 }}>
            Delete
          </Button>
          <Button size='medium' variant={'contained'} sx={{ margin: 2 }}>
            Archieve
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectDetailsViews
