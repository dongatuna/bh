const Joi = require('joi');

module.exports = {   

    validateBody: (schema)=>{
        return(req, res, next)=>{
            const result = Joi.validate(req.body.data, schema);

            if(result.error){
                return res.status(400).json({
                    error: result.error,
                    message: "This is due to Joi validation schema being in conflict with schema defined for user submitted data"
                });
            }
            //if the req.value is null, set it to an empty object
            if(!req.value){req.value = {};}

            req.value["body"] = result.value;
            console.log("I am about to hit the next function....")
            //console.log(req.value['body']);
            next();
        }
    },

    schemas:{
        userSchema: Joi.object().keys({
            role: {
                type: Joi.string().required(),
                updated: Joi.boolean().required()
            },
            name: Joi.string().allow("").optional(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string(),
            
        }),

        roleSchema: Joi.object().keys({
            role: Joi.string().required()            
        }),

        CVSchema: Joi.object().keys({
            userId: Joi.string().alphanum().required(),
            license:  Joi.string().required(),
            description: Joi.string().optional(),            
            certifications:  Joi.array().items(Joi.string()),
            date:  Joi.string().isoDate(),
            //CVdocs:  Joi.string().optional()

        }),

        postSchema: Joi.object().keys({
            userId: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            license: Joi.array().items(Joi.string()).required() ,
            certifications:  Joi.array().items(Joi.string()),
            postImage:  Joi.string(),
            date:  Joi.string().isoDate()           
        }),

        eventSchema: Joi.object().keys({
            userId: Joi.string().required(),
            audience: Joi.string().required(), 
            cost: Joi.number().required(),
            date: Joi.date().required(),          
            description: Joi.string().required(),
            location: Joi.string().required(),
            topic: Joi.string().required(),
            time: Joi.string().required(),
            //time: Joi.date().timestamp(),
            eventfiles:  Joi.array().items(Joi.string()),
        }),

        questionSchema: Joi.object().keys({          
            answer: Joi.number().required(),
            choices: Joi.array().items(Joi.string()).required(),
            question:  Joi.string().required(),
            rationale:  Joi.string().required()
                   
        }),
    

    }
}