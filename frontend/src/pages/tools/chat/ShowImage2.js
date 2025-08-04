import React from "react";
import "./ShowImage2.css";
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";

const ShowImage2 = (props) => {
  return (
    <div className="SecondUserimage">
      <div className="SecondUserimage-message">
        <img src={props.image} alt="plate1" className="SecondUserimage-image" />
        <div className="SecondUser-bottom">
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

export default ShowImage2;
