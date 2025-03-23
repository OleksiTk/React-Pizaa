import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { pushId } from "../StateSlice/State.slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shema } from "./schema/schemalogin";

interface RegisterInterface {
  username: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(shema),
  });

  const [accounts, setAccounts] = useState<any[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Завантажуємо акаунти з серверу
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL_Account);

        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Обробка відправки форми
  const onSubmit = async (data: RegisterInterface) => {
    console.log(data);

    const { username, password } = data;

    const account = accounts.find(
      (acc) => acc.name === username && acc.password === password
    );

    if (account) {
      // Якщо акаунт знайдено, зберігаємо id
      dispatch(pushId({ id: account.id }));
      navigate("/accountpanel"); // Переходимо на іншу сторінку
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login__body">
          <div className="login__preview">Login</div>
          <form onSubmit={handleSubmit(onSubmit)} className="login__form">
            {/* Username */}
            <div className="login__item-inputs">
              <label htmlFor="username" className="login__item-label">
                Name
              </label>
              <input
                {...register("username")}
                type="text"
                className="login__item-input"
              />
              <p className="registration__item-errors">
                {errors.username?.message}
              </p>
            </div>

            {/* Password */}
            <div className="login__item-inputs">
              <label htmlFor="password" className="login__item-label">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="login__item-input"
              />
              <p className="registration__item-errors">
                {errors.password?.message}
              </p>
            </div>

            <button type="submit" className="login__item-button button">
              Підтвердити
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
