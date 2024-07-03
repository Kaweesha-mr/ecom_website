import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";


async function getSalesData() {

    const data = await db.order.aggregate({
        //this will give count of all order and and sum of those orders and return them to show in the card

        _sum: { pricePaidInCents: true },
        _count: true
    })

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}


async function getProductData(){
    const [activeCount,inactiveCount] = await Promise.all([
        db.product.count({where: {isAvailableForPurchase:true}}),
        db.product.count({where: {isAvailableForPurchase:false}})
    ])

    //delay this function for 2s
    await new Promise((resolve)=>setTimeout(resolve,2000))


    return {activeCount,inactiveCount}
}
async function getUserData() {

    //todo:this is not a good method calling each time await so for that use below method
    // const userCount = await db.user.count
    // const orderData = await db.order.aggregate({
    //     _sum: {pricePaidInCents:true}
    // })

    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true }
        }),
    ])


    return {
        userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
}


export default async function AdminDashbord() {

    // const salesData = await getSalesData();
    // const userData = await getUserData();

    const [salesData, userData,productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData()
    ])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <DashbordCard
                title="Sales"
                subtitle={`${formatNumber(salesData.numberOfSales)} sales`}
                body={formatCurrency(salesData.amount)}
            />

            <DashbordCard
                title="Customers"
                subtitle={`${formatCurrency(
                    userData.averageValuePerUser
                )} Average Value`}
                body={formatNumber(userData.userCount)}
            />
            <DashbordCard 
            title="Products"
            subtitle={`${formatNumber(productData.activeCount)} Active`}
            body={`${formatNumber(productData.inactiveCount)} Inactive`}
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