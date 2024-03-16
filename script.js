document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const characterContainer = document.getElementById("characterContainer");
    const displayedCharacters = new Set(); // Conjunto para almacenar personajes mostrados
    let showingInitialCharacters = true; // Variable para rastrear si se están mostrando los seis personajes iniciales

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

        // Agregar el personaje al conjunto de personajes mostrados solo si se están mostrando los seis personajes iniciales
        if (showingInitialCharacters) {
            displayedCharacters.add(character.character);
        }
    }

    // Función para mostrar detalles de personajes
    async function displayCharacterDetails(characters, limit = Infinity) {
        for (let i = 0; i < characters.length && i < limit; i++) {
            // Verificar si el personaje ya ha sido mostrado solo si se están mostrando los seis personajes iniciales
            if (showingInitialCharacters && displayedCharacters.has(characters[i].character)) {
                limit++;
                continue;
            }
            addCharacter(characters[i]);
        }
    }

    // Obtener datos de personajes de la API
    async function fetchCharacterData(characterName) {
        try {
            const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${characterName}`);
            const data = await response.json();
            characterContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos personajes
            await displayCharacterDetails(data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }

    // Manejar la búsqueda cuando se presiona Enter en el campo de entrada
    searchInput.addEventListener("keypress", async function(event) {
        if (event.key === "Enter") {
            const characterName = searchInput.value.trim().toLowerCase();
            if (characterName !== "") {
                await fetchCharacterData(characterName);
            }
        }
    });

    // Inicialmente cargar algunos personajes al cargar la página
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=6")
        .then(response => response.json())
        .then(data => {
            displayCharacterDetails(data, 6);
        })
        .catch(error => console.log("Error fetching data:", error));

    const randomBtn = document.getElementById("randomBtn");
    const randomCharacterContainer = document.getElementById("randomCharacter");

    randomBtn.addEventListener("click", async function() {
        try {
            const response = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=1");
            const data = await response.json();
            const character = data[0];

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

            // Limpiar el contenedor antes de agregar un nuevo personaje
            randomCharacterContainer.innerHTML = "";
            randomCharacterContainer.appendChild(characterBox);

            // Ocultar los seis personajes iniciales
            characterContainer.style.display = "none";
            randomCharacterContainer.style.display = "block";
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    });

    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", async function() {
        // Mostrar los seis personajes iniciales
        characterContainer.style.display = "grid";
        randomCharacterContainer.style.display = "none";

        // Vaciar el conjunto de personajes mostrados solo si se están mostrando los seis personajes iniciales
        if (showingInitialCharacters) {
            displayedCharacters.clear();
        }

        // Cargar los seis personajes iniciales solo si se están mostrando los seis personajes iniciales
        if (showingInitialCharacters) {
            fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=6")
                .then(response => response.json())
                .then(data => {
                    characterContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevos personajes
                    displayCharacterDetails(data, 6);
                })
                .catch(error => console.log("Error fetching data:", error));
        }

        // Cambiar el estado de la variable para indicar que no se están mostrando los seis personajes iniciales
        showingInitialCharacters = false;
    });
});
