import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { indexByAddArr, StateThree } from "../StateSlice/State.slice.ts";
type RootState = {
  headerIndexState: StateThree;
};
interface PizzaBlocks {
  id: number;
  imgUrl: string;
  name: string;
  types: string[];
  size: number[];
  price: number;
  category: number;
  reating: number;
}
const Pizza_block: React.FC<PizzaBlocks> = ({
  id,
  imgUrl,
  name,
  types,
  size,
  price,
}) => {
  const arrPizza = useSelector(
    (state: RootState) => state.headerIndexState.arr
  );
  const dispatch = useDispatch();
  const [valuePizza, setValuePizza] = useState<number>(0);
  const [sizePizza, setSizePizza] = useState<number>(0);
  const [typePizza, setTypePizza] = useState<string>("");
  function addPizzaButton() {
    // Перевірка, чи змінився тип чи розмір піци
    let newValue = valuePizza + 1; // Кількість, яку додаємо

    // Перевіряємо чи така піца вже є в кошику з тим самим розміром та типом
    const existingPizza = arrPizza.find(
      (pizza) =>
        pizza.typePizza === typePizza && Number(pizza.sizePizza) === sizePizza
    );

    if (existingPizza) {
      // Якщо піца вже є, збільшуємо кількість
      newValue = existingPizza.howMuch + 1;
    } else {
      // Якщо піца нова або змінився тип чи розмір, скидаємо кількість на 1
      newValue = 1;
    }

    setValuePizza(newValue);

    // Додаємо чи оновлюємо піцу в Redux
    dispatch(
      indexByAddArr({
        howMuch: newValue, // Оновлюємо кількість
        id: id, // Використовуємо id, що передається з поточного стану
        imgUrl: imgUrl, // Використовуємо imgUrl, що передається з поточного стану
        name: name, // Використовуємо name, що передається з поточного стану
        typePizza: typePizza, // Встановлюємо поточний тип
        sizePizza: sizePizza, // Встановлюємо поточний розмір
        price: price, // Встановлюємо поточну ціну
      })
    );
  }

  // Функція для зміни розміру піци
  function switchPizzaSizeButton(index: number) {
    setSizePizza(index); // Оновлення розміру піци
  }

  // Функція для зміни типу піци
  function switchPizzaTypeButton(value: string) {
    setTypePizza(value); // Оновлення типу піци
  }
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imgUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((value, index) => (
            <li
              onClick={() => switchPizzaTypeButton(value)}
              className={typePizza === value ? "active" : ""}
              key={index}
            >
              {value}
            </li>
          ))}
        </ul>
        <ul>
          {size.map((value, index) => (
            <li
              onClick={() => switchPizzaSizeButton(value)}
              className={sizePizza === value ? "active" : ""}
              key={index}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} ₴</div>
        <div
          onClick={addPizzaButton}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          <i>{valuePizza}</i>
        </div>
      </div>
    </div>
  );
};

export default Pizza_block;
