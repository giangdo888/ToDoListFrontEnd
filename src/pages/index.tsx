import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSidePropsContext } from 'next'
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
    <>
    <NavBar projects={projects}/>
      <main>
        <h1>
          Wellcome to To Do List! Please select a project or create a new one.
        </h1>
      </main>
    </>
  )
}
