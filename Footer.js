import React from 'react';

function Footer(){
    return (
        <footer style={styles.footer}>
           <p>2025 All Rights Reserved</p> 
        </footer>
    );
}
const styles ={
    footer: {
        backgroundColor:'#f1f1f1',
        padding: '10px',
        position:'fixed',
        bottom: 0,
        width: '100%',
        textAlign:'center',
    },
};

export default Footer;