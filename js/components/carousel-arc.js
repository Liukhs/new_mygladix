let stage;
let cardsEl = [];
let TOTAL = 0;
let STAGE_W = 0;
let VISIBLE = 7;
let ARC_RADIUS = 1500;

let BASE_Y = 80; // coordinata y della card centrale dal top dello stage
let CARD_W = 350; // larghezza delle card
let ARC_SPREAD = 60;
let current = 0;
let animating = false;

export function initArcCarousel(){
    stage = document.getElementById("stage");
    cardsEl = document.querySelectorAll(".arc--cards");
    TOTAL = cardsEl.length;
    const root = document.querySelector(".arc--carousel-root");
    if (!root || !stage || TOTAL === 0) return;

    STAGE_W = root.getBoundingClientRect().width;
    if(STAGE_W <= 768){
      VISIBLE = 3;
      CARD_W = STAGE_W * 0.75;
      ARC_RADIUS = STAGE_W * 1.5;
      ARC_SPREAD = 45;
      BASE_Y = 40
    }else if(STAGE_W < 1200){
        VISIBLE = 5;
        CARD_W = 300;
        ARC_RADIUS = 1100;
        ARC_SPREAD = 55;
        BASE_Y = 60;
    }else{
        VISIBLE = 7;
        CARD_W = 350;
        ARC_RADIUS = 1500;
        ARC_SPREAD = 60;
        BASE_Y = 80;
    }
    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => navigate(-1));
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.addEventListener("click", () => navigate(1));

    arcCarousel();
    render();
}

function arcCarousel() {
  cardsEl.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (animating) return;
      const rel = getRelativePos(i);
      if (rel === 0) return;
      navigate(rel > 0 ? 1 : -1);
    });
  });
}

function getRelativePos(idx) {
  let rel = idx - current;
  if (rel > TOTAL / 2) rel -= TOTAL;
  if (rel < -TOTAL / 2) rel += TOTAL;
  return rel;
}

function getSlotConfig(relPos) {
  const half = Math.floor(VISIBLE / 2);

  if (Math.abs(relPos) > half) return null;
  //angolo in gradi, da -ARC_SPREAD A +ARC_SPREAD
  const angleDeg = (relPos / half) * ARC_SPREAD;
  const angleRad = (angleDeg * Math.PI) / 180;
  /*
    Posizione X: partendo dal centro dello stage,
    ci spostiamo lateralmente lungo l'arco.
    Sottraiamo metà larghezza card per centrarla sul punto
  */
  const x = STAGE_W / 2 + ARC_RADIUS * Math.sin(angleRad) - CARD_W / 2;
  /*
    Posizione Y: la card centrale è a BASE_Y.
    Le card laterali salgono lungo l'arco.
    formula: spostamento verticale = R RxCOS(Angolo) = Rx(1-cos(angolo))
  */
  const y = BASE_Y + ARC_RADIUS * (1 - Math.cos(angleRad));

  const scale = 1 - Math.abs(relPos) * 0.09;
  const opacity = 1 - Math.abs(relPos) * 0.17;
  const zIndex = 9 - Math.abs(relPos);

  const rotate = angleDeg * 0.3;
  return { x, y, scale, opacity, zIndex, rotate };
}

function render() {
  cardsEl.forEach((el, i) => {
    el.style.width = CARD_W + "px";
    const rel = getRelativePos(i);
    const cfg = getSlotConfig(rel);

    if (!cfg) {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.style.zIndex = "0";
      el.classList.remove("active");
      return;
    }
    el.style.left = cfg.x + "px";
    el.style.top = cfg.y + "px";
    el.style.transform = `scale(${cfg.scale}) rotate(${cfg.rotate}deg)`;
    el.style.opacity = cfg.opacity;
    el.style.zIndex = cfg.zIndex;
    el.style.pointerEvents = "auto";
    el.classList.toggle("active", rel === 0);
  });
}

function navigate(dir) {
  if (animating) return;

  animating = true;

  current = (current + dir + TOTAL) % TOTAL;
  render();
  setTimeout(() => {
    animating = false;
  }, 650);
}
