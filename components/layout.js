import React from 'react';
import { Container } from 'semantic-ui-react';
/* Introduce cualquier contenido o elemento dentro de la etiqueta <head> de html */
import Head from 'next/head';
import Header from './header';




export default props => {
    return (
        <Container>
            <Head>
                <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css" 
                />
            </Head>
            <Header />
            {props.children}
        </Container>
    );
}