"use client"

import { AddProduct, UpdateProduct } from "@/app/admin/_actions/Products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/formatter"
import { Product } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
export default function AddProductForm({product}:{
    product?: Product | null
}) {

    const[error,action] = useFormState(product === null? AddProduct:UpdateProduct.bind(null,product.id),{})

    const [priceinCents, setPriceInCents] = useState<number | undefined >(product?.priceInCents)
    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name" >Name</Label>
                <Input type="text" name="name" id="name" required defaultValue={product?.name} />

                {error.name && <div className="text-red-500">{error.name}</div>}
            </div>
            <div className="space-y-2">

                <Label htmlFor="name" >Price in cents</Label>

                <Input
                    type="number"
                    name="priceInCents"
                    id="priceInCents"
                    required
                    value={priceinCents}
                    onChange={e => setPriceInCents(Number(e.target.value) || 0)}
                />
                {error.priceInCents && <div className="text-red-500">{error.priceInCents}</div>}

                {/* this will live format the cents to dollors */}
                <div className="text-muted-foreground">
                    {formatCurrency((priceinCents || 0) / 100)}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" >Description</Label>
                <Input name="description" id="description" required defaultValue={product?.description} />
                {error.description && <div className="text-red-500">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file" >File</Label>
                <Input type="file" name="file" id="file" required = {product === null} />
                {product != null && <span className="text-muted-foreground">{product.filePath}</span>}
                {error.file && <div className="text-red-500">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image" >Image</Label>
                <Input type="file" name="image" id="image" required = {product === null} />
                {product != null && <Image width={"400"} height={"400"} src={product.imagePath} alt={product.name} />}
                {error.image && <div className="text-red-500">{error.image}</div>}
            </div>

            <SubmitButton/>



        </form>

    )
}


function SubmitButton() {

    const { pending } = useFormStatus()
    return (

        <Button type="submit" disabled={pending}> {pending ? "Saving" : "Save"}</Button>

    )
}