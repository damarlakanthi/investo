import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Profile: React.FC = () => {


return(

    
  <Card
    hoverable
    style={{ width: 500 }}
    cover={<img alt="example" src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg" />}
  >
    <Meta title="Profile Pic" description="about something......" />
    <Meta title="" description="about something......" />

  </Card>
)

};

export default Profile;