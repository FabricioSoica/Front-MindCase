import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
      setError('As senhas não coincidem');
      return;
    }
    setLoading(true);
    // todo: chamar a api de troca de senha
    setTimeout(() => {
      setSuccess('Senha alterada com sucesso!');
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
            {error && <Text color="red.500" mb={2} fontSize="sm">{error}</Text>}
            {success && <Text color="green.500" mb={2} fontSize="sm">{success}</Text>}
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