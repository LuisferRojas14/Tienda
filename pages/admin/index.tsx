import ProductionQuantityLimitsOutlined  from '@mui/icons-material/ProductionQuantityLimitsOutlined'
import AccessTimeFilledOutlined from '@mui/icons-material/AccessTimeFilledOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CancelPresentationOutlined from '@mui/icons-material/CancelPresentationOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import GroupAddOutlined from '@mui/icons-material/GroupAddOutlined';






import AdminLayout from '../../components/layouts/AdminLayout'
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';
import { useState, useEffect } from 'react';

const DashboardPage = () => {

    const {data, error } = useSWR<DashboardSummaryResponse>('/api/admin/deshboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    })
    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Tick');
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    
    if(!error && !data) {
        return <></>
    }

    if(error){
        console.log(error);
        return <Typography>Error al cargar la informacion</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadisticas generales'
            icon={<DashboardOutlined />}>

            <Grid container spacing={2}>
                <SummaryTile
                title={numberOfOrders}
                subTitle='Ordenes totales'
                icon={<CreditCardOffOutlined color='secondary' sx={{fontSize:40}}/>}
                />
                
                <SummaryTile
                title={paidOrders}
                subTitle='Ordenes pagadas'
                icon={<AttachMoneyOutlined color='success' sx={{fontSize:40}}/>}
                />
                <SummaryTile
                title={notPaidOrders}
                subTitle='Ordenes pendientes'
                icon={<CreditCardOffOutlined color='error' sx={{fontSize:40}}/>}
                />
                <SummaryTile
                title={numberOfClients}
                subTitle='Clientes'
                icon={<GroupAddOutlined color='primary' sx={{fontSize:40}}/>}
                />
                <SummaryTile
                title={numberOfProducts}
                subTitle='Productos'
                icon={<CategoryOutlined color='warning' sx={{fontSize:40}}/>}
                />
                <SummaryTile
                title={productsWithNoInventory}
                subTitle='Sin existencia'
                icon={<CancelPresentationOutlined color='error' sx={{fontSize:40}}/>}
                />
                <SummaryTile
                title={lowInventory}
                subTitle='Bajo inventario'
                icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize:40}}/>}
                />
                <SummaryTile
                title={refreshIn}
                subTitle='Actualizacion en:'
                icon={<AccessTimeFilledOutlined color='secondary' sx={{fontSize:40}}/>}
                />
            </Grid>

        </AdminLayout>
    )
}

export default DashboardPage
