export const isInCart = (cartDoors, article, size, direction) => {
    const chosenDoor = cartDoors.filter(door => 
      door.article === article && 
      door.chosenSize === size && 
      door.direction === direction
    );
    return cartDoors.includes(...chosenDoor);
};
