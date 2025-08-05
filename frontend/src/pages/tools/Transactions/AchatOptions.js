import React, { useState } from "react";
import "./AchatOptions.css";
// eslint-disable-next-line no-unused-vars
import { FiCheck } from "react-icons/fi";
import Consulter from "./Consulter";
import PropTypes from "prop-types";
import Vente from "./Vente";
import { FaHandshake } from "react-icons/fa";
import Details from "./Details";
import { BiShareAlt } from "react-icons/bi";
import Share from "./Share";
import Supprimer from "./Supprimer";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaTags } from "react-icons/fa";

const AchatOptions = (props) => {
  const [details, setdetails] = useState(false);
  const [consulter, setConsulter] = useState(false);
  const [confirme, setConfirme] = useState(true);
  const [modifier, setmodifier] = useState(false);
  const [recherche, setrecherche] = useState(false);
  const [supprimer, setsupprimer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="option">
      <div className="row">
        <div className="option-photo">
          <FaUserCircle size={40} color="#3b5998" />
        </div>

        <div className="option-details">
          <label className="option-details-title">
            {props.user.name}
            <div className="tooltip-container">
              {props.title === "Achat" ? (
                <>
                  <FaShoppingCart
                    size={16}
                    color="white"
                    className="details-icon"
                  />
                  <span className="tooltip-text">Ordre d'achat</span>
                </>
              ) : (
                <>
                  <FaTags size={16} color="white" className="details-icon" />
                  <span className="tooltip-text">Ordre de vente</span>
                </>
              )}
            </div>
          </label>

          <div className="option-details-title-container">
            <div className="option-details-title-container-title">
              <label className="option-details-row-label">
                <p>Type</p>
                <p>:</p>
              </label>
              <label className="option-details-row-label">
                <p>Gamme</p>
                <p>:</p>
              </label>
              <label className="option-details-row-label">
                <p>Quantité</p>
                <p>:</p>
              </label>
              <label className="option-details-row-label">
                <p>Prix</p>
                <p>:</p>
              </label>
            </div>
            <div className="option-details-title-container-values">
              <a>{props.type}</a>
              <a>{props.gamme}</a>
              <div>
                <a>{props.quantite}</a>
                <div className="tooltip-container">
                  <FaHandshake
                    style={{
                      color: props.quantiteNego === 0 ? "#166534" : "#B91C1C",
                    }}
                    size={20}
                  />
                  <span className="tooltip-text">
                    Quantité {props.quantiteNego === 1 ? "non " : ""}négociable
                  </span>
                </div>
              </div>
              <div>
                <a>{props.prix} DT</a>
                <div className="tooltip-container">
                  <FaHandshake
                    style={{
                      color: props.prixNego === 0 ? "#166534" : "#B91C1C",
                    }}
                    size={20}
                  />
                  <span className="tooltip-text">
                    Prix {props.prixNego === 1 ? "non " : ""}négociable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {consulter && (
        <Consulter
          user={props.user}
          setConfirme={setConfirme}
          setConsulter={setConsulter}
          prixNego={props.prixNego}
          quantiteNego={props.quantiteNego}
          type={props.type}
          gamme={props.gamme}
          quantite={props.quantite}
          prix={props.prix}
          title={props.title}
          OwnerOrderName={props.user.name}
          OwnerOrderId={props.user._id}
          currentUser={props.currentUser}
        />
      )}

      {confirme ? (
        <div className="option-details-row-buttons">
          {props.button == "Modifier" && (
            <>
              <button
                className="option-details-Consulter-share"
                onClick={() => setrecherche(true)}
              >
                <BiShareAlt size={13} />
              </button>
              <button
                className="option-details-Consulter-supprimer"
                onClick={() => {
                  setsupprimer(true);
                }}
              >
                Supprimer
              </button>
            </>
          )}
          <button
            onClick={() => setdetails(true)}
            className="option-details-Consulter-Details"
          >
            Details
          </button>
          <button
            className="option-details-Consulter-Consulter"
            onClick={() => {
              if (props.button === "Consulter") {
                setConsulter(true);
              } else if (props.button === "Modifier") {
                setmodifier(!modifier);
              }
            }}
          >
            {props.button}
          </button>
        </div>
      ) : (
        <div className="Consulter">
          <div className="Consulter-row">
            <FiCheck className="Consulter-icon" />
            <p>
              La demande de vente a été confirmé par vous, confirmant ainsi sa
              participation à la commande.
            </p>
          </div>
        </div>
      )}

      {details && <div className="overlay"></div>}

      {details && (
        <>
          <Details
            user={props.user}
            type={props.type}
            gamme={props.gamme}
            quantite={props.quantite}
            prix={props.prix}
            quantiteNego={props.quantiteNego}
            prixNego={props.prixNego}
            setdetails={setdetails}
          />
        </>
      )}

      {recherche && <div className="overlay"></div>}

      {recherche && (
        <>
          <Share user={props.user} setrecherche={setrecherche} />
        </>
      )}

      {modifier && (
        <>
          <Vente
            title={"Modifier"}
            confirme={"Mettre à jour "}
            setmodifier={setmodifier}
            order={props.order}
            setvente={props.setvente}
            selectedOrder={props.order}
            user={props.user}
            setUser={props.setUser}
          />
        </>
      )}

      {supprimer && (
        <Supprimer
          onClick={() => {
            setSelectedOrder(props.order);
          }}
          setsupprimer={setsupprimer}
          order={props.order}
          user={props.user}
          selectedOrder={props.order}
          setUser={props.setUser}
          setUsers={props.setUsers}
        />
      )}
    </div>
  );
};
AchatOptions.propTypes = {
  button: PropTypes.string,
  setmodifier: PropTypes.func,
};

export default AchatOptions;
