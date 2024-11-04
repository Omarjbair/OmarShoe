"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
    images: string[];
}

const ImageSlider = ({images} : iAppProps) => {
    const [imageIndex,setImageIndex] = useState<number>(0)
    
    function handlePreviousClick() {
        setImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }
    
    function handleNextClick() {
        setImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }
    
    function handleImageClick(index: number) {
        setImageIndex(index);
    }
    
    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <div className="relative overflow-hidden rounded-lg">
                <div className="relative">
                    <Image className="object-cover object-center w-[600px] h-[500px]" src={images[imageIndex]} alt="Product image" width={600} height={600}/>
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <Button onClick={handlePreviousClick} variant={"ghost"} size={"icon"}>
                            <ChevronLeft className="w-6 h-6 "/>
                        </Button>
                        <Button onClick={handleNextClick} variant={"ghost"} size={"icon"}>
                            <ChevronRight className="w-6 h-6 "/>
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-5">
                    {images.map((image,index) => (
                        <div key={image} className={cn(index === imageIndex?"border-2 border-primary":"border border-gray-200","relative overflow-hidden rounded-lg cursor-pointer")}>
                            <Image onClick={() => handleImageClick(index)} className="object-cover object-center" src={image} alt={"Product Image"} width={100} height={100}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
