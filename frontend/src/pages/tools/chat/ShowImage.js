import React from "react";
import "./ShowImage.css";
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";

const ShowImage = (props) => {
  return (
    <div className="FirstUserimage">
      <div className="FirstUserimage-message">
        <img src={props.image} alt="plate1" className="FirstUserimage-image" />
        <div className="FirstUserimage-bottom">
          il y a {props.time.value}{" "}
          {props.time.type === "minutes"
            ? "minutes"
            : props.time.type === "heures"
            ? "heures"
            : "jours"}
          {props.isRead ? (
            <BiCheckDouble
              style={{
                marginLeft: "5px",
                color: "#000000ff",
                fontSize: "14px",
              }}
            />
          ) : (
            <BiCheck
              style={{
                marginLeft: "5px",
                color: "#000000ff",
                fontSize: "14px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowImage;
