import React from 'react'
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='footer-top'>
                    <div className='footer-left'>
                        <div>
                            <div className="nav-left">
                                <NavLink to="/" className="logo">Seva<span>X</span></NavLink>
                            </div>
                            <p>Be a part of something bigger</p>
                        </div>
                    </div>
                    <div className='footer-right'>
                        <a href="">
                            <AiFillInstagram />
                        </a>
                        <a href="">
                            <AiOutlineTwitter />
                        </a>
                        <a href="">
                            <AiFillFacebook />
                        </a>
                    </div>
                </div>
                <hr />
                <div className='footer-bottom'>
                    <p>© 2023 SevaX. All rights reserved.</p>
                    <p>+10M items donated❤️</p>
                </div>
            </div>
        </footer>
    )
}
