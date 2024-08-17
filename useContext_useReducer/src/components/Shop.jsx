import React from 'react'
import { Dummy_Products } from '../dummy-products'
import Product from './Product'

function Shop({onAddCart}) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      
      <ul id="products">
        {Dummy_Products.map((product)=><li key={product.id}>
            <Product {...product} onAdd={onAddCart}/>
        </li>)}
      </ul>
    </section>
  )
}

export default Shop
