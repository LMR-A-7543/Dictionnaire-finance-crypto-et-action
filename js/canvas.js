// =============================
// CANVAS — BULLES CARRÉES ANIMÉES
// =============================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ajuste la taille du canvas à la fenêtre
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// =============================
// CLASSE BUBBLE
// =============================
class Bubble {
    constructor(def) {
        this.def = def;
        this.size = 80; // taille initiale
        this.x = Math.random() * (canvas.width - this.size);
        this.y = Math.random() * (canvas.height - this.size);
        this.vx = (Math.random() - 0.5) * 0.8; // vitesse horizontale
        this.vy = (Math.random() - 0.5) * 0.8; // vitesse verticale
    }

    draw() {
        // Carré de fond transparent
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fillRect(this.x, this.y, this.size, this.size);

        // Dessin de l'image si elle existe
        if(this.def.image) {
            const img = new Image();
            img.src = this.def.image;
            ctx.drawImage(img, this.x + 15, this.y + 10, 50, 50);
        }

        // Texte du mot
        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.fillText(this.def.word, this.x + 10, this.y + 75);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // rebond sur les bords du canvas
        if (this.x < 0 || this.x + this.size > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y + this.size > canvas.height) this.vy *= -1;
    }

    isClicked(mx, my) {
        return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
    }
}

// =============================
// INITIALISATION DES BULLES
// =============================
let bubbles = [];

function initBubbles(list = definitions) {
    // Option : filtrer par catégorie ou recherche
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
// CLIC SUR LES BULLES
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
// FILTRAGE DES BULLES (OPTIONNEL)
// =============================
function filterBubbles(filterList) {
    initBubbles(filterList); // réinitialise les bulles avec les termes filtrés
}

// =============================
// LANCEMENT
// =============================
initBubbles();
animate();
