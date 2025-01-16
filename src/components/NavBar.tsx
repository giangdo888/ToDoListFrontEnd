'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { fetchData } from '@/services/api';

type NavBarProps = {
    projects: Project[]
};

export default function NavBar ({projects} : NavBarProps) {
    const pathName = usePathname();
    const [isShowTextBox, setIsShowTextBox] = useState(false);
    const [newProjectInput, setNewProjectInput] = useState("");
    const [projectList, setProjectList] = useState<Project[]>(projects);

    const handleOnClick = () => {
        setIsShowTextBox(!isShowTextBox);
    }

    const handleNewProjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProjectInput(e.target.value);
    }

    const handleSubmitNewProject = async (e: React.FormEvent) => {
        e.preventDefault();
        //do nothing if input field is empty
        if (newProjectInput.trim() === "") {
            return;
        }

        const options = {
            method: "POST",
            body: {
                name: newProjectInput
            }
        }
        const data = await fetchData("projects", options);
        if (data) {
            alert("Successfully create new project!");
            setProjectList((prevList) => [...prevList, data]);

            //clear input and hide it
            setNewProjectInput("");
            setIsShowTextBox(false);
        } else {
            alert("Failed to create new project!");
        }
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
                <form onSubmit={handleSubmitNewProject}>
                    <input
                        className="nav-header-textbox"
                        type="text"
                        placeholder='Enter new project'
                        value={newProjectInput}
                        onChange={handleNewProjectInput}
                    />
                </form>
            )}
            <ul className='nav-items'>
            {
                projectList?.map((project : Project) => (
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
