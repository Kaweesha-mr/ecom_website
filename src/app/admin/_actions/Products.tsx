"use server"

import db from "@/db/db"
import { object, z } from "zod"

const fileSchema = z.instanceof(File,{message:"Please select a file"})
const ImageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image"),{message:"Please select an image file"})

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceinCents: z.coerce.number().min(1),
    file:fileSchema.refine(file=>file.size>0,{message:"file is empty"}),
    image:ImageSchema
})
export async function AddProduct(formData:FormData){

    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))

    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

db.product.create({ data:{
    name: result.data.name,
    description: result.data.description,
    priceInCents: result.data.priceinCents,
    

}})

}