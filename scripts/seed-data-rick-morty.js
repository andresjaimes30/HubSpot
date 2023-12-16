import { createNewCompanyAndContact } from "../lib/hubspot.js";
import { getMapedLocations, getMapedCharacters, joinCharactersWithLocations } from "../lib/api-rick.js";

async function main() {
    try {
        const contacts = await getMapedCharacters();
        const companies = await getMapedLocations();
        const dataJoined = joinCharactersWithLocations(contacts, companies);
        let count = 0;
        for await (const data of dataJoined) {
            const {
                location,
                firstname,
                lastname,
                character_id,
                status_character,
                character_gender,
                character_species
            } = data;
            const contact = {
                character_id,
                firstname,
                lastname,
                status_character,
                character_gender,
                character_species
            }
            await createNewCompanyAndContact(location, contact);
            count++;
            console.log("count", count);
        }
        console.log("Todo salio bien")
    } catch (error) {
        console.error("Algo salio mal")
        console.log(error);
    }

}

main();

// async function main2() {
//     try {
//         const contact = {
//             character_id: 200,
//             firstname: "lolo",
//             lastname: "perez",
//             status_character: "Dead",
//             character_gender: "Male",
//             character_species: "Humanoid"
//         }
//         const company = {
//             location_id: 20,
//             name: 'Earth (Replacement Dimension)',
//             location_type: 'Planet',
//             dimension: 'Replacement Dimension',
//             creation_date: '2017-11-18T19:33:01.173Z'
//         }
//         await createNewCompanyAndContact(company, contact)
//     } catch (error) {
//         console.log("Error:", error)
//     }
// }
// main2();