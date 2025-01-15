import Link from 'next/link';
import React from 'react'

type NavBarProps = {
    projects: Project[]
};

export default function NavBar ({projects} : NavBarProps) {
  return (
    <>
        <h2>Project list</h2>
        <div>
            <ul>
            {
                projects?.map((project : Project) => (
                    <li key={project.id}>
                        <Link href={`/projects/${project.id}`}>
                            {project.name}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    </>
  )
}
