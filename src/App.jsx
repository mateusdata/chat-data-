import "./App.css";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import audio from "./audio1.mp3";
import audio2 from "./audio2.mp3";

function App() {
  const [mensage, setMensage] = useState("");
  const [received, setReceived] = useState([]);


  useEffect(() => {
    Axios.get("https://chat-data-api.vercel.app/").then((response) => {
      setReceived(response.data);
     // console.log(response.data);
    });
    if (received.length) {
      console.log(!!received.length);
    }
    
  }, [received, mensage]);
function musica () {
  new Audio(audio).play()
 
}
  const deleteTalks = () => {
    setReceived("");
    if (received.length) {
      Axios.delete("https://chat-data-api.vercel.app/delete").then(
        (response) => {
          new Audio(audio2).play()
          setReceived("");
          alert("Conversas apagadas");
          
        }
      );
    }
  };
  const sendMensage = (e) => {
    e.preventDefault();
    if (mensage) {
      setMensage("");

      console.log({ talk: mensage });
       const data = new Date();
       let hora =  data.getHours()+ ":" + data.getMinutes();
       console.log({ talk: mensage, hora: hora.length });
       if(hora[1]===":" && hora.length===4){
        hora = "0"+data.getHours() +":"+ data.getMinutes();
       }
       if(hora[2]===":" ){
        hora = data.getHours() + ":" +data.getMinutes();
       }
       
       
      Axios.put("https://chat-data-api.vercel.app/send", {
        talk: mensage,
        time: hora,
      }).then((response) => console.log());
    }
    if (received.length === 0) {
      return <p>Carregando...</p>;
    }
  };
  return (
    <div className="container">
      <header>
        <h1>ChatData</h1>
      </header>
      
      {<Button
        onClick={deleteTalks}
        variant="outlined"
        style={{ color: !!received.length && "red", border:"none" }}
        startIcon={<DeleteIcon />}
      >
        Apagar menseger
      </Button>}
      <div className="mensagemm">
        <div className={received.length ? "mesagemON" : "mesagemOF"}>
          {received &&
            received &&
            received.map((item) => (
              <div key={item.id}>
               
                <p className="message sent">
                  {" "}
                  {item.talk}{" "}
                  <span className="status">
                    <CheckIcon
                      style={{
                        padding: "0",
                        margin: "0",

                        fontSize: "1.2rem",
                      }}
                    />{" "}
                    <CheckIcon
                      style={{
                        padding: "0",
                        margin: "0",

                        fontSize: "1.2rem",
                        marginLeft: "-8px",
                      }}
                    />{" "}
                    <span className="hora">{item.time}</span>{" "}
                   
                  </span>
                </p>
              </div>
            ))}
          {received.length === 0 && (
            <div id="whatsapp-message">
              <p className="fa fa-lock"></p>
              As mensagens não são protegidas com a criptografia, qualquer um
              que entrar pode ver essas mensagens fica esperto. Eu mesmo posso
              pode ler ou ouvi-las. Status mensege{" "}
              <b style={{ color: !!received ? "red" : false }}>
                {String(!!received.length)}
              </b>
            </div>
          )}
        </div>
      </div>
      <main>
        <form onSubmit={sendMensage}>
          <textarea
            
            value={mensage}
            placeholder="😀 Mensagem..."
            onChange={(e) => {
              setMensage(e.target.value);
              if(mensage.length > 200){
                alert("Quantidade de caracteres utrapasada");
                setMensage("")
              }
            }}
          ></textarea>

          <button  onClick={musica} onSubmit={sendMensage} type="submit">
            <SendIcon />
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;