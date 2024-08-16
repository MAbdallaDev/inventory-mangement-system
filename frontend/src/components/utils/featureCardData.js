import { FaPalette, FaUserGear, FaPenRuler, FaFileInvoice, FaUsers, FaDollarSign, FaMoneyBillTrendUp, FaEye, FaCoins } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";

const featureCardData = [
   {
      header: "المنتجات",
      path: '/منتجات',
      icon: <BiSolidPackage />,
      getTitle: (data) => `${(typeof data === "number" && data) || data?.length || 0} منتج`
   },
   {
      header: "الفواتير",
      path: '/الفواتير',
      icon: <FaFileInvoice />,
      getTitle: (data) => `${(typeof data === "number" && data) || data?.length || 0} فاتورة`
   },
   {
      header: "العملاء",
      path: '/العملاء',
      icon: <FaUsers />,
      getTitle: (data) => `${(typeof data === "number" && data) || data?.length || 0} عميل`
   },
   {
      header: "الالوان",
      path: '/الاعدادات/اضافة-لون',
      icon: <FaPalette />,
      getTitle: (data) => `${(typeof data === "number" && data) || data?.length || 0} الوان`
   },
   {
      header: "المقاسات",
      path: '/الاعدادات/اضافة-مقاس',
      icon: <FaPenRuler />,
      getTitle: (data) => `${(typeof data === "number" && data) || data?.length || 0} مقاسات`
   },
   {
      header: "المستخدمين",
      path: '/المستخدمين',
      icon: <FaUserGear />,
      getTitle: (data) => `${(typeof data === "number" && data) || data?.length || 0} مستخدمين`
   }
]
export const StatisticsCardData = [
   {
      header: "التكاليف",
      icon: <FaCoins />,
      number: (data) => `${data} جنية`
   },
   {
      header: "الإيرادات",
      icon: <FaMoneyBillTrendUp />,
      number: (data) => `${data} جنية`
   },
   {
      header: "الارباح",
      icon: <FaDollarSign />,
      number: (data) => `${data} جنية`
   },
]
export default featureCardData;