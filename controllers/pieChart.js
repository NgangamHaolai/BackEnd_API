import Transaction from "../models/dbModel.js"

const pieChart = async (req, res)=>
{
    try
    {
        const {month} = req.query;
        const updatedMonth = Number(month);
        if (!month)
        {
            return res.status(400).json({ error: "Month is required" });
        }

        const result = await Transaction.aggregate([
            {
                $addFields:
                {
                    findMonth: {$month: "$dateOfSale"}
                }
            },
            {
                $match: 
                {
                    findMonth: updatedMonth
                }
            },
            {
                $group:
                {
                    _id: "$category",
                    count: {$sum: 1}
                }
            },
            {
                $project:
                {
                    category: "$_id",
                    count: 1,
                    _id: 0,
                }
            }
        ]);
        res.status(200).json(result);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

export default pieChart;