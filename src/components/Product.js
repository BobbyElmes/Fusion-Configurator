import React from 'react';

function Product(props){
    return (<div><h1>NAME: {props.name}</h1> <p>PRICE: {props.price}</p> <p><i>DESCRIPTION: {props.description}</i></p></div>)
}


export default Product;