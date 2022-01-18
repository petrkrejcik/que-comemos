export const randomizeWeek = (meals) => {
  return [...Array(7)].map(() => randomizeDay(meals));
};

export const randomizeDay = (meals) => {
  const randomIndex = Math.floor(Math.random() * meals.length);
  return meals[randomIndex];
};

export const getIcon = (category) => {
  return CATEGORIES.find((c) => c.value === category)?.icon;
};

export const CATEGORIES = [
  { value: 'meat', text: 'Carne', icon: '🥩' },
  { value: 'fish', text: 'Pescado', icon: '🐟' },
  { value: 'beans', text: 'Legumbres', icon: '🌱' },
  { value: 'vegetable', text: 'Verdura', icon: '🥦' },
  { value: 'pasta', text: 'Pasta', icon: '🍝' },
  { value: 'bread', text: 'Pan', icon: '🥖' }
];
