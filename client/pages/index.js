import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = await buildClient(context);
  const { data } = client.get("/api/users/currentuser");
  console.log(`data: ${data}`);
  return data;
};

export default LandingPage;
