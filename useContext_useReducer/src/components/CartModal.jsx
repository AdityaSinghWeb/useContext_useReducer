import React from 'react'
import Cart from './Cart'
import { forwardRef } from 'react'

function CartModal({title, action, cartItems, quantity},ref) {
  return (
    <dialog id='modal' ref={ref}>
      <h2>{title}</h2>
      <Cart items={cartItems} handleQuantity={quantity}/>
      <form method='dialog' id='modal-actions'>{action}</form>
    </dialog>
  )
}

export default forwardRef(CartModal)
