import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import {auth, db, provider } from './firebase-config'
import { LogoutOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const { Meta } = Card;

const Profile: React.FC<any> = ({setisAuthenticated}) => {

  const navigate = useNavigate();


  const [picture,setPicture]=useState<any>();


  useEffect(() => {
    
    if(auth.currentUser){

    const pic = auth.currentUser?.providerData[0].photoURL
    setPicture(pic);
  }
  }, [])
  
const signout=()=>{

  signOut(auth).then(() => {
    setisAuthenticated(false);
   
  }).catch((error) => {
    // An error happened.
  });
}
  



  


  return(

  <div>
    <Card
      hoverable
      style={{ width: 500 }}
      cover={<img alt="profileimage" src={picture} />}
    >
      <Meta title={auth.currentUser?.displayName}  />
      <Meta title={auth.currentUser?.email}  />
  
    </Card>
    <br/><br/>
    <Button onClick={signout}><LogoutOutlined />Signout</Button>
    </div>
  )



};

export default Profile;