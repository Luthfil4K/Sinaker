import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

import TaskDetailViews from 'src/views/task-views/TaskDetailViews'

const TaskDetail = ({ data }) => {
  const [task, setTask] = useState(JSON.parse(data))
  console.log(task)
  return (
    <>
      <TaskDetailViews data={task}></TaskDetailViews>
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
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      project: {
        include: {
          UserProject: {
            include: {
              user: true
            }
          }
        }
      },
      user: true
    }
  })

  return {
    props: {
      data: JSON.stringify(task)
    }
  }
}
export default TaskDetail
