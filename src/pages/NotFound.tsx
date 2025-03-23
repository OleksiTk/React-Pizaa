function NotFound() {
  return (
    <div className="not__found">
      <img
        className="not__found-img"
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGY5dHk5NDJ6bWN0Z3pqejQ2czB1ZzB6MXJ6eWw1MTVrNjM0dmlqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sTUWqCKtxd01W/giphy.gif"
        alt=""
        width={400}
        height={400}
      />
      <div className="not__found-text">Не знайшли такої сторінки</div>
    </div>
  );
}

export default NotFound;
