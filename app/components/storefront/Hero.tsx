import prisma from "@/app/lib/db";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Section } from "lucide-react";
import Image from "next/image";

async function getData(){
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });

    return data;
}

const Hero = async () => {
    const data = await getData(); 

    return (
        <section className="mt-6">
            <Carousel>
                <CarouselContent>
                    {
                        data.map((item) => (
                            <CarouselItem key={item.id}>
                                <div className="relative h-[60vh] lg:h-[80vh] rounded-xl overflow-hidden">
                                    <Image className="object-cover" src={item.imageString} alt={"banner image"} fill/>
                                    <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-4 md:p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                                        <h1 className="text-xl lg:text-4xl font-bold">{item.title}</h1>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="ml-16"/>
                <CarouselNext className="mr-16"/>
            </Carousel>
        </section>
    );
};

export default Hero;
