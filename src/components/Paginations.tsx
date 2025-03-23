// Pagination.tsx
import { useDispatch, useSelector } from "react-redux";
import { setPage, StateOne } from "../StateSlice/State.slice.ts";

function Pagination() {
  type RootState = {
    globalState: StateOne;
  };
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.globalState.currentPage
  ); // отримуємо поточну сторінку з Redux
  const totalPages = 3; // допустимо, у нас є 100 елементів (замініть на реальні дані)

  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1)); // оновлюємо сторінку в Redux
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1)); // оновлюємо сторінку в Redux
    }
  };

  const goToPage = (pageNumber: number) => {
    dispatch(setPage(pageNumber)); // оновлюємо сторінку в Redux
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Назад
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Вперед
        </button>
      </div>
    </div>
  );
}

export default Pagination;
