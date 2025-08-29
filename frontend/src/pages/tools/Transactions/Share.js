import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import "./Share.css";
import ShareInfo from "./ShareInfo";
import { handleError, handleSuccess } from "../../../utils";

const Share = (props) => {
  const [researh, setresearh] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedusers, setSelectedUsers] = useState([]);

  const handleSendOrder = (selectedUsers) => {
    if (selectedUsers.length === 0) {
      return handleError("Veuillez sélectionner un utilisateur");
    }

    const OrderUserSender = {
      _id: props.currentUser._id,
      name: props.currentUser.name,
    };

    selectedUsers.forEach((userId) => {
      const Theorder = {
        user: OrderUserSender,
        title: props.title,
        type: props.type,
        gamme: props.gamme,
        quantite: props.quantite,
        prix: props.prix,
        quantiteNego: props.quantiteNego,
        prixNego: props.prixNego,
      };

      const newMessage = {
        senderId: props.currentUser._id,
        content: "Message d'un ordre",
        order: Theorder,
      };

      const MessageDetails = {
        members: [userId, props.currentUser._id],
        messages: [newMessage],
      };

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
          props.fetchMessages();
          props.setMessage("Message d'un ordre");
        })
        .catch((err) => {
          console.error("Error sending message:", err);
          handleError("Erreur lors de l'envoi du message");
        });
    });

    handleSuccess("Messages envoyés avec succès");
  };
  
  useEffect(() => {
    props.fetchMessages();
  }, [props.selecteduser, props.message]);

  useEffect(() => {
    fetch("http://localhost:5000/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => console.error("❌ Fetch Users error:", err));
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(researh.toLowerCase()) &&
        user.name !== props.user.name
    );
    setFilteredUsers(result);
  }, [researh, users]);

  return (
    <div className="option-details-details">
      <div className="share-top">
        <h4> Le barre de recherche</h4>
      </div>
      <div className="share-input-wrapper">
        <FaSearch className="share-search-icon" />
        <input
          type="text"
          className="share-user-input"
          placeholder="Recherche"
          onChange={(e) => setresearh(e.target.value)}
        />
      </div>
      <div className="share-list">
        {researh &&
          filteredUsers.map((user) => (
            <ShareInfo
              user={user}
              key={user._id}
              id={user._id}
              name={user.name}
              selected={selectedusers.includes(user._id)}
              selectedusers={selectedusers}
              setSelectedUsers={setSelectedUsers}
            />
          ))}
      </div>

      <div className="share-buttons">
        <button
          className="share-annuler"
          onClick={() => {
            props.setrecherche(false);
          }}
        >
          Annuler
        </button>
        <button
          className="share-envoyer"
          onClick={() => {
            if (selectedusers.length === 0) {
              return handleError("Veuillez sélectionner un utilisateur");
            } else {
              handleSendOrder(selectedusers);
              setSelectedUsers([]);
              props.setrecherche(false);
            }
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};
Share.propTypes = {
  setrecherche: PropTypes.func.isRequired,
};

export default Share;
