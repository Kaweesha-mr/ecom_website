"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../_actions/Products";


export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: {
    id: string
    isAvailableForPurchase: boolean
}) {

    const [isPending, startTransition] = useTransition()


    return <DropdownMenuItem
        disabled={isPending}
        onClick={() => {

            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailableForPurchase)
                //refresh the page
                window.location.reload()
            })
        }}>


        {isAvailableForPurchase ? "Deactivate" : "Activate"}

    </DropdownMenuItem>


}
export function DeleteDropdownItem({ id, disabled }: {
    id: string
    disabled: boolean
}) {

    const [isPending, startTransition] = useTransition()

    return <DropdownMenuItem 
        className="text-red-500"
        disabled={ disabled ||isPending}
        onClick={() => {

            startTransition(async () => {
                await deleteProduct(id)
     
                //refresh the page
                window.location.reload()
            })
        }}>


        Delete

    </DropdownMenuItem>


}
