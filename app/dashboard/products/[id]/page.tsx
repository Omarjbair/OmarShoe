import EditForm from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productId : string){
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        }
    })

    if(!data)
        return notFound();

    return data;
}

const EditProductPage = async ({params} : {params: {id : string}}) => {
    console.log(params.id)
    const data = await getData(params.id);
    
    return (
        <EditForm data={data}/>
    );
};

export default EditProductPage;