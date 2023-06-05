import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AdminLayout from '../../components/layouts/AdminLayout'
import ConfirmationNumberOutlined  from '@mui/icons-material/ConfirmationNumberOutlined';
import useSWR from 'swr';
import { IOrder, IUser } from '../../interfaces';

const columns : GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 250},
    { field: 'email', headerName: 'Correo', width: 250},
    { field: 'name', headerName: 'Nombre completo', width: 300},
    { field: 'total', headerName: 'Monto total', width: 300},
    {
        field: 'isPaid',
        headerName: 'Pagado',
        renderCell: (params: GridRenderCellParams) => {
            return params.row.isPaid ? (
              <Chip variant='outlined' label='Pagado' color='success' />
            ) : (
              <Chip variant='outlined' label='Pendiente' color='error' />
            );
          },
    },
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150},
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: (params: GridRenderCellParams) => {
            return (
                <a href={`/admin/orders/${params.row.id}`} target='_blank' rel='noreferrer'>
                 Ver orden
                </a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 300},

];
const OrdersPage = () => {
    const {data, error} = useSWR<IOrder[]>('/api/admin/orders');
    if (!data && !error) return (<></>);

    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProducts: order.numberOfItems,
        createdAt: order.createdAt,
    }));

  return (
    <AdminLayout
        title={'Ordenes'}
        subTitle={'Mantenimiento de Ordenes'}
        icon={<ConfirmationNumberOutlined/>}
        >
             <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10} },
                }}/>
            </Grid>
      </Grid>


        </AdminLayout>

  )
}

export default OrdersPage
