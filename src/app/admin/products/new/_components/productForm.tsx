"use client"

import { AddProduct } from "@/app/admin/_actions/Products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/formatter"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function AddProductForm() {

    const[error,action] = useFormState(AddProduct,{})

    const [priceinCents, setPriceInCents] = useState<number>(0)
    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name" >Name</Label>
                <Input type="text" name="name" id="name" required />

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
                <Input name="description" id="description" required />
                {error.description && <div className="text-red-500">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file" >File</Label>
                <Input type="file" name="file" id="file" required />
                {error.file && <div className="text-red-500">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image" >Image</Label>
                <Input type="file" name="image" id="image" required />
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