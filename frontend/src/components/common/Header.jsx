import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaAlignRight } from "react-icons/fa6";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/slices/sidebarSlice';
import { Link } from 'react-router-dom';
import useMobileMedia from '../../hooks/useMobileMedia';
import { logout } from '../../store/slices/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

import './common.scss'


// Sidebar Toggle Button Component
const SidebarToggleButton = () => {
   const isMobile = useMobileMedia();
   const dispatch = useDispatch();
   return (
      <Button
         variant="outline-dark"
         className={`border-0 ${isMobile && 'btn-sm'}`}
         onClick={()=>{
            dispatch(toggleSidebar())}}
      >
         <FaAlignRight className='user' />
      </Button>
   )
};

// User Navigation Links Component
const UserNavLinks = ({ token, onLogout }) => {
   const isMobile = useMobileMedia();
   return (
      <Nav className="me-auto flex-row gap-3 nav-links">
         {token ? (
            <div className="logout nav-link fw-semibold " onClick={onLogout}>
               {isMobile ? <FaSignOutAlt /> : <p className='mb-0'>
                  تسجيل الخروج
               </p>}
            </div>
         ) : (
            <Link to="/تسجيل-دخول" className='nav-link'>
               تسجيل دخول
            </Link>
         )}
      </Nav>
   );
}


const Header = () => {
   const dispatch = useDispatch();
   const sidebarCollapse = useSelector((state) => state?.sidebar.collapsed);
   const isMobile = useMobileMedia();
   const token = useSelector(state => state?.auth?.token);
  
   
   const handleLogOut = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      dispatch(logout());
      Swal.fire({
         icon: 'success',
         title: "تم التسجيل الخروج ",
         timer: 1000,
         showConfirmButton: false,
      })
   }



   return (
      <header
         className={`header`}
         style={{ marginRight: !token ? '0px' : (sidebarCollapse || isMobile) ? '80px' : '280px' }}
         id='header'
      >
         <Navbar expand="lg" className="bg-white px-0 px-sm-3">
            <Container>
               <SidebarToggleButton />
               <Link to="/" className='logo fw-bold me-2 me-sm-3 me-md-5 navbar-brand'>نظام ادارة المخازن</Link>
               <UserNavLinks token={token} onLogout={handleLogOut} />
            </Container>
         </Navbar>
      </header>
   )
}

export default Header