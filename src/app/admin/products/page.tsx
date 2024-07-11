import { Button } from "@/components/ui/button";
import PageHeader from "../_components/pageHeader";
import Link from "next/link";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
            <ProductTable/>

        </>
    )
}


 function ProductTable(){
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    {/* w-0 will not make the width 0 it lets that get only lesser amount of width for that are */}
                    <TableHead className="w-0">

                        <span className="sr-only">Available for purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                
            </TableBody>
        </Table>
    )
 }