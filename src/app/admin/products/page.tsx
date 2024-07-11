import { Button } from "@/components/ui/button";
import PageHeader from "../_components/pageHeader";
import Link from "next/link";

export default function Products() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>

                {/* as child keyword will make the parent componnet act as child component */}
                <Button asChild>
                    <Link href="/admin/products/new">Add a Product</Link>
                </Button>
            </div>

        </>
    )
}


 function productTable(){
    return(
        
    )
 }