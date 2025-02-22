import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import init from "./routes/initRoute.js";
import list from "./routes/listRoute.js";
import stat from "./routes/statRoute.js";
import bar from "./routes/barChartRoute.js";
import pie from "./routes/pieChartRoute.js";
import fetchAll from "./routes/fetchAllRoute.js";

import cors from "cors";

dotenv.config();
const port =  3000;
const app = express();
connectDB();

app.use(cors());

app.use("/api", init);
app.use("/api", list);
app.use("/api", stat);
app.use("/api", bar);
app.use("/api", pie);

app.use("/api", fetchAll);

app.listen(port, ()=>
{
    console.log("Server started on port http://localhost:"+port);
});