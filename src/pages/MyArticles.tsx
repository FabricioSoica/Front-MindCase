import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, VStack, Spinner, Heading, Flex, SimpleGrid, Image, Button } from '@chakra-ui/react';
import DashboardLayout from '../components/Header';
import { articleService } from '../services/articles';
import Swal from 'sweetalert2';

interface Article {
  id: number;
  title: string;
  content: string;
  featuredImage?: string;
  createdAt: string;
  User: {
    name: string;
  };
}

export default function MyArticles() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMyArticles() {
      setLoading(true);
      try {
        if (id) {
          const data = await articleService.getArticlesByAuthorId(Number(id));
          setArticles(data);
        } else {
           const errorMessage = 'ID do autor não fornecido.';
           setError(errorMessage);
           Swal.fire({
              title: 'Erro!',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK'
            });
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Erro ao carregar artigos';
        setError(errorMessage);
        console.error("Erro ao buscar artigos do autor:", err);
        Swal.fire({
          title: 'Erro ao carregar artigos!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMyArticles();

  }, [id]);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
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

   if (error) {
     return (
       <DashboardLayout>
         <Box p={4}>
           <Text color="red.500">{error}</Text>
         </Box>
       </DashboardLayout>
     );
   }

  return (
    <DashboardLayout>
      <Box p={4} maxW="1200px" mx="auto">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl">Meus Artigos</Heading>

          {articles.length === 0 ? (
            <Text>Você ainda não publicou nenhum artigo.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {articles.map(article => (
                <Box key={article.id} borderWidth="1px" borderRadius="lg" overflow="hidden" pb={4} shadow="sm">
                  {article.featuredImage && (
                    <Image 
                      src={`http://localhost:3000/uploads/${article.featuredImage}`}
                      alt={article.title}
                      height="200px"
                      width="100%"
                      objectFit="cover"
                    />
                  )}
                  <Box p={4}>
                    <Heading as="h3" size="md" mb={2}>{article.title}</Heading>
                    <Text fontSize="sm" color="gray.500" mb={3}>Publicado em {formatDate(article.createdAt)}</Text>
                    {/* <Text fontSize="md">{article.content.substring(0, 150)}...</Text> */}
                    <Button 
                      mt={4} 
                      colorScheme="blue" 
                      size="sm"
                      onClick={() => navigate(`/article/${article.id}/edit`)}
                    >
                      Editar
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Box>
    </DashboardLayout>
  );
} 