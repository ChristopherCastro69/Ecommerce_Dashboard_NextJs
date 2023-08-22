
import { mongooseConnect } from "@/lib/mongoose";
import {Product} from "@/pages/api/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

//Main product from Mongo DB
export default async function handle(req, res){    
    // res.json(req.method);
    const {method} = req;
    await mongooseConnect();
    // await isAdminRequest(req, res);
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
    if (method === 'POST') {
        const {title,description,price,images,category,properties} = req.body;
        console.log("Received properties:", properties); 
      
        const productDoc = await Product.create({
          title,description,price,images,category,properties,
        })
        console.log("Created product:", productDoc);
        res.json(productDoc);
      }

    //Update
    if(method === 'PUT'){
        const {title, description, price, images,category,properties, _id, } = req.body;
       
        await Product.updateOne({_id}, {title, description, price, images, category, properties});
        res.json(true);

        // In the PUT handler
        const updateResult = await Product.updateOne({ _id }, { title, description, price, images, category, properties });
        console.log("Update result:", updateResult);
    }   

    //Delete
    if(method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}