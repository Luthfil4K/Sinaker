import { useState, useEffect } from 'react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'
import ProjectDetailsViews from 'src/views/project-views/ProjectDetailsViews'

const ProjectDetail = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  // console.log(project)
  return (
    <>
      <ProjectDetailsViews data={project} />
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
  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      Task: {
        include: {
          user: true
        }
      },
      projectLeader: true,
      UserProject: {
        include: {
          user: true
        }
      }
    }
  })

  return {
    props: {
      data: JSON.stringify(project)
    }
  }
}

export default ProjectDetail
