import { app } from "./server.js";

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, () => console.log(`Server is live at ${SERVER_PORT}`));
