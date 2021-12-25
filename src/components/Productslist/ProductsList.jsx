import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { productsContext } from '../../contexts/productsContext';
import { HiOutlineShoppingCart, HiOutlineTrash, HiOutlinePencil, HiOutlineHeart, HiOutlineChatAlt } from "react-icons/hi";
import { TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import { useAuth } from '../../contexts/authContext';
import { cartContext } from '../../contexts/cartContext';
import { favorContext } from '../../contexts/favorContext';
import "./ProductsList.css"


const ProductsList = ({productToEdit, products}) => {
    const { deleteProduct, updateProducts } = useContext(productsContext);
    const {addProductToCart} = useContext(cartContext);
    const { favor, addProductToFavor} = useContext(favorContext);
    const { user: { email } } = useAuth();
    
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);
    const [textValue, setTextValue] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function renderCommentToModal(item){
        handleShow();
        if(!item.comments){
            let newProduct = {
                ...item,
                comments: [],
            } 
            setProduct(newProduct)
        } else {
            setProduct(item)
        }  
        setTextValue('');
        product?.comments?.forEach((item)=>{
            if(email === item[0]) setTextValue(item[1])
        })  
        // console.log('Product', product);
    }
    console.log(Date.now());
    function addComment(){
        if(textValue===''){
             alert('Поле не должно быть пустым!');
             return;
        }
        let comment = [
            email,
            textValue
        ]  
      
        let newComments = product?.comments?.filter((item)=> email !== item[0])
        newComments.push(comment)
        let newProduct = {
            ...product,
            comments: newComments
        }
        console.log('comment',newComments);
        console.log('newproduct', newProduct);
        // setProduct(newProduct);
        updateProducts(newProduct.id, newProduct);
        handleClose();
    }
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
                            {email==="b.ilyazov@gmail.com" ? (
                                <span onClick={()=>productToEdit(item)} style={{cursor:'pointer'}}><HiOutlinePencil className='icons' size='25px'/></span>
                                ) : (null)}
                            {email==="b.ilyazov@gmail.com" ? (
                                <span onClick={()=>deleteProduct(item.id)} style={{cursor:'pointer'}}><HiOutlineTrash className='icons' size='25px'/></span>
                            ): (null)}    
                            {/* <Badge badgeContent={3} color="error"></Badge> */}
                                 <HiOutlineChatAlt onClick={()=>renderCommentToModal(item)} className='icons' size='25px'/>
                            
                            <HiOutlineHeart onClick={()=>addProductToFavor(item)} className='icons' size='25px'/>
                            <HiOutlineShoppingCart onClick={()=>addProductToCart(item)} className='icons' size='25px' />
                        </div>
                        </Card.Body>
                    </Card>
                
               ))
           } 
           <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Комментарии пользователей</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {product?.comments?.map((item, index)=>(
                   <div key={index}>
                    {email === item[0] ? ( null
                    ) : (
                            <>
                            <h6>{item[0]}</h6>
                            <p>{item[1]}</p>
                            </>
                        )}
                    </div>
                ))}
                {email ? (
                    <>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Ваш комментарий"
                        multiline
                        maxRows={2}
                        style={{width:'100%'}}
                        value={textValue}
                        onChange={(e)=>setTextValue(e.target.value)}
                          /> 
                    <Button onClick={()=>addComment()}>Сохранить</Button>
                    </>
                ): null }
               
                </Modal.Body>  
            </Modal>
        </div>
    );
};

export default ProductsList;


