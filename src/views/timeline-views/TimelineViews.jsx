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

import { useRouter } from 'next/dist/client/router'

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

const TimelineViews = () => {
  const router = useRouter()
  const currentDate = '2023-07-23'
  const appointments = [
    {
      title: (
        <Link
          onClick={e => {
            router.push('/project-detail')
          }}
        >
          <Typography variant='body2' color={'white'}>
            Klik disini
          </Typography>
        </Link>
      ),
      startDate: new Date(2023, 6, 23, 9),
      endDate: new Date(2023, 6, 23, 11)
    },
    {
      title: 'Book',
      startDate: new Date(2023, 6, 23, 12),
      endDate: new Date(2023, 6, 23, 13)
    },
    {
      title: (
        <Link
          onClick={e => {
            router.push('/project-detail')
          }}
        >
          <Typography variant='body2' color={'white'}>
            Sakernas Semesteran (pengolahan)
          </Typography>
        </Link>
      ),
      startDate: new Date(2023, 6, 12, 14),
      endDate: new Date(2023, 6, 14, 15)
    },
    {
      title: (
        <Link
          onClick={e => {
            router.push('/project-detail')
          }}
        >
          <Typography variant='body2' color={'white'}>
            Nama Kegiatan
          </Typography>
        </Link>
      ),
      startDate: new Date(2023, 6, 24, 10),
      endDate: new Date(2023, 6, 24, 11)
    }
  ]

  return (
    <>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView timeTableCellComponent={TimeTableCell} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    </>
  )
}

export default TimelineViews

// import * as React from 'react'
// import { styled, darken, alpha, lighten } from '@mui/material/styles'
// import Paper from '@mui/material/Paper'
// import TableCell from '@mui/material/TableCell'
// import Typography from '@mui/material/Typography'
// import { ViewState, EditingState } from '@devexpress/dx-react-scheduler'
// import classNames from 'clsx'
// import {
//   Scheduler,
//   MonthView,
//   Appointments,
//   Toolbar,
//   DateNavigator,
//   AppointmentTooltip,
//   AppointmentForm,
//   EditRecurrenceMenu,
//   Resources,
//   DragDropProvider
// } from '@devexpress/dx-react-scheduler-material-ui'
// import WbSunny from '@mui/icons-material/WbSunny'
// import FilterDrama from '@mui/icons-material/FilterDrama'
// import Opacity from '@mui/icons-material/Opacity'
// import ColorLens from '@mui/icons-material/ColorLens'
// import { owners } from 'src/demo-data/tasks'

// const PREFIX = 'Demo'

// const classes = {
//   cell: `${PREFIX}-cell`,
//   content: `${PREFIX}-content`,
//   text: `${PREFIX}-text`,
//   sun: `${PREFIX}-sun`,
//   cloud: `${PREFIX}-cloud`,
//   rain: `${PREFIX}-rain`,
//   sunBack: `${PREFIX}-sunBack`,
//   cloudBack: `${PREFIX}-cloudBack`,
//   rainBack: `${PREFIX}-rainBack`,
//   opacity: `${PREFIX}-opacity`,
//   appointment: `${PREFIX}-appointment`,
//   apptContent: `${PREFIX}-apptContent`,
//   flexibleSpace: `${PREFIX}-flexibleSpace`,
//   flexContainer: `${PREFIX}-flexContainer`,
//   tooltipContent: `${PREFIX}-tooltipContent`,
//   tooltipText: `${PREFIX}-tooltipText`,
//   title: `${PREFIX}-title`,
//   icon: `${PREFIX}-icon`,
//   circle: `${PREFIX}-circle`,
//   textCenter: `${PREFIX}-textCenter`,
//   dateAndTitle: `${PREFIX}-dateAndTitle`,
//   titleContainer: `${PREFIX}-titleContainer`,
//   container: `${PREFIX}-container`
// }

