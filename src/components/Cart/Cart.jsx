import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../contexts/cartContext';
import { HiOutlineTrash, HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { roundN } from "../../helpers/calcPrice";
import "./Cart.css"


const Cart = () => {
    const {getCart, cart, deleteFromCart, changeProductCount} = useContext(cartContext)

    useEffect(() => {
        getCart();
      }, []);

    return (
        <div className='cart'>
            <div className='container'>
                
                {cart.products?.map((item)=>(
                    <div className='row cart-item'>
                        <div className="col">{item.item.name}</div>
                        <div className="col">{item.item.desc}</div>
                        <div className="col">{item.item.price+" сом"}</div>
                        <div className="col-1 align-items-center">
                            <HiOutlineMinusCircle onClick={()=>changeProductCount(item.count-1, item.item.id)}  className='icons' size='25px'/>
                            <span className='h5'>{item.count}</span>
                            <HiOutlinePlusCircle onClick={()=>changeProductCount(item.count+1, item.item.id)}  className='icons' size='25px'/>
                        </div>
                        <div className="col">{roundN(item.subPrice)+" сом"}</div>
                        <div className="col-1"><HiOutlineTrash onClick={()=>deleteFromCart(item.item.id)} className='icons' size='25px'/></div>
                        
                    </div>
                ))}
                <div >
                <h4>{"Итого: "+ roundN(cart.totalPrice)+ " сом"}</h4>
                <button className='btn btn-primary mb-4'>Оплатить</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;