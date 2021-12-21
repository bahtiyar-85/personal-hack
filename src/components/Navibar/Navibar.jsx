
import React, { useContext, useEffect, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import { Container, Navbar, Button, Nav, Modal, Form } from 'react-bootstrap';
import { regContext } from '../../contexts/regContext';


const Navibar = () => {
    const {
        email,
        user,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleReg,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
      } = useContext(regContext);

    const [showModal, setShowModal] = useState(true);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [regModal, setRegModal] = useState(false);
    
    function clickReg(){
        handleShowModal();
        setRegModal(true);
    }
    function clickLogin(){
        handleShowModal();
        setRegModal(false);
    }
     console.log('user' ,user);
    return (

        <div>
             <Navbar collapseOnSelect expand ='lg' bg='dark' variant='dark' fixed="top">
                <Container>
                <Navbar.Brand>
                    <img src='./images/karakol-logo.png' height='60px'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar'/>
                <Navbar.Collapse id='responsive-navbar'> 
                   <Nav className='me-auto'>
                        <Nav.Link><Link to ="/"> Главная</Link></Nav.Link>
                        <Nav.Link><Link to ="/shop">Магазин</Link></Nav.Link>
                        <Nav.Link><Link to='/'>About</Link></Nav.Link>
                    </Nav>
                    
                    <Nav>
                        {hasAccount ? (
                            <Button onClick ={clickLogin}  autoFocus variant='primary' className='m-2' >Выйти</Button>

                        ): (
                           
                            <div>
                            <Button onClick ={clickLogin}  autoFocus variant='primary' className='m-2' >Войти</Button>
                            <Button onClick ={clickReg}  autoFocus variant='primary' className='m-2' >Регистрация</Button>
                            </div>             
                       
                       )}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{regModal ? 'Регистрация' : 'Введиде логин и пароль'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <input value={email} type='text' onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Введите почту' ></input>
                        <p>{emailError}</p>
                        <input value={password} type='password' onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Введите пароль'></input>
                        <p>{passwordError}</p>
                        {regModal ? (
                            <Button onClick={handleReg} className='btn btn-success m-3'>Создать профиль</Button> 
                        ) : (
                            <Button onClick={handleLogin} className='btn btn-success m-3'>Войти</Button>
                        )}
                    </Form>
                </Modal.Body>  
            </Modal>
        </div>
    );
};

export default Navibar;