// const getBorder = theme =>
//   `1px solid ${
//     theme.palette.mode === 'light'
//       ? lighten(alpha(theme.palette.divider, 1), 0.88)
//       : darken(alpha(theme.palette.divider, 1), 0.68)
//   }`

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${classes.cell}`]: {
//     color: '#78909C!important',
//     position: 'relative',
//     userSelect: 'none',
//     verticalAlign: 'top',
//     padding: 0,
//     height: 100,
//     borderLeft: getBorder(theme),
//     '&:first-of-type': {
//       borderLeft: 'none'
//     },
//     '&:last-child': {
//       paddingRight: 0
//     },
//     'tr:last-child &': {
//       borderBottom: 'none'
//     },
//     '&:hover': {
//       backgroundColor: 'white'
//     },
//     '&:focus': {
//       backgroundColor: alpha(theme.palette.primary.main, 0.15),
//       outline: 0
//     }
//   },
//   [`&.${classes.sunBack}`]: {
//     backgroundColor: '#FFFDE7'
//   },
//   [`&.${classes.cloudBack}`]: {
//     backgroundColor: '#ECEFF1'
//   },
//   [`&.${classes.rainBack}`]: {
//     backgroundColor: '#E1F5FE'
//   },
//   [`&.${classes.opacity}`]: {
//     opacity: '0.5'
//   }
// }))
// const StyledDivText = styled('div')(() => ({
//   [`&.${classes.text}`]: {
//     padding: '0.5em',
//     textAlign: 'center'
//   }
// }))
// const StyledDivContent = styled('div')(() => ({
//   [`&.${classes.content}`]: {
//     display: 'flex',
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     alignItems: 'center'
//   }
// }))

// const CellBase = React.memo(({ startDate, formatDate }) => {
//   const isFirstMonthDay = startDate.getDate() === 1
//   const formatOptions = isFirstMonthDay ? { day: 'numeric', month: 'long' } : { day: 'numeric' }
//   return (
//     <StyledTableCell
//       tabIndex={0}
//       className={classNames({
//         [classes.cell]: true
//       })}
//     >
//       <StyledDivContent className={classes.content}></StyledDivContent>
//       <StyledDivText className={classes.text}>{formatDate(startDate, formatOptions)}</StyledDivText>
//     </StyledTableCell>
//   )
// })

// const TimeTableCell = CellBase

// const kegiatan = [
//   {
//     title: 'Webs',
//     startDate: new Date(2023, 6, 23, 9),
//     endDate: new Date(2023, 6, 23, 11)
//   },
//   {
//     title: 'Book',
//     startDate: new Date(2023, 6, 23, 12),
//     endDate: new Date(2023, 6, 23, 13)
//   },
//   {
//     title: 'In',
//     startDate: new Date(2023, 6, 23, 14),
//     endDate: new Date(2023, 6, 23, 15)
//   },
//   {
//     title: 'Ap',
//     startDate: new Date(2023, 6, 24, 10),
//     endDate: new Date(2023, 6, 24, 11)
//   }
// ]

// export default class TimelinesViews extends React.PureComponent {
//   render() {
//     // const { data } = this.state

//     return (
//       <Paper>
//         <Scheduler data={kegiatan}>
//           {/* <EditingState onCommitChanges={this.commitChanges} /> */}
//           <ViewState defaultCurrentDate='2023-07-17' />

//           <MonthView timeTableCellComponent={TimeTableCell} />
//           {/* <Appointments appointmentComponent={Appointment} appointmentContentComponent={AppointmentContent} /> */}
//           {/* <Resources data={resources} /> */}
//           <Toolbar />
//           <DateNavigator />
//           {/* <EditRecurrenceMenu /> */}
//           {/* <AppointmentTooltip showCloseButton showDeleteButton showOpenButton /> */}
//           {/* <AppointmentForm /> */}
//           {/* <DragDropProvider /> */}
//         </Scheduler>
//       </Paper>
//     )
//   }
// }
