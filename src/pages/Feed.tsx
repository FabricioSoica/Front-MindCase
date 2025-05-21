import { useEffect, useState } from 'react';
import { Box, Text, Image, VStack, Flex, SimpleGrid, Heading } from '@chakra-ui/react';
import DashboardLayout from "../components/DashboardLayout";
import { articleService } from '../services/articles';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  featuredImage: string;
  createdAt: string;
  User: {
    name: string;
  };
}

export default function Feed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await articleService.getArticles();
        setArticles(data.articles);
      } catch (error) {
        console.error("Erro ao buscar artigos:", error);
      }
    }
    fetchArticles();
  }, []);

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <DashboardLayout>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {articles.map(article => (
            <Box 
              key={article.id} 
              onClick={() => handleArticleClick(article.id)} 
              cursor="pointer" 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              pb={4}
            >
              <Image src={`http://localhost:3000${article.featuredImage}`} alt={article.title} width="50%" height="30vh" objectFit="cover" />
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>{article.title}</Heading>
                <Text fontSize="sm" color="gray.500">Por {article.User.name} - {formatDate(article.createdAt)}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </DashboardLayout>
  );
} 