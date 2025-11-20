// =============================
// ELEMENTS HTML
// =============================
const wordList = document.getElementById("wordList");
const searchInput = document.getElementById("search");
const alphabetBox = document.getElementById("alphabet");
const categoriesBox = document.getElementById("categories");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// =============================
// VARIABLES GLOBALES
// =============================
let filteredDefinitions = [...definitions]; // Définitions filtrées dynamiquement
let bubbles = [];

// =============================
// CANVAS SETUP
// =============================
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// =============================
// GENERATION ALPHABET
// =============================
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
alphabet.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("alphabet-letter");
    span.onclick = () => {
        filterByLetter(letter);
    };
    alphabetBox.appendChild(span);
});

// =============================
// GENERATION CATEGORIES
// =============================
const categories = [...new Set(definitions.map(d => d.category))];
categories.forEach(cat => {
    const span = document.createElement("span");
    span.textContent = cat;
    span.classList.add("category-item");
    span.onclick = () => {
        filterByCategory(cat);
    };
    categoriesBox.appendChild(span);
});

// =============================
// FONCTION LOAD WORDS
// =============================
function loadWords(list, highlight = "") {
    wordList.innerHTML = "";

    if (list.length === 0) {
        wordList.innerHTML = "<li>Aucun résultat</li>";
        return;
    }

    list.forEach(def => {
        const li = document.createElement("li");
        li.onclick = () => openPopup(def);

        // Surbrillance du texte recherché
        if (highlight) {
            const regex = new RegExp(`(${highlight})`, "gi");
            li.innerHTML = def.word.replace(regex, "<span class='highlight'>$1</span>");
        } else {
            li.textContent = def.word;
        }

        wordList.appendChild(li);
    });
}

// =============================
// FILTRAGE
// =============================
function filterByLetter(letter) {
    filteredDefinitions = definitions.filter(d =>
        d.word.toUpperCase().startsWith(letter)
    );
    updateDisplay();
}

function filterByCategory(category) {
    filteredDefinitions = definitions.filter(d => d.category === category);
    updateDisplay();
}

searchInput.addEventListener("input", () => {
    const text = searchInput.value.toLowerCase();
    filteredDefinitions = definitions.filter(d =>
        d.word.toLowerCase().includes(text)
    );
    updateDisplay(text);
});

// =============================
// MISE A JOUR AFFICHAGE
// =============================
function updateDisplay(highlight = "") {
    loadWords(filteredDefinitions, highlight);
    initBubbles(filteredDefinitions);
}

// =============================
// POPUP
// =============================
function openPopup(def) {
    const popup = document.getElementById("popup");
    document.getElementById("popup-title").textContent = def.word;
    document.getElementById("popup-text").textContent = def.definition;
    const imgEl = document.getElementById("popup-img");

    if (def.image) {
        imgEl.src = def.image;
        imgEl.style.display = "block";
    } else {
        imgEl.style.display = "none";
    }

    popup.classList.remove("hidden");
}

document.getElementById("closePopup").onclick = () => {
    document.getElementById("popup").classList.add("hidden");
};

// =============================
// CANVAS BUBBLES
// =============================
class Bubble {
    constructor(def) {
        this.def = def;
        this.size = 80;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = Math.random() * (canvas.height - this.size);
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }

    draw() {
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fillRect(this.x, this.y, this.size, this.size);

        if (this.def.image) {
            const img = new Image();
            img.src = this.def.image;
            ctx.drawImage(img, this.x + 15, this.y + 10, 50, 50);
        }

        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.fillText(this.def.word, this.x + 10, this.y + 75);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x + this.size > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y + this.size > canvas.height) this.vy *= -1;
    }

    isClicked(mx, my) {
        return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
    }
}

// =============================
// INITIALISATION BULLES
// =============================
function initBubbles(list = filteredDefinitions) {
    bubbles = list.map(def => new Bubble(def));
}

// =============================
// ANIMATION
// =============================
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => {
        b.update();
        b.draw();
    });
    requestAnimationFrame(animate);
}

// =============================
// CLIC SUR BUBBLES
// =============================
canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    bubbles.forEach(b => {
        if (b.isClicked(mx, my)) {
            openPopup(b.def);
        }
    });
});

// =============================
// LANCEMENT INITIAL
// =============================
updateDisplay();
animate();
