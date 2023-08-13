import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    price: existingPrice,
    images,
}){

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    // for database axios
    async function saveProduct(ev){
        ev.preventDefault();
        // if there is an id for the product
        const data = {title, description, price};
        if(_id){
            //update

            await axios.put('/api/products', {...data,_id});

        }else{
            //create
      
            await axios.post('/api/products', data);
          
        }
        setGoToProducts(true);
        
    }
        if(goToProducts){
            router.push('/products');
        }
    return (

            <form onSubmit={saveProduct}>
                
                <label>Product name</label>
                <input 
                type="text" 
                placeholder="product name"
                value ={title}
                onChange = {ev => setTitle(ev.target.value)}/>

            <label>
                Photos 
            </label>
            <div>
                   {!images?.length && (
                    <div>
                        No Photos in this product
                    </div>
                )}
            </div>


                <label>Description</label>
                <textarea 
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                />        


                <label>Price</label>
                <input 
                type="number" 
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
                />

                <button type="Submit"
                    className="btn-primary">Save
                </button>
            </form>
       
    )
}