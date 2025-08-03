import React from "react";
import PropTypes from "prop-types";
import "./UserProfile.css";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = ({ id, selected, onClick, name, lastMessage, time }) => {
  return (
    <div
      className={selected ? "UserProfile-inactive" : "UserProfile-active"}
      onClick={() => onClick(id)}
    >
      <div className="UserProfile-photo">
        <FaUserCircle size={40} color="#3b5998" />
      </div>

      <div className="UserProfile-details">
        <div className="UserProfile-details-user">
          <label>{name}</label>
          <span>
            {time
              ? `${time.value} ${
                  time.type === "minutes"
                    ? "min"
                    : time.type === "heures"
                    ? "h"
                    : "j"
                }`
              : "—"}
          </span>
        </div>
        <p>
          {lastMessage.length > 30
            ? lastMessage.slice(0, 30) + "..."
            : lastMessage}
        </p>
      </div>
    </div>
  );
};
UserProfile.propTypes = {
  id: PropTypes.any.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserProfile;
