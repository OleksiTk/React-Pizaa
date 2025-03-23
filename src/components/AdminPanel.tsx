import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Типи для піци
interface Pizza {
  imgUrl: string;
  name: string;
  types: string[];
  size: number[];
  price: number;
  category: number;
  "types-pizza": number;
  reating: number;
}

function AdminPanel() {
  // Стан з типами для кожного поля
  const [Imgpizza, setImgPizza] = useState<string>("");
  const [namepizza, setNamePizza] = useState<string>("");
  const [typespizza, setTypesPizza] = useState<string>("");
  const [sizepizza, setSizePizza] = useState<string>("");
  const [pricepizza, setPricePizza] = useState<number | null>(null);
  const [categorypizza, setCategoryPizza] = useState<number | null>(null);
  const [typesPizzapizza, setTypesPizzapizza] = useState<number | null>(null);
  const [ratingpizza, setRatingPizza] = useState<number | null>(null);
  const navigate = useNavigate();
  const [value, setValue] = useState<boolean>(false);

  // Функція для обробки форми
  function switcher(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Запобігаємо відправці форми
    setValue(true);
  }

  // Ефект для відправки запиту після заповнення форми
  useEffect(() => {
    const pushPizza = async () => {
      if (
        !Imgpizza ||
        !namepizza ||
        !typespizza ||
        !sizepizza ||
        !pricepizza ||
        !categorypizza ||
        !typesPizzapizza ||
        !ratingpizza
      ) {
        console.log("Заповніть всі поля!");
        return; // Якщо є порожні поля, не відправляємо запит
      }

      const arrPizza: Pizza = {
        imgUrl: Imgpizza,
        name: namepizza,
        types: [typespizza],
        size: sizepizza.split(",").map(Number),
        price: pricepizza,
        category: categorypizza,
        "types-pizza": typesPizzapizza,
        reating: ratingpizza,
      };

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL,
          arrPizza
        );
        console.log("Success", response);
        navigate("/"); // Перехід після успішної відправки
      } catch (error) {
        console.log("Error", error);
      }
    };
    if (value) pushPizza(); // Викликаємо pushPizza тільки якщо value стало true
  }, [value]);

  return (
    <div className="admin-panel">
      <div className="admin-panel__container">
        <div className="admin-panel__body">
          <form onSubmit={switcher} className="admin-panel__creat-form">
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Картинка піци</div>
              <input
                value={Imgpizza}
                onChange={(e) => setImgPizza(e.target.value)}
                type="text"
                className="admin-panel__input"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Ім'я піци</div>
              <input
                value={namepizza}
                onChange={(e) => setNamePizza(e.target.value)}
                type="text"
                className="admin-panel__input"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Типи піци</div>
              <input
                value={typespizza}
                onChange={(e) => setTypesPizza(e.target.value)}
                type="text"
                className="admin-panel__input"
                placeholder="може бути або тонка або традиціональна"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Розміри піци</div>
              <input
                value={sizepizza}
                onChange={(e) => setSizePizza(e.target.value)}
                type="text"
                className="admin-panel__input"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Ціна піци</div>
              <input
                value={pricepizza || ""}
                onChange={(e) => setPricePizza(Number(e.target.value))}
                type="text"
                className="admin-panel__input"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Категорія піци</div>
              <input
                value={categorypizza || ""}
                onChange={(e) => setCategoryPizza(Number(e.target.value))}
                type="text" // Змінив на text для кращої гнучкості
                className="admin-panel__input"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Тип піци</div>
              <input
                value={typesPizzapizza || ""}
                onChange={(e) => setTypesPizzapizza(Number(e.target.value))}
                type="text" // Змінив на text для гнучкості
                className="admin-panel__input"
              />
            </label>
            <label className="admin-panel__inputs">
              <div className="admin-panel__name-input">Її рейтинг</div>
              <input
                value={ratingpizza || ""}
                onChange={(e) => setRatingPizza(Number(e.target.value))}
                type="number"
                className="admin-panel__input"
              />
            </label>
            <button type="submit" className="admin-panel__button button">
              Відправити піцу на сервер
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
