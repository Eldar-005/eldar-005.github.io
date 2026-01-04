function setLang(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}

function toggleAI() {
    const panel = document.getElementById("ai-panel");
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("ai-input");
    const msg = input.value.trim();
    if (!msg) return;

    const box = document.getElementById("ai-messages");
    box.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
    box.innerHTML += `<div><strong>AI:</strong> (AI logic later)</div>`;

    input.value = "";
    box.scrollTop = box.scrollHeight;
}
