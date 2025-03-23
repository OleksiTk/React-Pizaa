import { useCallback, useState, useMemo } from "react";
import Pizza_block from "./Pizza_block";
import { useDispatch, useSelector } from "react-redux";
import {
  sortedByRating,
  sortedByPrice,
  sortedByName,
  StateTwo,
} from "../StateSlice/State.slice.ts";
import {
  indexByMeat,
  indexByVegan,
  indexByGrill,
  indexByAll,
  indexBySharp,
} from "../StateSlice/State.slice.ts";
import { debounce } from "@mui/material";

type Pizza = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  reating: number;
  size: number[];
  types: string[]; //
  category: number;
  "types-pizza": number;
};

// Типізуємо пропс 'api' як масив піц
interface ContentProps {
  api: Pizza[];
}
type RootState = {
  indexState: StateTwo;
};

function Content({ api }: ContentProps) {
  const indexState = useSelector((state: RootState) => state.indexState.value);
  const dispatch = useDispatch();

  const [indexPizza, setindexPizza] = useState<number>(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [chooseValue, setChooseValue] = useState<string>("популярності");
  const [onlinevalue, setOnlineValue] = useState("");
  const [value, setValue] = useState("");
  const arrIndexPizza: string[] = [
    "Всі",
    "Мяcні",
    "Веганські",
    "Гриль",
    "Гострі",
  ];
  const arrValuePizza = ["популярності", "ціні", "алфавіту"];

  function switchMenu(value: boolean): void {
    setOpenMenu(value);
  }

  function switchIndexPizza(index: number): void {
    if (index === 1) {
      dispatch(indexByMeat());
    } else if (index === 2) {
      dispatch(indexByVegan());
    } else if (index === 3) {
      dispatch(indexByGrill());
    } else if (index === 4) {
      dispatch(indexBySharp());
    } else {
      dispatch(indexByAll()); // Для "Усі"
    }
    setindexPizza(index);
  }

  function choosePizza(value: string): void {
    setChooseValue(value);
    if (value == "ціні") {
      dispatch(sortedByPrice());
    } else if (value == "популярності") {
      dispatch(sortedByRating());
    } else if (value == "алфавіту") {
      dispatch(sortedByName());
    }
    setOpenMenu(false);
  }

  const updateValue = useCallback(
    debounce((value) => {
      setOnlineValue(value);
    }, 500),
    []
  );

  function SearchByName(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    updateValue(searchValue);
    setValue(searchValue);
  }

  // Використовуємо useMemo для обчислення фільтрації і сортування
  const filteredAndSortedApi = useMemo(() => {
    let result = api;

    // Фільтрація по типу піци
    if (indexState !== 0) {
      result = result.filter((item) => item["types-pizza"] === indexState);
    }

    // Фільтрація по пошуку
    if (onlinevalue !== "") {
      result = result.filter((pizza) =>
        pizza.name.toLowerCase().includes(onlinevalue.toLowerCase())
      );
    }

    // Сортування
    if (chooseValue === "ціні") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (chooseValue === "популярності") {
      result = result.sort((a, b) => b.reating - a.reating);
    } else if (chooseValue === "алфавіту") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [api, indexState, onlinevalue, chooseValue]);

  return (
    <div>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <div className="categories">
              <ul>
                {arrIndexPizza.map((value: string, index: number) => (
                  <li
                    key={index}
                    onClick={() => switchIndexPizza(index)}
                    className={indexPizza === index ? "active" : ""}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="search">
              <div className="search__body">
                <input
                  value={value}
                  onChange={(e) => SearchByName(e)}
                  placeholder="Шукати за назвою"
                  type="text"
                  className="search__input"
                />
              </div>
            </div>
            <div className="sort">
              <div
                onClick={() => switchMenu(openMenu === false ? true : false)}
                className="sort__label"
              >
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                  />
                </svg>
                <b>Сортування по:</b>
                <span>{chooseValue}</span>
              </div>
              <div className="sort__popup">
                {openMenu && (
                  <ul>
                    {arrValuePizza.map((value, i) => (
                      <li
                        key={i}
                        onClick={() => choosePizza(value)}
                        className={chooseValue === value ? "active" : ""}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <h2 className="content__title">Усі піцци</h2>
          <div className="content__items">
            {filteredAndSortedApi.length === 0 ? (
              <div className="search__block">Serach your information</div>
            ) : (
              filteredAndSortedApi.map((value: any) => (
                <Pizza_block key={value.id} {...value} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
