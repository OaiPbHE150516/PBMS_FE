import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { signin } from "../../redux/authenSlice";
import { useDispatch } from "react-redux";

const PageHelper = () => {
  const dispatch = useDispatch();
    return (
        <div>
            <section className="section dashboard title_div">
            <h1 className="welcome">Chào mừng bạn đã đến với PTS</h1>
            <h1 className="welcome">Vui lòng đăng nhập để trải nghiệm</h1>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                dispatch(signin(credentialResponse.credential));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </section>
        </div>
    );
};

export default PageHelper;