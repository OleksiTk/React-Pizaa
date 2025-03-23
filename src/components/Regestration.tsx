import axios from "axios";
import { useDispatch } from "react-redux";
import { creatAccount, pushId } from "../StateSlice/State.slice";
import { useForm } from "react-hook-form";
import { shema } from "../components/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  enterypassword: string;
}

function Regestration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: yupResolver(shema),
  });

  const onSubmit = async (data: RegisterInterface) => {
    console.log(data);
    const { username, email, password } = data;

    const userData = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL_Account,
        userData
      );

      dispatch(creatAccount({ name: username, email, password }));
      console.log("Data posted successfully:", response.data);
      dispatch(pushId({ id: response.data.id }));
      navigate("/accountpanel");
      reset(); // Очищаємо форму після успішної відправки
    } catch (error) {
      console.error("Error during the POST request:", error);
    }
  };

  return (
    <div className="registration">
      <div className="container">
        <div className="registration__body">
          <div className="registration__preview">Registration</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="registration__form"
          >
            {/* Username */}
            <div className="registration__item-inputs">
              <label htmlFor="username" className="registration__item-label">
                Name
              </label>
              <input
                {...register("username")}
                type="text"
                className="registration__item-input"
              />
              <p className="registration__item-errors">
                {errors.username?.message}
              </p>
            </div>

            {/* Email */}
            <div className="registration__item-inputs">
              <label htmlFor="email" className="registration__item-label">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="registration__item-input"
              />
              <p className="registration__item-errors">
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="registration__item-inputs">
              <label htmlFor="password" className="registration__item-label">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="registration__item-input"
              />
              <p className="registration__item-errors">
                {errors.password?.message}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="registration__item-inputs">
              <label
                htmlFor="enterypassword"
                className="registration__item-label"
              >
                Confirm Password
              </label>
              <input
                {...register("enterypassword")}
                type="password"
                className="registration__item-input"
              />
              <p className="registration__item-errors">
                {errors.enterypassword?.message}
              </p>
            </div>

            {/* Submit Button */}

            <button type="submit" className="registration__item-button button">
              Підтвердити
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Regestration;
