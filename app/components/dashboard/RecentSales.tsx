import prisma from '@/app/lib/db';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function getData(){
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            id: true,
            firstName: true,
            profileImage: true,
            email: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 7,
    });

    return data;
}

const RecentSales = async () => {
    const data = await getData();

    const recentSalesList = data.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
            <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarImage src={item.profileImage} alt={`${item.firstName} image`}/>
                <AvatarFallback>{item.firstName.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
                <p className="text-sm font-medium">{item.firstName}</p>
                <p className="text-sm text-muted-foreground">{item.email}</p>
            </div>
            <p className="ml-auto font-medium">+${new Intl.NumberFormat('en-US').format(item.amount)}</p>
        </div>
    ));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {recentSalesList}
            </CardContent>
        </Card>
    );
};

export default RecentSales;
