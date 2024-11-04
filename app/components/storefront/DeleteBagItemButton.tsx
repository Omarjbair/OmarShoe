"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteBagItemButton = () => {
    const { pending } = useFormStatus();
    
    return (
        <>
            {pending?
                (
                    <Button disabled className="font-medium" size={"sm"} variant={"destructive"}>
                        Removing ..
                    </Button>
                ):(
                    <Button type={"submit"} className="font-medium" size={"sm"} variant={"destructive"}>
                        Delete
                        <X/>
                    </Button>
                )
            }
        </>
    );
};

export default DeleteBagItemButton;
