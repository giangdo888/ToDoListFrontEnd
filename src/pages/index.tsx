import { Inter } from 'next/font/google'
import { fetchData } from '@/services/api'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  projects: Project[]
};

export async function getServerSideProps() {
  const projects = await fetchData("projects");
  return {
      props: {
          projects
      }
  };
}

export default function Home({projects}: HomeProps) {
  return (
    <div className='layout'>
    <NavBar projects={projects}/>
      <main className='main-content'>
        <p>Welcome to To Do List!<br/> Please select a project or create a new one</p>
      </main>
    </div>
  )
}
