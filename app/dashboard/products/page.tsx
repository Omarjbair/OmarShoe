import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(){
    const data = await prisma.product.findMany({
        orderBy:{
            createdAt: "desc",
        },
    });
    
    return data
}

const ProductsPage = async () => {
    const data = await getData();

    const productList = data.map((item) => {
        return (
            <TableRow key={item.id}>
                <TableCell>
                    <Image className="rounded-md object-cover h-16 w-16" src={item.images[0]} alt={"Product Image"} width={64} height={64}/>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{new Intl.DateTimeFormat("en-US").format(item.createdAt)}</TableCell>
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
                                <Link href={`/dashboard/products/${item.id}`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link href={`/dashboard/products/${item.id}/delete`}>Delete</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <>
            <div className="flex justify-end items-center">
                <Button asChild className="flex items-center gap-x-4">
                    <Link href={"/dashboard/products/create"}>
                        <PlusCircle className="w-3.5 h-3.5"/>
                        <span>Add Product</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Mange your products and view their sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>    
                            {productList}                        
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default ProductsPage;
