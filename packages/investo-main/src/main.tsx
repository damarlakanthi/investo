import React, { useEffect, useState } from "react";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  StockOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Profile from "./profile";
import Network from "./network";
import Feed from "./feed";
import jwtDecode from "jwt-decode";

import axios from 'axios';
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from "@react-oauth/google";
import Loginpage from "./loginpage";

const { Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  link?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    link,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Feed", "/feed", <StockOutlined />),
  getItem("My Network", "/network", <TeamOutlined />),
  getItem("Home", "/", <DesktopOutlined />),
  getItem("Profile", "/profile", <UserOutlined />),
];

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  

  


  const [user, setUser] = useState<any>({});

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

                

                
        }
    },
    [ user ]
);
  const responseMessage=()=>{
    navigate('/feed')
  }

    const [ profile, setProfile ] = useState<any>([]);

    
   

    // log out function to log the user out of google and set the profile array to null
  
  const logOut=()=>{
    googleLogout();
    setProfile(null);
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

console.log('profileeee',profile)
const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)
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
        
      {isAuthenticated?(<Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} >
          {profile.length!==0?(<p>{profile.name}</p>):(<button onClick={logOut}>Log out</button>)}
          
          </Header>
          <Content style={{ margin: "0 16px" }}>
            {profile.length!==0?(<DataReturned />):(<button onClick={() => login()}>Sign in with Google 🚀 </button>)}
            
          </Content>
        </Layout>
      </Layout>):(<Loginpage/>)}
      {/* <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} >

          <button onClick={logOut}>Log out</button>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <DataReturned />
          </Content>
        </Layout>
      </Layout> */}
    </div>
  );
};

const DataReturned: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="354002424448-mi6oha24dvp2cm1sn35q85s1e61meoou.apps.googleusercontent.com">
    <Routes>
      <Route path="/" element={<div>Home</div>}></Route>
      <Route path="/network" element={<Network />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
    </Routes>
    </GoogleOAuthProvider>
  );
};

export default Main;
