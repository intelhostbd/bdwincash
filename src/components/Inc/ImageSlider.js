import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../../styles/ImageSlider.css';

export default function ImageSlider() {


    const slideImages = [
        '/assets/slider-img-1.jpeg',
        '/assets/slider-img-2.jpeg',
        '/assets/slider-img-3.jpeg'
    ];

    return (
        <>
            <Slide easing="ease" autoplay="true" arrows={false}>
                {
                    slideImages.map(img => {
                        return (
                            <div className="each-slide" key={img}>
                                <div style={{ 'backgroundImage': `url('${img}')` }}>
                                    {/* <span>Slide 1</span> */}
                                </div>
                            </div>
                        );
                    })
                }
            </Slide>
        </>
    )
}
