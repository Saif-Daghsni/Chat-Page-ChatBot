/* eslint-disable react/prop-types */
import React from "react";
import "./Consulter.css";
import { useState } from "react";
import { handleError, handleSuccess } from "../../../utils";

const Consulter = (props) => {
  const handleSendMessage = (e) => {
    if (e === 1 && props.message.trim() === "") {
      return handleError("Le message est vide");
    }

    const Theorder = {
      userId: props.user._id,
      username: props.user.name,
      title: props.title,
      type: props.type,
      gamme: props.gamme,
      quantite: props.quantite,
      prix: props.prix,
      quantiteNego: props.quantiteNego,
      prixNego: props.prixNego,
    };

    const newMessage = {
      senderId : props.currentUser._id,
      order: Theorder,
    };

    const MessageDetails = {
      members: [props.user._id, props.currentUser._id],
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
          // fetchMessages(); *********************************************************
          handleSuccess("Message envoyé avec succès");
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
    <div className="consulter-container">
      <div className="overlay123"></div>
      <div className="consulter-container-under">
        <div className="button-row">
          <button
            className={`${
              (props.quantiteNego && props.prixNego)
                ? "negocier-active"
                : "communique-button "
            }`}
            onClick={() => {
              if (props.quantiteNego === 1 && props.prixNego === 1) {
                return handleError("Vous n'avez pas négocié cette offre");
              } else if (props.user._id === props.currentUser._id) {
                return handleError(
                  "Vous ne pouvez pas négocier votre propre offre"
                );
              } else {
                handleSendMessage();
                props.setConsulter(false);
              }
            }}
          >
            Négocier
          </button>
          <button
            className="confirme-button"
            onClick={() => {
              props.setConsulter(false);
              props.setConfirme(false);
            }}
          >
            Confirme
          </button>
        </div>
        <button
          className="annuler-button"
          onClick={() => props.setConsulter(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default Consulter;
