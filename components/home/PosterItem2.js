import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import burger from "../../assets/burger.png";
import icecream from "../../assets/dessert.png";
import lasagna from "../../assets/lasa.png";
import { Typography } from "@mui/material";
import Image from "next/image";
const PosterItem2 = () => {
  return (
    <div>
      <Container>
        <Box
          sx={{
            display: "flex",
            marginTop: "120px",
            gap: "5px",
            position: "relative",
            flexDirection: { md: "row", lg: "row", sm: "row", xs: "row" },
          }}
        >
          <Box>
            <Image src={burger} alt="burger" />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Box>
              <Image
                src={icecream}
                alt="icecream"
                style={{ borderRadius: "15px" }}
                width={500}
              />
            </Box>
            <Box>
              <Image src={lasagna} alt="lasagna" width={500} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            zIndex: "4",
            mt: { md: "-350px", sm: "-280px", xs: "-130px" },
            position: "absolute",
            color: "white",
            px: { xs: "10px", sm: "20px" },
          }}
        >
          <Typography sx={{ fontSize: { md: "56px", sm: "32px", xs: "24px" } }}>
            Buy 2 get 1 <br /> free
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default PosterItem2;
