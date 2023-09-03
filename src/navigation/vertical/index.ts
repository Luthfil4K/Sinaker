// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/'
    // },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages '
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },

    {
      title: 'Dashboard2',
      icon: HomeOutline,
      path: '/dashboard2'
    },
    {
      title: 'Buat Kegiatan',
      icon: FormatLetterCase,
      path: '/create-project'
    },
    {
      title: 'Buat Rapat',
      icon: Login,
      path: '/rapat-create'
    },
    {
      sectionTitle: 'Kegiatan'
    },

    {
      title: 'List Kegiatan',
      icon: Table,
      path: '/project-list'
    },
    {
      title: 'Daftar Pegawai',
      icon: Login,
      path: '/people'
    },
    {
      title: 'Sub Kegiatan',
      icon: Table,
      path: '/task'
    },
    {
      title: 'Induk Kegiatan',
      icon: CubeOutline,
      path: '/master-induk-kegiatan'
    },
    {
      title: 'Kode',
      icon: Login,
      path: '/master-kode'
    },
    {
      sectionTitle: 'Pengumuman'
    },
    {
      title: 'Pengumuman',
      icon: CubeOutline,
      path: '/pengumuman'
    },
    {
      title: 'Daftar Rapat',
      icon: GoogleCirclesExtended,
      path: '/rapat-list'
    }
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'iccon',
    //   path: '/iccon'
    // }
  ]
}

export default navigation
