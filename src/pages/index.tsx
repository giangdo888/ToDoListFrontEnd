import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSidePropsContext } from 'next'
import { fetchData } from '@/services/api'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const projects = await fetchData("projects");
  return {
      props: {
          projects
      }
  };
}

export default function Home({projects}: NavProps) {
  return (
    <div className='layout'>
    <NavBar projects={projects}/>
      <main className='main-content'>
        <p>Welcome to To Do List!<br/> Please select a project or create a new one</p>
      </main>
    </div>
  )
}
