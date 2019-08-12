import React, { Component } from 'react';

import NavBar from '../../components/NavbarElement'
import MyCarousel from '../../components/CarouselElement'
import Footer from '../../components/Footer/Footer'


class  HomeScreen extends Component {
    render() {
        return (
            <div className="Container">

              < NavBar />
              < MyCarousel />
              < Footer />

          </div>
        );
    }
}

export default HomeScreen;
