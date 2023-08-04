import React, { useEffect, useState } from "react";
import { Button, Card, Input, Modal, Upload, UploadProps, notification } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { Link, useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import UserProfile from "./userProfile";
import styles from './myposts.module.css'

export const Myposts: React.FC<any> = ({ isAuthenticated, email }) => {
  console.log("my email: ", email);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const[imageUrl, setImageUrl] = useState("");
  const postsCollectionRef = collection(db, "userPosts");
  const navigation = useNavigate();
  const [postLists, setPostList] = useState<any>([]);
  const [profileModal, setProfileModal] = useState(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const [api, contextHolder] = notification.useNotification();
  
  const showProfileModal = () => {
    setProfileModal(true);
  };

  const handleProfileModalCancel = () => {
    setProfileModal(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createPost = async () => {
    console.log("auth details", auth);

    if (auth.currentUser) {
      console.log("user details",auth.currentUser)
      await addDoc(postsCollectionRef, {
        title,
        postText,
        email,
        imageUrl,
        author: {
          name: auth?.currentUser.displayName,
          id: auth?.currentUser.uid,
        },
      });
      navigation("/feed");
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);

      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{

    
  }

  const showProfile = () => {};


  const deletePost=async(id:any)=>{

    const postDoc = doc(db, "userPosts", id);
    await deleteDoc(postDoc);

    setOpenDelete(false)

    api['success']({
      message: 'Deleted Successfully',
      description:
        `post with postID: ${id} deleted..`,
    });
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);

      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  
  }, [deletePost])

  const closeDelete=()=>{
    setOpenDelete(false);
  }
  
  const openDeletePopUp=()=>{
    setOpenDelete(true)
  }

  return (
    <div>
      <Button onClick={showModal}>
        <PlusOutlined />
        Create new Post
      </Button>
      <br/><br/>
      <Modal
        title="Create New Post"
        open={isModalOpen}
        onOk={createPost}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <br />
        <br></br>
        <TextArea
          rows={4}
          placeholder="Info"
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />
<p style={{color:'red'}}>We are supporting only public access image url right now sorry for inconvenience</p>
        <Input placeholder="Give your public image URls"
        
        onChange={(event) => {
          setImageUrl(event.target.value);
        }}
        ></Input>


      </Modal>

      <div className={styles.myposts}>
        {postLists ? (
          postLists.map((post: any) => {
            {
              console.log("post dataaaa:", post.email);
            }
            if (post.email == email) {
              return (
                <div  className={styles.post}>
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
                    <Meta title={post.title} description={post.postText}></Meta>
                    <Link to="/userProfile">
                      {" "}
                      <Meta description={post.author.name}></Meta>
                    </Link>
                  </Card>
                  <Button
                    onClick={() => {
                      setOpenDelete(true);
                    }}

                  ><DeleteOutlined /></Button>

                  <Modal onOk={()=>deletePost(post.id)} onCancel={closeDelete} open={openDelete}>
                    <p>Deleting this post cannot get back.</p>
                    <p>Are you sure you want to delete the post?</p>

                  </Modal>
                  {contextHolder}
                </div>
              );
            } else {
              return <>{post?.author?.email}</>;
            }
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Myposts;
function setPostList(arg0: { id: string }[]) {
  throw new Error("Function not implemented.");
}
