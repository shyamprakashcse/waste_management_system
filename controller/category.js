const category = require("../models/category")


module.exports = {
    add: async (req,res) => {
        try{
            const cat = await category.findOne({category_name:req.body.category_name})
            if(cat) {
                res.status(200).json({
                    code:100,
                    message: "Category already exists"
                })
            }else{
                const count = await category.count()
                const code = "CA00".substring(0, 4 - String(count + 1).length) + (count + 1);
                const newCategory = new category({
                    category_code: code,
                    category_name: req.body.category_name
                })
                console.log(newCategory)
                newCategory.save()
                res.status(200).json({
                    code: 200,
                    message: "Categry added successfully."
                })
            }
        }catch (err) {
            console.log(err)
            res.status(500).json({error:err})
        }
    }
}