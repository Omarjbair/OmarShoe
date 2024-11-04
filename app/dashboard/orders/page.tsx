import prisma from "@/app/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function getData(){
    const data = await prisma.order.findMany({
        orderBy:{
            createdAt: "desc",
        },
        select: {
            amount: true,
            id: true,
            status: true,
            createdAt: true,
            firstName: true,
            email: true,
            profileImage: true,
        }
    });

    return data;
}

const OrdersPage = async () => {
    const data = await getData();

    const orderList = data.map((item) => (
        <TableRow key={item.id}>
            <TableCell>
                <p className="font-medium">{item?.firstName}</p>
                <p className="hidden md:flex text-sm text-muted-foreground">{item?.email}</p>
            </TableCell>
            <TableCell>Order</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{new Intl.DateTimeFormat("en-US").format(item?.createdAt)}</TableCell>
            <TableCell className="text-right">${new Intl.NumberFormat("en-US").format(item?.amount)}</TableCell>
        </TableRow>
    ));
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Statues</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderList}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default OrdersPage;
