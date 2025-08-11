import { React, useEffect } from "react";
import "./SecondUser.css";
import { BiCheckDouble } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";

const SecondUser = (props) => {
  return (
    <div className="SecondUser">
      <div className="SecondUser-message">
        <p>{props.message}</p>
        <div className="SecondUser-bottom">
          il y a {props.time.value}{" "}
          {props.time.type === "minutes"
            ? "minutes"
            : props.time.type === "heures"
            ? "heures"
            : "jours"}
          {!props.robot && (
            <>
              {props.isRead === true ? (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondUser;
