
import {
    createNewCompany,
    getAllCompanies,
    updateCompany
} from '../lib/hubspot.js';

export const handleCompanyWebhook = async (req, res) => {
    try {
        const { body } = req;
        const companies = await getAllCompanies(true);
        const company = companies.find(({ location_id }) => Number(location_id) === Number(body.location_id));

        if (company) {
            await updateCompany(company.id, body, true);
        } else {
            await createNewCompany(body, true)
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
