// main.js

// Sélection des éléments HTML
const wordListEl = document.getElementById("wordList");
const searchInput = document.getElementById("search");
const alphabetEl = document.getElementById("alphabet");
const categoriesEl = document.getElementById("categories");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-content");
const popupImg = document.getElementById("popup-img");
const popupWord = document.getElementById("popup-word");
const popupDefinition = document.getElementById("popup-definition");
const closePopupBtn = document.getElementById("closePopup");

// Variables pour filtrage
let filteredDefinitions = [...definitions];
let activeLetter = "";
let activeCategory = "";

// --- Affichage des mots ---
function displayWords(list) {
    wordListEl.innerHTML = "";
    if(list.length === 0){
        wordListEl.innerHTML = "<li>Aucun mot trouvé</li>";
        return;
    }
    list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.word;
        li.addEventListener("click", () => openPopup(item));
        wordListEl.appendChild(li);
    });
}

// --- Popup ---
function openPopup(item) {
    popup.classList.remove("hidden");
    popupImg.src = item.image;
    popupWord.textContent = item.word;
    popupDefinition.textContent = item.definition;
}

function closePopup() {
    popup.classList.add("hidden");
}

closePopupBtn.addEventListener("click", closePopup);
popup.addEventListener("click", (e) => {
    if(e.target === popup) closePopup();
});

// --- Alphabet ---
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
alphabet.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("alpha-btn");
    span.addEventListener("click", () => {
        if(activeLetter === letter){
            activeLetter = "";
        } else {
            activeLetter = letter;
        }
        updateActiveClasses();
        filterWords();
    });
    alphabetEl.appendChild(span);
});

// --- Catégories ---
const categoriesSet = new Set();
definitions.forEach(item => {
    item.category.split(",").forEach(cat => categoriesSet.add(cat.trim()));
});

Array.from(categoriesSet).sort().forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.add("category-btn");
    btn.addEventListener("click", () => {
        if(activeCategory === cat){
            activeCategory = "";
        } else {
            activeCategory = cat;
        }
        updateActiveClasses();
        filterWords();
    });
    categoriesEl.appendChild(btn);
});

// --- Mise à jour des classes actives ---
function updateActiveClasses() {
    document.querySelectorAll(".alpha-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent === activeLetter);
    });
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.toggle("active", btn.textContent === activeCategory);
    });
}

// --- Recherche ---
searchInput.addEventListener("input", filterWords);

// --- Filtrage global ---
function filterWords() {
    filteredDefinitions = definitions.filter(item => {
        const matchesSearch = item.word.toLowerCase().includes(searchInput.value.toLowerCase());
        const matchesLetter = activeLetter ? item.word[0].toUpperCase() === activeLetter : true;
        const matchesCategory = activeCategory ? item.category.split(",").map(c => c.trim()).includes(activeCategory) : true;
        return matchesSearch && matchesLetter && matchesCategory;
    });
    displayWords(filteredDefinitions);
}

// --- Initialisation ---
displayWords(definitions);
