import Head from "next/head";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sliceAction } from "../../redux/slice/slice";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export async function getServerSideProps(context) {
  const cookie = context.req.cookies;
  //fetch metadata
  const fetchMetaData = await fetch(
    "http://localhost:5000/api/meta/by-id?metaId=4"
  );
  const response = await fetchMetaData.json();

  return {
    props: {
      res: response.data,
      accessToken: cookie.accessToken,
      refreshToken: cookie.refreshToken,
    },
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Account(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const accessToken = props.accessToken;
  const refreshToken = props.refreshToken;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5000/api/user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          }
        );
        setName(response.data.data.name);
        setEmail(response.data.data.email);
      } catch (err) {
        if (err.response.status === 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          alert("Unauthenticated user!");
          router.push("/");
        } else {
          Cookies.remove("accessToken", { path: "" });
          Cookies.remove("refreshToken", { path: "" });
          alert("Something went wrong! please login again");
          router.push("/");
        }
      }
    }

    fetchUser();
  }, []);

  const handleOnLogout = () => {
    dispatch(sliceAction.reset());
    Cookies.remove("accessToken", { path: "" });
    Cookies.remove("refreshToken", { path: "" });
    router.push("/");
  };

  const updatePassword = async (e) => {
    console.log("clicked");
    console.log(password);

    try {
      await axiosInstance
        .put(
          `http://localhost:5000/api/user/update-password?password=${password}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          }
        )
        .then((res) => {
          setResponse(res.data.message);
        });
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated User!");
        router.push("/");
      } else {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated User!");
        router.push("/");
      }
    }
  };
  return (
    <>
      <Head>
        <meta name="description" content={props?.res?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={props?.res?.keywords} />
        <meta name="author" content={props?.res?.author} />
        <title>{props?.res?.name}</title>
      </Head>
      <Navbar />
      <div className="flex justify-center flex-col mx-auto w-fit rounded-lg items-center border border-1 border-black px-4 py-4">
        <AccountCircleIcon sx={{ fontSize: "100px" }} />
        <p className={"text-xl pt-5"}>Name: {name}</p>
        <p className={"text-xl pt-2"}>Email: {email}</p>
        <button
          onClick={handleOpen}
          className={"rounded-md bg-[#FFC300] text-white px-3 py-1 mt-2"}
        >
          Update Password
        </button>

        <button
          className="rounded-md bg-[#FFC300] px-3 text-white py-1 mt-2 cursor-pointer"
          onClick={() => handleOnLogout()}
        >
          Logout
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "yellowgreen" }}
            >
              Update Password
            </Typography>
            <div className="m-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              className={"bg-[#FFC300] text-white px-2 py-1 rounded-lg mx-4"}
              onClick={updatePassword}
            >
              Update
            </button>
            <br />
            {response.length === 0 ? (
              ""
            ) : (
              <p className={"pt-2 text-green-600"}> {response}</p>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}
