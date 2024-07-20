import "dotenv/config.js";

import { app } from "./src/app.js";

app.listen(5454, () => console.log("listening on port 5454"));