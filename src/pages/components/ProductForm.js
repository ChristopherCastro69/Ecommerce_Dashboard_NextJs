import {useEffect, useState} from "react";

import axios from "axios";
import {useRouter} from "next/router";
import Spinner from "./Spinner";
import {ReactSortable} from "react-sortablejs";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: existingCategory,
    properties: assignedProperties
}) {

    const [title,
        setTitle] = useState(existingTitle || '');
    const [images,
        setImages] = useState(existingImages || []);
    const [description,
        setDescription] = useState(existingDescription || '');
    const [price,
        setPrice] = useState(existingPrice || '');
    const [goToProducts,
        setGoToProducts] = useState(false);
    const [isUploading,
        setIsUploading] = useState(false);
    const [categories,
        setCategories] = useState([]);
    const [category,
        setCategory] = useState(existingCategory || '');
    const [productProperties,
        setProductProperties] = useState(assignedProperties || {});
    const router = useRouter();

    useEffect(() => {
        axios
            .get(`/api/categories`)
            .then(result => {
                setCategories(result.data);
            })
    }, []);
    // for database axios
    async function saveProduct(ev) {
        ev.preventDefault();
        // if there is an id for the product
        const data = {
            title,
            description,
            price,
            images,
            category,
            properties: productProperties
        };
         console.log("Data being sent:", data); // Add this line
         try {
            if (_id) {
                await axios.put('/api/products', {
                    ...data,
                    _id
                });
            } else {
                await axios.post('/api/products', data);
            }
            setGoToProducts(true);
        } catch (error) {
            console.error("Error saving product:", error);
        }

    }
    if (goToProducts) {
        router.push('/products');
    }

    async function uploadImages(ev) {
        const files = ev.target
            ?.files;
        if (files
            ?.length > 0) {
            setIsUploading(true);
            const data = new FormData();

            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [
                    ...oldImages,
                    ...res.data.links
                ];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = {
                ...prev
            };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo
            ?.parent
                ?.id) {
            const parentCat = categories.find(({_id}) => _id === catInfo
                ?.parent
                    ?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    return (

        <form onSubmit={saveProduct}>

            <label>Product name</label>
            <input
                type="text"
                placeholder="product name"
                value
                ={title}
                onChange=
                {ev => setTitle(ev.target.value)}/>

            <label >Category</label>

            <select value={category} onChange={ev => setCategory(ev.target.value)}>

                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>
                        {c.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div key={p.name} className="">
                    <label>{p
                            .name[0]
                            .toUpperCase() + p
                            .name
                            .substring(1)}</label>
                    <div>
                        <select
                            value={productProperties[p.name]}
                            onChange={ev => setProductProp(p.name, ev.target.value)}>
                            {p
                                .values
                                .map(v => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                        </select>
                    </div>
                </div>
            ))}
            <label>
                Photos
            </label>

            <div className="mb-2 flex flex-wrap gap-1">

                {/* Convert to boolean false */}

                <ReactSortable
                    list={images}
                    className="flex flex-wrap gap-1"
                    setList={updateImagesOrder}>
                    {!!images
                        ?.length && images.map(link => (
                            <div key={link} className=" h-24">
                                <img src={link} alt="" className="rounded-lg"/>
                            </div>
                        ))}
                </ReactSortable>

                {isUploading && (
                    <div className="h-24 p-1 flex items-center">
                        <Spinner/>
                    </div>
                )}
                <label
                    className="w-24 h-24 cursor-pointer border text-center flex flex-col items-center
                                   justify-center text-sm gap-1 rounded-lg text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                    </svg>
                    Upload
                    <input type="file" onChange={uploadImages} className="hidden"/>
                </label>

            </div>

            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}/>

            <label>Price</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}/>

            <button type="Submit" className="btn-primary">Save
            </button>
        </form>

    )
}