import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material"
import ShopLayout from "../../components/layouts/ShopLayout"
import { CartList, OrderSummary } from "../../components/cart"
import NextLink from 'next/link';
import Link from "next/link";
import { CreditCardOffOutlined } from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout title="Resumen de la orden 23244423"  pageDescription={'Resumen de la orden'}>
      <Typography variant="h1" component='h1'>Order: ABSJ3</Typography>
      {/* <Chip sx={{my:2}}
      label='pendiente de pago'
      variant="outlined"
      color="error"
      icon={<CreditCardOffOutlined/>}/> */}
      <Chip sx={{my:2}}
      label='pagado'
      variant="outlined"
      color="success"
      icon={<CreditCardOffOutlined/>}/>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList/>
         </Grid>
         <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{my:1}}/>
              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Direccion de entrega</Typography>
                <NextLink href='/checkout/address' passHref legacyBehavior> 
                    Editar
                </NextLink>
              </Box>
              
              <Typography>LuisFer Rojas</Typography>
              <Typography>El bolsillo</Typography>
              <Typography>Calle atras</Typography>
              <Typography>Colombia</Typography>
              <Typography>57+ 312451264</Typography>

              <Divider sx={{my:1}}/>
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref legacyBehavior> 
                    Editar
                </NextLink>
              </Box>
              <OrderSummary/>
              <Box sx={{mt:3}}>
               <h1>Pagar</h1>
               <Chip sx={{my:2}}
                   label='Orden ya fué pagado'
                   variant="outlined"
                   color="success"
                   icon={<CreditCardOffOutlined/>}/>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export default OrderPage
