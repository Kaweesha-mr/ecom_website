"use server"
import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"

//!this is used for databse calling

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)
const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required"),
  })

export async function AddProduct(prevState:unknown,formData:FormData){

    
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))


    console.log(result)


    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }




    const data = result.data

    fs.mkdir("products",{recursive:true})
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    
    //this codeline will write the file to the server by createting a file and handling it with the binary data
    await fs.writeFile(filePath,Buffer.from(await data.file.arrayBuffer()))

    fs.mkdir("public/products",{recursive:true})
    const imgPath = `/products/${crypto.randomUUID()}-${data.file.name}`
    
    //this codeline will write the file to the server by createting a file and handling it with the binary data
    await fs.writeFile(`public${imgPath}`,Buffer.from(await data.file.arrayBuffer()))

    await db.product.create({
        data:{
          isAvailableForPurchase:false,
            name:data.name,
            description:data.description,
            priceInCents:data.priceInCents,
            imagePath:imgPath,
            filePath:filePath

        }
    })

    
    redirect("/admin")

}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),

})
export async function UpdateProduct(id:string,prevState:unknown,formData:FormData){

    
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const product = await db.product.findUnique({where:{id}})

    if(product == null) return notFound();


    let filePath = product.filePath
    if(data.file != null && data.file.size > 0){

      await fs.unlink(product.filePath)
      const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
      //this codeline will write the file to the server by createting a file and handling it with the binary data
      await fs.writeFile(filePath,Buffer.from(await data.file.arrayBuffer()))
    }

    let imgPath = product.imagePath
    if(data.image != null && data.image.size > 0){
      await fs.unlink(`public${product.imagePath}`)
      const imgPath = `/products/${crypto.randomUUID()}-${data.file.name}`
      //this codeline will write the file to the server by createting a file and handling it with the binary data
      await fs.writeFile(`public${imgPath}`,Buffer.from(await data.image.arrayBuffer()))
    }


    await db.product.update({
        where:{id},
        data:{
            name:data.name,
            description:data.description,
            priceInCents:data.priceInCents,
            imagePath:imgPath,
            filePath:filePath

        }
    })

    
    redirect("/admin")

}

//product avaibalbility toggle
export async function toggleProductAvailability(
  id:string,
  isAvailableForPurchase:boolean
){
  await db.product.update({where:{id},data:{
    isAvailableForPurchase
  }})
}

export async function deleteProduct(id:string){
  const product = await db.product.delete({where:{id}})

  if(product == null) return notFound();
   await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
}