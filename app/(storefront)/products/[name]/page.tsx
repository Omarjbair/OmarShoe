import ProductCard from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Database, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(productCategory : string){
    switch (productCategory) {
        case "all": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "published",
                },
            });
            
            return {
                title: "All Products",
                data: data,
            };    
        }

        case "men": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "men",
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: "Products for Men",
                data: data,
            };
        }

        case "women": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "women",
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });
    
            return {
                title: "Products to Women",
                data: data,
            };
        }

        case "kids": {
            const data = await prisma.product.findMany({
                where: {
                    status: "published",
                    category: "kids",
                },
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
            });

            return {
                title: "Products for Kids",
                data: data,
            };
            }
        default: {
            return notFound();
        }
    }
}

const CategoriesPage = async ({params:{name}} : {params:{name : string}}) => {
    const {title, data} = await getData(name);
    
    if (!data.length) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <ShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <h2 className="mt-6 text-xl font-semibold">We dont have any products in this category</h2>
                <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
                    We currently dont have any products in this category.
                </p>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        );
    }

    const productList = data.map((item) => (
        <ProductCard key={item.id} item={item}/>
    ));

    return (
        <>
            <h1 className="font-semibold text-3xl my-5">{title}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {productList}
            </div>
        </>
    );
};

export default CategoriesPage;
