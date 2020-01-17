`use strict`

import React from "react";
import Swiper from "react-native-swiper";
import Login from "./Login";
import Register from "./Register";

const LoginScreen: () => React$Node = () => {
  const swiperRef = React.createRef();

  function swipeToRegisterPage() {
    if(swiperRef !== null && swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  }

  function swipeToLoginPage() {
    if(swiperRef !== null && swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  }

  return (
    <Swiper ref={swiperRef}>
      <Login onRegisterPageCall={swipeToRegisterPage}/>
      <Register onLoginPageCall={swipeToLoginPage}/>
    </Swiper>
  );
}

export default LoginScreen;
