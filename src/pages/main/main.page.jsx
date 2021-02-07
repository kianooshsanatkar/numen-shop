import React, { Component } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import "./main.style.css";
import BgImage from '../../resource/images/IMG_7129.JPG';

class Main extends Component{
    render(){
        return <main>
            <Container fixed={true} style={{backgroundColor:'eee'}}>
                <Grid container>
                    <Grid item sm={6} xs={12} className='main-cover'>
                        <img src={BgImage} alt='Numen Flame' className='main-bg-cover' />
                    </Grid>
                    <Grid item sm={6} xs={12} className='main-title'>
                        <Typography variant='h2'>نومن</Typography>
                        <Typography variant='h6'>محصولات  دست ساز برای مراقبت و زیبایی پوست و مو</Typography>
                    </Grid>
                </Grid>
            </Container>
        </main>
    }
}

export default Main;