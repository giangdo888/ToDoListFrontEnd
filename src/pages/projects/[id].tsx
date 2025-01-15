import NavBar from "@/components/NavBar";
import { fetchData } from "@/services/api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
    const projects = await fetchData("projects");
    return {
        props: {
            projects
        }
    };
  }

export default function ProjectPage({projects}: NavProps) {
    const router = useRouter();
    const {id} = router.query;
    const [items, setItems] = useState<Item[]>();

    const getItems = async () => {
        if (id !== undefined) {
            const data = await fetchData(`projects/${id}/items`);
            if (data) {
                setItems(data);
            }
        }
    };

    useEffect(() => {
        getItems();
    }, [id]);

    return (
        <div className='layout'>
            <NavBar projects={projects}/>
              <main className='main-content'>
              {
                items?.map((item) => (
                    <ul key={item.id}>
                        <li key={`name-${item.id}`}>{item.name}</li>
                        <li key={`projectId-${item.id}`}>{item.projectId}</li>
                        <li key={`stateId-${item.id}`}>{item.stateId}</li>
                        <li key={`priorityId-${item.id}`}>{item.priorityId}</li>
                    </ul>
                ))
            }
              </main>
            </div>
    );
}