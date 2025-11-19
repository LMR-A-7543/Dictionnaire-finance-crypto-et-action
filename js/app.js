// =============================
// Chargement des éléments HTML
// =============================
const wordList = document.getElementById("wordList");
const searchInput = document.getElementById("search");
const alphabetBox = document.getElementById("alphabet");

// =============================
// Génération Alphabet dynamique
// =============================
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

alphabet.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.onclick = () => filterByLetter(letter);
    alphabetBox.appendChild(span);
});

// =============================
// Affichage des mots
// =============================
function loadWords(list) {
    wordList.innerHTML = "";

    list.forEach(def => {
        const li = document.createElement("li");
        li.textContent = def.word;
        li.onclick = () => openPopup(def);
        wordList.appendChild(li);
    });
}

loadWords(definitions);

// =============================
// Filtre par lettre
// =============================
function filterByLetter(letter) {
    const filtered = definitions.filter(d =>
        d.word.toUpperCase().startsWith(letter)
    );
    loadWords(filtered);
}

// =============================
// Recherche dynamique
// =============================
searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();

    const filtered = definitions.filter(d =>
        d.word.toLowerCase().includes(text)
    );

    loadWords(filtered);
});

// =============================
// Popup Définition
// =============================
function openPopup(def) {
    document.getElementById("popup-title").textContent = def.word;
    document.getElementById("popup-text").textContent = def.definition;
    document.getElementById("popup-img").src = def.image;
    document.getElementById("popup").classList.remove("hidden");
}

document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
};
