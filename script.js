// JavaScript actualizado
document.addEventListener("DOMContentLoaded", function() {
    const backBtn = document.getElementById("backBtn");
    const characterContainer = document.getElementById("characterContainer");
    const displayedCharacters = new Set(); // Conjunto para almacenar personajes mostrados

    // Volver a cargar la página cuando se hace clic en el botón "Volver"
    backBtn.addEventListener("click", function() {
        window.location.reload();
    });

    // Función para crear y agregar un personaje al contenedor
    function addCharacter(character) {
        const characterBox = document.createElement("div");
        characterBox.classList.add("character-box");

        const characterName = document.createElement("h3");
        characterName.textContent = character.character;

        const characterImage = document.createElement("img");
        characterImage.src = character.image;

        const characterQuote = document.createElement("p");
        characterQuote.textContent = character.quote;

        characterBox.appendChild(characterImage);
        characterBox.appendChild(characterName);
        characterBox.appendChild(characterQuote);
        characterContainer.appendChild(characterBox);

        // Agregar el personaje al conjunto de personajes mostrados
        displayedCharacters.add(character.character);
    }

    // Función para mostrar detalles de personajes
    function displayCharacterDetails(characters) {
        characters.forEach(character => {
            // Verificar si el personaje ya ha sido mostrado
            if (!displayedCharacters.has(character.character)) {
                addCharacter(character);
            }
        });
    }

    // Obtener datos de personajes de la API
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=3")
        .then(response => response.json())
        .then(data => {
            displayCharacterDetails(data);

            // Mostrar detalles del primer personaje
            displayCharacterDetails(data[0]);
        })
        .catch(error => console.log("Error fetching data:", error));
});
