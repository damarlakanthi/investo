import React from 'react'
import './login.css';
import Modal from 'antd/es/modal/Modal';
import { useEffect, useState } from "react";
import { Button, message, notification } from 'antd';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { GoogleOutlined, PlusOutlined } from '@ant-design/icons';

import {auth, db, provider } from './firebase-config'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore';
import Main from './main';
import gimg from './google.png'
import styles from './loginpage.module.css'
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
      
      
      <div className={styles.loginPage}>
          
          {contextHolder}
        <div className={styles.container}>
        <h1>Investo</h1>
        <p>Login with your Google account</p>
        {/* <button  className={styles.googleBtn} style={{display:'inline-block', marginTop:'30px',padding:'12px 20px', backgroundColor:'#ea4335',color:'#fff',textDecoration:'none',fontWeight:'bold',boxShadow:'0 2px 4px rgba(0, 0, 0, 0.2)',borderRadius:'4px',border:'none',height:'40px'}}>
          <img src={gimg} alt="Google Icon" className={styles.googleIcon} style={{height:'25px',width:'20px'}}/>
            Login With Google
        </button> */}
        <Button onClick={signInWithGoogle}><GoogleOutlined />Login With Google</Button>
    </div>
       
        
        
      </div>)}
      </div>
    )
      
    
      
    
  


}
export default Loginpage;