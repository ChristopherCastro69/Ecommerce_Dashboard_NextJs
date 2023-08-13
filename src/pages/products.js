import Link from "next/link";
import Layout from "./components/Layout";

export default function Products(){
    return(
        <Layout> 
            <Link className="bg-blue-800 py-1 px-2 rounded-md" href={'/products/new'}>
                Add new products
            </Link>    

        </Layout>
    )
}