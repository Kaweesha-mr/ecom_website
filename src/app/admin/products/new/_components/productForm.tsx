"use client"

import { AddProduct } from "@/app/admin/_actions/Products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/formatter"
import { useState } from "react"

export default function AddProductForm() {

    const [priceinCents, setPriceInCents] = useState <number> (0)
    return (
        <form action={AddProduct} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name" >Name</Label>
                <Input type="text" name="name" id="name" required />
            </div>
            <div className="space-y-2">

                <Label htmlFor="name" >Price in cents</Label>

                <Input
                    type="number"
                    name="name"
                    id="name"
                    required
                    value={priceinCents}
                    onChange={e => setPriceInCents(Number(e.target.value) || 0)}
                />

                {/* this will live format the cents to dollors */}
                <div className="text-muted-foreground">
                    {formatCurrency((priceinCents || 0) / 100)}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" >Description</Label>
                <Input name="description" id="description" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name" >File</Label>
                <Input type="file" name="file" id="file" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image" >Image</Label>
                <Input type="file" name="image" id="image" required />
            </div>

            
            <Button type="submit">Save</Button>
        </form>

    )
}