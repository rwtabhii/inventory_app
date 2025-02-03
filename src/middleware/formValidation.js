import { body,validationResult } from "express-validator";

export const validationRequest = async (req, res, next) => {
    //1. we have to set the rule //
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
        // body("imageUrl").isURL().withMessage("Invalid URL")
        body("imageUrl").custom((value,{req})=>{
            if(!req.file){
                throw new Error("invalid image file")
            }
            return true;
        })
    ];
    // 2. run the rules (optional)
    await Promise.all(rules.map(rule => rule.run(req)));

    //3. if error came after running the rules //
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()) {
        return res.render("addProductForm",{errorMessage: validErrors.array()[0].msg})
    }
    next();

} 