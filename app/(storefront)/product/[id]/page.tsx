import { addItem } from "@/app/actions";
import FeaturedProducts from "@/app/components/storefront/FeaturedProducts";
import ImageSlider from "@/app/components/storefront/ImageSlider";
import ShoppingBagButton from "@/app/components/storefront/ShoppingBagButton";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";


async function getData(productId: string){ 
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        select: {
            price: true,
            images: true,
            description: true,
            name: true,
            id: true,
        },
    });

    if(!data){
        return notFound();
    }

    return data;
}

const ProductIdRoute = async ({params: {id}} : {params: {id : string}}) => {
    const data = await getData(id);
    const addProductToShoppingCart = addItem.bind(null,data.id);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ImageSlider images={data.images}/>
                <div className="">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 capitalize">{data.name}</h1>
                    <p className="text-2xl mt-2 w-fit flex items-center rounded-md bg-primary/10 px-2 py-1 font-medium text-primary ring-1 ring-inset ring-primary/10">${data.price}</p>
                    <div className="mt-3 flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                    </div>
                    <p className="text-base text-gray-700 mt-6">{data.description}</p>
                    <form action={addProductToShoppingCart}>
                        <ShoppingBagButton/>
                    </form>
                </div>
            </div>
            <div className="mt-16">
                <FeaturedProducts/>
            </div>
        </>
    );
};

export default ProductIdRoute;