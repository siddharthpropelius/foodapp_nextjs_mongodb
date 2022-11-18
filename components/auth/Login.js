import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { sliceAction } from "../../redux/slice/slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const checkLogin = await axios.post(
        "http://localhost:5000/api/user/login",
        { email: email, password: password }
      );
      if (checkLogin.status === 200) {
        Cookies.set("accessToken", checkLogin.data.accessToken);
        Cookies.set("refreshToken", checkLogin.data.refreshToken);
        router.push("/home");
      }
    } catch (err) {
      // setError(err.response.data.message);
    }
  };

  const handleShowMe = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#FFC200",
          mt: "100px",
        }}
      >
        NOODlETOWN
      </Typography>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#FFC200" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <IconTextField
            required
            sx={{ mt: 1 }}
            fullWidth
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            iconEnd={
              <IconButton edge="end">
                <MailIcon />
              </IconButton>
            }
          />
          <IconTextField
            required
            sx={{ mt: 2 }}
            fullWidth
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            iconEnd={
              <IconButton
                onClick={handleShowMe}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FFC200",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#F6B716",
                color: "#fff",
              },
            }}
          >
            Sign In
          </Button>
          <Typography sx={{ paddingLeft: 1 }}>
            New User{" "}
            <span
              className="text-[#FFC200] font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Register here{" "}
            </span>
          </Typography>
          <Typography sx={{ color: "red" }}>{error}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
