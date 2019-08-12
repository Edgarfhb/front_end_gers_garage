import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img3 from '../../assets/img/img3.jpg';
import Img2 from '../../assets/img/img2.jpg';
import Img1 from '../../assets/img/img1.jpg';

class MyCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img alt="" src={Img3}/>
                    <p className="legend"> QUALITY </p>
                </div>
                <div>
                    <img alt="" src={Img2} />
                    <p className="legend"> PROFESSIONALISM </p>
                </div>
                <div>
                    <img alt="" src={Img1} />
                    <p className="legend"> EXPERIENCE </p>
                </div>
            </Carousel>
        );
    }
}

export default MyCarousel;
