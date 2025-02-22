import Transaction from "../models/dbModel.js"

const barChart = async(req, res)=>
{
    try
    {
        const {month} = req.query;
        const updatedMonth = Number(month);

        const ranges = [
            { range: "0-100", min: 0, max: 100 },
            { range: "101-200", min: 101, max: 200 },
            { range: "201-300", min: 201, max:300 },
            { range: "301-400", min: 301, max: 400 },
            { range: "401-500", min: 401, max: 500 },
            { range: "501-600", min: 501, max: 600 },
            { range: "601-700", min: 601, max: 700 },
            { range: "701-800", min: 701, max: 800 },
            { range: "801-900", min: 801, max: 900 },
            { range: "901-above", min: 901, max: Infinity },
        ];

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
                $project:
                {
                    findMonth: 0
                }
            },
            {
                $group:
                {
                    _id: 
                    {
                        $switch:
                        {
                            branches:
                            
                                ranges.map((x)=>
                                ({
                                    case: {$and: [{$gte: ["$price", x.min]}, {$lte: ["$price", x.max]} ]},
                                    then: x.range
                                })),
                            default: "unknown"
                        }
                    },
                    count: {$sum: 1}
                }
            },
            {
                $project:
                {
                    Price_Range: "$_id",
                    No_of_items: "$count",
                    // count: 1,
                    _id: 0
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

export default barChart;