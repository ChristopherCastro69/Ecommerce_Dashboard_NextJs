
import { mongooseConnect } from "@/lib/mongoose";
import {Product} from "@/pages/api/models/Product";

//Main product from Mongo DB
export default async function handle(req, res){    
    // res.json(req.method);
    const {method} = req;
    await mongooseConnect();

    //Read
    if(method === 'GET'){
        // if naay id
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}));
        } else{
            res.json(await Product.find());
        }
     
    }

    //Create
    if(method === 'POST'){
        const {title, description, price, images} = req.body;

        const productDoc = await Product.create({
            title, description, price, images,
        })
        res.json(productDoc);
    }

    //Update
    if(method === 'PUT'){
        const {title, description, price, images, _id} = req.body;
       
        await Product.updateOne({_id}, {title, description, price, images});
        res.json(true);
    }   

    //Delete
    if(method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}