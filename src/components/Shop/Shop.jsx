import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { productsContext } from '../../contexts/productsContext';
import ModalInput from '../ModalInput/ModalInput';
import ProductsList from '../Productslist/ProductsList';
import { Link, useSearchParams } from "react-router-dom";
import { Box } from '@mui/system';
import { Drawer, List, ListItem, ListItemText, Slider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { HiOutlineShoppingCart, HiOutlineHeart, HiOutlineTrash, HiChatAlt2 } from "react-icons/hi";
import Badge from '@mui/material/Badge';
import { cartContext } from '../../contexts/cartContext';
import { favorContext } from '../../contexts/favorContext';
import { useAuth } from '../../contexts/authContext';



const Shop = () => {
    const { user: { email } } = useAuth();
    const { getProducts, products, productsTotalCount} = useContext(productsContext)
    const { getCart, cartLength, addProductToCart} = useContext(cartContext);
    const { favor, getFavor, favorLength, deleteFromFavor} = useContext(favorContext);
    const [show, setShow] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [product, setProduct] = useState({
        name:'',
        desc:'',
        url:'',
        price:'',
      })
    
    const [favorState, setFavorState] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(
        searchParams.get("q") ? searchParams.get("q") : ""
    );
    
    const [page, setPage] = useState(
        searchParams.get("_page") ? searchParams.get("_page") : 1
    );
    const [limit, setLimit] = useState(
        searchParams.get("_limit") ? searchParams.get("_limit") : 8
    );  
    const [price, setPrice] = useState([1, 100000]);

    useEffect(() => {
    getProducts();
    getCart();
    getFavor();
    }, [])

    useEffect(() => {
        setSearchParams({
          q: search,
          _page: page,
          _limit: limit,
          price_gte: price[0],
          price_lte: price[1],
        });
      }, []);

    useEffect(() => {
        getProducts();
    }, [searchParams]);
    useEffect(() => {
        setSearchParams({
        q: search,
        _page: page,
        _limit: limit,
        price_gte: price[0],
        price_lte: price[1],
        });
    }, [search, page, limit, price]);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function productToEdit(item){
        setProduct(item);
        setIdEdit(item.id)
        handleShow()
    }

    const handleSliderChange = (event, newValue) => {
        setPrice(newValue);
      };

    const handlePaginationChange = (event, value) => {
        setPage(value);
      };

    const toggleDrawer = (open) => (event) => {
        setFavorState(open)
    }
    return (
        <div style={{backgroundColor:'#e9e9e9'}}>
            <div className='container' >
                <div className='d-flex justify-content-around'>
                    <div className='d-flex justify-content-center align-items-center m-2' style={{width: '50vw'}}>
                        <ModalInput show={show} handleClose={handleClose} handleShow={handleShow} product={product} setProduct={setProduct} idEdit={idEdit}/>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Введите объект поиска " className="me-2 col-4 form-control" />   
                    </div>
                    <div className='d-flex align-items-center'>
                        <Link to='/cart'>
                            <Badge badgeContent={cartLength} color="error">
                                <HiOutlineShoppingCart className='icons' size='35px' />
                        </Badge>
                       </Link>
                       <Badge badgeContent={favorLength} color="error" style={{marginLeft:'10px'}}>
                            <HiOutlineHeart onClick={toggleDrawer(true)} className='icons' size='35px'/>
                        </Badge>
                        { email ?(
                             <Link to="/chat">
                                <HiChatAlt2 className='icons' size='35px' style={{marginLeft:'10px'}}/>
                             </Link>
                        ): null}
                    </div> 
                </div>

                <div className='d-flex justify-content-center'>
                    <span style={{marginRight:'20px'}}>Фильтр по цене</span>
                    <Box sx={{ width: 300}}>
                        <Slider
                            getAriaLabel={() => 'Price change'}
                            value={price}
                            min={0}
                            max={100000}
                            step={100}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            // getAriaValueText={price}
                        />
                    </Box>
                </div>
            <div>
                    <ProductsList productToEdit={productToEdit} products={products} />
            </div>
            <div className='d-flex justify-content-center m-2'>
                    <Pagination 
                    count={Number(Math.ceil(+productsTotalCount/+limit))} 
                    page={page} 
                    onChange={handlePaginationChange}
                    color="primary" />
            </div>
            </div>
            <Drawer
                anchor={'right'}
                open={favorState}
                onClose={toggleDrawer(false)}
            >
                <h3 style={{textAlign:'center'}}>Избранное</h3>
                <List>
                   {favor.products?.map((item)=>(
                       <ListItem key={item.item.id}>
                            <HiOutlineShoppingCart style ={{marginRight:'10px'}} onClick={()=>addProductToCart(item.item)} className='icons' size='25px' />    
                            <HiOutlineTrash style ={{marginRight:'10px'}} onClick={()=>deleteFromFavor(item.item.id)} className='icons' size='25px'/>
                           <ListGroup>
                            <ListItemText > {item.item.name}</ListItemText>
                            <span> {item.item.desc}</span>
                            </ListGroup>
                       </ListItem>
                   ))} 
                </List>
            </Drawer>
        </div>
    );
};

export default Shop;