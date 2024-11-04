"use client"

import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useFormStatus } from "react-dom";

const CheckOutButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <>
            {pending?
                (
                    <Button disabled className="w-full mt-5" size={"lg"}>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                        Please Wait ...
                    </Button>
                ):(
                    <Button type={"submit"} className="w-full mt-5" size={"lg"}>
                        CheckOut
                    </Button>
                )
            }
        </>
    );
};

export default CheckOutButton;
