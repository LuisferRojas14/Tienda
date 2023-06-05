import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import  VpnKeyOutlined  from "@mui/icons-material/VpnKeyOutlined"
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import EscalatorWarningOutlined from '@mui/icons-material/EscalatorWarningOutlined';
import FemaleOutlined from '@mui/icons-material/FemaleOutlined';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
import MaleOutlined from '@mui/icons-material/MaleOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { UiContext } from "../../context/ui/UiContext";

import { useRouter } from 'next/router';
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import DashboardOutlined  from "@mui/icons-material/DashboardOutlined";



export const SideMenu = () => {

    const router = useRouter();
    // console.log({router});
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
    const { user, isLoggedIn,logout } = useContext(AuthContext);
    const [SearchTerm, setSearchTerm] = useState('');

    const onSearchTeam = () => {
        if (SearchTerm.trim().length === 0) return;
        navigateTo(`/search/${SearchTerm}`);
    }

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }


    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={SearchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTeam() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTeam}

                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    {
                        isLoggedIn && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem 
                                button
                                onClick={() => navigateTo('/orders/history')}
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )

                    }




                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/men')}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/women')}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navigateTo('/category/kid')}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>

                    {
                        isLoggedIn 
                        ? (
                            <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                        )
                        : (
                            <ListItem button 
                            onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                        )
                    }


                   

                   

                    {/* Admin */}
               {

                    user?.role === 'admin' && (
                        <>
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>
                    
                    <ListItem 
                    button
                    onClick={() => navigateTo('/admin/')}>
                        <ListItemIcon>
                            <DashboardOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>

                    <ListItem button
                     onClick={() => navigateTo('/admin/products')}
                     >
                        <ListItemIcon>
                            <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItem>
                    <ListItem button
                     onClick={() => navigateTo('/admin/orders')}
                    >
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItem>

                    <ListItem 
                    button
                    onClick={() => navigateTo('/admin/users')}>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>
                       </>
                    )
                }
                   
                </List>
            </Box>
        </Drawer>
    )
}