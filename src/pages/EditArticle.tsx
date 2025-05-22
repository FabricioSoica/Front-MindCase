import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, HStack, Textarea, Image, Spinner } from '@chakra-ui/react';
import DashboardLayout from '../components/DashboardLayout';
import { articleService } from '../services/articles';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      try {
        const data = await articleService.getArticleById(Number(id!));
        setTitle(data.title);
        setContent(data.content);
        if (data.featuredImage) {
          const imageUrl = data.featuredImage.startsWith('http') ? data.featuredImage : `http://localhost:3000/uploads/${data.featuredImage}`;
          setImagePreview(imageUrl);
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Erro ao carregar artigo';
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
    }
    if (id) {
      fetchArticle();
    } else {
      const errorMessage = 'ID do artigo não fornecido.';
      setError(errorMessage);
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setLoading(false);
    }
  }, [id, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const token = localStorage.getItem('token');

    if (!token) {
      const errorMessage = 'Usuário não autenticado.';
      setError(errorMessage);
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setSaving(false);
      return;
    }

    const url = `http://localhost:3000/api/articles/${id}`;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('featuredImage', imageFile);

        await axios.put(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

      } else {
        const jsonData = {
          title: title,
          content: content,
        };

        await axios.put(url, jsonData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      await Swal.fire({
        title: 'Sucesso!',
        text: 'Artigo atualizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate(`/article/${id}`);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Erro ao atualizar artigo';
      setError(errorMessage);
      Swal.fire({
        title: 'Erro!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Flex justify="center" align="center" minH="60vh">
          <Spinner size="xl" />
        </Flex>
      </DashboardLayout>
    );
  }

  if (error && !loading && !saving) {
    // remover
  }

  return (
    <DashboardLayout>
      <Box w="100%" minH="calc(100vh - 80px)" bg="gray.50" py={6}>
        <Box maxW="1200px" mx="auto" px={6}>
          <Flex align="center" justify="space-between" mb={6} bg="white" p={4} borderRadius="lg" shadow="sm">
            <Text fontSize="xl" fontWeight="semibold">Editar Artigo</Text>
            <HStack spacing={3}>
              <Button colorScheme="red" variant="solid" onClick={() => navigate(-1)} size="md">
                Cancelar
              </Button>
              <Button 
                type="submit" 
                form="edit-article-form" 
                colorScheme="blackAlpha" 
                bg="black" 
                color="white" 
                isLoading={saving}
                size="md"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <form id="edit-article-form" onSubmit={handleSubmit}>
              <FormControl mb={6}>
                <FormLabel>Título</FormLabel>
                <Input 
                  placeholder="Adicione um título" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                  size="md"
                  fontSize="md"
                />
              </FormControl>
              <FormControl mb={6}>
                <FormLabel>Inserir imagem</FormLabel>
                <Flex gap={6} align="flex-start">
                  <Box flex={1}>
                    <Input 
                      value={imageFile ? imageFile.name : (imagePreview ? imagePreview.split('/').pop() : '')}
                      placeholder="Adicione uma imagem" 
                      isReadOnly
                      size="md"
                    />
                    <Button 
                      as="label" 
                      htmlFor="image-upload" 
                      colorScheme="blue" 
                      cursor="pointer" 
                      mt={3}
                      size="md"
                    >
                      Selecionar
                    </Button>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      display="none" 
                      onChange={handleImageChange} 
                    />
                  </Box>
                  <Box 
                    w="300px" 
                    h="200px" 
                    bg="#f2f4f6" 
                    borderRadius="md" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    overflow="hidden"
                  >
                    {imagePreview ? (
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        maxH="100%" 
                        maxW="100%" 
                        objectFit="contain" 
                      />
                    ) : (
                      <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="gray">
                        <rect width="100%" height="100%" fill="none" />
                        <path d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm16 0-4.5-6-3.5 4.5-2.5-3L3 19m16 0H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                      </svg>
                    )}
                  </Box>
                </Flex>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Texto</FormLabel>
                <Textarea 
                  placeholder="Escreva seu artigo" 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  minH="300px"
                  size="md"
                  fontSize="md"
                  required 
                />
              </FormControl>
            </form>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
} 