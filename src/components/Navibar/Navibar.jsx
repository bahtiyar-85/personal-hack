
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext';



const Navibar = () => {
    const {
        handleLogout,
        user: { email },
      } = useAuth();
   
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
                        {email ? (
                                <Link to="/auth">
                                <button className="btn btn-primary" onClick={handleLogout}>
                                    Выйти
                                </button>
                                </Link>
                            ) : null}
                        {email ? null : (
                            <Link to="/auth">
                            <button className="btn btn-primary">Войти</button>
                            </Link>
                        )}
                       
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
};

export default Navibar;