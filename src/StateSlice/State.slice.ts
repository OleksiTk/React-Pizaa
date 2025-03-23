import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL;
//Типизація через типи
type PizzaItem = {
  name: string;
  imgUrl: string;
  typePizza: string;
  sizePizza: string;
  howMuch: number;
  price: number;
  id: number;
};
export type StateOne = {
  value: string;
  currentPage: number;
};
export type StateTwo = {
  value: number;
};
export type StateThree = {
  cash: number;
  basket: number;
  arr: PizzaItem[];
};
export type StateFour = {
  id: null | number;
  name: string;
  email: string;
  password: string;
};
// Тут початкові занчення для редюсерів
const initialState: StateOne = {
  value: `${apiUrl}page=1&limit=4`,
  currentPage: 1, // додали currentPage для збереження поточної сторінки
};
const indexInitialState: StateTwo = {
  value: 0,
};
const indexInitialHeader: StateThree = {
  cash: 0,
  basket: 0,
  arr: [],
};
const indexInitialAccount: StateFour = {
  id: null,
  name: "",
  email: "",
  password: "",
};
// Ось тут самі редюсери
export const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    sortedByPrice: (state) => {
      state.value = `${apiUrl}sortBy=price`;
    },
    sortedByRating: (state) => {
      state.value = `${apiUrl}orderBy=reating&order=desc`;
    },
    sortedByName: (state) => {
      state.value = `${apiUrl}orderBy=name`;
    },
    setPage: (state, action: PayloadAction<number>) => {
      //PayloadAction — це тип, який надається для дії в Redux Toolkit.
      const newPage = action.payload; // отримуємо нову сторінку
      state.currentPage = newPage; // зберігаємо її в Redux
      state.value = `${apiUrl}page=${newPage}&limit=4`; // формуємо новий URL з актуальною сторінкою
    },
  },
});
export const indexState = createSlice({
  name: "indexState",
  initialState: indexInitialState, // Тут вказуємо правильний початковий стан
  reducers: {
    indexByMeat: (state) => {
      state.value = 1; // 1 — це м'ясна піца
    },
    indexByVegan: (state) => {
      state.value = 2; // 2 — це веганська піца
    },
    indexByGrill: (state) => {
      state.value = 3; // 3 — це піца на грилі
    },
    indexByAll: (state) => {
      state.value = 0; // 0 — всі піцци
    },
    indexBySharp: (state) => {
      state.value = 4; // 0 — всі піцци
    },
  },
});
export const headerIndexState = createSlice({
  name: "headerIndexState",
  initialState: indexInitialHeader,
  reducers: {
    indexByAddArr: (state, action) => {
      const existingPizza = state.arr.find(
        (element) =>
          element.id === action.payload.id &&
          element.typePizza === action.payload.typePizza &&
          element.sizePizza === action.payload.sizePizza
      );

      if (existingPizza) {
        // Якщо піца вже є в кошику, збільшуємо її кількість
        existingPizza.howMuch = action.payload.howMuch; // Збільшуємо кількість піци
        state.basket += 1; // Оновлюємо загальну кількість піц у кошику
        state.cash += existingPizza.price; // Оновлюємо загальну суму
      } else {
        // Якщо піци немає в кошику, додаємо нову
        state.arr.push(action.payload);
        state.basket += action.payload.howMuch; // Оновлюємо загальну кількість піц
        state.cash += action.payload.price * action.payload.howMuch; // Оновлюємо загальну суму
      }
    },
    indexByClearBasket: (state) => {
      state.arr = [];
      state.cash = 0;
      state.basket = 0;
    },
    indexByDeletBasketElement: (state, action) => {
      // Шукаємо піцу за іменем, типом і розміром
      const removedItem = state.arr.find(
        (item) =>
          item.name === action.payload.name &&
          item.typePizza === action.payload.type &&
          item.sizePizza === action.payload.size
      );

      if (removedItem) {
        // Оновлюємо cash та basket перед видаленням елемента
        state.cash -= removedItem.price * removedItem.howMuch;
        state.basket -= removedItem.howMuch;

        // Фільтруємо масив і видаляємо елемент за name, typePizza і sizePizza
        state.arr = state.arr.filter(
          (value) =>
            value.name !== action.payload.name ||
            value.typePizza !== action.payload.type ||
            value.sizePizza !== action.payload.size
        );
      }
    },
    indexByDeletOneElement: (state, action) => {
      // Шукаємо піцу, яку потрібно видалити, за її параметрами
      const removedItem = state.arr.find(
        (item) =>
          item.name === action.payload.name &&
          item.typePizza === action.payload.type &&
          item.sizePizza === action.payload.size
      );

      if (removedItem) {
        // Зменшуємо кількість піци на 1
        removedItem.howMuch -= 1;

        // Оновлюємо загальну кількість піц у кошику
        state.basket -= 1;

        // Оновлюємо загальну суму (віднімаємо ціну цієї піци)
        state.cash -= removedItem.price;

        // Якщо кількість піци стала 0, видаляємо її з кошика
        if (removedItem.howMuch === 0) {
          // Видаляємо лише ту піцу, яка стала нульовою
          state.arr = state.arr.filter(
            (item) =>
              !(
                item.name === action.payload.name &&
                item.typePizza === action.payload.type &&
                item.sizePizza === action.payload.size
              )
          );
        }
      }
    },
    indexByAddOneElement: (state, action) => {
      const addedItem = state.arr.find(
        (item) =>
          item.name === action.payload.name &&
          item.typePizza === action.payload.type &&
          item.sizePizza === action.payload.size
      );
      if (addedItem) {
        addedItem.howMuch += 1;
        state.cash += addedItem.price;

        state.basket += 1;
      }
    },
  },
});
export const accountLogin = createSlice({
  name: "accountLogin",
  initialState: indexInitialAccount,
  reducers: {
    creatAccount: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    pushId: (state, action) => {
      state.id = action.payload.id;
    },
  },
});
export const { sortedByRating, sortedByName, sortedByPrice, setPage } =
  globalState.actions;
export const {
  indexByMeat,
  indexByVegan,
  indexByGrill,
  indexByAll,
  indexBySharp,
} = indexState.actions;

export const {
  indexByAddArr,
  indexByClearBasket,
  indexByDeletBasketElement,
  indexByDeletOneElement,
  indexByAddOneElement,
} = headerIndexState.actions;
export const { creatAccount, pushId } = accountLogin.actions;
//
export const globalreducer = globalState.reducer;
export const indexreducer = indexState.reducer;
export const headerindex = headerIndexState.reducer;
export const accountreducer = accountLogin.reducer;
