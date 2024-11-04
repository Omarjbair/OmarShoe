"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface buttonProps {
    type: string,
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}
const SubmitButton = ({type,variant}: buttonProps) => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending?(
                <Button disabled variant={variant}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> 
                    Please Wait
                </Button>
            ):(
                <Button variant={variant} type="submit">{type}</Button>
            )
            }
        </>
    );
};

export default SubmitButton;
