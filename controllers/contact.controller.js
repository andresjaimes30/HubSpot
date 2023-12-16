import {
    createNewContact,
    getAllContacts,
    updateContact,
} from '../lib/hubspot.js';

export const handleContactWebhook = async (req, res) => {
    try {
        const { body } = req;
        const allContacts = await getAllContacts(true);
        const contact = allContacts.find(({ character_id }) => Number(character_id) === Number(body.character_id));

        if (contact) {
            await updateContact(contact.id, body, true);
        } else {
            await createNewContact(body, true)
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
