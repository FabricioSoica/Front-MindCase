import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Image, VStack, Spinner, Heading, Flex } from '@chakra-ui/react';
import DashboardLayout from '../components/Header';
import { articleService } from '../services/articles';
import Swal from 'sweetalert2';

interface Article {
  id: number;
  title: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  User: {
    name: string;
  };
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      try {
        const data = await articleService.getArticleById(Number(id));
        setArticle(data);
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || 'Erro ao carregar artigo';
        setError(errorMessage);
        console.error("Erro ao buscar artigo:", err);
        Swal.fire({
          title: 'Erro ao carregar artigo!',
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

  if (!article) {
     Swal.fire({
        title: 'Artigo não encontrado!',
        text: 'O artigo que você procura não existe.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    return (
      <DashboardLayout>
        <Box p={4}>
          {/* <Text>Artigo não encontrado.</Text> */} 
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box p={4} maxW="1000px" mx="auto">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl">{article.title}</Heading>
          <Text fontSize="sm" color="gray.500">Por {article.User.name} - {formatDate(article.createdAt)}</Text>
          {article.featuredImage && (
            <Image 
              src={`http://localhost:3000/uploads/${article.featuredImage}`}
              alt={article.title}
              maxH="400px"
              width="100%"
              objectFit="contain"
              borderRadius="md"
            />
          )}
          <Box>
            <Text>{article.content}</Text>
          </Box>
        </VStack>
      </Box>
    </DashboardLayout>
  );
} 