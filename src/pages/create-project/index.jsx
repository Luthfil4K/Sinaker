// view
import CreateProjectViews from 'src/views/project-views/CreateProjectViews'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import prisma from '../../services/db'
import { useState, useEffect, useRef } from 'react'

const CreateProject = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(data))
  return (
    <>
      <CreateProjectViews data={user}></CreateProjectViews>
    </>
  )
}
export async function getServerSideProps() {
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
