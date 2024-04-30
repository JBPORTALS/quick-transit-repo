import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@qt/ui/carousel"

export default function ImageCarousel() {
    return (
        <div><Carousel className="max-h-[278px] max-w-[339px]">
            <CarouselContent>
                <CarouselItem>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
                </CarouselItem>
                <CarouselItem>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
                </CarouselItem>
                <CarouselItem>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
                </CarouselItem>


            </CarouselContent>
            <div className=" absolute top-1/2 bottom-1/2 w-full px-5">
                <div className="flex justify-between">

                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </div>
        </Carousel>
        </div>
    )
}
