const commandType = document.getElementById("commandType");
const contentMode = document.getElementById("contentMode");
const targetedCommandOptions = document.getElementById("targetedCommandOptions");
const targetGroup = document.getElementById("targetGroup");
const targetSelectorLabel = document.getElementById("targetSelectorLabel");
const targetSelector = document.getElementById("targetSelector");
const titleModeGroup = document.getElementById("titleModeGroup");
const titleMode = document.getElementById("titleMode");
const localizationGroup = document.getElementById("localizationGroup");
const localizationKey = document.getElementById("localizationKey");
const visibleTextLabel = document.getElementById("visibleTextLabel");
const visibleText = document.getElementById("visibleText");
const output = document.getElementById("output");
const langSection = document.getElementById("langSection");
const langOutput = document.getElementById("langOutput");
const copyButton = document.getElementById("copyButton");
const copyLangButton = document.getElementById("copyLangButton");
const status = document.getElementById("status");

function escapeForJson(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
}

function buildRawtextJson(text) {
  return `{"rawtext":[{"text":"${escapeForJson(text)}"}]}`;
}

function buildLocalizedRawtextJson(key) {
  return `{"rawtext":[{"translate":"${escapeForJson(key)}","with":{"rawtext":[{"text":"\\n"}]}}]}`;
}

function buildLangLine(key, text) {
  return `${key}=${text.replace(/\r\n|\r|\n/g, "%1")}`;
}

function buildCommand() {
  const type = commandType.value;
  const mode = contentMode.value;
  const text = visibleText.value;
  const key = localizationKey.value.trim();
  const rawtextJson = mode === "localized" ? buildLocalizedRawtextJson(key) : buildRawtextJson(text);

  if (type === "titleraw") {
    const selector = targetSelector.value.trim() || "@a";
    return `/titleraw ${selector} ${titleMode.value} ${rawtextJson}`;
  }

  if (type === "tellraw") {
    const selector = targetSelector.value.trim() || "@a";
    return `/tellraw ${selector} ${rawtextJson}`;
  }

  return rawtextJson;
}

function setStatus(message) {
  status.textContent = message;
}

function updateVisibility() {
  const isTitleraw = commandType.value === "titleraw";
  const isTellraw = commandType.value === "tellraw";
  const usesTargetSelector = isTitleraw || isTellraw;
  const isLocalized = contentMode.value === "localized";
  targetedCommandOptions.classList.toggle("hidden", !usesTargetSelector);
  targetGroup.classList.toggle("hidden", !usesTargetSelector);
  titleModeGroup.classList.toggle("hidden", !isTitleraw);
  localizationGroup.classList.toggle("hidden", !isLocalized);
  langSection.classList.toggle("hidden", !isLocalized);

  if (isTitleraw) {
    targetSelectorLabel.textContent = "Selector para titleraw";
  } else if (isTellraw) {
    targetSelectorLabel.textContent = "Selector para tellraw";
  } else {
    targetSelectorLabel.textContent = "Selector";
  }

  if (isLocalized) {
    visibleTextLabel.textContent = "Texto para archivo .lang";
    visibleText.placeholder = "Texto que irá en: key=texto";
  } else {
    visibleTextLabel.textContent = "Texto visible";
    visibleText.placeholder = "Escribe tu texto aquí. Ejemplo: §l§aHola mundo";
  }

  copyLangButton.disabled = !isLocalized;
}

function refreshOutput() {
  output.value = buildCommand();
  if (contentMode.value === "localized") {
    const key = localizationKey.value.trim();
    langOutput.value = key ? buildLangLine(key, visibleText.value) : "";
  } else {
    langOutput.value = "";
  }
  setStatus("");
}

async function copyText(text, successMessage) {
  if (!text) {
    setStatus("No hay contenido para copiar.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setStatus(successMessage);
    return;
  } catch (_) {
    const activeElement = document.activeElement;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    tempTextArea.setAttribute("readonly", "");
    tempTextArea.style.position = "fixed";
    tempTextArea.style.opacity = "0";
    document.body.appendChild(tempTextArea);
    tempTextArea.focus();
    tempTextArea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    if (activeElement && typeof activeElement.focus === "function") {
      activeElement.focus();
    }
    setStatus(copied ? successMessage : "No se pudo copiar automáticamente.");
  }
}

function copyOutput() {
  return copyText(output.value, "Comando copiado.");
}

function copyLangOutput() {
  return copyText(langOutput.value, "Contenido .lang copiado.");
}

commandType.addEventListener("change", () => {
  updateVisibility();
  refreshOutput();
});

contentMode.addEventListener("change", () => {
  updateVisibility();
  refreshOutput();
});

targetSelector.addEventListener("input", refreshOutput);
titleMode.addEventListener("change", refreshOutput);
localizationKey.addEventListener("input", refreshOutput);
visibleText.addEventListener("input", refreshOutput);
copyButton.addEventListener("click", copyOutput);
copyLangButton.addEventListener("click", copyLangOutput);

updateVisibility();
refreshOutput();
