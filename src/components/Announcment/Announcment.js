import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../lib/firebase";
import "./style.css";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useLocalContext } from "../../context/context";

const Announcment = ({ classData }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [announcment, setAnnouncment] = useState([]);
  const [text, setText] = useState([]);
  const [id, setId] = useState([]);
  const [info , setInfo] = useState([]);
  const { loggedInUser } =
  useLocalContext();
  
  useEffect(() => {
    if (classData) {
      let text = db
      .collection("text announcement")
      .doc("classes")
      .collection(classData.id)
      .onSnapshot((snap) => {
        setText(snap.docs.map((doc) => doc.data()));
         
    });
      return () => text();
      }
    }, [classData]);

  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcments")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncment(snap.docs.map((doc) => doc.data()));
        });
        return () => unsubscribe();
    }
  }, [classData]);

 
  
  return (
    <div>
      {announcment.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar
              src={loggedInUser?.photoURL}
              />
              <div style={{ color: "#fff" }}>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>

       <iframe src={item.imageUrl}frameBorder="0" scrolling="auto" height="100%"width="100%"></iframe>
           
           <button type="button" className="btn btn-primary"> 
           <a href={item.imageUrl}  className="link"> veiw and Download </a>
           </button>

            </div>
        </div>
      ))}
      {text.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar
              src={loggedInUser?.photoURL}
              />
              <div style={{ color: "#fff" }}>{item.sender}</div>
            </div>
            <p className="amt__txt"style={{ color: "#fff" }}>{item.text}</p>

            </div>
        </div>
      ))}
    </div>
  );
};

export  default Announcment;
