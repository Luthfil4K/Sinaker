import * as React from 'react'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TableCell from '@mui/material/TableCell'
import { styled, darken, alpha, lighten } from '@mui/material/styles'
import { ViewState } from '@devexpress/dx-react-scheduler'
import classNames from 'clsx'
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'
// circular bar
import CircularProgress from '@mui/material/CircularProgress'

import { useRouter } from 'next/dist/client/router'
import { useState, useEffect, useRef } from 'react'

// import { appointments } from 'src/demo-data/month-appointments'

const PREFIX = 'Demo'

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`
}

const getBorder = theme =>
  `1px solid ${
    theme.palette.mode === 'light'
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68)
  }`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: '#78909C!important',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'top',
    padding: 0,
    height: 150,
    borderLeft: getBorder(theme),
    '&:first-of-type': {
      borderLeft: 'none'
    },
    '&:last-child': {
      paddingRight: 0
    },
    'tr:last-child &': {
      borderBottom: 'none'
    },
    '&:hover': {
      backgroundColor: 'white'
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0
    }
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: '#FFFDE7'
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: '#ECEFF1'
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: '#E1F5FE'
  },
  [`&.${classes.opacity}`]: {
    opacity: '0.5'
  }
}))
const StyledDivText = styled('div')(() => ({
  [`&.${classes.text}`]: {
    padding: '0.5em',
    textAlign: 'center'
  }
}))
const StyledDivContent = styled('div')(() => ({
  [`&.${classes.content}`]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center'
  }
}))

const CellBase = React.memo(({ startDate, formatDate }) => {
  const isFirstMonthDay = startDate.getDate() === 1
  const formatOptions = isFirstMonthDay ? { day: 'numeric', month: 'long' } : { day: 'numeric' }
  return (
    <StyledTableCell
      tabIndex={0}
      className={classNames({
        [classes.cell]: true
      })}
    >
      <StyledDivContent className={classes.content}></StyledDivContent>
      <StyledDivText className={classes.text}>{formatDate(startDate, formatOptions)}</StyledDivText>
    </StyledTableCell>
  )
})

const TimeTableCell = CellBase

const TimelineViews = props => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // const currentDate = '2023-07-23'
  const currentDateChange = currentDate => {
    setCurrentDate(currentDate)
  }

  const router = useRouter()

  const [cardP, setCardP] = useState(
    props.data.length > 0
      ? props.data.map(item => {
          return { ...item, tugas: 1 } // Menambahkan properti "alamat"
        })
      : ''
  )

  const [rapat, setRapat] = useState(
    props.dataRapat.length > 0
      ? props.dataRapat.map(item => {
          return { ...item, tugas: 0, duedate: item.startDate } // Menambahkan properti "alamat"
        })
      : ''
  )

  const gabungan = [...cardP, ...rapat]

  const appointments = gabungan.map(task => ({
    title: (
      <>
        {task.tugas === 1 ? (
          <>
            <Grid container>
              <Grid item md={12} display={'flex'}>
                <Link
                  onClick={e => {
                    router.push(`/project-detail/${task.project.id}`)
                  }}
                >
                  <Typography variant='body2' sx={{ textDecoration: 'underline', cursor: 'pointer' }} color={'white'}>
                    {task.title}
                  </Typography>
                </Link>
              </Grid>
              <Grid container mt={1}>
                <Grid
                  item
                  md={12}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Typography
                    textAlign={'center'}
                    mt={0}
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      marginTop: 0,
                      position: 'absolute',
                      zIndex: 1
                    }}
                  >
                    {/*                     {Math.ceil(100 * (task.realisasi / task.target)) == 0 */}
                    {task.realisasi && task.target === 0
                      ? 0
                      : task.realisasi == 0
                      ? 0
                      : `${Math.ceil(100 * (task.realisasi / task.target))}%`}
                  </Typography>
                  <CircularProgress
                    size={60}
                    value={
                      task.realisasi && task.target === 0
                        ? 0
                        : task.realisasi == 0
                        ? 0
                        : Math.ceil(100 * (task.realisasi / task.target))
                    }
                    variant='determinate'
                    sx={{ marginBottom: 1 }}
                    color={
                      Math.ceil(100 * (task.realisasi / task.target)) == 100
                        ? 'success'
                        : Math.ceil(100 * (task.realisasi / task.target)) < 50
                        ? 'error'
                        : 'warning'
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container>
              <Grid item md={12} display={'flex'}>
                <Link
                  onClick={e => {
                    router.push(`/rapat-detail/${task.id}`)
                  }}
                >
                  <Typography variant='body2' sx={{ textDecoration: 'underline', cursor: 'pointer' }} color={'white'}>
                    {task.namaRapat}
                  </Typography>
                  <Typography textAlign={'center'} variant='body2' color={'white'}>
                    {new Date(task.startDate).getHours().toString().padStart(2, '0')}:
                    {new Date(task.startDate).getMinutes().toString().padStart(2, '0')} -
                    {new Date(task.duedate).getHours().toString().padStart(2, '0')}:
                    {new Date(task.duedate).getMinutes().toString().padStart(2, '0')}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </>
        )}
      </>
    ),
    startDate: new Date(task.duedate).setHours(7),
    endDate: new Date(task.duedate).setHours(9)
  }))

  // {
  // title: (
  //   <>
  //     <Grid container>
  //       <Grid item md={12} display={'flex'}>
  //         <Link
  //           onClick={e => {
  //             router.push('/project-detail')
  //           }}
  //         >
  //           <Typography variant='body2' color={'white'}>
  //             STATISTIK POLITIK DAN KEAMANAN
  //           </Typography>
  //           <Typography variant='body2' color={'white'}>
  //             50%
  //           </Typography>
  //         </Link>
  //       </Grid>
  //     </Grid>
  //   </>
  // ),
  //   startDate: new Date(2023, 6, 23, 9),
  //   endDate: new Date(2023, 6, 23, 11)
  // }

  return (
    <>
      <Grid container>
        <Paper>
          <Scheduler data={appointments}>
            <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
            <MonthView timeTableCellComponent={TimeTableCell} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
      </Grid>
    </>
  )
}

export default TimelineViews
