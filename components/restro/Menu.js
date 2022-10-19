import { Container, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/future/image';
import React from 'react';
import menu from '../../assets/menu.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: 600, xs: 400 },
  color: 'white',
  p: 4,
};

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container sx={{ mt: '50px' }}>
      <Typography variant="h4">Menu</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          mt: '20px',
          overflowX: 'scroll',
          cursor: 'pointer',
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
          <Image
            src={menu}
            alt="menu"
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Menu;
