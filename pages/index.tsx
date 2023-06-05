import type { NextPage } from "next"
import { Typography } from "@mui/material";
import ShopLayout from "../components/layouts/ShopLayout";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import FullScreenLoading from "../components/ui/FullScreenLoading";




const HomePage: NextPage = () => {
  

  const {products,isLoading} = useProducts('/products');

  return (  
    <ShopLayout title={'Tesla-shop - Home'} pageDescription={'Encuentra los mejores productos de teslas aquí'}>
  <Typography variant="h1" component='h1'>Tienda</Typography>
  <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
  
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


export default HomePage