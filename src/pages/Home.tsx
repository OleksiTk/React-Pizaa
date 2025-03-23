import axios from "axios";
import { useEffect, useState } from "react";
import Content from "../components/Content";
import { useSelector } from "react-redux";
import Pagination from "../components/Paginations";
import { StateOne } from "../StateSlice/State.slice";
type Pizza = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  reating: number; // Можливо, тут мав бути 'rating'
  size: number[]; // Масив доступних розмірів піци
  types: string[]; // Масив типів тіста (наприклад, "тонке")
  category: number; // Категорія піци (наприклад, 0, 1, 2 і т. д.)
  "types-pizza": number; // Тип піци, ймовірно індекс
};

function Home() {
  type RootState = {
    globalState: StateOne;
  };
  const globalState = useSelector((state: RootState) => state.globalState);
  const [fetchApi, setFetchApi] = useState<Pizza[] | []>([]);
  useEffect(() => {
    if (globalState.value) {
      axios
        .get(globalState.value)
        .then((res) => {
          setFetchApi(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [globalState.value]);

  return (
    <div>
      <Content api={fetchApi} />
      <Pagination />
    </div>
  );
}

export default Home;
