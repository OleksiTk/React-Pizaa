import { useSelector } from "react-redux";
import AccountPanel from "../components/AccountPanel";
import { Link } from "react-router";
import { StateFour } from "../StateSlice/State.slice";

function Account() {
  type RootState = {
    accountLogin: StateFour;
  };
  const idAccount = useSelector((state: RootState) => state.accountLogin.id);
  return (
    <>
      {idAccount == null ? (
        <div className="account">
          <div className="account__container">
            <div className="account__body">
              <div className="account__path">
                <Link
                  className="account__registration button"
                  to="/registration"
                >
                  Регестрація
                </Link>
                <Link className="account__login button" to="/login">
                  Логін
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AccountPanel />
      )}
    </>
  );
}

export default Account;
