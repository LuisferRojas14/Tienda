import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Typography } from "@mui/material";
import ShopLayout from "../components/layouts/ShopLayout";

export default function Custom404() {
  const router = useRouter();

  return (
    <ShopLayout title='Página no encontrada' pageDescription='Lo siento, la página que estás buscando no se encuentra en nuestro sitio web.'>
      <Box
        display='flex' justifyContent='center' alignItems='center'
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography variant='h1' component='h1' fontSize={72} fontWeight={700} color='#ff5c5c' mr={2}>404</Typography>
        <div>
          <Typography variant='body1' component='p' mb={2}>Lo siento, la página que estás buscando no se encuentra en nuestro sitio web.</Typography>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <button className="btn" onClick={() => router.push('./')}>Volver a la página principal</button>
            <Link href="/contacto">
              <button className="btn">Contáctanos</button>
            </Link>
            {/* haz un menú */} 
              
          </Box>
        </div>
      </Box>

      <style jsx>{`
        /* Estilos CSS para personalizar la página de error 404 */
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background-color: #ff5c5c;
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.2s ease-in-out;
          margin-right: 10px;
        }
        .btn:hover {
          background-color: #e74c3c;
        }
      `}</style>
    </ShopLayout>
  );
}
