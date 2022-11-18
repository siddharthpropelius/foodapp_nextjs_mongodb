import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import dayjs from "dayjs";

const Name = (props) => {
  const data = new Date();
  const getTime = data.getHours();
  const startTime = props.restaurant.restaurant.data.opens_at;
  const endTime = props.restaurant.restaurant.data.close_at + 12;
  const isopen = getTime > startTime && getTime < endTime;

  return (
    <div>
      <Container>
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={props?.restaurant?.restaurant?.data?.img}
                alt="food"
                width={200}
                height={200}
              />
            </Box>
            <Box sx={{ ml: "30px", mt: "20px" }}>
              <Typography variant="h5">
                {props?.restaurant?.restaurant?.data?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: { md: "100px", xs: "40px" },
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ paddingY: "10px" }}>
                  <Typography sx={{ color: "#999999" }}>
                    {props?.restaurant?.restaurant?.data?.description}
                  </Typography>
                  <Typography sx={{ color: "#999999" }}>
                    {props?.restaurant?.restaurant?.data?.location}
                  </Typography>
                  <Typography>
                    <span style={{ color: "#C84B11" }}>
                      {isopen ? "Open Now" : "Close Now"}{" "}
                    </span>
                    {startTime}am -{endTime - 12}pm (Today)
                  </Typography>
                </Box>
                <Box>
                  <span style={{ color: "#999999" }}>Average Cost </span>700rs
                  for 2 person
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      </Container>
    </div>
  );
};

export default Name;
