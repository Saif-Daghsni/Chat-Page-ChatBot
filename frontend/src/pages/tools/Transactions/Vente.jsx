import React, { useState } from "react";
//import { FiPlus, FiMinus } from 'react-icons/fi';
import Select from "react-select";
import PropTypes from "prop-types";
import "./Vente.css";
import { FaHandshake } from "react-icons/fa";
import { handleError, handleSuccess } from "../../../utils";

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "43px",
    marginTop: "5px",
    outline: "none",
    paddingLeft: "8px",
    paddingRight: "8px",
    borderRadius: "8px",
    border: "2px solid #E4E4E7",
    fontWeight: 500,
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    boxShadow: "none",
    "&:hover": {
      borderColor: "none",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#CDE3F2"
      : state.isFocused
      ? "#CDE3F2"
      : "#fff",
    color: "#000",
    borderRadius: "5px",
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    lineHeight: "36px",
    color: "#E4E4E7 !important",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    lineHeight: "36px",
  }),
};

const gammeOptions = [
  { value: "Entrée de gamme", label: "Entrée de gamme" },
  { value: "Moyenne gamme", label: "Moyenne gamme" },
  { value: "Haut gamme", label: "Haut gamme" },
];

const typeoptions = [
  { value: "Matières premières", label: "Matières premières" },
  { value: "Emballage", label: "Emballage" },
  { value: "Produits fini", label: "Produits fini" },
  { value: "Machines", label: "Machines" },
];

