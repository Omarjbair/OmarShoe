import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentSales from "../components/dashboard/RecentSales";
import Chart from "../components/dashboard/Chart";
import prisma from "../lib/db";

async function getData(){
    // if i want to get data in last 7 days,
    // const now  = new Date();
    // const sevenDaysAgo = new Date();
    // sevenDaysAgo.setDate(now.getDate() - 7);

    const data = await prisma.order.findMany({
        //where: {
        //  createdAt: {
        //      gte: sevenDaysAgo,
        //  }
        //},
        select:{
            amount: true,
            createdAt: true,
        },
        orderBy:{
            createdAt: "asc",
        }
    });
    
    const result = data.map((item) => ({
        date : new Intl.DateTimeFormat("en-US").format(item.createdAt),
        revenue: item.amount,
    }));

    return result;
}

const DashBoard = async () => {
    const data = await getData();

    return (
        <>
            <DashboardStats/>
            <section className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Recent Transactions from the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Chart data={data}/>
                    </CardContent>
                </Card>
                <RecentSales/>
            </section>
        </>
    );
};

export default DashBoard;
