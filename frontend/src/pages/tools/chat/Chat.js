import React, { useState, useEffect, useRef } from "react";
import { FaPaperclip, FaMicrophone, FaArrowUp } from "react-icons/fa";
import "./Chat.css";
import FirstUser from "./FirstUser";
import SecondUser from "./SecondUser";
import { FaComments, FaUserCircle } from "react-icons/fa";
import { handleError } from "../../../utils";
import ShowImage from "./ShowImage";
import ShowImage2 from "./ShowImage2";
import ShowOrder from "./ShowOrder";

const Chat = (props) => {
  const [image, setImage] = useState("");
  const [refreshTime, setRefreshTime] = useState(false); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime((prev) => !prev); 
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);

  const handleSendMessage = (e) => {
    if (e === 1 && props.message.trim() === "") {
      return handleError("Le message est vide");
    }
    if(props.selecteduser === null || props.selecteduser.length === 0) {
      return handleError("Veuillez sélectionner un utilisateur");
    }

    const newMessage = {
      senderId: props.user._id,
      content: image ? "Image sended" : props.message,
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
    fileInputRef.current.click();
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

  useEffect(() => {
    props.fetchMessages();
  }, [props.selecteduser, props.message]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [props.getmessage, props.selecteduser, refreshTime]); 

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
              const conversation = props.getmessage.find(
                (conv) =>
                  conv.members.includes(props.selecteduser._id) &&
                  conv.members.includes(props.user._id)
              );

              if (conversation) {
                return conversation.messages.length > 0 ? (
                  conversation.messages.map((message, index) => {
                    const time = calculateTime(message.timestamp);
                    if (
                      message.content &&
                      message.content !== "Image sended" &&
                      message.content !== "Message d'un ordre"
                    ) {
                      return message.senderId === props.user._id ? (
                        <FirstUser
                          key={index}
                          message={message.content}
                          timestamp={message.timestamp}
                          time={time}
                          isRead={message.isRead}
                          selecteduser={props.selecteduser}
                        robot={false}
                        />
                      ) : (
                        <SecondUser
                          key={index}
                          message={message.content}
                          timestamp={message.timestamp}
                          time={time}
                          isRead={message.isRead}
                          selecteduser={props.selecteduser}
                        robot={false}
                        />
                      );
                    } else if (
                      message.image &&
                      message.content === "Image sended"
                    ) {
                      return message.senderId === props.user._id ? (
                        <ShowImage
                          key={index}
                          image={message.image}
                          timestamp={message.timestamp}
                          time={time}
                          isRead={message.isRead}
                          imageSended={message.image}
                        />
                      ) : (
                        <ShowImage2
                          key={index}
                          image={message.image}
                          timestamp={message.timestamp}
                          time={time}
                          isRead={message.isRead}
                          imageSended={message.image}
                        />
                      );
                    } else if (
                      message.order &&
                      message.content === "Message d'un ordre"
                    ) {
                      return message.senderId === props.user._id ? (
                        <ShowOrder
                          a="1"
                          user={message.order.user}
                          key={index}
                          timestamp={message.timestamp}
                          time={time}
                          isRead={message.isRead}
                          order={message.order}
                        />
                      ) : (
                        <ShowOrder
                          a="2"
                          user={message.order.user}
                          key={index}
                          timestamp={message.timestamp}
                          time={time}
                          isRead={message.isRead}
                          order={message.order}
                        />
                      );
                    }
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
