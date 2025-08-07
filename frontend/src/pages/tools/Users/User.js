import React, { useState, useEffect } from "react";
import "./User.css";
import { FaSearch } from "react-icons/fa";
import UserProfile from "./UserProfile";
import { handleError } from "../../../utils";

const User = (props) => {
  const [selected, setselected] = useState(false);
  const [researh, setresearh] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersMessages, setUsersMessages] = useState([]);

  const handleGetTheLastMessages = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/GetLastMessages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Last messages fetched:", data);
        if (Array.isArray(data)) {
          setUsersMessages(data);
        } else {
          setUsersMessages([]);
        }
      })
      .catch((err) => console.error("❌ Fetch last messages error:", err));
  };

  useEffect(() => {
    handleGetTheLastMessages();
  }, [props.user._id, props.message ]);

  useEffect(() => {
    const result = props.users.filter(
      (user) =>
        user.name.toLowerCase().includes(researh.toLowerCase()) &&
        user.name !== props.user.name
    );
    if (result === "") {
      return handleError("Utilisateur non trouvé");
    }
    setFilteredUsers(result);
  }, [researh, props.users, props.message]);

  const calculateTime = (timestamp) => {
    const now = new Date();
    const sentTime = new Date(timestamp);
    const diffMs = now - sentTime;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return { value: diffMinutes, type: "minutes" };
    } else if (diffHours < 24) {
      return { value: diffHours, type: "heures" };
    } else {
      return { value: diffDays, type: "jours" };
    }
  };

  const handleviewedmessage = (userId, currentUserId) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/viewedmessage/${userId}/${currentUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Viewed message updated:", data);
        setselected(userId);
      })
      .catch((err) => console.error("❌ Update viewed message error:", err));
  };

  return (
    <div className="users-container">
      <div className="input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="user-input"
          placeholder="Recherche"
          onChange={(e) => setresearh(e.target.value)}
        />
      </div>
      <div className="users-buttom">
        {researh
          ? filteredUsers.map((user) => (
              <UserProfile
                key={user._id}
                id={user._id}
                selected={selected === user._id}
                lastMessage={
                  usersMessages.find((msg) => msg.userId === user._id)
                    ?.lastMessage || "Commencer une conversation"
                }
                time={(() => {
                  const msg = usersMessages.find(
                    (msg) => msg.userId === user._id
                  );
                  return msg
                    ? () => {
                        calculateTime(msg.timestamp);
                      }
                    : undefined;
                })()}
                onClick={() => {
                  setselected(user._id);
                  props.setSelecteduser(user);
                  handleviewedmessage(props.user._id, user._id);
                }}
                name={user.name}
              />
            ))
          : props.users.map((user) => {
              if (props.user._id === user._id) {
                return null;
              }
              return (
                <UserProfile
                  key={user._id}
                  id={user._id}
                  selected={selected === user._id}
                  time={(() => {
                    const msg = usersMessages.find(
                      (msg) => msg.userId === user._id
                    );
                    return msg ? calculateTime(msg.timestamp) : undefined;
                  })()}
                  onClick={() => {
                    setselected(user._id);
                    props.setSelecteduser(user);
                    handleviewedmessage(props.user._id, user._id);
                  }}
                  lastMessage={
                    usersMessages.find((msg) => msg.userId === user._id)
                      ?.lastMessage || "Commencer une conversation"
                  }
                  name={user.name}
                />
              );
            })}
      </div>
    </div>
  );
};

export default User;
