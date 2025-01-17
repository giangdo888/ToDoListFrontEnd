'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { fetchData } from '@/services/api';
import ProjectCard from './projectCard';

type NavBarProps = {
    projects: Project[]
};

export default function NavBar ({projects} : NavBarProps) {
    const [isShowTextBox, setIsShowTextBox] = useState(false);
    const [newProjectInput, setNewProjectInput] = useState("");
    const [projectList, setProjectList] = useState<Project[]>(projects);

    const handleOnClick = () => {
        setIsShowTextBox(!isShowTextBox);
    }

    const handleNewProjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProjectInput(e.target.value);
    }

    const handleSubmitProject = async (e: React.FormEvent | React.FormEvent) => {
        e.preventDefault?.();
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

    const handleIsCardChanged = async () => {
        const data = await fetchData("projects");

        if (data) {
            setProjectList(data);
        }
    }

    return (
        <div className='nav-bar'>
            <Image className='logo'
                src='/logo.png'
                alt='ToDoList logo'
                width={200}
                height={200}
                priority
            />
            <div className='nav-header'>
                <h2 className='nav-header-text'>Project list</h2>
                <button className='nav-header-btn' onClick={handleOnClick}>+</button>
            </div>
            { isShowTextBox && (
                <form onSubmit={handleSubmitProject}>
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
                    <ProjectCard project={project} handleCardChanged={handleIsCardChanged}/>
                ))
            }
            </ul>
        </div>
    )
}
