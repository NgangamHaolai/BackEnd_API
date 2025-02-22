import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/fetch-all", async(req, res)=>
{
    try
    {
        const { month } = req.query;

        if (!month) 
        {
            return res.status(400).json({ error: "Month is required" });
        }

        const API_stat = `http://localhost:3000/api/stat?month=${month}`;
        const API_pie = `http://localhost:3000/api/pie?month=${month}`;
        const API_bar = `http://localhost:3000/api/bar?month=${month}`;

        const [stat, pie, bar] = await Promise.all
        ([
            axios.get(API_stat),
            axios.get(API_pie),
            axios.get(API_bar),
        ]);
            
        const allData = 
        { 
            Statistics: stat.data, 
            Pie_Chart: pie.data, 
            Bar_Chart: bar.data 
        };

        res.json(allData);
    }
    catch(err)
    {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: "Error in retrieving data from one or more sources" });
    }
});

export default router;