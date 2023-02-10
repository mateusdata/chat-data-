import "./App.css";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import audio from "./audio1.mp3";
import audio2 from "./audio2.mp3";
import audio3 from "./audio3.mp3";
import images from "./components/array images/images";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import emogins from "./components/array emogins/emogin";


function App() {
  const [mensage, setMensage] = useState("");
  const [received, setReceived] = useState([]);
  const [number, setNumber] = useState(0);
  const [changeColor, setChangeColor] = useState(false);
  const [changeemogin, setChangeemogin] = useState(false);
  const [isTrueMensagem, setIstruMensage] = useState(false);

 const deleteTask = (id) => {
  
  Axios.delete(`https://chat-data-api.vercel.app/apagar/${id}`)
 }
  const changeImage = () => {
    let numberRandomic = Math.floor(Math.random() * images.images.length - 1);
    setNumber(numberRandomic);
    if (changeColor) {
      setChangeColor(false);
      return;
    }
    setChangeColor(true);

  };
  useEffect(() => {
    let numberEmogin = Math.floor(Math.random() * emogins.arrayEmogins.length);
    setChangeemogin(numberEmogin);
    Axios.get("https://chat-data-api.vercel.app/").then((response) => {
      setReceived(response.data);
     
    });
    if (received.length) {
      console.log(!!received.length);
    }
  }, [received]);
  function musica() {
    new Audio(audio).play();
  }
  const deleteTalks = () => {
    setReceived("");
    if (received.length) {
      Axios.delete("https://chat-data-api.vercel.app/delete").then(
        (response) => {
          new Audio(audio2).play();
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



      const currentTime = new Date();
      let hours = currentTime.getHours().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      let minutes = currentTime.getMinutes().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      //let seconds = currentTime.getSeconds().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      const hora = `${hours}:${minutes}`
      
     
      

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
    <div
      className="container"
      style={{
        backgroundImage: ` url( ${images.images[number]})`,
      }}
    >
      <header>
        <h1>ChatData</h1>

        <MenuRoundedIcon onClick={changeImage} />
      </header>

      {
        <Button
          onClick={deleteTalks}
          variant="outlined"
          style={{ color: !!received.length && "red", border: "none" }}
          startIcon={<DeleteIcon />}
        >
          Apagar conversa
        </Button>
      }
      <div className="mensagemm">
        <div className={received.length ? "mesagemON" : "mesagemOF"}>
          {received &&
            received &&
            received.map((item, index) => (
              <div key={item.id}>
                
                <p onLoad={()=> new Audio(audio3).play(true)}
                  onClick={() =>{
                   !isTrueMensagem ? setIstruMensage(true) : setIstruMensage(false)
                   
                  }}
                  className="message sent"
                  style={{ backgroundColor: changeColor && "white" }}
                >
                  
                  
                  {item.talk}
                 { isTrueMensagem && <DeleteIcon onClick={()=> {deleteTask(item.id);
                  new Audio(audio3).play();} } style={{color:"red"}}/> }
                  <span className="status">
                    <CheckIcon
                      style={{
                        padding: "0",
                        margin: "0",

                        fontSize: "1.2rem",
                      }}
                    />
                    <CheckIcon
                      style={{
                        padding: "0",
                        margin: "0",

                        fontSize: "1.2rem",
                        marginLeft: "-8px",
                      }}
                    />
                    <span className="hora">{item.time}</span>
                    
                  
                  </span>
                 
                </p>
              </div>
            ))}
          {received.length === 0 && (
            <div id="whatsapp-message">
              <p className="fa fa-lock"></p>
              As mensagens não são protegidas com a criptografia, qualquer um
              que entrar pode ver essas mensagens fica esperto. Eu mesmo posso
              pode ler ou ouvi-las. Status mensege
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
            placeholder={`${emogins.arrayEmogins[changeemogin]} Mensagem...`}
            onChange={(e) => {
              setMensage(e.target.value);
              if (mensage.length > 200) {
                alert("Quantidade de caracteres utrapasada");
                setMensage("");
              }
            }}
          ></textarea>

          <button onClick={musica} onSubmit={sendMensage} type="submit">
            <SendIcon />
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
