import { fetchData } from "@/services/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type ProjectCardProps = {
    project: Project,
    handleCardChanged: () => void
};

export default function ProjectCard({project, handleCardChanged}: ProjectCardProps) {
    const pathName = usePathname();
    const [isEdit, setIsEdit] = useState(false);
    const [projectName, setProjectName] = useState(project.name);
    const [showAreYouSurePanel, setShowAreYouSurePanel] = useState(false);

    var originalProject: Project = project;
    const [editProjectInput, setEditProjectInput] = useState(project.name);

    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleEditProjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditProjectInput(e.target.value);
    }

    const toggleAreYouSurePanel = () => {
        setShowAreYouSurePanel(!showAreYouSurePanel);
    }

    const handleSubmitProjectName = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editProjectInput.trim() !== "" && editProjectInput !== originalProject.name) {
            const options = {
                method: "PUT",
                body: {
                    name: editProjectInput
                }
            }
            const data = await fetchData(`projects/${project.id}`, options);
            if (data) {
                setProjectName(data.name);
                toggleIsEdit();
                handleCardChanged();
            }
        }
    }

    const handleDeleteProject = async () => {
        const options = {
            method: "DELETE",
            body: {}
        }
        await fetchData(`projects/${project.id}`, options);
        toggleAreYouSurePanel();
        handleCardChanged();
    }

    return (
        <li key={project.id} className={`nav-item ${pathName == `/projects/${project.id}` ? "nav-active-item-color" : "nav-inactive-item-color"}`}>
            {isEdit ? (
                <form onSubmit={handleSubmitProjectName}>
                    <input
                        className="nav-header-textbox"
                        type="text"
                        value={editProjectInput}
                        onChange={handleEditProjectInput}
                    />
                </form>
            ) : (
                <div>
                    <div>
                        <Link href={`/projects/${project.id}`}>
                            {projectName}
                        </Link>
                        <button onClick={toggleIsEdit}>Edit</button>
                        <button onClick={toggleAreYouSurePanel}>Delete</button>
                    </div>
                    { showAreYouSurePanel &&
                        <div>
                            <h4>Are you sure want to delete?</h4>
                            <button onClick={handleDeleteProject}>Yes, delete it</button>
                            <button onClick={toggleAreYouSurePanel}>No, keep it</button>
                        </div>
                    }
                </div>
            )}
        </li>
    )
}