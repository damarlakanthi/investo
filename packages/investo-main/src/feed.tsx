import { LikeOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
const postsCollectionRef = collection(db, "userPosts");

export const Feed: React.FC<any> = ({ isAuthenticated }) => {
  const [postLists, setPostList] = useState<any>([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);

      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id: any) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div>
      <div>
        <Row>
          <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 2 }}>
            Profile details will be generated
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
                  return (
                    <Card
                      hoverable
                      style={{ width: "100%" }}
                      cover={
                        <img
                          alt="example"
                          src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
                        />
                      }
                    >
                      <Meta
                        title={post.title}
                        description={post.postText}

                      ></Meta>
                      <Meta 
                      description={post.author.name}
                      ></Meta>
                    </Card>
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
            Recent News
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Feed;
