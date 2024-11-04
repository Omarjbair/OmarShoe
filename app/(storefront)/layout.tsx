import { Metadata } from "next";
import Footer from "../components/storefront/Footer";
import Navbar from "../components/storefront/Navbar";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title: "Omar Shoe",
    description: "Generated by create next app",
};


export default function StoreFrontLayout({children,}: Readonly<{children: React.ReactNode}>) {
    return(
        <>  
            <NextTopLoader height={3} color="#2563EB" showSpinner={false}/>
            <Navbar/>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer/>
        </>
    );
}
