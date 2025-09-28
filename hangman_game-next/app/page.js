"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

const palavras = [
  "REACT", "NEXT", "JAVASCRIPT", "PYTHON", "JAVA", "HTML", "CSS",
  "FRONTEND", "BACKEND", "NODE", "ANGULAR", "VUE", "MYSQL", "MONGODB",
  "TYPESCRIPT", "GITHUB", "DOCKER", "LINUX", "WINDOWS", "ANDROID", "IOS",
  "MOBILE", "FIREBASE", "SUPABASE", "PRISMA", "EXPRESS", "SPRING",
  "DJANGO", "FLASK", "GRAPHQL", "APOLLO"
];

// Componente do boneco da forca
const BonecoForca = ({ erros }) => {
  const partes = [
    "🟫", 
    "🟫", 
    "🟫", 
    "🟫", 
    "😊", // cabeça
    "👕", // corpo
    "👐", // braços
    "👖", // pernas
  ];

  return (
    <div className={styles.forca}>
      <div className={styles.boneco}>
        {partes.slice(0, Math.min(erros + 4, partes.length)).join(" ")}
      </div>
    </div>
  );
};

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
    .map((letra) => (tentativas.includes(letra) ? letra : "_"))
    .join(" ");

  useEffect(() => {
    if (palavra && palavra.split("").every((l) => tentativas.includes(l))) {
      setMensagem("Parabéns, você venceu!");
    } else if (erros >= maxErros) {
      setMensagem(`Game Over! A palavra era: ${palavra}`);
    }
  }, [tentativas, erros, palavra]);

  // Tecla Enter para enviar
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verificarLetra();
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}> Jogo da Forca</h1>

      <BonecoForca erros={erros} />

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
          mensagem.includes("") ? styles.vitoria : styles.derrota
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