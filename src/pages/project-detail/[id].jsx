import prisma from '../../services/db'
import { useState, useEffect, useRef } from 'react'

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
