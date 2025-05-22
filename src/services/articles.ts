import api from '../config/axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  updatedAt: string;
  User: User;
}

interface ArticleResponse {
  articles: Article[];
  total: number;
  pages: number;
  currentPage: number;
}

interface CreateArticleData {
  title: string;
  content: string;
  featuredImage?: File;
}

interface UpdateArticleData extends CreateArticleData {}

export const articleService = {
  async getArticles(page = 1, limit = 10): Promise<ArticleResponse> {
    const response = await api.get<ArticleResponse>('/articles', {
      params: { page, limit }
    });
    return response.data;
  },

  async getArticleById(id: number): Promise<Article> {
    const response = await api.get<Article>(`/articles/${id}`);
    return response.data;
  },

  async getArticlesByAuthorId(authorId: number): Promise<Article[]> {
    const response = await api.get<Article[]>(`/articles/author/${authorId}`);
    return response.data;
  },

  async createArticle(data: CreateArticleData): Promise<Article> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.featuredImage) {
      formData.append('featuredImage', data.featuredImage);
    }

    const response = await api.post<Article>('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateArticle(id: number, data: UpdateArticleData): Promise<Article> {
    if (data.featuredImage) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('featuredImage', data.featuredImage);

      const response = await api.put<Article>(`/articles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await api.put<Article>(`/articles/${id}`, {
        title: data.title,
        content: data.content,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }
  },

  async deleteArticle(id: number): Promise<void> {
    await api.delete(`/articles/${id}`);
  }
}; 