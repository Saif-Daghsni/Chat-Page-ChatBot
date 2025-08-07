import React, { useEffect } from "react";
import "./FirstUser.css";
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";

const FirstUser = (props) => {

  return (
    <div className="FirstUser">
      <div className="FirstUser-message">
        <p>{props.message}</p>
        <div className="FirstUser-bottom">
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
                color: "#ffffffff",
                fontSize: "14px",
              }}
            />
          ) : (
            <BiCheck
              style={{
                marginLeft: "5px",
                color: "#ffffffff",
                fontSize: "14px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstUser;
