import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashbord() {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <DashbordCard title="f" subtitle="d" body="2" />


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