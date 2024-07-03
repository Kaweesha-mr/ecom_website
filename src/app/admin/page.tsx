import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";


async function getSalesData(){

    const data = await db.order.aggregate({
        //this will give count of all order and and sum of those orders and return them to show in the card

        _sum: {pricePaidInCents:true},
        _count:true
    })

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

async function getUserData(){

    //todo:this is not a good method calling each time await so for that use below method
    // const userCount = await db.user.count
    // const orderData = await db.order.aggregate({
    //     _sum: {pricePaidInCents:true}
    // })
    

    const [userCount,orderData] = await prom



    return 
}

export default async function AdminDashbord() {

    const salesData = await getSalesData();


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <DashbordCard 
                title="Sales" 
                subtitle={`${formatNumber(salesData.numberOfSales)} sales`} 
                body ={formatCurrency(salesData.amount)} 
            />

            <DashbordCard 
                title="Sales" 
                subtitle={`${formatCurrency(salesData.numberOfSales)} Average Value`} 
                body ={formatNumber(salesData.amount)} 
            />


        </div>
    )
}


type DashbordCardProps = {
    title: string
    subtitle: string
    body: string
}


function DashbordCard({ title, subtitle, body }: DashbordCardProps) {

    return <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{body}</p>
                </CardContent>
            </Card>


}