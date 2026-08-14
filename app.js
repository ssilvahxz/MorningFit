const ADMIN_EMAIL="lorielsilvadosreis014@gmail.com";
let selectedMinutes=10, intensity="leve", circuit=[], timer=null, remaining=40, currentIndex=0, phase="exercise", running=false, soundOn=true;

const exercises={
  leve:[
    ["Marcha no lugar","🌿"],["Mobilidade de ombros","🔄"],["Agachamento lento","🦵"],["Elevação de joelhos leve","🚶"],["Prancha adaptada","🧘"],["Alongamento dinâmico","🤸"]
  ],
  forte:[
    ["Polichinelos","🔥"],["Agachamentos","🦵"],["Flexões adaptadas","💪"],["Mountain climbers","⚡"],["Corrida parada","🏃"],["Prancha","🧱"],["Pular corda imaginária","🪢"]
  ]
};

function shuffle(a){return [...a].sort(()=>Math.random()-0.5)}
function buildCircuit(){
  const pool=shuffle(exercises[intensity]);
  const count=selectedMinutes===10?5:selectedMinutes===15?7:9;
  circuit=Array.from({length:count},(_,i)=>pool[i%pool.length]);
  renderCircuit(); resetTimer();
}
function renderCircuit(){
  exerciseList.innerHTML=circuit.map((x,i)=>`<div class="exercise-item"><div><strong>${i+1}. ${x[0]}</strong><span>${x[1]} • 40s trabalho</span></div><span>20s descanso</span></div>`).join("");
  circuitSummary.textContent=`${circuit.length} exercícios`;
  totalMinutes.textContent=selectedMinutes;
}
function format(n){return `00:${String(Math.max(0,n)).padStart(2,"0")}`}
function updateUI(){
  timerDisplay.textContent=format(remaining);
  phaseBadge.textContent=phase==="exercise"?"EXERCÍCIO":"DESCANSO";
  roundText.textContent=`Rodada ${Math.min(currentIndex+1,circuit.length)} / ${circuit.length}`;
  exerciseName.textContent=phase==="exercise"?(circuit[currentIndex]?.[0]||"Pronto"):"Respire e descanse";
  const total=phase==="exercise"?40:20;
  progressBar.style.width=`${((total-remaining)/total)*100}%`;
}
function beep(freq=700){
  if(!soundOn)return;
  try{const C=window.AudioContext||window.webkitAudioContext;const c=new C(),o=c.createOscillator(),g=c.createGain();o.frequency.value=freq;o.connect(g);g.connect(c.destination);g.gain.value=.06;o.start();o.stop(c.currentTime+.12)}catch(e){}
}
function resetTimer(){
  clearInterval(timer);timer=null;running=false;currentIndex=0;phase="exercise";remaining=40;updateUI();
}
function nextPhase(){
  beep(phase==="exercise"?520:900);
  if(phase==="exercise"){phase="rest";remaining=20}
  else{
    currentIndex++;
    if(currentIndex>=circuit.length){finish();return}
    phase="exercise";remaining=40;
  }
  updateUI();
}
function start(){
  if(!circuit.length)buildCircuit();
  if(running)return;
  running=true;
  timer=setInterval(()=>{remaining--;if(remaining<=0)nextPhase();updateUI()},1000);
}
function finish(){
  clearInterval(timer);timer=null;running=false;remaining=0;phase="exercise";
  phaseBadge.textContent="CONCLUÍDO";roundText.textContent="Treino finalizado";exerciseName.textContent="🔥 Mandou bem!";progressBar.style.width="100%";beep(1000);
}
document.querySelectorAll(".time-choice").forEach(b=>b.onclick=()=>{document.querySelectorAll(".time-choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");selectedMinutes=+b.dataset.min;buildCircuit()});
document.querySelectorAll(".intensity-choice").forEach(b=>b.onclick=()=>{document.querySelectorAll(".intensity-choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");intensity=b.dataset.intensity;buildCircuit()});
generateBtn.onclick=buildCircuit;shuffleBtn.onclick=buildCircuit;startBtn.onclick=start;
pauseBtn.onclick=()=>{if(timer){clearInterval(timer);timer=null;running=false}};
resetBtn.onclick=resetTimer;
soundBtn.onclick=()=>{soundOn=!soundOn;soundBtn.textContent=soundOn?"🔊 Som: ligado":"🔇 Som: desligado"};
loginBtn.onclick=()=>loginModal.classList.remove("hidden");closeModal.onclick=()=>loginModal.classList.add("hidden");

function showAdmin(email){
  if(email===ADMIN_EMAIL)adminPanel.classList.remove("hidden");
}
demoGoogle.onclick=()=>{loginModal.classList.add("hidden");const email=prompt("DEMO: informe o e-mail da conta Google:");if(email){localStorage.setItem("morningfit_user",email);showAdmin(email);alert("Login demonstrativo concluído.");}};
exportBtn.onclick=()=>{const data={minutes:selectedMinutes,intensity,circuit,admin:ADMIN_EMAIL};const a=document.createElement("a");a.href="data:application/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(data,null,2));a.download="morningfit-config.json";a.click()};
clearBtn.onclick=()=>{localStorage.clear();location.reload()};

buildCircuit();

window.morningFitFirebaseReady = typeof window.FIREBASE_CONFIG !== "undefined";
if(localStorage.getItem("morningfit_user"))showAdmin(localStorage.getItem("morningfit_user"));
