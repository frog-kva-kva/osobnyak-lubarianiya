const DEFAULT_NAME = "Особняк Лубарианийа";
const STORAGE_KEY = "lubarianiya-mansion-name";

const headerName = document.querySelector("#headerMansionName");
const heroName = document.querySelector("#heroMansionName");
const footerName = document.querySelector("#footerMansionName");
const nameInput = document.querySelector("#mansionNameInput");
const nameStatus = document.querySelector("#nameStatus");

function applyMansionName(name) {
  const cleanName = name.trim() || DEFAULT_NAME;
  headerName.textContent = cleanName;
  heroName.textContent = cleanName;
  footerName.textContent = cleanName;
  nameInput.value = cleanName;
  document.title = `${cleanName} — дело открыто`;
  return cleanName;
}

try {
  applyMansionName(localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME);
} catch {
  applyMansionName(DEFAULT_NAME);
}

document.querySelector("#nameForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const cleanName = applyMansionName(nameInput.value);
  try {
    localStorage.setItem(STORAGE_KEY, cleanName);
    nameStatus.textContent = "Название сохранено в этом браузере.";
  } catch {
    nameStatus.textContent = "Название изменено до перезагрузки страницы.";
  }
});

document.querySelector("#resetName").addEventListener("click", () => {
  applyMansionName(DEFAULT_NAME);
  try {
    localStorage.removeItem(STORAGE_KEY);
    nameStatus.textContent = "Возвращено название по умолчанию.";
  } catch {
    nameStatus.textContent = "Название сброшено до перезагрузки страницы.";
  }
});

document.querySelector("#editNameTop").addEventListener("click", () => {
  document.querySelector("#personalize").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => nameInput.focus({ preventScroll: true }), 350);
  document.querySelector("#mainNav").classList.remove("open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", "false");
});

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelector("#revealCipher").addEventListener("click", (event) => {
  const result = document.querySelector("#cipherResult");
  const isHidden = result.hidden;
  result.hidden = !isHidden;
  event.currentTarget.innerHTML = isHidden
    ? "Скрыть подсказку <span>↗</span>"
    : "Раскрыть подсказку <span>↗</span>";
});
