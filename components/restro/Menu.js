import { Container, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/future/image";
import React from "react";
import menu from "../../assets/menu.png";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  width: "100%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  p: 4,
};

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container sx={{ mt: "50px" }}>
      <Typography variant="h4">Menu</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          mt: "20px",
          overflowX: "scroll",
          cursor: "pointer",
        }}
      >
        <Image src={menu} alt="menu" onClick={handleOpen} />
        <Image src={menu} alt="menu" onClick={handleOpen} />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ display: "flex", justifyContent: "end", cursor: "pointer" }}
            onClick={handleClose}
          >
            <CancelIcon />
          </Typography>
          <Image
            src={menu}
            alt="menu"
            className={
              "w-[800px] mx-auto h-full md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]"
            }
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Menu;
