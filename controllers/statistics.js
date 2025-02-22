import Transaction from "../models/dbModel.js";

const statistics = async(req,res)=>
{
    try
    {
        const {month} = req.query;
        if(!month)
        {
            return res.status(400).json({error: "Month is required!"});
        }
        const updatedMonth = Number(month);

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
            }
        ]);

        const totalSaleAmt = result.reduce((arr, x)=> x.sold ? arr+x.price : arr, 0);
        const totalItemSold = result.filter((x)=>(x.sold)).length;
        const totalItemNotSold = result.length - totalItemSold;

        res.status(200).json({
            Total_Sale_Amount: totalSaleAmt,
            Total_Items_Sold: totalItemSold,
            Total_Items_Not_Sold: totalItemNotSold,
            result
        });

    }
    catch(err)
    {
        res.status(err).json({error: err.message});
    }
}

export default statistics;