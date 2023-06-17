import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import db, { storage } from "../../lib/firebase";
import "./style.css";
import firebase from "firebase";
import { useLocalContext } from "../../context/context";
import { Announcment } from "..";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';

const Main = ({ classData }) => {
  const { loggedInMail } = useLocalContext();
  const { loggedInUser } =
  useLocalContext();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [textData, setTextData] = useState();
  const [classCode, setClassCode] = useState("");

  const shareUrl = `http://localhost:3000/${classData.id}`;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on("state_changed", () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("announcments")
            .doc("classes")
            .collection(classData.id)
            .add({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              text: inputValue,
              sender: loggedInMail,
            });
        });
    });
  };
  const handletext =(e)=>{
    e.preventDefault();
    db.collection("text announcement")
    .doc("classes")
    .collection(classData.id)
        .add({
          text:text
        });
        setText("");
  };
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.className}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              {loggedInMail==="komalasalunkhe2019@gmail.com"&&<div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classData.id}</div>
              </div>}
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p className="main__upcoming">UPCOMING!</p>
            <p className="main__subText">no work due</p>
          </div>
          <div className="main__status">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
 
</svg><div>
<a href="https://meet.google.com/" target="_blank"className="conference">meet</a></div>
         {/* start */}
          </div>
          <div className="main__status">  <FacebookShareButton
          url={shareUrl}
         
        >
          <FacebookIcon size={30} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareUrl}
          
        >
          <WhatsappIcon size={30} round={true} />
        </WhatsappShareButton></div>
           <div className="main__announcements">
           { loggedInMail==="komalasalunkhe2019@gmail.com"&&
            <div className="main__announcementsWrapper">
           <div className="main__ancContent">
           <div className="cont">{showInput ? (
                  <div className="main__form">
                     
                    <TextField
              
                      id="filled-multiline-flexible"
                      multiline
                      label="upload Something to class"
                      variant="filled"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="main__buttons">

                      <div>
                        <Button style={{color:"black"}} onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={handletext}
                    
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar 
                    src={loggedInUser?.photoURL}
                    />
                    <div style={{color:"black"}}>Announce Something to class</div>
                  </div>
                )}
                </div>
           <div >{showInput ? (
                  <div className="main__form">
                     
                    <TextField
              
                      id="filled-multiline-flexible"
                      multiline
                      label="upload Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <input
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        type="file"
                      />


                      <div>
                        <Button style={{color:"black"}} onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={handleUpload}
                    
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar
                     src={loggedInUser?.photoURL}
                     />
                    <div style={{color:"black"}}>upload Something to class</div>
                  </div>
                )}
                </div>
              </div>
            </div>}
            <div className="main__announcementsWrapper">
            <div className="main__ancContent">
            <Announcment classData={classData} />
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;