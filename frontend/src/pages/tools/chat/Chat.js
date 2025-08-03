import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaPaperclip, FaMicrophone, FaArrowUp } from "react-icons/fa";
import "./Chat.css";
import FirstUser from "./FirstUser";
import SecondUser from "./SecondUser";
import { FaComments, FaUserCircle } from "react-icons/fa";
import { handleError } from "../../../utils";

const Chat = (props) => {
  const [getmessage, setGetMessage] = useState([]);
  const [image, setImage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    
    if (e === 1 && props.message.trim() === "") {
      return handleError("Le message est vide");
    }

    const newMessage = {
      senderId: props.user._id,
      content: props.message,
      timestamp: new Date().toISOString(),
      isRead: false,
      image: image ? image : null,
    };

    const MessageDetails = {
      members: [props.user._id, props.selecteduser._id],
      messages: [newMessage],
    };
    try {
      fetch("http://localhost:5000/conversations", {
        method: "POST",
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
          props.setMessage("");
          fetchMessages();
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

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/GetConversations", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.error) {
        return handleError(data.error);
      }
      setGetMessage(data);
      console.log("data :", data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      handleError("Erreur lors de la récupération des messages");
    }
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
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  function covertToBase64(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 1.0);

        setImage(compressedBase64);
      };
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // You can now upload it or display it...
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [props.selecteduser, props.message, props.refreshReadStatus]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [getmessage, props.selecteduser]);

  return (
    <div className="chat-all">
      <div className="chat-all-top">
        {props.selecteduser.length !== 0 ? (
          <>
            <div className="transaction-label-photo">
              <FaUserCircle size={40} color="#3b5998" />
            </div>
            <label className="chat-top-label">{props.selecteduser.name}</label>
          </>
        ) : (
          <>
            <p className="empty-chat">Choisir un utilisateur</p>
          </>
        )}
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {props.selecteduser ? (
            (() => {
              const conversation = getmessage.find(
                (conv) =>
                  conv.members.includes(props.selecteduser._id) &&
                  conv.members.includes(props.user._id)
              );

              if (conversation) {
                return conversation.messages.length > 0 ? (
                  conversation.messages.map((message, index) => {
                    const time = calculateTime(message.timestamp);
                    return message.senderId === props.user._id ? (
                      <FirstUser
                        key={index}
                        message={message.content}
                        timestamp={message.timestamp}
                        time={time}
                        isRead={message.isRead}
                      />
                    ) : (
                      <SecondUser
                        key={index}
                        message={message.content}
                        timestamp={message.timestamp}
                        time={time}
                        isRead={message.isRead}
                      />
                    );
                  })
                ) : (
                  <div className="chat-placeholder">
                    <FaComments size={200} className="chat-placeholder-icon" />
                    <p>
                      Sélectionnez un utilisateur pour démarrer une conversation
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="chat-placeholder">
                    <FaComments size={200} className="chat-placeholder-icon" />
                    <p>
                      Sélectionnez un utilisateur pour démarrer une conversation
                    </p>
                  </div>
                );
              }
            })()
          ) : (
            <div className="chat-placeholder">
              <FaComments size={200} className="chat-placeholder-icon" />
              <p>Sélectionnez un utilisateur pour démarrer une conversation</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        <div className="chat-bottom">
          <div>
            {/* Clickable icon */}
            <FaPaperclip
              className="chat-icon-left"
              onClick={(e) => {
                handleIconClick();
              }}
              style={{ cursor: "pointer" }}
            />

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                covertToBase64(e);
              }}
              style={{ display: "none" }}
            />
          </div>
          <input
            className="chat-input"
            type="text"
            value={props.message}
            placeholder="Enter a prompt here"
            onChange={(e) => props.setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // optional, in case the form submits
                handleSendMessage(1);
              }
            }}
          />
          <div className="chat-icons-right">
            <FaMicrophone className="chat-icon-mic" />
            <FaArrowUp
              className="chat-icon-arrow"
              onClick={() => {
                handleSendMessage(1);
              }}
            />
          </div>
        </div>
      </div>
      {image && <div className="image-overlay"></div>}
      {image && (
        <div className="image-preview">
          <div className="image-div">
            <img src={image} alt="Preview" className="image-preview-img" />
            <div className="image-preview-buttons">
              <button className="image-annuler" onClick={() => setImage("")}>
                Annuler
              </button>
              <button
                className="image-preview-confirm"
                onClick={() => {
                  handleSendMessage();
                  setImage("");
                }}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
