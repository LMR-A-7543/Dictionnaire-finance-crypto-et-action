// ============================
// MAIN.JS
// ============================

const wordListEl = document.getElementById("wordList");
const searchEl = document.getElementById("search");
const alphabetEl = document.getElementById("alphabet");
const categoriesEl = document.getElementById("categories");
const popupEl = document.getElementById("popup");
const popupContentEl = document.getElementById("popup-content");
const popupImgEl = document.getElementById("popup-img");
const closePopupEl = document.getElementById("closePopup");

// Affiche les mots dans la liste
function displayWords(words) {
    wordListEl.innerHTML = "";
    words.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word.name;
        li.addEventListener("click", () => openPopup(word));
        wordListEl.appendChild(li);
    });
}

// Ouvre le popup avec les détails du mot
function openPopup(word) {
    popupImgEl.src = word.img || "";
    popupContentEl.querySelector("h3")?.remove();
    popupContentEl.querySelector("p")?.remove();

    const title = document.createElement("h3");
    title.textContent = word.name;
    const def = document.createElement("p");
    def.textContent = word.definition;

    popupContentEl.appendChild(title);
    popupContentEl.appendChild(def);

    popupEl.classList.remove("hidden");
}

// Ferme le popup
closePopupEl.addEventListener("click", () => popupEl.classList.add("hidden"));
popupEl.addEventListener("click", e => {
    if (e.target === popupEl) popupEl.classList.add("hidden");
});

// Filtrage par recherche
searchEl.addEventListener("input", () => {
    const query = searchEl.value.toLowerCase();
    const filtered = wordsData.filter(word => word.name.toLowerCase().includes(query));
    displayWords(filtered);
});

// Filtrage par alphabet
function createAlphabet() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    letters.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("alpha-btn");
        span.addEventListener("click", () => {
            document.querySelectorAll(".alpha-btn").forEach(btn => btn.classList.remove("active"));
            span.classList.add("active");
            const filtered = wordsData.filter(word => word.name.startsWith(letter));
            displayWords(filtered);
        });
        alphabetEl.appendChild(span);
    });
}

// Filtrage par catégorie
function createCategories() {
    const categories = [...new Set(wordsData.map(word => word.category))];
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.classList.add("category-btn");
        btn.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filtered = wordsData.filter(word => word.category === cat);
            displayWords(filtered);
        });
        categoriesEl.appendChild(btn);
    });
}

// Initialisation
displayWords(wordsData);
createAlphabet();
createCategories();
