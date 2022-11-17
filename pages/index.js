import Login from "../components/auth/Login";

export async function getServerSideProps(context) {
  const cookie = context.req.cookies;
  if (cookie.accessToken !== undefined) {
    console.log("found");
    return {
      props: {
        accessToken: cookie.accessToken,
        refreshToken: cookie.refreshToken,
        isLoggedIn: true,
      },
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    console.log("notfound");
    return {
      props: { isLoggedIn: false },
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
export default function Home() {
  return <></>;
}
