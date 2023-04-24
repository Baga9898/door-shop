export const isInCart = (cartDoors, article, size, direction) => {
  if (direction) {
    const chosenDoor = cartDoors.filter(door => 
      door.article === article && 
      door.chosenSize === size && 
      door.direction === direction
    );

    return cartDoors.includes(...chosenDoor);
  } else {
    const chosenDoor = cartDoors.filter(door => 
      door.article === article && 
      door.chosenSize === size
    );

    return cartDoors.includes(...chosenDoor);
  }
};
