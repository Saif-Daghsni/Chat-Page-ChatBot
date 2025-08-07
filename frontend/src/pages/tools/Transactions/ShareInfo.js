import React, { useState, useEffect } from "react";
import "./ShareInfo.css";
import { FaUserCircle } from "react-icons/fa";

const ShareInfo = (props) => {
  const [selected, setselected] = useState(false);
  useEffect(() => {
    console.log("✅ Selected users updated:", props.selectedusers);
  }, [props.selectedusers]);

  return (
    <div
      className={selected ? "ShareInfo-active" : "ShareInfo-inactive"}
      onClick={() => {
        setselected(!selected);

        if (props.selectedusers.includes(props.user._id)) {
          // Remove user
          props.setSelectedUsers(
            props.selectedusers.filter((id) => id !== props.user._id)
          );
        } else {
          // Add user
          props.setSelectedUsers([...props.selectedusers, props.user._id]);
        }
      }}
    >
      <div className="ShareInfo-div-img">
        <FaUserCircle size={40} color="#3b5998" />
      </div>

      <div className="ShareInfo-name">
        <h5>{props.name}</h5>
      </div>

      <label
        className="ShareInfo-checkbox"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="prixcheckbox"
          checked={selected}
          onChange={() => setselected(!selected)}
          name="agree"
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default ShareInfo;
