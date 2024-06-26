import Layout from "@/pages/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  //functions
  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Are you sure you want to delete product &nbsp;&quot;{productInfo?.title}
        &quot;?
      </h1>

      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>

        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
