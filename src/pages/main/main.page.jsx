import React, { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./main.style.css";
import BgImage from '../../resource/images/IMG_7129.JPG';
import ProductSlider from "../../components/product-slider/product-slider.component";
import HeightSpace from '../../components/space/space.component';

class Main extends Component{
    render(){
        return <main>
            <Container fixed={true} style={{backgroundColor:'eee'}}>
                <Grid container>
                    <Grid item sm={6} xs={12} className='main-cover'>
                        <img src={BgImage} alt='Numen Flame' className='main-bg-cover' />
                    </Grid>
                    <Grid item sm={6} xs={12} className='main-title'>
                        <Typography variant='h1' className="yekan-text">نومن</Typography>
                        <Typography variant='h4' className="yekan-text">محصولات  دست ساز</Typography>
                        <Typography variant='body1' className="yekan-text">برای مراقبت و زیبایی پوست</Typography>
                    </Grid>
                </Grid>
                <HeightSpace />
                <Grid container>
                    <Grid item xs={12}>
                        <ProductSlider />
                    </Grid>
                </Grid>
                <div className="scroll-down-button">
                    <ExpandMoreIcon fontSize="large"></ExpandMoreIcon>
                </div>
            </Container>
        </main>
    }
}

export default Main;