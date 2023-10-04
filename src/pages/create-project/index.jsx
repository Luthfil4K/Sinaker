// view
import CreateProjectViews from 'src/views/project-views/CreateProjectViews'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const CreateProject = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  return (
    <>
      <CreateProjectViews data={user}></CreateProjectViews>
    </>
  )
}
export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }
  let user

  user = await prisma.user.findMany({
    where: {
      id: {
        not: 0
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })
  return {
    props: {
      data: JSON.stringify(user)
    }
  }
}
export default CreateProject
