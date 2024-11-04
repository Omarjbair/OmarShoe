import Image from "next/image";
import Link from "next/link";

const Category = () => {
    return (
        <section className="py-16">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold tracking-tight">Shop by Category</h2>
                <Link className="text-sm font-semibold text-primary hover:text-primary/80 duration-150" href={"/product/all"}>Browse All Product &rarr;</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                <Link href={"/products/all"} className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
                    <Image className="object-cover object-center" src={"/all.jpeg"} alt={"all product image"} fill/>
                    <div className="bg-gradient-to-b from-transparent to-black opacity-100 group-hover:opacity-55 duration-300 transition-opacity"/>
                    <div className="p-6 flex items-end">
                        <div className="opacity-100 sm:opacity-0 group-hover:opacity-100 duration-200 transition-opacity">
                            <h3 className="text-white font-semibold text-2xl">All Products</h3>
                            <p className="mt-1 text-sm text-white font-medium">Shop Now</p>
                        </div>
                    </div>
                </Link>
                <Link href={"/products/men"} className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                    <Image className="object-cover object-bottom sm:absolute sm:inset-0 sm:w-full sm:h-full" src={"/men.jpeg"} alt={"men product image"} fill/>
                    <div className="bg-gradient-to-b from-transparent to-black opacity-100 group-hover:opacity-55 duration-300 transition-opacity sm:absolute sm:inset-0"/>
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <div className="opacity-100 sm:opacity-0 group-hover:opacity-100 duration-200 transition-opacity">
                            <h3 className="text-white font-semibold text-2xl">Products for Men</h3>
                            <p className="mt-1 text-sm text-white font-medium">Shop Now</p>
                        </div>
                    </div>
                </Link>
                <Link href={"/products/women"} className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
                    <Image className="object-cover object-bottom sm:absolute sm:inset-0 sm:w-full sm:h-full" src={"/women.jpeg"} alt={"women product image"} fill/>
                    <div className="bg-gradient-to-b from-transparent to-black opacity-100 group-hover:opacity-55 duration-300 transition-opacity sm:absolute sm:inset-0"/>
                    <div className="p-6 flex items-end sm:absolute sm:inset-0">
                        <div className="opacity-100 sm:opacity-0 group-hover:opacity-100 duration-200 transition-opacity">
                            <h3 className="text-white font-semibold text-2xl">Products for Women</h3>
                            <p className="mt-1 text-sm text-white font-medium">Shop Now</p>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default Category;
