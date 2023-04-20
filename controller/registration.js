const buyer = require("../models/buyer");
const seller = require("../models/seller");
const approval_docs = require("../models/approval_docs");
const password = require("../models/password");
const category = require("../models/category");

module.exports = {
  register: async (req, res) => {
    try {
      // console.log(req.body)
      switch (req.body.user_type) {
        case "buyer":
          console.log("Buyer");
          const buyerUser = await buyer.findOne({
            vat_number: req.body.vat_number,
            cr_number: req.body.cr_number,
          });
          if (buyerUser) {
            res.status(200).json({
              code: 100,
              message: "Company already registered",
            });
          } else {
            const count = await buyer.count({
              code: { $regex: "^B", $options: "i" },
            });
            const code =
              "B0000".substring(0, 5 - String(count + 1).length) + (count + 1);
            const category_group = await Promise.all(
              req.body.category.map(async (cat) => {
                const cate = await category.findOne({ category_name: cat });
                return cate.category_code;
              })
            );
            const newBuyer = new buyer({
              code: code,
              company_name: req.body.company_name,
              address_line_1: req.body.address_line_1,
              address_line_2: req.body.address_line_2,
              city: req.body.city,
              country: req.body.country,
              zip_code: req.body.zip_code,
              category: category_group,
              vat_number: req.body.vat_number,
              cr_number: req.body.cr_number,
              contact_first_name: req.body.contact_first_name,
              contact_last_name: req.body.contact_last_name,
              primary_mobile_number: req.body.primary_mobile_number,
              secondary_mobile_number: req.body.secondary_mobile_number,
              business_email: req.body.business_email,
              alternative_email: req.body.alternative_email,
              password: req.body.password,
            });
            newBuyer.save()
            console.log(newBuyer);
            res.status(200).json({message:"Buyer created"})
          }
          break;
        case "seller":
          console.log("Seller");
          const sellerUser = await seller.findOne({
            vat_number: req.body.vat_number,
            cr_number: req.body.cr_number,
          });
          if (sellerUser) {
            res.status(200).json({
              code: 100,
              message: "Company already registered",
            });
          } else {
            const count = await seller.count({
              code: { $regex: "^S", $options: "i" },
            });
            const code =
              "S0000".substring(0, 5 - String(count + 1).length) + (count + 1);
            const category_group = await Promise.all(
              req.body.category.map(async (cat) => {
                const cate = await category.findOne({ category_name: cat });
                return cate.category_code;
              })
            );
            const newSeller = new seller({
              code: code,
              company_name: req.body.company_name,
              address_line_1: req.body.address_line_1,
              address_line_2: req.body.address_line_2,
              city: req.body.city,
              country: req.body.country,
              zip_code: req.body.zip_code,
              category: category_group,
              vat_number: req.body.vat_number,
              cr_number: req.body.cr_number,
              contact_first_name: req.body.contact_first_name,
              contact_last_name: req.body.contact_last_name,
              primary_mobile_number: req.body.primary_mobile_number,
              secondary_mobile_number: req.body.secondary_mobile_number,
              business_email: req.body.business_email,
              alternative_email: req.body.alternative_email,
              password: req.body.password,
            });
            console.log(newSeller);
            newSeller.save()
            res.status(200).json({message:"Seller created"})
          }
          break;
        case "both":
          console.log("Both");
          const user = await seller.findOne({
            vat_number: req.body.vat_number,
            cr_number: req.body.cr_number,
          });
          if (user) {
            res.status(200).json({
              code: 100,
              message: "Company already registered",
            });
          } else {
            const count = await seller.count({
              code: { $regex: "^A", $options: "i" },
            });
            console.log(count)
            const code =
              "A0000".substring(0, 5 - String(count + 1).length) + (count + 1);
            const category_group = await Promise.all(
              req.body.category.map(async (cat) => {
                const cate = await category.findOne({ category_name: cat });
                return cate.category_code;
              })
            );
            const newBuyer = new buyer({
              code: code,
              company_name: req.body.company_name,
              address_line_1: req.body.address_line_1,
              address_line_2: req.body.address_line_2,
              city: req.body.city,
              country: req.body.country,
              zip_code: req.body.zip_code,
              category: category_group,
              vat_number: req.body.vat_number,
              cr_number: req.body.cr_number,
              contact_first_name: req.body.contact_first_name,
              contact_last_name: req.body.contact_last_name,
              primary_mobile_number: req.body.primary_mobile_number,
              secondary_mobile_number: req.body.secondary_mobile_number,
              business_email: req.body.business_email,
              alternative_email: req.body.alternative_email,
              password: req.body.password,
            });
            console.log(newBuyer);
            newBuyer.save()
            const newSeller = new seller({
              code: code,
              company_name: req.body.company_name,
              address_line_1: req.body.address_line_1,
              address_line_2: req.body.address_line_2,
              city: req.body.city,
              country: req.body.country,
              zip_code: req.body.zip_code,
              category: category_group,
              vat_number: req.body.vat_number,
              cr_number: req.body.cr_number,
              contact_first_name: req.body.contact_first_name,
              contact_last_name: req.body.contact_last_name,
              primary_mobile_number: req.body.primary_mobile_number,
              secondary_mobile_number: req.body.secondary_mobile_number,
              business_email: req.body.business_email,
              alternative_email: req.body.alternative_email,
              password: req.body.password,
            });
            console.log(newSeller);
            newSeller.save()
            res.status(200).json({message:"User created"})
          }
          break;
        default:
          res.status(200).json({message:"Send correct User Type"})
      }
    //   res.status(200).json({ message: "Working" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
};
