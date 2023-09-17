import {GoogleLogin} from "@react-oauth/google";
import React from "react";
import styled from "styled-components";

const LoginStyled = styled.div`
    width: 100%;
  height: 100%;
  padding: 150px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.9);
`

const Login = () => {
    return <LoginStyled>
        <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />
    </LoginStyled>
}
export default Login