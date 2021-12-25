import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <div className='footer '>
            <div className='container d-flex justify-content-center'>
                <div className='footer-icons'>
                    <a href="https://www.facebook.com/karakolski/timeline/" target='_blank'><img src='./icons/icon-fb.png' alt='facebook'/></a>
                    <a href="https://www.instagram.com/karakolski/" target='_blank'><img src='./icons/icon-inst.png' alt='instagram'/></a>
                    <a href="https://www.youtube.com/channel/UCFq7k36PqQXbokhSdqpVsZA" target='_blank'><img src='./icons/icon-yt.png' alt='youtube'/></a>
                </div>
                <div className='footer-info d-flex flex-column align-items-end '>
                    <p>Лыжная база администратор:</p>
                    <p>996(772)53-40-81</p>
                    <p>996(550)53-40-81</p>
                    <p>Вопросы бронирования г.Бишкек тел.:</p>
                    <p>996(312)90-06-73</p>
                    <p>996(312)90-06-63</p>
                    <p>E-mail: info@karakol-ski.kg</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;