import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../contexts/cartContext';
import { HiOutlineTrash, HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
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
                
                {cart.products?.map((item, index)=>(
                    <div key={index} className='row cart-item ' >
                        <div className="col-6 col-md-2">{item.item.name}</div>
                        <div className="col-6 col-md-2">{item.item.desc}</div>
                        <div className="col-4 col-md-2">{item.item.price+" сом"}</div>
                        <div className="col-3 col-md-2 align-items-center">
                            <HiOutlineMinusCircle onClick={()=>changeProductCount(item.count-1, item.item.id)}  className='icons' size='25px'/>
                            <span className='h5'>{item.count}</span>
                            <HiOutlinePlusCircle onClick={()=>changeProductCount(item.count+1, item.item.id)}  className='icons' size='25px'/>
                        </div>
                        <div className="col-4 col-md-2">{roundN(item.subPrice)+" сом"}</div>
                        <div className="col-1 col-md-2"><HiOutlineTrash onClick={()=>deleteFromCart(item.item.id)} className='icons' size='25px'/></div>
                        
                    </div>
                ))}
                <div >
                <h4>{"Итого: "+ roundN(cart.totalPrice)+ " сом"}</h4>
                <Link to="/credit"><button className='btn btn-primary mb-4'>Оплатить</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;