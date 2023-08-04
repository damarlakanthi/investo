import { FileSearchOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Row  } from "antd";
import Meta from "antd/es/card/Meta";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { Link } from "react-router-dom";
import UserProfile from "./userProfile";
import TextArea from "antd/es/input/TextArea";
const postsCollectionRef = collection(db, "userPosts");

export const Feed: React.FC<any> = ({ isAuthenticated }) => {
  const [postLists, setPostList] = useState<any>([]);
 const [profileModal, setProfileModal] = useState(false)


  const showProfileModal = () => {
    setProfileModal(true);
  };
  
  const handleProfileModalCancel = () => {
    setProfileModal(false);
  };
  
  const [profileUrl, setProfileUrl] = useState<any>();
  const [profileName, setProfileName] = useState<any>();

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);

    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    const profileUrl = auth.currentUser?.providerData[0].photoURL
    const profileName = auth.currentUser?.displayName
    setProfileUrl(profileUrl);
    setProfileName(profileName);
    
  };

  useEffect(() => {
    

    getPosts();
  }, []);

  useEffect(() => {
    
  
  }, [postLists])
  

  const deletePost = async (id: any) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    

    console.log("user details:",auth.currentUser)
  };

  const searchQuery=async(value:any)=>{

    if(value){
    console.log("null array",value)
    const q = query(collection(db, "userPosts"), where("title", "==", value));
    const results = await getDocs(q);
    setPostList(results.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("postLists2:",postLists)
      
    }
    
    else
    getPosts();

    


  }


  return (
    <div>
      <div>
        <Row>
          <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 2 }}>
            {auth.currentUser?(
            <Link to="/profile">
            <Card
                  hoverable
                  style={{ width: "15vw" ,height:'50vh'}}
                  cover={
                    <img
                      alt="profile"
                      src={profileUrl}
                    />
                  }
                >
                  <Meta title={profileName}></Meta>
                    <Meta  description = {auth.currentUser.email} ></Meta>
                  <h1  style={{color:'blue'}}>click to view profile</h1>
                    
                  
                </Card>
                </Link>
                ):(<></>)}
          
            
          </Col>
          <Col xs={{ span: 12, offset: 1 }} lg={{ span: 8, offset: 2 }}>
            {/* {postLists?(postLists.map((post:any)=>{
            <div>{post.title}</div>
          })):(<></>)}
           */}
            <div>
              {console.log("post details",postLists[0])}
              
              {postLists ? (
                postLists.map((post: any) => {
                  console.log("den",post)
                  return (
                    <div>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      alt="example"
                      src={post.imageUrl}
                    />
                  }
                >
                  
                  <Meta title={post.title} description={post.postText}></Meta><br/>
                  
                   Posted By <Meta description={post.author.name}></Meta>
                  
                  <br/><br/>
                    <Link to={`/userProfile?email=${post.email}`}> <Button onClick={showProfileModal}>Click to view Profile</Button></Link>
                  <p>{post.email}</p>
                </Card>
                  
                
                

              <br/><br/>
                </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            

            {/* {postLists?.map((post:any)=>{
        
          <div>1</div>
          })} */}
          </Col>

          <Col xs={{ span: 2, offset: 1 }} lg={{ span: 3, offset: 2 }}>
            <Input placeholder={"Enter to search for an article"} onChange={(event)=>{searchQuery(event.target.value)}}></Input>
            
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Feed;
