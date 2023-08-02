import React from 'react'
import './login.css';
import Modal from 'antd/es/modal/Modal';
import { useEffect, useState } from "react";
import { Button } from 'antd';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

import {auth, provider } from './firebase-config'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
export const Loginpage = ({setisAuthenticated}:any) => {

  const navigate = useNavigate();

  const  [profilename, setProfileName] = useState<String | null>(""); 

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {

      console.log("login details ",result.user.displayName)
      const x:string|undefined|null = result?.user?.displayName
      setProfileName(x)
      localStorage.setItem("isAuth", "true");
      setisAuthenticated(true);
      navigate("/feed");
    });
  };
  
  return(
    <div className="loginPage">
    <p>Sign In With Google to Continue</p>
    <button className="login-with-google-btn" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  </div>
  )

}
export default Loginpage;