import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import UserDropDown from "./UserDropDown";
import { Button } from "@/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(user){
        var cart: Cart | null = await redis.get(`cart-${user.id}`);
        var total = cart?.items.reduce((sum,item) => sum + item.quantity,0) || 0;
    }
    
    return (
        <header>
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center">
                    <Link href={'/'}>
                        <h1 className="text-black font-bold text-xl lg:text-3xl">Omar<span className="text-primary">Shoe</span></h1>
                    </Link>
                    <div className="hidden md:block">
                        <NavbarLinks/>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {user?(
                        <>
                            <Link className="group p-2 mr-2 flex items-center" href={"/bag"}>
                                <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500 duration-150"/>
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{total || ""}</span>
                            </Link>
                            <UserDropDown email={user.email as string} name={user.given_name as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}/>
                        </>
                    ):(
                        <div className="flex flex-1 items-center justify-end space-x-0 sm:space-x-2">
                            <Button variant={"ghost"} asChild>
                                <LoginLink>Sign in</LoginLink>
                            </Button>
                            <span className="hidden sm:inline h-6 w-px bg-gray-200"></span>
                            <Button variant={"ghost"} asChild>
                                <RegisterLink>Create Account</RegisterLink>
                            </Button>
                        </div>
                    )}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={"outline"} size={"icon"} className='shrink-0 md:hidden'>
                                <MenuIcon className='h-5 w-5'/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={"right"}>
                            <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                                <NavbarLinks/>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default Navbar; 



