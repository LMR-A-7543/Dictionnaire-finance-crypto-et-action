// =============================
// ELEMENTS HTML
// =============================
const wordList = document.getElementById("wordList");
const searchInput = document.getElementById("search");
const alphabetBox = document.getElementById("alphabet");
const categoriesBox = document.getElementById("categories");

// =============================
// ALPHABET DYNAMIQUE
// =============================
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

alphabet.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("alphabet-letter");
    span.onclick = () => filterByLetter(letter);
    alphabetBox.appendChild(span);
});

// =============================
// CATEGORIES DYNAMIQUES
// =============================
// Crée un set unique des catégories présentes dans definitions
const categories = [...new Set(definitions.map(d => d.category))];

categories.forEach(cat => {
    const span = document.createElement("span");
    span.textContent = cat;
    span.classList.add("category-item");
    span.onclick = () => filterByCategory(cat);
    categoriesBox.appendChild(span);
});

// =============================
// FONCTION LOAD WORDS
// =============================
function loadWords(list, highlight = "") {
    wordList.innerHTML = "";

    if(list.length === 0){
        wordList.innerHTML = "<li>Aucun résultat</li>";
        return;
    }

    list.forEach(def => {
        const li = document.createElement("li");
        li.onclick = () => openPopup(def);

        // Surbrillance du texte recherché
        if(highlight) {
            const regex = new RegExp(`(${highlight})`, "gi");
            li.innerHTML = def.word.replace(regex, "<span class='highlight'>$1</span>");
        } else {
            li.textContent = def.word;
        }

        wordList.appendChild(li);
    });
}

// =============================
// FILTRE PAR LETTRE
// =============================
function filterByLetter(letter) {
    const filtered = definitions.filter(d => 
        d.word.toUpperCase().startsWith(letter)
    );
    loadWords(filtered);
}

// =============================
// FILTRE PAR CATEGORIE
// =============================
function filterByCategory(category) {
    const filtered = definitions.filter(d => d.category === category);
    loadWords(filtered);
}

// =============================
// RECHERCHE DYNAMIQUE
// =============================
searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();

    const filtered = definitions.filter(d =>
        d.word.toLowerCase().includes(text)
    );

    loadWords(filtered, text);
});

// =============================
// POPUP DEFINITIONS
// =============================
function openPopup(def) {
    const popup = document.getElementById("popup");
    document.getElementById("popup-title").textContent = def.word;
    document.getElementById("popup-text").textContent = def.definition;
    const imgEl = document.getElementById("popup-img");

    if(def.image) {
        imgEl.src = def.image;
        imgEl.style.display = "block";
    } else {
        imgEl.style.display = "none";
    }

    popup.classList.remove("hidden");
}

// Fermer le popup
document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
};

// =============================
// INIT
// =============================
loadWords(definitions);
