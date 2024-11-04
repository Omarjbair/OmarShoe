import { LoadingProductCard } from '@/app/components/storefront/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const LoadingFile = () => {
    return (
        <div>
            <Skeleton className='h-10 w-56 my-5 '/>
            <div className='grid md:gird-cols-2 lg:grid-cols-3 gap-5'>
                <LoadingProductCard/>
                <LoadingProductCard/>
                <LoadingProductCard/>
                <LoadingProductCard/>
                <LoadingProductCard/>
                <LoadingProductCard/>
            </div>
        </div>
    );
};

export default LoadingFile;