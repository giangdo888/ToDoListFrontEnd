'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type NavBarProps = {
    projects: Project[]
};

export default function NavBar ({projects} : NavBarProps) {
    const pathName = usePathname();
    const [isShowTextBox, setIsShowTextBox] = useState(false);

    const handleOnClick = () => {
        setIsShowTextBox(!isShowTextBox);
    }
    return (
        <div className='nav-bar'>
            <Image
                src='/logo.png'
                alt='ToDoList logo'
                width={100}
                height={80}
            />
            <div className='nav-header'>
                <h2 className='nav-header-text'>Project list</h2>
                <button className='nav-header-btn' onClick={handleOnClick}>+</button>
            </div>
            { isShowTextBox && (
                <input
                    type="text"
                    placeholder='Enter new project'
                    className="nav-header-textbox"
                />
            )}
            <ul className='nav-items'>
            {
                projects?.map((project : Project) => (
                    <li key={project.id} className={`nav-item ${pathName == `/projects/${project.id}` ? "nav-active-item-color" : "nav-inactive-item-color"}`}>
                        <Link href={`/projects/${project.id}`}>
                            {project.name}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}
