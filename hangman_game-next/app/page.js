"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Boneco from "../components/Boneco"; // ajuste o caminho se necessário

const palavras = [
"ABACAXI","ABACATE","ABELHA","ABRIGO","ACORDAR","AÇÚCAR","ÁGUA","ALEGRIA",
"ALMOÇO","ALUNO","AMIGO","AMOR","ANIMAL","ANIVERSÁRIO","APRENDER","ARCO",
"AREIA","ARROZ","ÁRVORE","AVÓ","AVIÃO","AZUL","BALA","BANANA","BANCO",
"BANHO","BOLA","BORBOLETA","BRINCAR","BROTO","BUCHINHO","CABEÇA","CACHORRO",
"CAMA","CAMISA","CANETA","CANTAR","CARRO","CASA","CELEBRAR","CERTO","CHAVE",
"CHUVA","CINZA","CIDADE","COELHO","COPO","COR","CORAÇÃO","CORTAR","COZINHA",
"COZINHAR","DANÇA","DENTISTA","DESENHO","DOCE","ESCURO","ESPELHO","ESCOLA",
"ESQUILO","ESTRELA","FAMÍLIA","FELICIDADE","FERRO","FLORESTA","FLOR","FRUTA",
"FRIO","FUMAÇA","GATO","GELADO","GRANDE","GUARDAR","GUITARRA","HÁBITO","HOMEM",
"HOJE","HORTA","ILHA","JANELA","JARDIM","JOGO","LÁPIS","LEITE","LIVRO","LUA",
"LUGAR","MACACO","MÁGICA","MÃO","MEL","MENINO","MENINA","MESA","MOLHO","MORANGO",
"NAÇÃO","NAVE","NOITE","NOME","NÚMERO","OBJETO","ÓLEO","OLHO","ONDA","OVELHA",
"PÁ","PAPEL","PASSARINHO","PEIXE","PELOTA","PESSOA","PIANO","PIPOCA","PISO",
"PLANTA","PRATO","PRAIA","QUEIJO","QUENTE","QUINTAL","RÁDIO","RELOGIO","RIO",
"RODA","ROSA","SALADA","SAPATO","SAXOFONE","SINAL","SOL","SORRISO","SUCO",
"TECLADO","TELA","TEMPO","TERRA","TIJOLO","TOALHA","TOCO","TOQUE","TRAVESSEIRO",
"TRIGO","UNIVERSO","VACA","VAN","VASSOURA","VELA","VENTO","VERDE","VIAGEM",
"VILA","VIOLETA","VOAR","VÔLEI","ÁGUA","ABELHA","ARCO-ÍRIS","BANANA","BICICLETA",
"BORBOLETA","BRINQUEDO","CACHOEIRA","CALÇADO","CANETA","CARRINHO","CELEIRO",
"CHUVA","CINEMA","COZINHA","DADO","DESENHO","ESCADA","ESCOLA","FACA","FLORESTA",
"FRUTA","GARRAFA","GATO","GELADEIRA","HORIZONTE","ILHA","JANELA","JARDIM",
"LÂMPADA","LEÃO","LIVRO","MÁQUINA","MESA","MONTE","MORANGO","NAVIO","NOITE",
"OLHO","ONDA","OVO","PAPEL","PEIXE","PENSA","PIPA","PRATO","PRIMAVERA","QUEIJO",
"QUINTAL","RAIO","REDE","RELÓGIO","RIO","ROSA","SAPATO","SAXOFONE","SOL","SORRISO",
"SORVETE","TELA","TESOURA","TOALHA","TOCO","TRAVESSEIRO","UNIVERSO","VACA",
"VENTO","VERDE","VIAGEM","VILA","VIOLETA","VOAR","ABACATE","ACORDAR","AÇÚCAR",
"ÁGUA","ALEGRIA","ALMOÇO","ALUNO","AMIGO","AMOR","ANIMAL","ANIVERSÁRIO","APRENDER",
"ARCO","AREIA","ARROZ","ÁRVORE","AVÓ","AVIÃO","AZUL","BALA","BANANA","BANCO",
"BANHO","BOLA","BORBOLETA","BRINCAR","BROTO","BUCHINHO","CABEÇA","CACHORRO",
"CAMA","CAMISA","CANETA","CANTAR","CARRO","CASA","CELEBRAR","CERTO","CHAVE",
"CHUVA","CINZA","CIDADE","COELHO","COPO","COR","CORAÇÃO","CORTAR","COZINHA",
"COZINHAR","DANÇA","DENTISTA","DESENHO","DOCE","ESCURO","ESPELHO","ESCOLA",
"ESQUILO","ESTRELA","FAMÍLIA","FELICIDADE","FERRO","FLORESTA","FLOR","FRUTA",
"FRIO","FUMAÇA","GATO","GELADO","GRANDE","GUARDAR","GUITARRA","HÁBITO","HOMEM",
"HOJE","HORTA","ILHA","JANELA","JARDIM","JOGO","LÁPIS","LEITE","LIVRO","LUA",
"LUGAR","MACACO","MÁGICA","MÃO","MEL","MENINO","MENINA","MESA","MOLHO","MORANGO",
"NAÇÃO","NAVE","NOITE","NOME","NÚMERO","OBJETO","ÓLEO","OLHO","ONDA","OVELHA",
"PÁ","PAPEL","PASSARINHO","PEIXE","PELOTA","PESSOA","PIANO","PIPOCA","PISO",
"PLANTA","PRATO","PRAIA","QUEIJO","QUENTE","QUINTAL","RÁDIO","RELOGIO","RIO",
"RODA","ROSA","SALADA","SAPATO","SAXOFONE","SINAL","SOL","SORRISO","SUCO",
"TECLADO","TELA","TEMPO","TERRA","TIJOLO","TOALHA","TOCO","TOQUE","TRAVESSEIRO",
"TRIGO","UNIVERSO","VACA","VAN","VASSOURA","VELA","VENTO","VERDE","VIAGEM",
"VILA","VIOLETA","VOAR","VÔLEI"
];


