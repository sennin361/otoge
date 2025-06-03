let combo = 0;
let score = 0;
let rank = "C";
let difficulty = "NORMAL";

function startGame() {
  document.getElementById("homeScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  combo = 0;
  score = 0;
  updateDisplay();
}

function hitNote() {
  combo++;
  score += 100;
  updateRank();
  updateDisplay();
}

function updateRank() {
  if (combo > 50) rank = "S";
  else if (combo > 30) rank = "A";
  else if (combo > 15) rank = "B";
  else rank = "C";
}

function updateDisplay() {
  document.getElementById("combo").textContent = `${combo} COMBO`;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("rank").textContent = `RANK: ${rank}`;
}

function endGame() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("finalScore").textContent = score;
  document.getElementById("finalCombo").textContent = combo;
  document.getElementById("finalRank").textContent = rank;
}

function saveScore() {
  const name = document.getElementById("playerName").value || "名無し";
  const scores = JSON.parse(localStorage.getItem("senninScores")) || [];
  scores.push({ name, score, combo, rank });
  localStorage.setItem("senninScores", JSON.stringify(scores));
  viewScores();
}

function viewScores() {
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("homeScreen").classList.add("hidden");
  document.getElementById("scoreScreen").classList.remove("hidden");

  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";
  const scores = JSON.parse(localStorage.getItem("senninScores")) || [];
  scores.reverse().forEach((s) => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - ${s.score}点 - ${s.combo}COMBO - ${s.rank}`;
    scoreList.appendChild(li);
  });
}

function goHome() {
  document.querySelectorAll(".screen").forEach((el) => el.classList.add("hidden"));
  document.getElementById("homeScreen").classList.remove("hidden");
}

// 自動的にゲーム終了（例として30秒後）
setTimeout(() => {
  if (!document.getElementById("gameScreen").classList.contains("hidden")) {
    endGame();
  }
}, 30000);
