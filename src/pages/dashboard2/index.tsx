// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** Icons Imports
// import Poll from 'mdi-material-ui/Poll'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import TableTask from 'src/views/tables/TableTask'
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
// import Table from 'src/views/dashboard/Table'
// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <Card sx={{ padding: 4, height: 250 }}>
                <Typography variant={'h5'}>Tugas hari ini</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card sx={{ padding: 4, height: 200 }}>
                <Typography variant={'h6'}>Pengumuman</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card sx={{ padding: 4, height: 200 }}>
                <Typography variant={'h6'}>Jadwal</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Card sx={{ padding: 4, height: 465 }}>
            <Typography variant={'h6'}>Rapat hari ini</Typography>
            <Divider></Divider>
          </Card>
        </Grid>
      </Grid>
      <Grid mt={1} container spacing={4}>
        <Grid item md={6}>
          <Card sx={{ padding: 4, height: 250 }}>
            <Typography variant={'h6'}>Grafik</Typography>
            <Divider></Divider>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card sx={{ padding: 4, height: 250 }}>
            <Typography variant={'h6'}>Grafik</Typography>
            <Divider></Divider>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
