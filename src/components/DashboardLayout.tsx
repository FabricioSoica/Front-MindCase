import { type ReactNode } from 'react';
import { Box, Flex, Text, HStack, Avatar, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  avatarUrl?: string;
}

export default function DashboardLayout({ children, avatarUrl }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let user = null;
  try {
    user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  } catch {}

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box minH="100vh" bg="white">
      {/* Header */}
      <Flex align="center" justify="space-between" px={8} py={4} borderBottom="1px solid #eee">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          letterSpacing="widest"
          fontFamily="serif"
          cursor="pointer"
          onClick={() => navigate('/')}
        >
          M.
        </Text>
        <HStack spacing={6} align="center">
          <Text as="a" href="/" fontWeight="medium">Home</Text>
          <Text as="a" href="/" fontWeight="medium">Artigos</Text>
          <Text>|</Text>
          <Text as="a" href="/article/new" fontWeight="medium">Publicar</Text>
          {token ? (
            <Menu>
              <MenuButton>
                <Avatar size="sm" src={avatarUrl || user?.avatarUrl} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => user?.id ? navigate(`/user/${user.id}`) : navigate('/login')}
                >
                  Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Desconectar</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Text as="a" href="/login" fontWeight="medium">Entrar</Text>
              <Button size="sm" onClick={() => navigate('/register')}>Registrar</Button>
            </>
          )}
        </HStack>
      </Flex>
      {children}
    </Box>
  );
}