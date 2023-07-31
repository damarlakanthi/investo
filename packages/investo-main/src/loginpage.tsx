import React from 'react'
import './login.css';
import Modal from 'antd/es/modal/Modal';
import { useEffect, useState } from "react";
import { Button } from 'antd';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
export const Loginpage = () => {

    const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handlePhotoCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
  
    <div className="container">
    <form className="login-form">
      <h1>Login</h1>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button><br/>
      <button type="button" >Login with Google</button><br/>
      <Button type="primary" onClick={showModal}>
        Create an Account
      </Button>
      <Modal title="Create An Account" open={isModalOpen} footer={null} onCancel={handleCancel}>
      <form className="signup-form">
      
      <div className="form-group">
        <label htmlFor="email">Email ID</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" required />
      </div>
      <div className="form-group">
        <label htmlFor="org-name">Organization Name</label>
        <input type="text" id="org-name" name="org-name" required />
      </div>
      <div>
      <label htmlFor="org-pic">Profile Picture</label>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handlePhotoCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </div>
      <div className="form-group">
        <label htmlFor="company-description">Description of Company</label>
        <textarea id="company-description" name="company-description"  required></textarea>
      </div>
      <button type="submit">Create Account</button>
    </form>
      </Modal>
    </form>
  </div>
)}


export default Loginpage