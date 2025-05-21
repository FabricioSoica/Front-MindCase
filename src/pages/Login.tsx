import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao fazer login');
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
              <Input type="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} required />
            </FormControl>
            <Box textAlign="right" mb={4}>
              <ChakraLink as={Link} to="/changepassword" fontSize="sm">Esqueceu a senha?</ChakraLink>
            </Box>
            {error && <Text color="red.500" mb={2} fontSize="sm">{error}</Text>}
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