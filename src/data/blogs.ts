export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedDate: string;
  category: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Authentic Neapolitan Pizza: Traditional Techniques Meet Modern Ovens",
    slug: "authentic-neapolitan-pizza-techniques",
    excerpt: "Discover the secrets behind perfect Neapolitan pizza and how modern wood-fired ovens preserve traditional Italian cooking methods.",
    content: "Authentic Neapolitan pizza represents centuries of Italian culinary tradition...",
    image: "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Chef Marco Italiano",
    publishedDate: "2024-03-15",
    category: "Cooking Tips",
    readTime: "8 min read",
    tags: ["Neapolitan", "Traditional Cooking", "Wood-Fired", "Italian Cuisine"]
  },
  {
    id: 2,
    title: "Wood-Fired vs Gas Ovens: Complete Guide for Restaurant Owners",
    slug: "wood-fired-vs-gas-ovens-guide",
    excerpt: "Compare the benefits, costs, and operational differences between wood-fired and gas pizza ovens for commercial use.",
    content: "Choosing the right oven type is crucial for your restaurant's success...",
    image: "https://images.pexels.com/photos/5175654/pexels-photo-5175654.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Restaurant Consultant Team",
    publishedDate: "2024-03-10",
    category: "Business Guide",
    readTime: "12 min read",
    tags: ["Business", "Commercial", "Comparison", "Investment"]
  },
  {
    id: 3,
    title: "Pizza Oven Maintenance: Essential Tips for Longevity",
    slug: "pizza-oven-maintenance-tips",
    excerpt: "Learn how to properly maintain your pizza oven to ensure optimal performance and extend its lifespan for years to come.",
    content: "Proper maintenance is key to getting the most out of your pizza oven investment...",
    image: "https://images.pexels.com/photos/4087367/pexels-photo-4087367.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Technical Support Team",
    publishedDate: "2024-03-05",
    category: "Maintenance",
    readTime: "6 min read",
    tags: ["Maintenance", "Care", "Longevity", "Performance"]
  }
];