import React from 'react';
import logo from './CSRL_Logo_croped.png'; 

function Header(){
    return (
        <header style={styles.header}>
              <div style={styles.headerContent}>
              <img src={logo} alt="Logo" style={styles.logo} />
            <h1>Welcome to my website</h1>
            </div>
            <nav>
             
            </nav>
        </header>
    );
}
const styles ={
    header: {
        // backgroundImage:"url('https://i.pinimg.com/736x/49/50/5d/49505d3751d8835e0d000f28ef5de7f9.jpg')",
        backgroundColor:'rgb(205, 180, 238)',
        padding: '20px',
        color: 'black',
        textAlign:'center',
        // backgroundRepeat:'no-repeat',
        // backgroundSize:'cover',
        
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        gap: '20px',
    },
    logo: {
        height: '50px',
        // backgroundImage:"url('https://cbeditz.com/public/cbeditz/preview/light-blue-banner-background-hd-wallpapers-seiqgehh0t.webp')",
    },
};

export default Header;