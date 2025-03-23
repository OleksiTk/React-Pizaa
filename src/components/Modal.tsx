import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import { indexByClearBasket } from "../StateSlice/State.slice.ts";
export default function BasicModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="payment" onClick={handleOpen}>
        Оплатити
      </button>
      {/* <Button onClick={handleOpen}>Оплатит</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Все було оплачено
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Дякую за покупку
          </Typography>
          <br />
          <Link
            onClick={() => dispatch(indexByClearBasket())}
            className="goback"
            to="/"
          >
            Повернутися на головну
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
