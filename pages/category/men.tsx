import type { NextPage } from "next"
import { Typography } from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import { useProducts } from "../../hooks";


const MenPage: NextPage = () => {

  const {products,isLoading} = useProducts('/products?gender=men');

  return (  
    <ShopLayout title={'Tesla-shop - Men'} pageDescription={'Encuentra los mejores productos de teslas para ellos'}>
  <Typography variant="h1" component='h1'>Hombres</Typography>
  <Typography variant="h2" sx={{mb:1}}>Productos para hombre</Typography>
  
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


export default MenPage;