import * as React from 'react'
import { useState } from 'react'

// ** MUI Imports
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** MUI chart
// import { BarPlot } from '@mui/x-charts/BarChart'
// import { ChartContainer } from '@mui/x-charts/ChartContainer'

// Chart js
import { Line, Bar } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const dataawal = [12, 19, 3, 5, 2, 3, 8, 10, 6, 7, 14, 12]
  const [target, setTarget] = useState(dataawal)
  const [valueDrop, setValueDrop] = useState(0)
  const [realisasi, setRealisasi] = useState(dataawal)
  const handleChangeBar = event => {
    // if(event.target.value === "objectkegiatan")
    setTarget([122, 129, 23, 25, 22, 23, 82, 120, 62, 72, 142, 122])
    setRealisasi([122, 129, 23, 25, 22, 32, 28, 210, 62, 7, 124, 122])
    console.log(event.target.value)
    setValueDrop(event.target.value)
  }
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Realisasi',
        data: target, // Tambahkan data sesuai bulan
        backgroundColor: ['rgba(255, 99, 132, 0.9)']
      },
      {
        label: 'Target',
        data: realisasi, // Tambahkan data sesuai bulan
        backgroundColor: ['rgba(255, 159, 64, 0.9)']
      }
    ]
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Card sx={{ padding: 4, height: 250 }}>
                <Typography variant={'h5'}>Tugas hari ini</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Card sx={{ padding: 4, height: 200 }}>
                <Typography variant={'h6'}>Pengumuman</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Card sx={{ padding: 4, height: 200 }}>
                <Typography variant={'h6'}>Jadwal</Typography>
                <Divider></Divider>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 4, height: 465 }}>
            <Typography variant={'h6'}>Rapat hari ini</Typography>
            <Divider></Divider>
          </Card>
        </Grid>
      </Grid>
      <Grid mt={1} container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 4, height: 350 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Typography variant={'h6'}>Grafik</Typography>
              </Grid>
              <Grid item xs={6} md={6} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={valueDrop}
                    label='Fungsi'
                    size={'small'}
                  >
                    <MenuItem value={10}>IPDS</MenuItem>
                    <MenuItem value={20}>Umum</MenuItem>
                    <MenuItem value={30}>Nerwilis</MenuItem>
                    <MenuItem value={40}>Distribusi</MenuItem>
                    <MenuItem value={50}>Produksi</MenuItem>
                    <MenuItem value={60}>Sosial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Line
              datasetIdKey='id'
              data={{
                labels: ['Jun', 'Jul', 'Aug'],
                datasets: [
                  {
                    label: 's',
                    data: [5, 6, 7]
                  },
                  {
                    label: 'w',
                    data: [3, 2, 1]
                  }
                ]
              }}
            />

            <Divider></Divider>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 4, height: 350 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Typography variant={'h6'}>Grafik</Typography>
              </Grid>
              <Grid item xs={6} md={6} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={valueDrop}
                    label='Fungsi'
                    onChange={handleChangeBar}
                    size={'small'}
                  >
                    <MenuItem value={10}>IPDS</MenuItem>
                    <MenuItem value={20}>Umum</MenuItem>
                    <MenuItem value={30}>Nerwilis</MenuItem>
                    <MenuItem value={40}>Distribusi</MenuItem>
                    <MenuItem value={50}>Produksi</MenuItem>
                    <MenuItem value={60}>Sosial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Bar
              data={data}
              width={400}
              height={200}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                  }
                }
              }}
            />
            <Divider></Divider>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
    // <ApexChartWrapper>
    //   <Grid container spacing={6}>
    //     <Grid item xs={12} md={4}>
    //       <Trophy />
    //     </Grid>
    //     <Grid item xs={12} md={8}>
    //       <StatisticsCard />
    //     </Grid>
    //     <Grid item xs={12} md={6} lg={4}>
    //       <WeeklyOverview />
    //     </Grid>
    //     <Grid item xs={12} md={6} lg={4}>
    //       <TotalEarning />
    //     </Grid>
    //     <Grid item xs={12} md={6} lg={4}>
    //       <Grid container spacing={6}>
    //         <Grid item xs={6}>
    //           <CardStatisticsVerticalComponent
    //             stats='$25.6k'
    //             icon={<Poll />}
    //             color='success'
    //             trendNumber='+42%'
    //             title='Total Profit'
    //             subtitle='Weekly Profit'
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <CardStatisticsVerticalComponent
    //             stats='$78'
    //             title='Refunds'
    //             trend='negative'
    //             color='secondary'
    //             trendNumber='-15%'
    //             subtitle='Past Month'
    //             icon={<CurrencyUsd />}
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <CardStatisticsVerticalComponent
    //             stats='862'
    //             trend='negative'
    //             trendNumber='-18%'
    //             title='New Project'
    //             subtitle='Yearly Project'
    //             icon={<BriefcaseVariantOutline />}
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <CardStatisticsVerticalComponent
    //             stats='15'
    //             color='warning'
    //             trend='negative'
    //             trendNumber='-18%'
    //             subtitle='Last Week'
    //             title='Sales Queries'
    //             icon={<HelpCircleOutline />}
    //           />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item xs={12} md={6} lg={4}>
    //       <SalesByCountries />
    //     </Grid>
    //     <Grid item xs={12} md={12} lg={8}>
    //       <DepositWithdraw />
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Table />
    //     </Grid>
    //   </Grid>
    // </ApexChartWrapper>
  )
}

export default Dashboard
