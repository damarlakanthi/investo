import React, { useEffect, useState } from "react";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import Network from "./network";
import Profile from "./profile";
import Feed from "./feed";
import Main from "./main";






const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);


  const [isAuthenticated, setisAuthenticated] = useState(false);

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    
  }, []);




  const responseMessage=()=>{
    navigate('/feed')
  }

    const [ profile, setProfile ] = useState<any>([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));

                    setisAuthenticated(true);

                    
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

  
  return (
    // <div>
    //   {isAuthenticated ? (
    //     <Layout style={{ minHeight: '100vh' }}>
    //     <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    //       <div className="demo-logo-vertical" />
    //       <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({key})=>{navigate(key)}}/>

    //     </Sider>
    //     <Layout>
    //       <Header style={{ padding: 0, background: colorBgContainer }} />
    //       <Content style={{ margin: '0 16px' }}>
    //        <DataReturned/>
    //       </Content>
    //     </Layout>
    //   </Layout>
    //   ) : (<div>login page</div>)};

    // </div>

    <div>
      {/* {isAuthenticated ? (<Main/>):(
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>)
      } */}
      {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div> */}

        <Main/>
     
    </div>
  );
};

const DataReturned: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>}></Route>
      <Route path="/network" element={<Network />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
    </Routes>
  );
};

export default App;
