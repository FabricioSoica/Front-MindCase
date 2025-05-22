import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ChangePassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      const errorMessage = 'As senhas não coincidem';
      setError(errorMessage);
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    setLoading(true);
    // todo: chamar a api de troca de senha
    setTimeout(async () => {
      // Simulando sucesso/erro da API. Em uma implementação real, você trataria a resposta da chamada à API.
      const apiSuccess = true; // Mude para false para testar o erro

      if (apiSuccess) {
         setSuccess('Senha alterada com sucesso!');
         await Swal.fire({
          title: 'Sucesso!',
          text: 'Senha alterada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
         const errorMessage = 'Erro ao alterar a senha. Tente novamente.'; // Mensagem de erro simulada
         setError(errorMessage);
         await Swal.fire({
          title: 'Erro!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

      setLoading(false);
    }, 1000);
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
          <Text fontSize="2xl" fontWeight="semibold" mb={8} textAlign="center">Esqueci a senha</Text>
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
            <Button type="submit" colorScheme="blackAlpha" bg="black" color="white" w="100%" mb={4} _hover={{ bg: 'gray.800' }} isLoading={loading}>
              Alterar
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