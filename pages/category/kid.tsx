import type { NextPage } from "next"
import { Typography } from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import { useProducts } from "../../hooks";


const KidPage: NextPage = () => {

  const {products,isLoading} = useProducts('/products?gender=kid');

  return (  
    <ShopLayout title={'Tesla-shop - Kids'} pageDescription={'Encuentra los mejores productos de teslas aquí'}>
  <Typography variant="h1" component='h1'>Niños</Typography>
  <Typography variant="h2" sx={{mb:1}}>Productos para niños</Typography>
  
  {
    isLoading
    ?<FullScreenLoading/>
    :<ProductList products={products}/>
  }
  
  <ProductList
     products={products}
  />
    </ShopLayout>
  )
}


export default KidPage