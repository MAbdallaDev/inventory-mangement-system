import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FeatureCard } from '../common'
import { useDispatch, useSelector } from 'react-redux';
import featureCardData, { StatisticsCardData } from '../utils/featureCardData';
import { getInvoices } from '../../store/slices/invoiceSlice';
import { FaDollarSign } from "react-icons/fa6";
import { getStatistics } from '../../services/apiService';
import LastInvoicesTable from './LastInvoicesTable';
import StatisticsCard from './StatisticsCard';
import { format } from 'date-fns';
import '../../App.scss'

const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd')
const Home = () => {
   const dispatch = useDispatch();
   const { invoices } = useSelector(state => state?.invoices)
   const [statistics, setStatistics] = useState({})
   const [countStatistics, setCountStatistics] = useState([]);
   const [statsNumbers, setstatsNumbers] = useState([]);

   useEffect(() => {
      dispatch(getInvoices({ date: formatDate(new Date()) }))
      getInventoryStatistics();
   }, [dispatch])
   useEffect(() => {
      extractCounts();
      extractStats();
   }, [statistics])
   const getInventoryStatistics = async () => {
      try {
         const response = await getStatistics();
         setStatistics(response?.data);
      } catch (e) { console.log(e) }
   }
   const extractCounts = () => {
      const {
         total_products = 0,
         total_invoices = 0,
         total_clients = 0,
         total_colors = 0,
         total_sizes = 0,
         total_users = 0
      } = statistics?.count || {};
      setCountStatistics([
         total_products,
         total_invoices,
         total_clients,
         total_colors,
         total_sizes,
         total_users
      ]);
   }
   const extractStats = () => {
      const { total_cost = 0, revenue = 0, profit = 0 } = statistics?.stats || {};
      setstatsNumbers([total_cost, revenue, profit])
   }
   
   return (
      <section className='home-page'>
         <Container className=''>
            <h2 className='mb-4'>الصفحة الرئيسية</h2>
            <section className="features-wrapper">
               <Row className='feature-wrapper'>
                  <Col xs={12} sm={6} md={4} xl={3} key={10}>
                     <StatisticsCard
                        icon={<FaDollarSign />}
                        header='الميزانية'
                        number={typeof statistics?.stats?.budget === 'number' ? statistics?.stats?.budget?.toFixed(2) : 0}
                     />
                  </Col>
                  {featureCardData?.map((card, idx) => (
                     <Col xs={12} sm={6} md={4} xl={3} key={idx}>
                        <FeatureCard
                           path={card?.path}
                           header={card?.header}
                           icon={card?.icon}
                           title={card?.getTitle(countStatistics[idx])}
                        />
                     </Col>
                  ))}
               </Row>
            </section>
            <section className="last mt-4">
               <div className="head d-flex align-items-center mb-3">
                  <h4 className=''>اخر الاحداث</h4>
                  <small>[يوميا]</small>
               </div>
               <Row className='flex-column-reverse flex-md-row'>
                  <Col md={8} lg={9}>
                     {invoices?.length > 0
                        ? <LastInvoicesTable invoices={invoices} />
                        : <h6>لا يوجد فواتير تم اضافتها اليوم</h6>
                     }
                  </Col>
                  <Col md={4} lg={3}>
                     <div className="wrapper d-flex flex-column">
                        {StatisticsCardData?.map((item, idx) => (
                           <StatisticsCard
                              icon={item?.icon}
                              header={item?.header}
                              number={typeof statsNumbers[idx] === 'number' ? statsNumbers[idx]?.toFixed(2) : 0}
                           />
                        ))}
                     </div>
                  </Col>
               </Row>
            </section>
         </Container>
      </section>
   )
}

export default Home