import Transaction from "../models/dbModel.js";

const listAllFiles = async (req, res)=>
{
    try
    {
        const { month, search="", page=1, perPage=10 } = req.query;

        if(!month)
        {
            return res.status(400).json({error: "Month is required!"});
        }
        const convertedMonth = Number(month);

        const result = await Transaction.aggregate([
            {
                $addFields:
                {
                    findMonth: {$month: "$dateOfSale"}
                }
            },
            {   //if month is entered then 
                $match: month ?
                {
                    findMonth: convertedMonth
                } : {}  //otherwise return all
            },
            {
                $project:
                {
                    findMonth: 0
                }
            },
            {
                $match: search ? //if search is entered
                {
                    $or:
                    [
                        { title: {$regex: search, $options: "i"} },
                        { description: {$regex: search, $options: "i"} },
                        (!isNaN(search)) ? {price: Number(search)} : {} , //if search is a Number then price: Number(search) otherwise return all
                    ]
                } : {}  //otherwise return all
            },
            {
                $skip: (Number(page - 1) * Number(perPage))
            },
            {
                $limit: (Number(perPage))
            }
        ]);

        res.status(200).json({result});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

export default listAllFiles;