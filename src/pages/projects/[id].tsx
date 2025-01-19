import ItemCard from "@/components/ItemCard";
import NavBar from "@/components/NavBar";
import { fetchData } from "@/services/api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProjectPageProps = {
    projects: Project[]
}

export async function getServerSideProps() {
    const projects = await fetchData("projects");
    return {
        props: {
            projects
        }
    };
  }

export default function ProjectPage({projects}: ProjectPageProps) {
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
                    <ItemCard key={`item-${item.id}`} item={item}></ItemCard>
                ))
            }
              </main>
            </div>
    );
}