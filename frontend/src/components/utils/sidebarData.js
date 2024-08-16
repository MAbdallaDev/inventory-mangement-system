import { FaWarehouse } from "react-icons/fa";
import { FaAngleDown, FaUserGear, FaIndustry, FaPlus, FaEye, FaUsers, FaHouse, FaFileInvoice } from "react-icons/fa6";

const sidebarData = [
   {
      id: 1,
      title: 'الرئيسية',
      icon: <FaHouse className='section-icon' />,
      path: '/',
      description: 'الصفحة الرئيسية'
   },
   {
      id: 3,
      title: 'المخزن',
      description: 'صفحة المخزن ',
      icon: <FaWarehouse className='section-icon' />,
      listIcon: <FaAngleDown className="arrow" />,
      links: [
         {
            name: 'اضافة منتج',
            path: '/اضافة-منتج',
            icon: <FaPlus />
         },
         {
            name: 'جميع المنتجات',
            path: '/منتجات',
            icon: <FaEye />
         }
      ],
   },
   {
      id: 4,
      title: 'الفواتير',
      icon: <FaFileInvoice className='section-icon' />,
      listIcon: <FaAngleDown className="arrow" />,
      links: [
         {
            name: 'اضافة فاتورة',
            path: "/انشاء-فاتورة",
            icon: <FaPlus />
         },
         {
            name: 'جميع الفواتير',
            path: '/الفواتير',
            icon: <FaEye />
         },
      ],
   },
   {
      id: 5,
      title: 'العملاء',
      icon: <FaUsers className='section-icon' />,
      path: '/العملاء',
      description: 'الصفحة العملاء'
   },
   {
      id: 6,
      title: 'المستخدمين',
      icon: <FaUserGear className='section-icon' />,
      path: '/المستخدمين',
      description: 'الصفحة المستخدمين'
   },
];

export default sidebarData;
