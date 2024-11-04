import { checkOut, deleteItem } from "@/app/actions";
import CheckOutButton from "@/app/components/storefront/CheckOutButton";
import DeleteBagItemButton from "@/app/components/storefront/DeleteBagItemButton";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const BagPage = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect('/');
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    let totalPrice: number = cart?.items.reduce((sum,cur) => sum + (cur.price * cur.quantity),0) || 0;

    const cartList = cart?.items.map((item) => (
        <div className="flex " key={item.id}>
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image className="object-cover object-center rounded-md" src={item.imageString} alt={"Product Image"} fill/>
            </div>
            <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between items-end">
                    <div className="flex items-center gap-x-2">
                        <p>{item.quantity} x</p>
                        <p>${item.price}</p>
                    </div>
                    <form action={deleteItem}>
                        <input type="hidden" name="productId" value={item.id} />
                        <DeleteBagItemButton/>
                    </form>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="max-w-2xl mx-auto mt-10 min-h-[55vh] ">
            {!cart || !cart.items || cart.items.length === 0?
                (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                            <ShoppingBag className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold">You dont have any products in your Bag</h2>
                        <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
                            You currently dont have any products in your shopping bag. Please
                            add some so that you can see them right here.
                        </p>
                        <Button asChild>
                            <Link href="/">Shop Now!</Link>
                        </Button>
                    </div>
                ):(
                    <div className="flex flex-col gap-y-10">
                        {cartList}
                        <div className="mt-10">
                            <div className="flex items-center justify-between font-medium bg-muted px-2 py-4 rounded-md">
                                <p className="font-semibold">Subtotal: </p>
                                <p>${new Intl.NumberFormat('en-US').format(totalPrice)}</p>
                            </div>
                            <form action={checkOut}>
                                <CheckOutButton/>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default BagPage;
