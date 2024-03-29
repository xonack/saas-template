"use client"

import axios from "axios"
import * as z from "zod";
import { MessageSquare, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"

import { Heading } from "@/components/heading"

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

const MusicPage = () => {
    const proModal = useProModal()
    const router = useRouter()
    const [music, setMusic] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {    
        try {
            setMusic(undefined)
            const axios_config = {
                timeout: 100 * 1000, // 100 seconds expressed in milliseconds
                };
            const response = await axios.post("/api/music", values, axios_config)
            setMusic(response.data.audio)
            form.reset()
        } catch(error: any) {
            if(error?.response?.status === 403) {
                proModal.onOpen()
            }
            console.log(error)
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
        <Heading
            title="Music Generation"
            description="What would you like to hear?"
            icon={Music}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form} >
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                            className="border-0
                                            outline-none focus-visible:ring-0
                                            focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Request music here."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2
                        w-full"
                        disabled={isLoading}
                        >
                            Send
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center
                    justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                {!music && !isLoading && (
                    <Empty label="No music requested." />
                )}
                {music && (
                    <audio controls
                    className="mt-8 w-full">
                        <source src={music} />
                    </audio>
                    )}
            </div>
        </div>
        </div>
    );
}

export default MusicPage;