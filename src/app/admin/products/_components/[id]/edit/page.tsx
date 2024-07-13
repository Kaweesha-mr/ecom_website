import PageHeader from "@/app/admin/_components/pageHeader";
import db from "@/db/db";
import AddProductForm from "../../../new/_components/productForm";

export default function EditProductForm({
    params: {id},
}:{
    params: {id:string}
})
{

    const product = await db.product.findUnique({where:{id}})


    return (
        <>
        <PageHeader>Edit Product</PageHeader>
        <AddProductForm product={product}/>
        
        </>
    )
}