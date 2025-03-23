interface Pizza {
  id: number;
  imgUrl: string;
  name: string;
  types: string[];
  size: number[];
  price: number;
  category: number;
  reating: number;
}

const DataBasePizza: Pizza[] = [
  {
    id: 0,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца Ананасова",
    types: ["тонке"],
    size: [26, 30, 40],
    price: 300,
    category: 0,
    reating: 4,
  },
  {
    id: 1,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца Чизбургер",
    types: ["традиціональне"],
    size: [36, 37, 40],
    price: 200,
    category: 1,
    reating: 4,
  },
  {
    id: 2,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца з Шинокою",
    types: ["тонке", "традиціональне"],
    size: [30, 40],
    price: 310,
    category: 2,
    reating: 5,
  },
  {
    id: 3,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца з Мясом",
    types: ["тонке", "традиціональне"],
    size: [36, 39, 40],
    price: 110,
    category: 3,
    reating: 2,
  },
  {
    id: 4,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца Помідорна",
    types: ["тонке", "традиціональне"],
    size: [11, 30, 40],
    price: 250,
    category: 4,
    reating: 1,
  },
  {
    id: 5,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца Грибна",
    types: ["тонке", "традиціональне"],
    size: [12, 34, 40],
    price: 311,
    category: 5,
    reating: 5,
  },
  {
    id: 6,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца з Огріками",
    types: ["тонке", "традиціональне"],
    size: [26, 30, 40],
    price: 150,
    category: 6,
    reating: 5,
  },
  {
    id: 7,
    imgUrl: "../src/assets/pica-chizburger.webp",
    name: "Пицца Ковбасна",
    types: ["тонке", "традиціональне"],
    size: [26, 30, 40],
    price: 133,
    category: 7,
    reating: 3,
  },
];

export default DataBasePizza;
