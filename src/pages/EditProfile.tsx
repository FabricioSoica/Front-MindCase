import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Avatar, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/auth';
import DashboardLayout from '../components/Header';
import Swal from 'sweetalert2';
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  avatar?: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Buscar dados reais do usuário
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.id) {
        setUser(storedUser);
        setName(storedUser.name || '');
        setEmail(storedUser.email || '');
        if (storedUser.avatar) {
          setAvatarUrl(`http://localhost:3000/uploads/${storedUser.avatar}`);
        }
      } else {
        navigate('/login');
      }
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      const errorMessage = 'Dados do usuário não disponíveis.';
      setError(errorMessage);
      setLoading(false);
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const errorMessage = 'Usuário não autenticado.';
      setError(errorMessage);
      setLoading(false);
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const url = `http://localhost:3000/api/users/${user.id}`;

      if (avatarFile) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('avatar', avatarFile);

        const response = await axios.put(url, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const updatedUser = { 
          ...user, 
          name: response.data.user.name, 
          avatar: response.data.user.avatar 
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('token', response.data.token);
        
        // Atualizar a URL do avatar após o upload
        if (response.data.user.avatar) {
          setAvatarUrl(`http://localhost:3000/uploads/${response.data.user.avatar}`);
        }
      } else {
        const response = await axios.put(url, { name }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const updatedUser = { ...user, name: response.data.user.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem('token', response.data.token);
      }

      await Swal.fire({
        title: 'Sucesso!',
        text: 'Perfil atualizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate(`/user/${user.id}`);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Erro ao atualizar perfil';
      setError(errorMessage);
      Swal.fire({
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
    <DashboardLayout avatarUrl={avatarUrl}>
      {/* Conteúdo */}
      <Flex px={24} py={10} align="flex-start" gap={16}>
        <Box flex={1} maxW="500px">
          <Text fontSize="2xl" fontWeight="semibold" mb={6}>Editar Perfil</Text>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Inserir avatar</FormLabel>
              <HStack align="center">
                <Input value={avatarFile ? avatarFile.name : (user?.avatar ? user.avatar : '')} isReadOnly />
                <Button as="label" htmlFor="avatar-upload" colorScheme="blue" cursor="pointer" minW="110px">Selecionar</Button>
                <Input id="avatar-upload" type="file" accept="image/*" display="none" onChange={handleAvatarChange} />
              </HStack>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input value={email} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Nome Completo</FormLabel>
              <Input value={name} onChange={e => setName(e.target.value)} required />
            </FormControl>
            <Button mb={6} colorScheme="gray" variant="outline" onClick={() => navigate('/changepassword')}>
              Alterar senha
            </Button>
            <HStack mt={8} spacing={4}>
              <Button colorScheme="red" variant="solid" onClick={() => navigate(-1)} minW="110px">Cancelar</Button>
              <Button type="submit" colorScheme="blackAlpha" bg="black" color="white" isLoading={loading} minW="110px">Salvar</Button>
            </HStack>
            {error && <Text color="red.500" mt={2}>{error}</Text>}
          </form>
        </Box>
        <Box minW="260px" display="flex" flexDirection="column" alignItems="center" mt={12}>
          <Avatar size="2xl" border="5px solid #ccc" src={avatarUrl} boxSize="220px" />
        </Box>
      </Flex>
    </DashboardLayout>
  );
} 