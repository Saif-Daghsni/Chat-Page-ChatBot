import React, { useState, useEffect, useRef } from "react";

import "./ChatBot.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaPaperclip, FaMicrophone, FaArrowUp } from "react-icons/fa";
import { FaComments, FaUserCircle } from "react-icons/fa";

const ChatBot = () => {
  const [expanded, setExpanded] = useState(true);

  const handleSendMessage = (e) => {};

  const messagesEndRef = useRef(null);
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
              <div className="panel-placeholder">
                <FaComments size={200} className="panel-placeholder-icon" />
                <p>Écrire une chose pour commencer la conversation</p>
              </div>

              <div ref={messagesEndRef} />
            </div>
            <div className="chat-bottom">
              <input
                className="panel-input"
                type="text"
                // value={props.message}
                placeholder="Enter a prompt here"
                // onChange={(e) => props.setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // optional, in case the form submits
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
