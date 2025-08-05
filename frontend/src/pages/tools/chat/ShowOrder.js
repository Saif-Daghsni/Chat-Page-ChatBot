import React from "react";
import "./ShowOrder.css";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import AchatOptions from "../Transactions/AchatOptions";

const ShowOrder = (props) => {
  return (
    <div className="OrderUser">
      <div className="OrderUser-message">
        <div className="OrderUser-bottom">
          <AchatOptions
            user={props.order.user}
            currentUser={props.user}
            button={"Consulter"}
            type={props.order.type}
            gamme={props.order.gamme}
            quantite={props.order.quantite}
            prix={props.order.prix}
            quantiteNego={props.order.quantiteNego}
            prixNego={props.order.prixNego}
            title={props.order.title}
          />
          il y a {props.time.value}{" "}
          {props.time.type === "minutes"
            ? "minutes"
            : props.time.type === "heures"
            ? "heures"
            : "jours"}
          {props.isRead ? (
            <BiCheckDouble
              style={{
                marginLeft: "5px",
                color: "#ffffffff",
                fontSize: "14px",
              }}
            />
          ) : (
            <BiCheck
              style={{
                marginLeft: "5px",
                color: "#ffffffff",
                fontSize: "14px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowOrder;
