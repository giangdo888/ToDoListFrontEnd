type Project  = {
    id: number
    name: string
};

type Item = {
    id: number
    name: string
    isCompleted: boolean
    projectId: number
    stateId: number
    priorityId: number
}