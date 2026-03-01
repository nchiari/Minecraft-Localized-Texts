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
const langButtons = document.querySelectorAll(".lang-btn");
const contentModeDirect = document.getElementById("contentModeDirect");
const contentModeLocalized = document.getElementById("contentModeLocalized");

const I18N = {
  es: {
    "app.title": "Generador de comandos",
    "app.subtitle": "Minecraft Bedrock / Education",
    "label.commandType": "Tipo de comando",
    "label.contentMode": "Tipo de contenido",
    "label.visualization": "Visualizacion",
    "label.localizationKey": "Key de localizacion",
    "label.output": "Salida",
    "label.langOutput": "Salida .lang",
    "button.copyCommand": "Copiar comando",
    "button.copyLang": "Copiar .lang",
    "footer.copyright": "Copyright Nico Chiari · Powered by ☕",
    "footer.feedback": "Enviar feedback",
    "option.direct": "Texto directo",
    "option.localized": "Texto localizado",
    "label.selector.titleraw": "Selector para titleraw",
    "label.selector.tellraw": "Selector para tellraw",
    "label.selector.default": "Selector",
    "label.visible.direct": "Texto visible",
    "label.visible.localized": "Texto para archivo .lang",
    "placeholder.visible.direct": "Escribe tu texto aqui. Ejemplo: §l§aHola mundo",
    "placeholder.visible.localized": "Texto que ira en: key=texto",
    "status.empty": "No hay contenido para copiar.",
    "status.copy.command.ok": "Comando copiado.",
    "status.copy.lang.ok": "Contenido .lang copiado.",
    "status.copy.fail": "No se pudo copiar automaticamente."
  },
  en: {
    "app.title": "Command Generator",
    "app.subtitle": "Minecraft Bedrock / Education",
    "label.commandType": "Command type",
    "label.contentMode": "Content type",
    "label.visualization": "Display",
    "label.localizationKey": "Localization key",
    "label.output": "Output",
    "label.langOutput": ".lang output",
    "button.copyCommand": "Copy command",
    "button.copyLang": "Copy .lang",
    "footer.copyright": "Copyright Nico Chiari · Powered by ☕",
    "footer.feedback": "Send feedback",
    "option.direct": "Direct text",
    "option.localized": "Localized text",
    "label.selector.titleraw": "Selector for titleraw",
    "label.selector.tellraw": "Selector for tellraw",
    "label.selector.default": "Selector",
    "label.visible.direct": "Visible text",
    "label.visible.localized": "Text for .lang file",
    "placeholder.visible.direct": "Write your text here. Example: §l§aHello world",
    "placeholder.visible.localized": "Text that will be used in: key=text",
    "status.empty": "There is no content to copy.",
    "status.copy.command.ok": "Command copied.",
    "status.copy.lang.ok": ".lang content copied.",
    "status.copy.fail": "Could not copy automatically."
  }
};

let currentLang = localStorage.getItem("dialogues_app_lang") || "es";

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

function t(key) {
  return I18N[currentLang][key] || I18N.es[key] || key;
}

function applyI18n() {
  document.documentElement.lang = currentLang;
  document.title = `${t("app.title")} - rawtext / titleraw / tellraw`;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });

  contentModeDirect.textContent = t("option.direct");
  contentModeLocalized.textContent = t("option.localized");

  langButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.lang === currentLang ? "true" : "false");
  });
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
    targetSelectorLabel.textContent = t("label.selector.titleraw");
  } else if (isTellraw) {
    targetSelectorLabel.textContent = t("label.selector.tellraw");
  } else {
    targetSelectorLabel.textContent = t("label.selector.default");
  }

  if (isLocalized) {
    visibleTextLabel.textContent = t("label.visible.localized");
    visibleText.placeholder = t("placeholder.visible.localized");
  } else {
    visibleTextLabel.textContent = t("label.visible.direct");
    visibleText.placeholder = t("placeholder.visible.direct");
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
    setStatus(t("status.empty"));
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
    setStatus(copied ? successMessage : t("status.copy.fail"));
  }
}

function copyOutput() {
  return copyText(output.value, t("status.copy.command.ok"));
}

function copyLangOutput() {
  return copyText(langOutput.value, t("status.copy.lang.ok"));
}

commandType.addEventListener("change", () => {
  updateVisibility();
  refreshOutput();
});

contentMode.addEventListener("change", () => {
  updateVisibility();
  refreshOutput();
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang || "es";
    localStorage.setItem("dialogues_app_lang", currentLang);
    applyI18n();
    updateVisibility();
    refreshOutput();
  });
});

targetSelector.addEventListener("input", refreshOutput);
titleMode.addEventListener("change", refreshOutput);
localizationKey.addEventListener("input", refreshOutput);
visibleText.addEventListener("input", refreshOutput);
copyButton.addEventListener("click", copyOutput);
copyLangButton.addEventListener("click", copyLangOutput);

if (!I18N[currentLang]) {
  currentLang = "es";
}
applyI18n();
updateVisibility();
refreshOutput();