const removerAcentos = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


export default function Home() {
  const [palavra, setPalavra] = useState("");
  const [tentativas, setTentativas] = useState([]);
  const [erros, setErros] = useState(0);
  const [maxErros] = useState(6);
  const [input, setInput] = useState("");
  const [mensagem, setMensagem] = useState("");

  const novaPalavra = () => {
    const sorteada = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(sorteada);
    setTentativas([]);
    setErros(0);
    setMensagem("");
    setInput("");
  };

  useEffect(() => {
    novaPalavra();
  }, []);

  const verificarLetra = () => {
    if (!input) return;
    const letra = input.toUpperCase();

    if (tentativas.includes(letra)) {
      setMensagem("Letra já tentada!");
      setTimeout(() => setMensagem(""), 2000);
      setInput("");
      return;
    }

    setTentativas([...tentativas, letra]);

    if (!palavra.includes(letra)) {
      setErros(erros + 1);
    }

    setInput("");
  };

  const palavraExibida = palavra
    .split("")
    .map((letraOriginal) =>
      tentativas.includes(removerAcentos(letraOriginal.toUpperCase()))
        ? letraOriginal
        : "_"
    )
    .join(" ");

  useEffect(() => {
    const palavraNormalizada = removerAcentos(palavra.toUpperCase());
    if (palavra && palavraNormalizada.split("").every((l) => tentativas.includes(l))) {
      setMensagem("Parabéns, você venceu!");
    } else if (erros >= maxErros) {
      setMensagem(`It's Over! A palavra era: ${palavra}`);
    }
  }, [tentativas, erros, palavra]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      verificarLetra();
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Jogo da Forca</h1>

      {/* Aqui o Boneco SVG */}
      <Boneco erros={erros} maxErros={maxErros} />

      <div className={styles.palavra}>{palavraExibida}</div>

      <div className={styles.erros}>
        Erros: {erros} / {maxErros}
      </div>

      <div className={styles.controles}>
        <input
          className={styles.input}
          type="text"
          maxLength="1"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          disabled={mensagem !== ""}
          autoFocus
        />
        <button
          className={styles.btn}
          onClick={verificarLetra}
          disabled={mensagem !== "" || !input}
        >
          Tentar
        </button>
      </div>

      <div className={styles.tentativas}>
        <p><strong>Letras tentadas:</strong></p>
        <p>{tentativas.join(", ") || "Nenhuma letra tentada"}</p>
      </div>

      {mensagem && (
        <div className={`${styles.mensagem} ${
          mensagem.includes("venceu") ? styles.vitoria : styles.derrota
        }`}>
          {mensagem}
        </div>
      )}

      <button className={`${styles.btn} ${styles.btnReiniciar}`} onClick={novaPalavra}>
        Novo Jogo
      </button>
    </main>
  );
}
