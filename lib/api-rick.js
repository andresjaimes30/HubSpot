const URL_API = "https://rickandmortyapi.com/api";


/**
 * @description funcion que obtiene todos los personajes de la api
 * @returns Array of characters
 */
const getAllCharacters = async () => {
    try {
        let allCharacters = [];
        let nextPage = `${URL_API}/character`;

        while (nextPage) {
            const characters = await fetch(nextPage);
            const data = await characters.json();
            allCharacters = allCharacters.concat(data.results);
            nextPage = data.info.next;
        }

        return allCharacters;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * @description funcion que evalua si un numero es primo
 * @param {*} num numero a evaluar si es primo
 * @returns boolean
 */
const isPrime = (num) => {
    if (num <= 1) return false;
    if (num === 2) return true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};
/**
 * @description funcion que obtiene los personajes con id primo
 * @param {*} characters  array de personajes
 * @returns Array de personajes con id primo
 */
const getCharactersWithPrimeNumbers = (characters = []) => {
    const primeNumbers = characters.filter((character) => {
        return isPrime(character.id);
    })
    return primeNumbers;
}

/**
 * @description funcion que une los personajes con sus locaciones
 * @param {*} characters array de personajes
 * @param {*} locations array de locaciones
 * @returns Array de personajes con sus locaciones
 */
const joinCharactersWithLocations = (characters, locations) => {
    const charactersWithLocations = characters.map((character) => {
        const location = locations.find((location) => {
            return location.name === character.name_location;
        });
        return {
            ...character,
            location,
        };
    });
    return charactersWithLocations;
}

/**
 * @description funcion que obtiene todas las locaciones de la api
 * @returns Array de locaciones
 */
const getAllLocations = async () => {
    try {
        let allLocations = [];
        let nextPage = `${URL_API}/location`;
        while (nextPage) {
            const locations = await fetch(nextPage);
            const data = await locations.json();
            allLocations = allLocations.concat(data.results);
            nextPage = data.info.next;
        }
        return allLocations;
    } catch (error) {
        console.log(error);
    }
}


const mapLocations = (data) => {
    const dataParsed = data.map(({ id, name, type, dimension, created }) => {
        return {
            location_id: id,
            name,
            location_type: type,
            dimension,
            creation_date: created
        }
    });
    return dataParsed;
}
/**
 * @description funcion que obtiene las locaciones mapeadas
 * @returns Array de locaciones mapeadas
 */
const getMapedLocations = async () => {
    const locations = await getAllLocations();
    const locationsParsed = mapLocations(locations);
    return locationsParsed;
}

const mapCharacters = (characters) => {
    const charactersParsed = characters.map(({ id, name, status, species, gender, location }) => {
        const [firstname, lastname] = name.split(" ");
        return {
            character_id: id,
            firstname,
            lastname: lastname || "",
            status_character: status,
            character_species: species,
            character_gender: gender,
            name_location: location.name,
        }
    })
    return charactersParsed;
}
/**
 * @description funcion que obtiene los personajes con id primo mapeados
 * @returns Array de personajes con id primo
 */
const getMapedCharacters = async () => {
    const characters = await getAllCharacters();
    const charactersWithPrimeNumbers = getCharactersWithPrimeNumbers(characters);
    charactersWithPrimeNumbers.unshift(characters[0]) // Agregamos el primer personaje que es Rick
    const charactersParsed = mapCharacters(charactersWithPrimeNumbers);
    return charactersParsed;
}

export {
    getMapedCharacters,
    getMapedLocations,
    joinCharactersWithLocations
}