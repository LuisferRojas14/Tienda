import ShopLayout from '../../components/layouts/ShopLayout'
import { Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagado',
        description: 'Esta orden ya fue pagada?',
        width:200,

        renderCell: (params: GridRenderCellParams) => {

            return (
                params.row.paid 
            ? <Chip color='success' label='pagado' variant='outlined'/> 
            : <Chip color='error' label='pendiente' variant='outlined'/>
            )
        }
    },

    {
    field: 'Orden',
        headerName: 'Ver Orden',
        width:200,
        sortable: false,

        renderCell: (params: GridRenderCellParams) => {

            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    Ver orden
                    </NextLink>
            )
        }
    }
];
const rows = [
    { id: 1,paid:true, fullname: 'Luis Rojas' },
    { id: 2,paid:false, fullname: 'Maria Rojas' },
    { id: 3,paid:true, fullname: 'Berlis Aguilar' },
    { id: 4,paid:false, fullname: 'Shirlys Rojas' },
    { id: 5,paid:false, fullname: 'Mayra Ponzon' },
    { id: 6,paid:true, fullname: 'Adriana Rojas' },
]
const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription='Historial de ordenes del cliente'>
        <Typography variant="h1" component='h1'>Historial de ordenes
        </Typography>
        <Grid container>
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10} },
                }}/>
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage
