let selectedLang = '';

// Sélection de la langue
document.getElementById('btn-fr').addEventListener('click', () => {
    selectedLang = 'fr';
    updateCardText();
    startAnimation();
});

document.getElementById('btn-nl').addEventListener('click', () => {
    selectedLang = 'nl';
    updateCardText();
    startAnimation();
});

// Phrases pour les animations
const phrases = {
    fr: [
        "Félicitations ! Vous venez de débloquer une récompense exclusive !"
    ],
    nl: [
        "Proficiat! U hebt net een exclusieve beloning vrijgespeeld!"
    ]
};

let index = 0, charIndex = 0;
const textElement = document.getElementById("content");

function startAnimation() {
    // Masque les boutons et autres éléments
    document.getElementById('language-selection').style.display = 'none';
    document.getElementById('text').style.display = 'block';
    document.querySelector('.logo-glitch').style.display = 'block';
    document.querySelector('.logo-glitch').style.animation = 'glitchLogo 2.5s infinite steps(1)';
    document.querySelector('.logo-no-glitch').style.display = 'none';

    createMatrixEffect();
    typeText();
}

function typeText() {
    const phrasesSplit = phrases[selectedLang][index].split("! ");
    const firstPart = phrasesSplit[0] + "!"; // "Félicitations !"
    const secondPart = phrasesSplit[1] ? phrasesSplit[1] : ""; // "Tu viens de..."

    textElement.innerHTML = ""; // Reset
    charIndex = 0;

    function typePart(text, callback, isFirstPart = false) {
        if (charIndex < text.length) {
            const span = document.createElement("span");

            // Si c'est la première partie, on applique une classe pour le style
            if (isFirstPart) {
                span.classList.add("highlight");
            }

            span.textContent = text.charAt(charIndex);
            textElement.appendChild(span);
            charIndex++;
            setTimeout(() => typePart(text, callback, isFirstPart), 25);
        } else {
            callback();
        }
    }

    // Phase 1 : écrit "Félicitations !" avec la classe "highlight" pour le jaune
    typePart(firstPart, () => {
        setTimeout(() => {
            // 🔁 Ajoute un vrai retour à la ligne
            const br = document.createElement("br");
            textElement.appendChild(br);

            // Phase 2 : écrit le reste
            charIndex = 0;
            typePart(secondPart, () => {
                setTimeout(() => {
                    eraseText();
                }, 1750);
            });
        }, 500); // Pause après le "!"
    }, true); // Passer true pour la première partie
}



function eraseText() {
    textElement.classList.add('fade-out');
    charIndex = 0; // important pour la prochaine phrase

    setTimeout(() => {
        textElement.innerHTML = '';
        textElement.classList.remove('fade-out');

        index++;
        if (index < phrases[selectedLang].length) {
            setTimeout(typeText, 200); // petite pause avant d'enchaîner
        } else {
            setTimeout(() => {
                document.querySelector('.cursor').style.display = 'none';
                const rewardCard = document.getElementById('rewardCard');
                rewardCard.style.display = 'flex';
                rewardCard.classList.add('show');
                updateCardText();
            }, 800);
        }
    }, 600); // temps pour laisser l'effet de fondu
}

function createMatrixEffect() {
    const matrix = document.createElement("div");
    matrix.classList.add("matrix");
    document.body.appendChild(matrix);

    function spawnNumbers() {
        matrix.innerHTML = "";
        for (let i = 0; i < 60; i++) {
            let span = document.createElement("span");
            span.textContent = Math.floor(Math.random() * 10);
            span.style.left = Math.random() * 100 + "vw";
            span.style.top = Math.random() * 100 + "vh";
            span.style.animationDuration = (Math.random() * 2 + 0.5) + "s";
            span.style.animationDelay = (Math.random() * 2) + "s";
            span.classList.add("matrix-number");

            matrix.appendChild(span);

            setInterval(() => {
                span.textContent = Math.floor(Math.random() * 10);
            }, Math.random() * 1000 + 500);
        }
    }

    spawnNumbers();
}

// Activation du retournement de la carte
document.getElementById('cardInner').addEventListener('click', () => {
    document.getElementById('cardInner').classList.toggle('flipped');
    // Ajout de la classe 'rotate-border' pour appliquer la bordure lumineuse continue pendant le retournement
    document.getElementById('rewardCard').classList.add('rotate-border');
});

// Fonction pour changer le texte de la carte en fonction de la langue sélectionnée
function updateCardText() {
    const cardText = document.getElementById('card-text');
    
    if (selectedLang === 'nl') {
        cardText.textContent = 'Klik hier en toon deze kaart aan een verkoper.';
    } else {
        cardText.textContent = 'Cliquez ici et présentez cette carte à un vendeur';
    }
}