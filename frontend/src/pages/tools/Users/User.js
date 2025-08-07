import React, { useState, useEffect, useRef, useMemo } from "react";
import "./User.css";
import { FaSearch } from "react-icons/fa";
import UserProfile from "./UserProfile";
import { handleError } from "../../../utils";

const User = (props) => {
  const [selected, setselected] = useState(null);
  const [researh, setresearh] = useState("");
  const [usersMessages, setUsersMessages] = useState([]);
  const [refreshTime, setRefreshTime] = useState(false);
  const messagesEndRef = useRef(null);

  const handleGetTheLastMessages = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/GetLastMessages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsersMessages(data);
        } else {
          setUsersMessages([]);
        }
      })
      .catch((err) => console.error("Fetch last messages error:", err));
  };

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
      .then(() => setselected(currentUserId))
      .catch((err) => {
        console.error("Update error:", err);
        setselected(currentUserId);
      });
  };

  const getSortedUsers = useMemo(() => {
    return [...props.users].filter(user => user._id !== props.user._id).sort((a, b) => {
      const msgA = usersMessages.find(msg => msg.userId === a._id);
      const msgB = usersMessages.find(msg => msg.userId === b._id);
      
      if (msgA && msgB) {
        return new Date(msgB.timestamp) - new Date(msgA.timestamp);
      }
      if (msgA) return -1;
      if (msgB) return 1;
      return 0;
    });
  }, [props.users, usersMessages, props.user._id]);

  const getFilteredAndSortedUsers = useMemo(() => {
    const filtered = props.users.filter(
      user => user.name.toLowerCase().includes(researh.toLowerCase()) && 
              user._id !== props.user._id
    );
    
    return filtered.sort((a, b) => {
      const msgA = usersMessages.find(msg => msg.userId === a._id);
      const msgB = usersMessages.find(msg => msg.userId === b._id);
      
      if (msgA && msgB) {
        return new Date(msgB.timestamp) - new Date(msgA.timestamp);
      }
      if (msgA) return -1;
      if (msgB) return 1;
      return 0;
    });
  }, [researh, props.users, usersMessages, props.user._id]);

  const [onlineUsers, setOnlineUsers] = useState(new Set());

// WebSocket connection in useEffect
useEffect(() => {
  const ws = new WebSocket('ws://localhost:5000');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'onlineUsers') {
      setOnlineUsers(new Set(data.data));
    }
  };

  return () => ws.close();
}, []);

  useEffect(() => {
    handleGetTheLastMessages();
  }, [props.user._id, props.message]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime((prev) => !prev);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [props.getmessage, props.selecteduser, refreshTime]);

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
          ? getFilteredAndSortedUsers.map((user) => (
              <UserProfile
                key={user._id}
                id={user._id}
                selected={selected === user._id}
                lastMessage={
                  usersMessages.find((msg) => msg.userId === user._id)
                    ?.lastMessage || "Commencer une conversation"
                }
                time={(() => {
                  const msg = usersMessages.find((msg) => msg.userId === user._id);
                  return msg ? calculateTime(msg.timestamp) : undefined;
                })()}
                onClick={() => {
                  setselected(user._id);
                  props.setSelecteduser(user);
                  handleviewedmessage(props.user._id, user._id);
                }}
                name={user.name}
  isOnline={onlineUsers.has(user._id)}
              />
            ))
          : getSortedUsers.map((user) => (
              <UserProfile
                key={user._id}
                id={user._id}
                selected={selected === user._id}
                time={(() => {
                  const msg = usersMessages.find((msg) => msg.userId === user._id);
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
  isOnline={onlineUsers.has(user._id)}
              />
            ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default User;