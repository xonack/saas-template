"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name: "John Doe",
        avatar: "JD",
        title: "CEO",
        content: "Best platform out there!"
    },
    {
        name: "Tony Robins",
        avatar: "TR",
        title: "Motivational Speaker",
        content: "Thinking of replacing confidence with automation..."
    },
    {
        name: "Big Boss",
        avatar: "BB",
        title: "Big Boss",
        content: "WOW"
    },
    {
        name: "AI Bot",
        avatar: "AI",
        title: "Human",
        content: "Beep Boop Beep"
    }
]

export const LandingContent = () => {   
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-white font-extrabold mb-10 text-4xl">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                    lg:grid-cols-4 gap-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.content} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">
                                      {testimonial.name}  
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {testimonial.content}
                            </CardContent>                        
                        </CardHeader>
                    </Card>
                  ))
                }  
            </div>
        </div>
    )
}
