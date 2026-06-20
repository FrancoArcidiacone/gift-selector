const screens = {
  intro: document.querySelector("#intro-screen"),
  selection: document.querySelector("#selection-screen"),
  analysis: document.querySelector("#analysis-screen"),
  final: document.querySelector("#final-screen"),
};

const gifts = {
  berlin: "Berlin Berlin",
  cena: "La Cena de los Tontos",
};

const startButton = document.querySelector("[data-start]");
const resetButton = document.querySelector("[data-reset]");
const cards = Array.from(document.querySelectorAll(".gift-card"));
const progressBar = document.querySelector("#progress-bar");
const analysisSteps = Array.from(document.querySelectorAll("#analysis-steps li"));
const finalChoice = document.querySelector("#final-choice");

let analysisTimer = null;

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
  screens[name].querySelector("h1, h2, button, [tabindex='0']")?.focus?.({ preventScroll: true });
}

function resetAnalysis() {
  window.clearTimeout(analysisTimer);
  progressBar.style.width = "0%";
  analysisSteps.forEach((step) => {
    step.classList.remove("is-active", "is-done");
  });
}

function runAnalysis(choice) {
  resetAnalysis();
  showScreen("analysis");

  const duration = 4100;
  const stepDuration = duration / analysisSteps.length;

  analysisSteps.forEach((step, index) => {
    window.setTimeout(() => {
      analysisSteps.forEach((item, itemIndex) => {
        item.classList.toggle("is-done", itemIndex < index);
        item.classList.toggle("is-active", itemIndex === index);
      });
      progressBar.style.width = `${Math.round(((index + 1) / analysisSteps.length) * 100)}%`;
    }, index * stepDuration);
  });

  analysisTimer = window.setTimeout(() => {
    finalChoice.textContent = `Selección registrada: ${gifts[choice]}`;
    showScreen("final");
  }, duration + 250);
}

function chooseGift(choice) {
  cards.forEach((card) => {
    const selected = card.dataset.gift === choice;
    card.classList.toggle("is-selected", selected);
    card.classList.toggle("is-dismissed", !selected);
  });

  window.setTimeout(() => runAnalysis(choice), 850);
}

startButton.addEventListener("click", () => showScreen("selection"));
resetButton.addEventListener("click", () => {
  cards.forEach((card) => card.classList.remove("is-selected", "is-dismissed"));
  resetAnalysis();
  showScreen("selection");
});

cards.forEach((card) => {
  const choice = card.dataset.gift;
  const button = card.querySelector(".choose-button");

  button.addEventListener("click", () => chooseGift(choice));

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseGift(choice);
    }
  });

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${x * 5}deg`);
    card.style.setProperty("--tilt-y", `${y * -5}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
  });
});
