import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import {auth, db, provider } from './firebase-config'


const { Meta } = Card;

const Profile: React.FC<any> = ({isAuthenticated}) => {


  const [picture,setPicture]=useState<any>();


  useEffect(() => {
    
    if(auth.currentUser){

      const pic = auth.currentUser?.providerData[0].photoURL
      setPicture(pic);
    }
  }, [])
  

  
  return(

  
    <Card
      hoverable
      style={{ width: 500 }}
      cover={<img alt="profileimage" src={picture} />}
    >
      <Meta title={auth.currentUser?.displayName}  />
      <Meta title={auth.currentUser?.email}  />
  
    </Card>
  )



};

export default Profile;