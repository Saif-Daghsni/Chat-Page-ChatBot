import React, { useState, useEffect, useRef } from "react";

import "./ChatBot.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaPaperclip, FaMicrophone, FaArrowUp } from "react-icons/fa";
import { FaComments, FaUserCircle } from "react-icons/fa";
import { handleError } from "../../utils";
import FirstUser from "../tools/chat/FirstUser";
import SecondUser from "../tools/chat/SecondUser";

const ChatBot = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [refreshTime, setRefreshTime] = useState(false);
  const [conversation, setConversation] = useState(
    props.user.robotConversation || []
  );

  useEffect(() => {
    setConversation(props.user.robotConversation || []);
  }, [props.user.robotConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [ expanded, conversation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime((prev) => !prev);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
  const handleSendMessage = (e) => {
    if (e === 1 && message.trim() === "") {
      return handleError("Le message est vide");
    }

    const MessageDetails = {
      content: message,
      timestamp: Date.now(),
      sender: "user",
    };

    try {
      fetch(`http://localhost:5000/addMessageToTheBot/${props.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(MessageDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return handleError(data.error);
          }
          setConversation((prev) => [...prev, MessageDetails]);
          setMessage("");
        })
        .catch((err) => {
          console.error("Error sending message:", err);
          handleError("Erreur lors de l'envoi du message");
        });
    } catch (error) {
      console.error("Error sending message:", error);
      handleError("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div
      className={`Achat ${expanded ? "expanded" : ""}`}
      onClick={!expanded ? () => setExpanded(!expanded) : undefined}
    >
      {!expanded && <RiRobot2Line size={30} color="white" />}

      {expanded && (
        <div className="panel-all">
          <div className="panel-all-top">
            <AiOutlineArrowLeft
              size={30}
              className="LeftArrow"
              onClick={() => setExpanded(false)}
            />
            <p className="empty-panel">Robot conversationnel</p>
          </div>

          <div className="panel-container">
            <div className="panel-messages">
              {conversation.length > 0 ? (
                conversation.map((message, index) => {
                  const time = calculateTime(message.timestamp);
                  if (message.content) {
                    return message.sender === "user" ? (
                      <FirstUser
                        key={index}
                        message={message.content}
                        timestamp={message.timestamp}
                        time={time}
                        robot={true}
                      />
                    ) : (
                      <SecondUser
                        key={index}
                        message={message.content}
                        timestamp={message.timestamp}
                        time={time}
                        robot={true}
                      />
                    );
                  }
                  return null;
                })
              ) : (
                <div className="chat-placeholder">
                  <FaComments size={200} className="chat-placeholder-icon" />
                  <p>Écrire une chose pour commencer la conversation</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-bottom">
              <input
                className="panel-input"
                type="text"
                value={message}
                placeholder="Enter a prompt here"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage(1);
                  }
                }}
              />
              <div className="panel-icons-right">
                <FaArrowUp
                  className="panel-icon-arrow"
                  onClick={() => {
                    handleSendMessage(1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;