import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { productsContext } from '../../contexts/productsContext';
import { HiOutlineShoppingCart, HiOutlineTrash, HiOutlinePencil, HiOutlineHeart, HiOutlineChatAlt } from "react-icons/hi";
import "./ProductsList.css"
import { useAuth } from '../../contexts/authContext';


const ProductsList = ({productToEdit, products}) => {
    const { deleteProduct } = useContext(productsContext);
    const { user: { email } } = useAuth();
    
    console.log('email' ,email);
    return (
        <div  className=' container d-flex flex-wrap justify-content-evenly '>
           {
               products.map((item)=>(
                    <Card className="card" style={{ width: '18rem', marginTop:'3vh' }}  key={item.id}>
                        <Card.Img variant="top" src={item.url} />
                        <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.desc}</Card.Text>
                        <Card.Text>{item.price+" сом"}</Card.Text>
                        <div className='d-flex justify-content-evenly'>
                            {email==="bahtiyar@mail.com" ? (
                                <span onClick={()=>productToEdit(item)} style={{cursor:'pointer'}}><HiOutlinePencil size='25px'/></span>
                                ) : (null)}
                            {email==="bahtiyar@mail.com" ? (
                                <span onClick={()=>deleteProduct(item.id)} style={{cursor:'pointer'}}><HiOutlineTrash size='25px'/></span>
                            ): (null)}    
                            <HiOutlineChatAlt className='icons' size='25px'/>
                            <HiOutlineHeart className='icons' size='25px'/>
                            <HiOutlineShoppingCart className='icons' size='25px' />
                        </div>
                        </Card.Body>
                    </Card>
                
               ))
           } 
          
        </div>
    );
};

export default ProductsList;


