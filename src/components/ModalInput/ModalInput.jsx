import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { productsContext } from '../../contexts/productsContext';
import { useAuth } from '../../contexts/authContext';

const ModalInput = ({show, handleClose, handleShow, product, setProduct, idEdit}) => {
   
    const {createProduct, updateProducts} = useContext(productsContext);  
    const { user: { email } } = useAuth();
  
    function handleValues(e){
        let newProduct = {
          ...product,
          [e.target.name]: e.target.value
        } 
        console.log(newProduct)
        setProduct(newProduct)
    }

    function addProduct(){
        createProduct(product);
        handleClose(false);
    }
    
    function editProduct(){
        updateProducts(idEdit, product);  
        handleClose(false);
        setProduct({
            name:'',
            desc:'',
            url:'',
            price:'',
          })
    }
    function showModal(){
        handleShow(); 
        setProduct({
            name:'',
            desc:'',
            url:'',
            price:'',
          }) 
    }
    return (
        <div>
             {email==='b.ilyazov@gmail.com' ? (
                 <Button onClick = {showModal} className='btn btn-success'>Добавить</Button>
             ): null }
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Данные товара</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                       
                        <input value={product.name} type='text' onChange={handleValues} className='form-control' placeholder='Наименование' name='name'></input>
                        <br/>
                        <input value={product.desc} type='text' onChange={handleValues} className='form-control' placeholder='Описание' name='desc'></input>
                        <br/>
                        <input value={product.url} type='text' onChange={handleValues} className='form-control' placeholder='URL' name='url'></input>
                        <br/>
                        <input value={product.price} type='number' onChange={handleValues} className='form-control' placeholder='Цена' name='price'></input>
                        <Button onClick={()=>addProduct()} className='btn btn-success m-3'>Создать</Button>
                        <Button onClick={editProduct} className='btn btn-success m-3'>Изменить</Button>
                    </Form>
                </Modal.Body>  
            </Modal>
        </div>
    );
};

export default ModalInput;