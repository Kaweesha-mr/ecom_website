import { Button } from "@/components/ui/button";
import PageHeader from "../_components/pageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { DropdownMenu,DropdownMenuContent ,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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
            <ProductTable />

        </>
    )
}


async function ProductTable() {

    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } }
        },
        orderBy: { name: "asc" }
    })
    return (
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
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailableForPurchase ? (
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2 />
                                </>
                            ) : (
                                <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle className="stroke-destructive" />
                                </>
                            )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>Download </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}