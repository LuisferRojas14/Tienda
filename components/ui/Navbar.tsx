import { AppBar, Box, Button, Link, Toolbar, IconButton, Typography, Badge, Input, InputAdornment } from "@mui/material"
import NextLink from 'next/link';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from "next/router";

import { CartContext, UiContext } from "../../context";
import { useContext, useState } from "react";

export const Navbar = () => {

  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const {numberOfItems} = useContext(CartContext);
  const [SearchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTeam = () => {
    if (SearchTerm.trim().length === 0) return;
    push(`/search/${SearchTerm}`);
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo|</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display:isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
              className='fadeIn'>
          <NextLink href='/category/men' passHref legacyBehavior>

            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
              Hombres
            </Button>

          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>

            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
              Mujeres
            </Button>

          </NextLink>
          <NextLink href='/category/kid' passHref legacyBehavior>
            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
              Niños
            </Button>
          </NextLink>
        </Box>
        <Box flex={1} />
        {/* pantallas grande */}
        {
          isSearchVisible
            ? (
              <Input
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                className="fadeIn"
                autoFocus
                value={SearchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? onSearchTeam() : null}
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                 onClick={()=> setIsSearchVisible(true)}
                 className="fedeIn"
                 sx={{display:{xs:'none', sm:'flex'}}}>
                <SearchOutlined />
              </IconButton>
            )
        }

        {/* pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9': numberOfItems} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>                      </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}


