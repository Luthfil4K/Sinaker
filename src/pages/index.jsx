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

import TableTask from 'src/views/tables/TableTask'

const Dashboard = () => {
  const dataawal = [12, 19, 3, 5, 2, 3, 8, 10, 6, 7, 14, 12]
  const realisasiAwal = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
  const [target, setTarget] = useState(dataawal)
  const [realisasi, setRealisasi] = useState(dataawal)

  const [valueDropBar, setvalueDropBar] = useState(0)

  const [valueDropLine, setvalueDropLine] = useState(0)
  const [targetLine, setTargetLine] = useState(realisasiAwal)
  const [realisasiLine, setRealisasiLine] = useState(dataawal)
  const [bulan, SetBulan] = useState(1)

  const handleChangeBulan = event => {
    console.log(event.target.value)
    SetBulan(event.target.value)
  }

  const handleChangeBar = event => {
    if (event.target.value === 10) {
      setTarget([122, 129, 23, 25, 22, 23, 82, 120, 62, 72, 142, 122])
      setRealisasi([122, 129, 23, 25, 22, 32, 28, 210, 62, 7, 124, 122])
    } else if (event.target.value === 20) {
      const randomTarget = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      const randomRealisasi = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      setTarget(randomTarget)
      setRealisasi(randomRealisasi)
    } else if (event.target.value === 30) {
      const randomTarget = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      const randomRealisasi = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      setTarget(randomTarget)
      console.log(randomTarget)
      setRealisasi(randomRealisasi)
    } else if (event.target.value === 40) {
      const randomTarget = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      const randomRealisasi = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      setTarget(randomTarget)
      setRealisasi(randomRealisasi)
      console.log(randomTarget)
    } else if (event.target.value === 50) {
      const randomTarget = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      const randomRealisasi = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      setTarget(randomTarget)
      setRealisasi(randomRealisasi)
      console.log(randomTarget)
    } else if (event.target.value === 60) {
      const randomTarget = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      const randomRealisasi = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      setTarget(randomTarget)
      setRealisasi(randomRealisasi)
      console.log(randomTarget)
    }
    console.log(event.target.value)
    setvalueDropBar(event.target.value)
  }

  const handleChangeLine = event => {
    console.log(event.target.value)
    setvalueDropLine(event.target.value)
  }
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Realisasi',
        data: target, // Tambahkan data sesuai bulan
        backgroundColor: ['rgba(255, 99, 132, 1)']
      },
      {
        label: 'Target',
        data: realisasi, // Tambahkan data sesuai bulan
        backgroundColor: ['rgba(255, 159, 64, 1)']
      }
    ]
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Card sx={{ padding: 4, height: 350 }}>
                <Typography variant={'h5'}>Tugas Bulan ini</Typography>
                <Divider></Divider>
                <TableTask></TableTask>
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
      <Grid mt={1} container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 4, height: 350 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Typography variant={'h6'}>Grafik</Typography>
              </Grid>
              <Grid item xs={3} md={2} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Bulan</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={bulan}
                    label='Bulan'
                    size={'small'}
                    onChange={handleChangeBulan}
                  >
                    <MenuItem value={1}>Januari</MenuItem>
                    <MenuItem value={2}>Februari</MenuItem>
                    <MenuItem value={3}>Maret</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>Mei</MenuItem>
                    <MenuItem value={6}>Juni</MenuItem>
                    <MenuItem value={7}>Juli</MenuItem>
                    <MenuItem value={8}>Agustus</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>Oktober</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>Desember</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} md={2} display={'flex'} justifyContent={'end'} mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-helper-label'>Fungsi</InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={valueDropLine}
                    label='Fungsi'
                    size={'small'}
                    onChange={handleChangeLine}
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
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    label: 'Target',
                    data: targetLine,
                    backgroundColor: ['rgba(255, 99, 132, 1)']
                  },
                  {
                    label: 'Realisasi',
                    data: realisasiLine,
                    backgroundColor: ['rgba(25, 19, 132, 1)']
                  }
                ]
              }}
              width={500}
              height={160}
            />
            <Divider></Divider>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 4, height: 450 }}>
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
                    value={valueDropBar}
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
              width={500}
              height={160}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Target dan Realisasi per Fungsi Tiap Bulan Tahun 2024'
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
