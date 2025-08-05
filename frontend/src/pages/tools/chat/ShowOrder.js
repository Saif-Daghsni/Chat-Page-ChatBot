import React from "react";
import "./ShowOrder.css";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import AchatOptions from "../Transactions/AchatOptions";

const ShowOrder = (props) => {
  return (
    <div className={props.a ==="1" ? "OrderUser" : "OrderUser2"}>
      <div className="OrderUser-message">
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
          <div className="OrderUser-bottom">
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
                  color: "#000000ff",
                  fontSize: "14px",
                }}
              />
            ) : (
              <BiCheck
                style={{
                  marginLeft: "5px",
                  color: "#000000ff",
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
