import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(){
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}

const BannerPage = async () => {
    const data = await getData();

    const bannerList = data.map((item) => {
        return(
            <TableRow key={item.id}>
                <TableCell>
                    <Image className="rounded-lg object-cover w-16 h-16" src={item.imageString} alt={"banner image"} width={64} height={64}/>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size={"icon"} variant={"ghost"}>
                                <MoreHorizontal className="w-4 h-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"}>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link href={`/dashboard/banner/${item.id}/delete`}>Delete</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        );
    });

    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href={"/dashboard/banner/create"}>
                        <PlusCircle className="w-3.5 h-3.5"/>
                        <span>Add Banner</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banners</CardTitle>
                    <CardDescription>Manage your banners</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bannerList}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default BannerPage;
