import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { StateFour } from "../StateSlice/State.slice.ts";

function AccountPanel() {
  type RootState = {
    accountLogin: StateFour;
  };

  const id = useSelector((state: RootState) => state.accountLogin.id);
  const [accountsDetails, setAccountsDetails] = useState<any>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL_Account);
        const arrUser = response.data;

        for (let i = 0; i < arrUser.length; i++) {
          if (arrUser[i].id == id) {
            setAccountsDetails(arrUser[i]);
          }
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [id]); // Після зміни id, оновлюється дані акаунтів

  return (
    <>
      <div className="account-panel">
        <div className="account-panel__body">
          <div className="account-panel__name">
            Імя вашого акануту: {accountsDetails.name}
          </div>
          <div className="account-panel__email ">
            Ваша пошта: {accountsDetails.email}
          </div>
          {id == 1 ? (
            <Link
              to="/admin-panel"
              className="account-panel__admin-panel button"
            >
              До адмін панелі
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="account-panel__extra">
          <Link to="/">
            <div className="account-panel__button button">
              Назад до головної сторінки
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AccountPanel;
