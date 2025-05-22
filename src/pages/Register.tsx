import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import Swal from 'sweetalert2';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      const errorMessage = 'As senhas não coincidem';
      setError(errorMessage);
      await Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    setLoading(true);
    try {
      await authService.register({ name: email.split('@')[0], email, password });
      await Swal.fire({
        title: 'Sucesso!',
        text: 'Conta criada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Erro ao registrar';
      setError(errorMessage);
      await Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
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
          <Text fontSize="2xl" fontWeight="semibold" mb={8} textAlign="center">Registrar</Text>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="****" value={password} onChange={e => setPassword(e.target.value)} required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirmar senha</FormLabel>
              <Input type="password" placeholder="****" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </FormControl>
            {/* {error && <Text color="red.500" mb={2} fontSize="sm">{error}</Text>} */}
            <Button type="submit" colorScheme="blackAlpha" bg="black" color="white" w="100%" mb={4} _hover={{ bg: 'gray.800' }} isLoading={loading}>
              Criar conta
            </Button>
          </form>
          <Text textAlign="center" fontSize="sm">
            Já tem cadastro?{' '}
            <ChakraLink as={Link} to="/login" color="black" fontWeight="medium">
              Clique aqui
            </ChakraLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
} 