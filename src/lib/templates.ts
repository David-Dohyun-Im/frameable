export interface TemplateMetadata {
  id: string;
  name: string;
  repo: string;
  description: string;
  useCases: string[];
  features: string[];
  technologies: string[];
}

export const templates: Record<string, TemplateMetadata> = {
  portfolio: {
    id: "portfolio",
    name: "Portfolio Template",
    repo: "https://github.com/David-Dohyun-Im/portfolio-template",
    description: "A modern portfolio website template with clean design, project showcase, and contact sections. Perfect for developers, designers, and professionals to showcase their work.",
    useCases: [
      "Personal portfolio websites",
      "Developer portfolios", 
      "Designer showcases",
      "Professional profiles",
      "Creative portfolios"
    ],
    features: [
      "Responsive design",
      "Project gallery",
      "About section",
      "Contact form",
      "Blog integration",
      "SEO optimized"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"]
  },
  newsletter: {
    id: "newsletter",
    name: "Newsletter Template", 
    repo: "https://github.com/David-Dohyun-Im/newsletter-template",
    description: "A newsletter and blog template for content creators, writers, and businesses. Features subscription management, article layouts, and email integration.",
    useCases: [
      "Newsletter websites",
      "Blog platforms",
      "Content marketing sites",
      "Email subscription services",
      "Publishing platforms"
    ],
    features: [
      "Article management",
      "Email subscriptions",
      "Content categorization",
      "Search functionality",
      "Social sharing",
      "RSS feeds"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"]
  },
  ecommerce: {
    id: "ecommerce",
    name: "E-commerce Template",
    repo: "https://github.com/David-Dohyun-Im/shopify-ecommerce-template", 
    description: "A comprehensive e-commerce template with product catalogs, shopping cart, payment integration, and order management. Built for online stores and marketplaces.",
    useCases: [
      "Online stores",
      "Marketplace platforms",
      "Product catalogs",
      "B2C e-commerce",
      "Digital product sales"
    ],
    features: [
      "Product management",
      "Shopping cart",
      "Payment processing",
      "Order tracking",
      "Inventory management",
      "Customer accounts"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Shopify"]
  },
  ai: {
    id: "ai",
    name: "AI Application Template",
    repo: "https://github.com/zachhere/yourai",
    description: "A modern AI application template built with Next.js. Perfect for creating AI-powered applications, chatbots, AI tools, and intelligent web services.",
    useCases: [
      "AI-powered websites",
      "Chatbot applications",
      "AI SaaS platforms",
      "Machine learning demos",
      "AI assistant interfaces",
      "LLM-based applications"
    ],
    features: [
      "AI integration ready",
      "Chat interface",
      "Modern UI components",
      "TypeScript support",
      "Responsive design",
      "API integration"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"]
  }
};
