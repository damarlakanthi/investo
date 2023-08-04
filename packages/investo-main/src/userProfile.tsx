import { Button, Card, Modal, Tabs, TabsProps } from 'antd'
import Meta from 'antd/es/card/Meta';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase-config';
import styles from './myposts.module.css'
import { Link } from 'react-router-dom';
export const UserProfile:React.FC<any> = ({currentEmail}) => {

    const url = window.location.search;
    console.log("location: ",url)
    const email = url.substring(7)
const postsCollectionRef = collection(db, "userPosts");
const followCollectionRef = collection(db,"following");

    // const email = nurl.searchParams.get('email');
    console.log("useremail",email);
  const [postLists, setPostList] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [follow, setFollow] = useState<any>();
  const [refID,setrefID] = useState<any>();
const [showUnfollow, setShowUnfollowWarning] = useState<boolean>(false)
  
   
    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(postsCollectionRef);
          const followingData = await getDocs(followCollectionRef);
    
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setFollowing(followingData.docs.map((docs)=>({...docs.data(),id: docs.id})));
        };
    
        getPosts();
      }, []);

      useEffect(() => {
        
      }, [follow])

      useEffect(() => {
        
      }, [following])
      
      

      console.log("followingData:",following)


      const handleFollow=async()=>{

        if (auth.currentUser) {
            await addDoc(followCollectionRef, {
              email,
              currentEmail,
             
              
            });
           
          }

         


      }

      const handleUnfollow = async()=>{

        const postDoc = doc(db, "following", refID.id);
         await deleteDoc(postDoc);

         

      }
      const unfollowModal=()=>{
        setShowUnfollowWarning(true)
      }
    
      const cancelUnfollowModel=()=>{
        setShowUnfollowWarning(false)
      }
    

      useEffect(()=>{


       const res= following.find((item: {
           email: any; currentEmail: any; 
})=>item.currentEmail==currentEmail && item.email==email)

console.log("resultsss:",res)
if(res)
  setFollow(true)
  setrefID(res)


  
      },[following])
      
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Posts`,
          children: <>
          
          
          <div className={styles.myposts}>
        {postLists ? (
          postLists.map((post: any) => {
            
            if (post.email == email) {
              return (
                <div className={styles.post}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      alt="profilepic"
                      src={post.imageUrl}
                    />
                  }
                >
                <Meta title={post.title} description={post.postText}></Meta>
                  
                    <Meta description={post.author.name}></Meta>
                 

                  
                </Card>

                <Modal onCancel={cancelUnfollowModel} title="Alert" onOk={handleUnfollow} open={showUnfollow}>  
                  <p>You will be unfollowing the person</p>
                  <p>Do you wish to continue</p>

                </Modal>

                
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
          </> ,
        },
        
        {
          key: '2',
          label: `Profile`,
          children: <>
          <div>
            {auth.currentUser?(
               
                  <Card 
                  hoverable
                  style={{width:'30%'}}
                  cover={
                    <img src= ""/>
                  }
                  
                  
                  >
                    <Meta title={email}></Meta>


                  </Card>
                
            ):(<></>)}
          </div>
          {follow?(<Button onClick={unfollowModal}>Unfollow </Button>):(<Button onClick={handleFollow}>Follow</Button>)}
          <Link to=""><Button>Message</Button></Link>
            
         
          </>,
        },
        
      ];
  return (
    <div>

<Tabs defaultActiveKey="1" items={items}  />

    </div>
  )
}

export default UserProfile