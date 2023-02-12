import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import audio from "../../src/components/audio/audio1.mp3";
import audio2 from "../../src/components/audio/audio2.mp3";
import audio3 from "../../src/components/audio/audio3.mp3";
import images from "../../src/components/array images/images";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import emogins from "../../src/components/array emogins/emogin";
import Header from "../../src/components/header/header";

function Test() {
  const [mensage, setMensage] = useState("");
  const [arrayTalks, setArrayTalks] = useState([]);
  const [number, setNumber] = useState(0);
  const [changeColor, setChangeColor] = useState(false);
  const [changeemogin, setChangeemogin] = useState(false);
  const [isTrueMensagem, setIstruMensage] = useState(false);

  useEffect(() => {
    let numberEmogin = Math.floor(Math.random() * emogins.arrayEmogins.length);
    setChangeemogin(numberEmogin);
    Axios.get("https://chat-data-api.vercel.app/").then((response) => {
      setArrayTalks(response.data);
    });
    if (arrayTalks.length) {
      console.log(!!arrayTalks.length);
    }
  }, [arrayTalks]);

  const deleteTalks = (id) => {
    Axios.delete(`https://chat-data-api.vercel.app/apagar/${id}`);
  };

  const changeImage = () => {
    let numberRandomic = Math.floor(Math.random() * images.images.length - 1);
    setNumber(numberRandomic);
    if (changeColor) {
      setChangeColor(false);
      return;
    }
    setChangeColor(true);
  };

  function playSound() {
    new Audio(audio).play();
  }

  const deleteAllTalks = () => {
    setArrayTalks("");
    if (arrayTalks.length) {
      Axios.delete("https://chat-data-api.vercel.app/delete").then(
        (response) => {
          new Audio(audio2).play();
          setArrayTalks("");
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
      let hours = currentTime.getHours().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let minutes = currentTime.getMinutes().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      //let seconds = currentTime.getSeconds().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      const hora = `${hours}:${minutes}`;

      Axios.put("https://chat-data-api.vercel.app/send", {
        talk: mensage,
        time: hora,
      }).then((response) => console.log());
    }
    if (arrayTalks.length === 0) {
      return <p>Carregando...</p>;
    }
  };

  return (
    <>
    
      <Header >
      <h1 style={{marginRight:"70rem"}}>Ambiente de teste</h1>
      </Header>
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
            onClick={deleteAllTalks}
            variant="outlined"
            style={{ color: !!arrayTalks.length && "red", border: "none" }}
            startIcon={<DeleteIcon />}
          >
            Apagar conversa
          </Button>
        }
        <div className="mensagemm">
          <div className={arrayTalks.length ? "mesagemON" : "mesagemOF"}>
            {
              arrayTalks &&
              arrayTalks.map((item, index) => (
                <div key={item.id}>
                  <p
                    onClick={() => {
                      !isTrueMensagem
                        ? setIstruMensage(true)
                        : setIstruMensage(false);
                    }}
                    className="message sent"
                    style={{ backgroundColor: changeColor && "white" }}
                  >
                    {item.talk}
                    {isTrueMensagem && (
                      <DeleteIcon
                        onClick={() => {
                          deleteTalks(item.id);
                          new Audio(audio3).play();
                        }}
                        style={{ color: "red" }}
                      />
                    )}
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
            {arrayTalks.length === 0 && (
              <div id="whatsapp-message">
                <p className="fa fa-lock"></p>
                As mensagens não são protegidas com a criptografia, qualquer um
                que entrar pode ver essas mensagens fica esperto. Eu mesmo posso
                pode ler ou ouvi-las. Status mensege
                <b style={{ color: !!arrayTalks ? "red" : false }}>
                  {String(!!arrayTalks.length)}
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

            <button onClick={playSound} onSubmit={sendMensage} type="submit">
              <SendIcon />
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Test;
