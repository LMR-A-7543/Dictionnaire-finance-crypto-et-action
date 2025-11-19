// Remplit la liste des mots
const wordList = document.getElementById("wordList");

definitions.forEach(def => {
    const li = document.createElement("li");
    li.textContent = def.word;
    li.onclick = () => openPopup(def);
    wordList.appendChild(li);
});

// Barre de recherche
document.getElementById("search").addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll("#wordList li").forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(text) ? "block" : "none";
    });
});

// Ouvre le popup
function openPopup(def) {
    document.getElementById("popup-title").textContent = def.word;
    document.getElementById("popup-text").textContent = def.definition;
    document.getElementById("popup-img").src = def.image;
    document.getElementById("popup").classList.remove("hidden");
}

// Fermer popup
document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
};
