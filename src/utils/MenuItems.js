const getListItemName = (item) => {
  if (foodsList.includes(item)) return "foodsList";
  if (dessertsList.includes(item)) return "dessertsList";
  if (drinksList.includes(item)) return "drinksList";
};

export const findItemById = (searchKey) => {
  const allFoodItems = [...foodsList, ...dessertsList, ...drinksList];
  const item = allFoodItems.find((item) => item.id === searchKey);
  if (item) {
    const listName = getListItemName(item);
    return { item, listName };
  } else {
    const item = Object.values(menuItemsList).find(
      (item) => item.id === searchKey
    );

    if (item) {
      return { item, listName: "menuItemsList" };
    } else {
      return { item: null, listName: "unknown" };
    }
  }
};

export const getPrice = (item) => {
  const description = item.description;
  const priceRegex = /\$\d+(\.\d+)?/; // matches a price in the format $X.XX
  const match = description.match(priceRegex);
  if (match) {
    return parseFloat(match[0].slice(1)); // remove the dollar sign and convert to float
  } else {
    return null; // no price found
  }
};

export const foodsList = [
  {
    id: "chicken",
    title: "Chicken",
    description: "price $10",
  },
  {
    id: "beef",
    title: "Beef",
    description: "price $12",
  },
  {
    id: "pork",
    title: "Pork",
    description: "price $14",
  },
];

export const dessertsList = [
  {
    id: "chocolate",
    title: "Chocolate",
    description: "price $8",
  },
  {
    id: "strawberry",
    title: "Strawberry",
    description: "price $9",
  },
  {
    id: "vanilla",
    title: "Vanilla",
    description: "price $6",
  },
];

export const drinksList = [
  {
    id: "coke",
    title: "Coke",
    description: "price $5",
  },
  {
    id: "pepsi",
    title: "Pepsi",
    description: "price $5",
  },
  {
    id: "orange_juice",
    title: "Orange Juice",
    description: "price $7",
  },
];

export const menuItemsList = {
  foods: {
    id: "food_options",
    title: "Food Options",
  },
  desserts: {
    id: "dessert_options",
    title: "Dessert Options",
  },
  drinks: {
    id: "drink_options",
    title: "Drink Options",
  },
};
