import { TOKEN, TOKEN_MIRROR } from '../config.js';
import hubSpot from '@hubspot/api-client';
const getClient = (isMirror = false) => {
    const token = isMirror ? TOKEN_MIRROR : TOKEN;
    const hubspotClient = new hubSpot.Client({ accessToken: token });
    return hubspotClient;
}
export const createNewContact = async (contact, isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties: {
            ...contact
        }
    })
    return createContactResponse;
}
export const createNewCompany = async (company, isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const createCompanyResponse = await hubspotClient.crm.companies.basicApi.create({
        properties: {
            ...company
        }
    })
    return createCompanyResponse;
}
export const createNewCompanyAndContact = async (company, contact, isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const createCompanyResponse = await createNewCompany(company, isMirror);
    const companyId = createCompanyResponse.id;
    const createContactResponse = await createNewContact(contact, isMirror);
    const contactId = createContactResponse.id;
    await hubspotClient.crm.associations.v4.basicApi.create(
        'companies',
        companyId,
        'contacts',
        contactId,
        [
            {
                "associationCategory": "HUBSPOT_DEFINED",
                "associationTypeId": hubSpot.AssociationTypes.companyToContact
                // AssociationTypes contains the most popular HubSpot defined association types
            }
        ]
    )
}
export const updateCompany = async (id, properties, isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const response = await hubspotClient.crm.companies.batchApi.update({
        inputs: [
            {
                id,
                properties
            }
        ]
    })
    return response;
}
export const getAllContacts = async (isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const response = await hubspotClient.crm.contacts.basicApi.getPage(undefined, undefined, ["character_id", "lastname,firstname"]);
    const contacts = response.results;
    const contactsMap = contacts.map(({ properties: { lastname, firstname, character_id }, id }) => {
        return {
            id,
            lastname,
            firstname,
            character_id
        }
    })
    return contactsMap;
}
export const getAllCompanies = async (isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const response = await hubspotClient.crm.companies.basicApi.getPage(undefined, undefined, ["name", "location_id", "company_id"]);
    const companies = response.results;
    const companiesMap = companies.map(({ properties: { location_id, name }, id }) => {
        return {
            id,
            name,
            location_id
        }
    })
    return companiesMap;
}
export const updateContact = async (id, properties, isMirror = false) => {
    const hubspotClient = getClient(isMirror);
    const response = await hubspotClient.crm.contacts.batchApi.update({
        inputs: [
            {
                id,
                properties
            }
        ]
    })
    return response;
}

