type ItemCardProps = {
    item: Item
}

function getColorFromPriority(priority: number): string {
    switch (priority) {
        case 1: //low
            return "green";
        case 2: //medium
            return "blue";
        case 3: //high
            return "orange";
        case 4: //critical
            return "red";
        default:
            return "gray";
    }
}

function getStateById (state: number): string {
    switch (state) {
        case 1:
            return "Backlog";
        case 2:
            return "Picked";
        case 3:
            return "InProgress";
        case 4:
            return "Done";
        default:
            return "none";
    }
}

export default function ItemCard({item}: ItemCardProps) {
    const cardColor = getColorFromPriority(item.priorityId);
    const state = getStateById(item.stateId);
    return (
        <div className={`item-card-container ${cardColor}-item-card ${state}-item-card`}> 
            <span className="item-card-text">{item.name}</span>
        </div>
    )
}