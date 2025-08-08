const colAData = [
    "A organização da obra deve:",
    "O PGR deve conter:",
    "As áreas de vivência devem ter:",
    "Nas frentes de trabalho deve haver:",
    "Os condutores elétricos devem:",
    "O Plano de Demolição deve considerar:",
    "Áreas de carpintaria devem:",
    "Equipamento de guindar deve ter:",
    "Guindastes e gruas devem ter:",
    "Andaimes devem:"
  ];
  
  const colBData = [
    "Vedar o ingresso ou permanência de trabalhadores sem medidas da NR18.",
    "Relação dos EPIs com especificações técnicas segundo riscos ocupacionais.",
    "Instalação sanitária, vestiário, refeitório e alojamento, quando necessário.",
    "Local para refeição com conforto, higiene e proteção contra intempéries.",
    "Isolação dupla ou reforçada para alimentação de máquinas portáteis.",
    "Energia elétrica, água, inflamáveis, esgoto, vento e outros riscos.",
    "Cobertura contra intempéries e quedas de materiais.",
    "Alarme sonoro acionado por limitador de carga ou momento.",
    "Anemômetro visível na cabine, indicando velocidade do vento.",
    "Projeto feito por profissional habilitado, conforme normas técnicas."
  ];
  
  let colA = [];
  let colB = [];
  let selectedA = null;
  let selectedB = null;
  let matches = 0;
  
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  
  function criarItens() {
    const colAEl = document.getElementById("colunaA");
    const colBEl = document.getElementById("colunaB");
    colAEl.innerHTML = "";
    colBEl.innerHTML = "";
    colA = [];
    colB = [];
    selectedA = null;
    selectedB = null;
    matches = 0;
    document.getElementById("status").innerText = "Selecione uma opção da Coluna A e uma da Coluna B para ligar.";
  
    colAData.forEach((texto, idx) => {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = texto;
      div.dataset.index = idx;
      div.onclick = () => selecionar('A', div);
      colAEl.appendChild(div);
      colA.push(div);
    });
  
    // embaralhar respostas da Coluna B
    const shuffledB = shuffle([...colBData]);
  
    shuffledB.forEach((texto, idx) => {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = texto;
      div.dataset.originalIndex = colBData.indexOf(texto);
      div.onclick = () => selecionar('B', div);
      colBEl.appendChild(div);
      colB.push(div);
    });
  }
  
  function selecionar(coluna, el) {
    if (el.classList.contains("matched")) return;
  
    if (coluna === 'A') {
      if (selectedA) selectedA.classList.remove("selected");
      selectedA = el;
      el.classList.add("selected");
    } else {
      if (selectedB) selectedB.classList.remove("selected");
      selectedB = el;
      el.classList.add("selected");
    }
  
    if (selectedA && selectedB) {
      verificarMatch();
    }
  }
  
  function verificarMatch() {
    const idxA = parseInt(selectedA.dataset.index);
    const idxB = parseInt(selectedB.dataset.originalIndex);
  
    if (idxA === idxB) {
      selectedA.classList.remove("selected");
      selectedB.classList.remove("selected");
      selectedA.classList.add("matched");
      selectedB.classList.add("matched");
      selectedA.onclick = null;
      selectedB.onclick = null;
      matches++;
      document.getElementById("status").innerText = "✅ Correto!";
    } else {
      document.getElementById("status").innerText = "❌ Incorreto. Tente novamente.";
      setTimeout(() => {
        selectedA.classList.remove("selected");
        selectedB.classList.remove("selected");
      }, 800);
    }
  
    selectedA = null;
    selectedB = null;
  
    if (matches === colA.length) {
      document.getElementById("status").innerText = "🎉 Parabéns! Você completou todas as conexões corretamente.";
    }
  }
  
  function reiniciar() {
    criarItens();
  }
  
  criarItens();