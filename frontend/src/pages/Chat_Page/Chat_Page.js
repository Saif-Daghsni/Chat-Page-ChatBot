import React, { useState, useEffect } from "react";
import "./Chat_Page.css";
import AchatOptions from "../tools/Transactions/AchatOptions";
import Vente from "../tools/Transactions/Vente";
import Chat from "../tools/chat/Chat";
import User from "../tools/Users/User";
import { handleError, handleSuccess } from "../../utils";
import Layout from "../../components/layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Chat_Page = () => {
  const [achat, setachat] = useState(false);
  const [vente, setvente] = useState(false);
  const [Lesvente, setLesvente] = useState(false);
  const [Lesachat, setLesachat] = useState(true);
  const [conversation, setConversation] = useState(false);
  const [historique, sethistorique] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selecteduser, setSelecteduser] = useState([]);

  useEffect(() => {
  }, [user?.orders]);

  useEffect(() => {
    fetch("http://localhost:5000/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Users fetched:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => console.error("❌ Fetch Users error:", err));
  }, [vente, achat]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/me", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched:", data);
        setUser(data);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) {
    let loading = <div className="loading">Loading...</div>;
    return loading;
  }
  return (
    <Layout>
      <ToastContainer position="bottom-right" />
      <div>
        <div className="topBar"></div>

        <div className="navBar">
          <div className="container">
            <div className="under-container">
              <label className="logo">Chat</label>

              <div className="divs">
                <div className="users">
                  {user && <User setSelecteduser={setSelecteduser} users={users} user={user} />}
                </div>

                <div className="chat">
                  <Chat user={user} selecteduser={selecteduser} />
                </div>

                {/* debut  transaction */}
                <div className="transaction">
                  <div className="transaction-top">
                    <label className="transaction-label">
                      Repertoire des transactions
                    </label>

                    <button className="transaction-button">
                      <img src="/transactions/Vector.png" alt="img1" />
                    </button>
                  </div>

                  {vente ? (
                    <>
                      <Vente title={"Vente"} setvente={setvente} user={user} setUser={setUser}  />
                    </>
                  ) : achat ? (
                    <>
                      <Vente title={"Achat"} setvente={setachat} user={user} setUser={setUser}  />
                    </>
                  ) : conversation ? (
                    <div className="achat">
                      <div className="achatoptions">
                        <div className="achat-vente-buttons">
                          <button
                            className="achat-button"
                            onClick={() => setachat(true)}
                          >
                            Besoin d’achat
                          </button>
                          <button
                            className="achat-button"
                            onClick={() => setvente(true)}
                          >
                            Besoin de vente
                          </button>
                        </div>
                        {users.map((user) =>
                          user.orders.map((order, index) => (
                            <AchatOptions
                              user={user}
                              button={"Consulter"}
                              type={order.type}
                              gamme={order.gamme}
                              quantite={order.quantite}
                              prix={order.prix}
                              quantiteNego={order.quantiteNego}
                              prixNego={order.prixNego}
                              key={index}
                            />
                          ))
                        )}
                      </div>

                      <button
                        className="achatAnuuler"
                        onClick={() => setConversation(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  ) : historique ? (
                    <div className="achat">
                      <div className="achatoptions">
                        <div className="achat-vente-buttons">
                          <button
                            className={
                              Lesachat
                                ? "achat-button-active"
                                : "achat-button-inactive"
                            }
                            onClick={() => {
                              setLesachat(true);
                              setLesvente(false);
                            }}
                          >
                            Les achat
                          </button>
                          <button
                            className={
                              Lesvente
                                ? "achat-button-active"
                                : "achat-button-inactive"
                            }
                            onClick={() => {
                              setLesachat(false);
                              setLesvente(true);
                            }}
                          >
                            Les vente
                          </button>
                        </div>
                        {Lesachat && (
                          <>
                            {user.orders.map((order) =>
                              order.title === "Achat" ? (
                                <AchatOptions
                                  setUser={setUser}
                                  order={order}
                                  user={user}
                                  button={"Modifier"}
                                  type={order.type}
                                  gamme={order.gamme}
                                  quantite={order.quantite}
                                  prix={order.prix}
                                  quantiteNego={order.quantiteNego}
                                  prixNego={order.prixNego}
                                  key={order._id}
                                  setvente={setvente}
                                />
                              ) : null
                            )}
                          </>
                        )}
                        {Lesvente && (
                          <>
                            {user.orders.map((order, index) =>
                              order.title === "Vente" ? (
                                <AchatOptions
                                  setUser={setUser}
                                  order={order}
                                  user={user}
                                  button={"Modifier"}
                                  type={order.type}
                                  gamme={order.gamme}
                                  quantite={order.quantite}
                                  prix={order.prix}
                                  quantiteNego={order.quantiteNego}
                                  prixNego={order.prixNego}
                                  key={index}
                                  setvente={setvente}
                                />
                              ) : null
                            )}
                          </>
                        )}
                      </div>

                      <button
                        className="achatAnuuler"
                        onClick={() => sethistorique(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <div className="transaction-Bottom">
                      <img src="/transactions/buttom.jpg" alt="imgbuttom" />
                      <button
                        className="transaction-Bottom-button1"
                        onClick={() => setConversation(true)}
                      >
                        La conversation public
                      </button>
                      <button
                        className="transaction-Bottom-button1"
                        onClick={() => sethistorique(true)}
                      >
                        Votre historique
                      </button>
                    </div>
                  )}
                </div>
                {/* Fin transaction */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat_Page;
