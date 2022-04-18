import React from "react";
import { useSelector } from "react-redux";
import SigninContainer from "../containers/SigninContainer";
import { RootState } from "../types";
import { Redirect } from "react-router-dom";

export default function Signin() {
  // 토큰을 확인해서 없으면 signin 페이지에 남아있고, 있으면 list 페이지로 옮기는 작업을 한다.
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  
  if (token !== null) {
    return <Redirect to="/" />
  }

  return <SigninContainer />;
}