const Vente = (props) => {
  const [prixNego, setPrixNego] = useState(false);
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [quantiteNego, setQuantiteNego] = useState(false);
  const [type, setType] = useState("");
  const [gamme, setGamme] = useState("");
  const [publier, setPublier] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeType = (option) => {
    setType(option);
  };

  const handleChangeGamme = (option) => {
    setGamme(option);
  };
  const reset = () => {
    setType("");
    setGamme("");
    setQuantite("");
    setPrix("");
    setQuantiteNego(false);
    setPrixNego(false);
    setError(false);
  };
  const handleModifierOrder = async () => {
    const cleanType =
      typeof type === "object" && type.value ? type.value : type;
    const cleanGamme = typeof gamme === "object" ? gamme.value : gamme;
    const updatedOrder = {
      type: cleanType,
      gamme: cleanGamme,
      quantite: quantite,
      prix: prix,
      quantiteNego: quantiteNego,
      prixNego: prixNego,
      date: new Date().toISOString(),
    };
    console.log("Updated Order:", updatedOrder);
    console.log("User ID:", props.user._id);
    console.log("Order ID:", props.selectedOrder._id);
    try {
      const response = await fetch(
        `http://localhost:5000/updateOrder/${props.user._id}/${props.selectedOrder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        }
      );
      if (response.ok) {
        console.log("✅ Order updated successfully");
        handleSuccess("Order updated successfully");

        // Refresh user data
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await fetch("http://localhost:5000/me", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });
          const userData = await userResponse.json();
          props.setUser(userData);
        }

        props.setmodifier(false);
        reset();
      } else {
        console.error("❌ Failed to update order");
        handleError("Failed to update order");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      handleError("An error occurred while updating the order");
    }
  };
  const handleAddOrder = async () => {

    const newOrder = {
      title: props.title,
      type: type?.value || "", 
      gamme: gamme?.value || "",
      quantite: quantite,
      prix: prix,
      prixNego: prixNego,
      quantiteNego: quantiteNego,
      date: Date.now(),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/addOrder/${props.user._id}`,
        {
          method: "PUT", // or POST depending on your API design
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (response.ok) {
        console.log("✅ Order added successfully");
        handleSuccess("Order added successfully");

        // Refresh user data
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await fetch("http://localhost:5000/me", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });
          const userData = await userResponse.json();
          props.setUser(userData);
        }

        props.setvente(false);
        reset();
      } else {
        console.error("❌ Failed to add order");
        handleError("Failed to add order");
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="transaction-Bottom-vente">
      <label className="vente-title">{props.title}</label>

      <label className="vente-label">Type</label>
      <Select
        options={typeoptions}
        value={type}
        onChange={handleChangeType}
        name="type"
        styles={customStyles}
        placeholder="Select a type"
      />

      <label className="vente-label">Gamme</label>
      <Select
        options={gammeOptions}
        value={gamme}
        onChange={handleChangeGamme}
        name="gamme"
        styles={customStyles}
        placeholder="Select a gamme"
      />

      {/* debut Quantité & Prix */}
      <div className="quantite-prix-block">
        <label className="vente-label">Quantité</label>
        <div className="Pricerow">
          <input
            className="vente-input-prix"
            type="number"
            placeholder="Quantité"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
          />
          <div className="prixdiv">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                className="prixcheckbox"
                name="agree"
                checked={quantiteNego}
                onChange={(e) => setQuantiteNego(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span className="Prixlabel">Négociable</span>
            </label>
          </div>
        </div>

        <label className="vente-label">Prix</label>
        <div className="Pricerow">
          <input
            className="vente-input-prix"
            type="number"
            placeholder="Prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
          <div className="prixdiv">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                className="prixcheckbox"
                name="agree"
                checked={prixNego}
                onChange={(e) => setPrixNego(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span className="Prixlabel">Négociable</span>
            </label>
          </div>
        </div>
      </div>
      {/* fin Quantité & Prix */}

      <div className="transaction-Bottom-vente-buttons">
        <button
          className="transaction-Bottom-vente-buttons1"
          onClick={() => {
            if (props.title === "Vente" || props.title === "Achat") {
              props.setvente(false);
            } else if (props.title === "Modifier") {
              props.setmodifier(false);
            }
          }}
        >
          Annuler
        </button>
        <button
          className="transaction-Bottom-vente-buttons2"
          onClick={() => {
            if (!type || !gamme || !quantite || !prix) {
              return handleError("Veuillez remplir tous les champs");
            }
            setPublier(!publier);
          }}
        >
          Publier
        </button>
      </div>

      {/* debut confirmation */}

      {publier && <div className="overlay"></div>}

      {publier && (
        <div className="confirmation">
          <div className="confirmation-container-top">Votre information</div>
          <div className="confirmation-container">
            <div className="Pricerow">
              <div className="confirmation-title">
                <label className="confirmation-label">
                  <p>Type</p>
                  <p>:</p>
                </label>
                <label className="confirmation-label">
                  <p>Gamme</p>
                  <p>:</p>
                </label>
                <label className="confirmation-label">
                  <p>Quantité</p>
                  <p>:</p>
                </label>
                <label className="confirmation-label">
                  <p>Prix</p>
                  <p>:</p>
                </label>
              </div>
              <div className="confirmation-values">
                <a className="confirmation-values-a">
                  {type ? type.label : "Vide"}
                </a>
                <a className="confirmation-values-a">
                  {gamme ? gamme.label : "Vide"}
                </a>
                <div>
                  <a className="confirmation-values-a">
                    {quantite ? quantite : "Vide"}
                  </a>
                  {quantiteNego ? (
                    <FaHandshake style={{ color: "#166534" }} size={20} />
                  ) : (
                    <FaHandshake style={{ color: "#B91C1C" }} size={20} />
                  )}
                </div>
                <div>
                  <a className="confirmation-values-a">
                    {prix ? prix : "Vide"}
                    {prix ? "DT" : ""}
                  </a>{" "}
                  {prixNego ? (
                    <FaHandshake style={{ color: "#166534" }} size={20} />
                  ) : (
                    <FaHandshake style={{ color: "#B91C1C" }} size={20} />
                  )}
                </div>
              </div>
            </div>

            <div className="Pricerow">
              <button
                className="transaction-Bottom-vente-buttons1"
                onClick={() => {
                  setPublier(!publier);
                  reset();
                }}
              >
                cancel
              </button>
              <button
                className="transaction-Bottom-vente-buttons2"
                onClick={() => {
                  if (props.title === "Modifier") {
                    handleModifierOrder();
                    setPublier(!publier);
                    reset();
                  } else {
                    handleAddOrder();
                    setPublier(!publier);
                    reset();
                  }
                }}
              >
                confirme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fin confirmation */}
    </div>
  );
};

Vente.propTypes = {
  setvente: PropTypes.func.isRequired,
  setmodifier: PropTypes.func,
  modifier: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default Vente;
