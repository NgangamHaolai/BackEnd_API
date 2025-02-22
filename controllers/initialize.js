import axios from "axios";
import Transaction from "../models/dbModel.js";

const initialize = async(req, res)=>
{
    try
    {
        const result = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        // console.log(result.data);
        await Transaction.deleteMany();
        await Transaction.insertMany(result.data);    
        res.status(201).json({message: "Database successfully Initiated!"});
    }
    catch(err)
    {
        res.status(500).json({err: "Error!"});
    }
}

export default initialize;