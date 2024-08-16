import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FaUser } from "react-icons/fa";
import { FaUserTie, FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import sidebarData from '../utils/sidebarData';
import { useDispatch, useSelector } from 'react-redux';
import useMobileMedia from '../../hooks/useMobileMedia';
import { selectUserRole } from '../../store/slices/authSlice';
import { setSidebarCollapsed, toggleSidebar } from '../../store/slices/sidebarSlice';
import './common.scss';

const Sidebar = () => {
   const [openSubMenus, setOpenSubMenus] = useState({});
   const isCollapsed = useSelector((state) => state?.sidebar.collapsed);
   const [isHovered, setIsHovered] = useState(false);
   const isMobile = useMobileMedia();
   const username = useSelector(state => state?.auth?.user?.name);
   const currentUserRole = useSelector(selectUserRole);
   const dispatch = useDispatch();

   const handleSubMenu = (id) => {
      setOpenSubMenus(prevState => ({
         ...prevState,
         [id]: !prevState[id]
      }));
   };
   const handleMouseEnter = () => {
      if (isCollapsed && !isMobile) {
         setIsHovered(true);
      }
   };

   const handleMouseLeave = () => {
      if (isCollapsed && !isMobile) {
         setIsHovered(false);
      }
   };
   useEffect(() => {
      if (isMobile && !isCollapsed) {
         dispatch(setSidebarCollapsed(isMobile));
      }
   }, [isMobile]);

   return (
      <aside
         className={`sidebar ${isCollapsed && !isHovered ? 'close' : ''}`}
         id='sidebar'
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <Container className='h-100 d-flex flex-column gap-1'>
            <div className="sidebar-header">
               <div className="align-items-center d-flex flex-column gap-3 user-section side-item">
                  {currentUserRole === 'manger'
                     ? < FaUserTie className="user-icon" />
                     : <FaUser className="user-icon" />
                  }
                  <span className="username">{username || 'unknown'}</span>
               </div>
               {(!isCollapsed && isMobile) && (
                  <button className="btn-close-sidebar" onClick={() => dispatch(toggleSidebar())}>
                     <FaArrowRightFromBracket />
                  </button>
               )}
            </div>
            {
               sidebarData?.map((item) => (
                  <div className="side-item" key={item?.id}>
                     {
                        item?.path
                           ? <Link to={item?.path}
                              className="side-item-link align-items-center d-flex gap-3"
                              style={{ color: '#BDBEBF' }}
                              onClick={() => handleSubMenu(item.id)}
                              title={item?.description}
                           >
                              {item?.icon}
                              <span className='flex-fill '>{item?.title}</span>
                           </Link>
                           : <>
                              <p
                                 className="side-item-link align-items-center d-flex gap-3"
                                 onClick={() => handleSubMenu(item.id)}
                                 title={item?.description}
                              >
                                 {item?.icon}
                                 <span className='flex-fill '>{item?.title}</span>
                                 {item?.links && item?.listIcon}
                              </p>
                           </>
                     }
                     {
                        item?.links &&
                        <ul className={`side-item-menu ${openSubMenus[item.id] ? 'open' : ''}`}>
                           {
                              item?.links?.map((link, idx) => (
                                 <li className='' key={idx}>
                                    <Link to={`${link?.path}`} className='d-flex align-items-center gap-2'>
                                       {link?.icon}
                                       {link?.name}
                                    </Link>
                                 </li>
                              ))
                           }
                        </ul>
                     }
                  </div>
               ))
            }
         </Container>
      </aside>
   );
};

export default Sidebar;
