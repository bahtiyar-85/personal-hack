import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { productsContext } from '../../contexts/productsContext';
import { HiOutlineShoppingCart, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const ProductsList = ({productToEdit}) => {
    const {products, getProducts, deleteProduct, updateProducts,} = useContext(productsContext);

    return (
        <div  className=' container d-flex flex-wrap justify-content-evenly '>
           {
               products.map((item)=>(
                    <Card style={{ width: '18rem', marginTop:'3vh' }}  key={item.id}>
                        <Card.Img variant="top" src={item.url} />
                        <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.desc}</Card.Text>
                        <Card.Text>{"$"+item.price}</Card.Text>
                        <div className='d-flex justify-content-evenly'>
                            <span onClick={()=>productToEdit(item)} style={{cursor:'pointer'}}><HiOutlinePencil size='2em'/></span>
                            <span onClick={()=>deleteProduct(item.id)} style={{cursor:'pointer'}}><HiOutlineTrash size='2em'/></span>
                            <HiOutlineShoppingCart size='2em' />
                        </div>
                        </Card.Body>
                    </Card>
                
               ))
           } 
        </div>
    );
};

export default ProductsList;


