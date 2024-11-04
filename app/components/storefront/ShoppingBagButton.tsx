"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";

const ShoppingBagButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <>
            {pending?
                (
                    <Button disabled className="w-full mt-4" size={"lg"}>
                        <Loader2 className="mr-4 h-5 w-5 animate-spin"/> 
                        Please Wait
                    </Button>
                ):(
                    <Button className="w-full mt-4" size={"lg"}>
                        <ShoppingBag className="mr-4 h-5 w-5" />
                        Add to Cart
                    </Button>
                )
            }
        </>
    );
};

export default ShoppingBagButton;
