import { deleteProduct } from '@/app/actions';
import SubmitButton from '@/app/components/dashboard/SubmitButton';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react'

const DeletePage = ({params}: {params: {id: string}}) => {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Are you absolutely sure?</CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete this
                        product and remove all data from our servers.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" asChild>
                        <Link href="/dashboard/products">Cancel</Link>
                    </Button>
                    <form action={deleteProduct}>
                        <input value={params.id} type="hidden" name="productId"/>
                        <SubmitButton variant="destructive" type="Delete" />
                    </form>
                </CardFooter>
            </Card>
        </div>        
    );
};

export default DeletePage;
