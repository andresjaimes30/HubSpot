import express from 'express';
import { PORT } from './config.js';
import { handleContactWebhook } from './controllers/contact.controller.js';
import { handleCompanyWebhook } from './controllers/company.controller.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to my API");
});
// webhooks
app.post("/contact/webhook", handleContactWebhook);
app.post("/company/webhook", handleCompanyWebhook);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});



