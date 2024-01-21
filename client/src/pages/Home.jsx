import React from "react";

import { useLocation } from "react-router-dom";

const Home = (props) => {
  const location = useLocation();
  const userData = location.state.userData;
  console.log(userData);
  return <div>Home</div>;
};

export default Home;
