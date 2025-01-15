import { fetchData } from "@/services/api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProjectPageProps = {
    items: Item[]
}

export default function ProjectPage() {
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
        <div>
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
        </div>
    );
}