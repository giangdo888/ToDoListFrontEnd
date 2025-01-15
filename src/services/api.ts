const API_ADDRESS="https://localhost:7157"

export async function fetchData(
    endpoint: string,
    options?: {
        method: string,
        body: object
    }
) {
    try {
        const response = await fetch (`${API_ADDRESS}/${endpoint}`, {
            method: options?.method || "GET",
            body: options?.method !== "GET" && options?.body ? JSON.stringify(options.body) : undefined,
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error with http status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`fetch error: ${error}`);
        return null;
    }
}
