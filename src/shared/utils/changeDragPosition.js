export function  changDragPosition (items, yPos, newYPos, currentOrder, heightOfElement, spaceBetweenRow = 0){
    const list = [...items];
    
    let variance = newYPos - yPos;
    let axist = 1; // -1 is to top, 1 is to bottom
    let newOrder = currentOrder;
    if(variance < 0) {
        axist = -1;
    }
    variance = Math.abs(variance);

    if(axist + currentOrder < 0 || axist + currentOrder > list.length) return list; // index out of range

    while(variance > heightOfElement && !(newOrder + axist < 0) && !(newOrder + axist > list.length)) {
        newOrder += axist;
        variance -= (heightOfElement + spaceBetweenRow);
    }
    
    const element = list.splice(currentOrder, 1)[0];
    list.splice(newOrder, 0, element);

    const result = list.map((element, index) => ({
        title: element.title,
        description: element.description,
        order: index
    }))

    return result;
}