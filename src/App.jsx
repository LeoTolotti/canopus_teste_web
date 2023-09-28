import { useEffect, useState } from "react";
import { createUser, imagensApi, loginUser, uploadImagem } from "./service/api";
import "./App.css";
const App = () => {
  const [login, setLogin] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [erro, setErro] = useState(null);
  const [conteudo, setConteudo] = useState(false);
  const [loginAdm, setLoginAdm] = useState(false);
  const [carregarImagem, setCarregarImagem] = useState(false);
  const [titulo, setTitulo] = useState(null);
  const [texto, setTexto] = useState(null);
  const [img, setImg] = useState(null);
  const [atualizar, setAtualizar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const tituloChange = (e) => {
    setTitulo(e.target.value);
  };
  const textoChange = (e) => {
    setTexto(e.target.value);
  };
  const loginEntrar = async () => {
    try {
      if (email === null || password === null) {
        setErro("Faltam dados!");
        return;
      }
      const response = await loginUser(email, password);
      if (response.status === 200) {
        if (response.data.adm === true) {
          setConteudo(true);
          setLogin(false);
          setLoginAdm(true);
          setCarregarImagem(true);
        } else {
          setConteudo(true);
          setLogin(false);
          todasImagens();
        }
      }
    } catch (error) {
      setErro("Erro ao fazer login. Por favor, tente novamente mais tarde.");
    }
  };
  const voltarInicio = () => {
    setEmail(null);
    setPassword(null);
    setErro(null);
    setLogin(true);
    setNewUser(false);
  };
  const novoUsuario = () => {
    setEmail(null);
    setPassword(null);
    setErro(null);
    setLogin(false);
    setNewUser(true);
  };
  const dadosNovoUsuario = () => {
    const checkbox = document.getElementById("resposta");
    const estaMarcado = checkbox.checked;
    cadastrarNewUser(estaMarcado);
  };
  const carrergarImagens = () => {
    setCarregarImagem(true);
    setLoading(false);
  };
  const visualizarImagens = () => {
    setCarregarImagem(false);
    todasImagens();
  };
  const cadastrarNewUser = async (adm) => {
    console.log(email, password, adm);
    if (email !== null && password !== null && adm !== null) {
      await createUser(email, password, adm);
      setEmail(null);
      setPassword(null);
      setNewUser(false);
      setLogin(true);
    } else {
      setErro("Faltam dados!");
    }
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "z5mikbjz");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddti06ojt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImg(data.secure_url);
    } catch (error) {
      console.error(error);
    }
  };
  const dadosNovaImage = async () => {
    await uploadImagem(titulo, texto, img);
    setTitulo("");
    setTexto("");
    setImg("");
  };
  const todasImagens = async () => {
    const res = await imagensApi();
    setSlides(res.data);
    setLoading(true);
  };
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className="content">
      {login && (
        <div className="conteudo">
          <div className="conteudo_imagem">
            <img src="http://www.canopusonline.com/src/images/logoFinal.png"></img>
            <div className="login">
              <div className="input">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={emailChange}
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={passwordChange}
                />
              </div>
              <div className="botao" onClick={loginEntrar}>
                Entrar
              </div>
              <div className="botao" onClick={novoUsuario}>
                Novo Usuário
              </div>
              {erro !== null && <div className="erro">{erro}</div>}
            </div>
          </div>
        </div>
      )}
      {newUser && (
        <div className="conteudo">
          <div className="conteudo_imagem">
            <img src="http://www.canopusonline.com/src/images/logoFinal.png"></img>
            <div className="login">
              <div className="input">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={emailChange}
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={passwordChange}
                />
              </div>
              <div className="adm">
                <label htmlFor="resposta">Você é ADM? </label>
                <div className="adm">
                  <input
                    type="checkbox"
                    id="resposta"
                    name="resposta"
                    value="true"
                  />
                  <label htmlFor="resposta">Sim</label>
                </div>
              </div>
              <div className="botao" onClick={dadosNovoUsuario}>
                Cadastrar
              </div>
              <div className="botao" onClick={voltarInicio}>
                Voltar
              </div>
              {erro !== null && <div className="erro">{erro}</div>}
            </div>
          </div>
        </div>
      )}
      {conteudo && (
        <div className="conteudo_interno">
          <div className="conteudo_imagem">
            <img src="http://www.canopusonline.com/src/images/logoFinal.png"></img>
          </div>
          {loginAdm && (
            <div className="login_botão_adm">
              <div className="botão_adm">
                <div className="botao" onClick={carrergarImagens}>
                  Carregar Imagem
                </div>
                <div className="botao" onClick={visualizarImagens}>
                  Visualizar Imagem
                </div>
              </div>
            </div>
          )}
          {carregarImagem && (
            <div className="conteudo_adm">
              <div className="input">
                <label htmlFor="titulo">Titulo:</label>
                <input
                  type="titulo"
                  id="titulo"
                  value={titulo}
                  onChange={tituloChange}
                />
              </div>
              <div className="input_carregar_imagem">
                <div className="input_carregar">Carregar foto:</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="input">
                <label htmlFor="texto">Texto:</label>
                <textarea
                  type="texto"
                  id="texto"
                  value={texto}
                  onChange={textoChange}
                  className="tamanhoDaTextArea"
                />
              </div>
              <div className="botao" onClick={dadosNovaImage}>
                Cadastrar Imagem
              </div>
            </div>
          )}
          {loading && (
            <div className="containerStyles">
              <div className="imagem">
                <img src={slides[currentIndex].img}></img>
              </div>
              <div className="opcoes">
                <div onClick={goToPrevious} className="leftArrowStyles">
                  ❰
                </div>
                <div onClick={goToNext} className="rightArrowStyles">
                  ❱
                </div>
              </div>
              <div className="titulo">{slides[currentIndex].titulo}</div>
              <div className="texto">{slides[currentIndex].texto}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
