"use client"

import { createBanner } from "@/app/actions";
import SubmitButton from "@/app/components/dashboard/SubmitButton";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

const CreateBannerPage = () => {
    const [image,setImage] = useState<string | undefined>(undefined);
    const [lastResult,action] = useFormState(createBanner,undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema });
        },
            shouldValidate: "onBlur",
            shouldRevalidate: "onInput",
        });

    return (
        <form id={form.id} action={action} onSubmit={form.onSubmit}>
            <div className="flex items-center gap-4">
                <Button asChild variant={"outline"} size={"icon"}>
                    <Link href={'/dashboard/banner'}>
                        <ChevronLeft className="w-4 h-4"/>
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>Create your banner right here</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>title</Label>
                            <Input type={"text"} key={fields.title.key} name={fields.title.name} defaultValue={fields.title.initialValue} className="w-full" placeholder={"Create Title for your banner"}/>
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input type="hidden" key={fields.imageString.key} value={image} name={fields.imageString.name} defaultValue={fields.imageString.initialValue as any}/>
                            {image?
                            (
                                <div className="flex gap-5">
                                    <div className="relative w-[200px] h-[200px]">
                                        <Image height={100} width={100} src={image} alt="Product Image" className="w-full h-full object-cover rounded-lg border"/>
                                        <button onClick={() => setImage(undefined)} type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                                            <XIcon className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ):(
                                <UploadDropzone endpoint={"bannerUploader"} 
                                onClientUploadComplete={(res) => {setImage(res[0].url)}}/>
                            )}
                            <p className="text-red-500">{fields.imageString.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton type={"Create Banner"} variant={"default"}/>
                </CardFooter>
            </Card>
        </form>
    );
};

export default CreateBannerPage;
