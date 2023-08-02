import React, { useState } from 'react'
import {Button, Input, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import { useNavigate } from 'react-router-dom';
export const Myposts:React.FC<any> = ({isAuthenticated}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const postsCollectionRef = collection(db, "userPosts");
    const navigation = useNavigate();
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

    if(auth.currentUser){
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth?.currentUser.displayName, id: auth?.currentUser.uid },
    });
    navigation("/feed");
}
  };

  
  return (
    <div>

        <Button onClick={showModal}><PlusOutlined />Create new Post</Button>
        <Modal title="Create New Post" open={isModalOpen} onOk={createPost} onCancel={handleCancel}>
        <Input placeholder="Title"  onChange={(event) => {
              setTitle(event.target.value);
            }}/>
            <br/><br></br>
            <TextArea rows={4}  placeholder="Info"  onChange={(event) => {
              setPostText(event.target.value);
            }}/>
      </Modal>


    </div>
  )
}

export default Myposts
