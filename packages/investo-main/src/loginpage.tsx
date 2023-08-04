import React from 'react'
import './login.css';
import Modal from 'antd/es/modal/Modal';
import { useEffect, useState } from "react";
import { Button, message, notification } from 'antd';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

import {auth, db, provider } from './firebase-config'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import Main from './main';
export const Loginpage:React.FC<any> = ({setisAuthenticated, isAuthenticated, setEmail}) => {

  const navigate = useNavigate();
  const postsCollectionRef = collection(db, "users");

  const  [profilename, setProfileName] = useState<String | null>(""); 
  const [api, contextHolder] = notification.useNotification();

  const createUser=async ()=>{
    if(auth.currentUser){
      const userEmail=auth.currentUser.email;
      const userName = auth.currentUser.displayName
      await addDoc(postsCollectionRef, {
        userEmail,
        userName,
        
      });
    }
  }

  
  useEffect(()=>{
    api['warning']({
      message: 'Only login with Google',
      description: 'Now We only support google login',
    });
  },[])

  useEffect(()=>{

  },[isAuthenticated])

  

  
  

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {

      const email = String(result.user.email)

      console.log("login details ",result.user.displayName)
      const x:string|undefined|null = result?.user?.displayName
      setProfileName(x)
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("email",email)
      setEmail(email)
      createUser();
      setisAuthenticated(true);
      
    });
  };
  
  
    return(
      <div>
      {isAuthenticated?(
       
        <></>
      ):(
      
      
      <div className="loginPage">
          
          {contextHolder}
        <p>Sign In With Google to Continue</p>
        
        <Button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      </div>)}
      </div>
    )
      
    
      
    
  


}
export default Loginpage;