import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/future/image";
import React from "react";
import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";
import c4 from "../../assets/c4.png";
import c5 from "../../assets/c5.png";
import c6 from "../../assets/c6.png";
import Cline from "../../assets/cline.png";

const HeaderCard = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            marginTop: "40px",
            gap: "40px",
          }}
        >
          <Box
            sx={{
              width: "620px",
              height: "220px",
              maxWidth: "unset",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Box>
              <Image
                src={c1}
                alt="food"
                // className="w-[380px] h-[120px]"
                width={380}
                height={120}
                style={{ maxWidth: "unset" }}
              />
            </Box>
            <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
              Dinning Out
            </Typography>
            <Typography variant="p" sx={{ px: 2, pb: 2 }}>
              Explore curated lists of top restaurants.
            </Typography>
          </Box>
          <Box
            sx={{
              width: "600px",
              height: "220px",
              maxWidth: "600px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Image
              src={c2}
              alt="food"
              // className="w-[380px] h-[120px]"
              width={380}
              height={120}
              style={{ maxWidth: "unset" }}
            />
            <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
              Dinning Out
            </Typography>
            <Typography variant="p" sx={{ px: 2 }}>
              Explore curated lists of top restaurants.
            </Typography>
          </Box>
          <Box
            sx={{
              width: "600px",
              height: "220px",
              maxWidth: "600px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Image
              src={c3}
              alt="food"
              // className="w-[380px] h-[120px]"
              width={380}
              height={120}
              style={{ maxWidth: "unset" }}
            />
            <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
              Dinning Out
            </Typography>
            <Typography variant="p" sx={{ px: 2, pb: 2 }}>
              Explore curated lists of top restaurants.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ my: "18px" }}>
          <Typography
            sx={{
              pt: "60px",
              color: "#b68d00",
              fontSize: { md: "48px", sm: "38px", xs: "32px" },
            }}
          >
            Our best delivered cuisines
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </Typography>

          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              gap: "20px",
              marginTop: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
              }}
            >
              <Image src={c4} alt="food" width={200} height={200} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
              }}
            >
              <Image src={Cline} alt="food" width={200} height={200} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
              }}
            >
              <Image src={c5} alt="food" width={200} height={200} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
              }}
            >
              <Image src={Cline} alt="food" width={200} height={200} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
              }}
            >
              <Image src={c6} alt="food" width={200} height={200} />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HeaderCard;
