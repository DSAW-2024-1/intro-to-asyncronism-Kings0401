document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const characterContainer = document.getElementById("characterContainer");
    const displayedCharacters = new Set(); // Conjunto para almacenar personajes mostrados

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
    function fetchCharacterData(characterName) {
        fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${characterName}`)
            .then(response => response.json())
            .then(data => {
                characterContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos personajes
                displayCharacterDetails(data);
            })
            .catch(error => console.log("Error fetching data:", error));
    }

    // Manejar la búsqueda cuando se presiona Enter en el campo de entrada
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const characterName = searchInput.value.trim().toLowerCase();
            if (characterName !== "") {
                fetchCharacterData(characterName);
            }
        }
    });

    // Inicialmente cargar algunos personajes al cargar la página
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=3")
        .then(response => response.json())
        .then(data => {
            displayCharacterDetails(data);
        })
        .catch(error => console.log("Error fetching data:", error));
});
