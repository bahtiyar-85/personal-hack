import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { productsContext } from '../../contexts/productsContext';
import ModalInput from '../ModalInput/ModalInput';
import ProductsList from '../Productslist/ProductsList';


const Shop = () => {
    const { getProducts} = useContext(productsContext)
    const [show, setShow] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [product, setProduct] = useState({
        name:'',
        desc:'',
        url:'',
        price:'',
      })

    useEffect(() => {
    getProducts()
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function productToEdit(item){
        setProduct(item);
        setIdEdit(item.id)
        handleShow()
    }
    return (
        <div className='container'>
           <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center align-items-center m-2' style={{width: '50vw'}}>
                    <ModalInput show={show} handleClose={handleClose} handleShow={handleShow} product={product} setProduct={setProduct} idEdit={idEdit}/>
                    <input  type="text" placeholder="Введите объект поиска " className="me-2 col-4 form-control" />   
                    <Button variant="warning">Поиск</Button>           
                </div>
            </div>
           <div>
                <ProductsList productToEdit={productToEdit}/>
           </div>
          
        </div>
    );
};

export default Shop;