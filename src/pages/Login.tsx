import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Link as ChakraLink, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ email, password });
      await Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Erro ao fazer login';
      setError(errorMessage);
      await Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
    }
  };

  return (
    <Flex minH="100vh" w="100vw">
      {/* Lado esquerdo preto com logo */}
      <Box w="50vw" h="100vh" bg="black" color="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box textAlign="center">
          <Text fontSize="7xl" fontWeight="bold" letterSpacing="widest">M.</Text>
          <Text fontSize="md" mt={2}>Inovação ao Seu Alcance.</Text>
        </Box>
      </Box>
      {/* Lado direito com formulário */}
      <Box w="50vw" h="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
        <Box w="100%" maxW="350px">
          <Text fontSize="2xl" fontWeight="semibold" mb={8} textAlign="center">Conectar</Text>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Senha</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box textAlign="right" mb={4}>
              <ChakraLink as={Link} to="/changepassword" fontSize="sm">Esqueceu a senha?</ChakraLink>
            </Box>
            <Button type="submit" colorScheme="blackAlpha" bg="black" color="white" w="100%" mb={4} _hover={{ bg: 'gray.800' }}>
              Entrar
            </Button>
          </form>
          <Text textAlign="center" fontSize="sm">
            Novo usuário?{' '}
            <ChakraLink as={Link} to="/register" color="black" fontWeight="medium">
              Clique aqui
            </ChakraLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
} 