<p align="center">
  <img src="icon.png" alt="Frameable Logo" width="75">
</p>

# Frameable

**Build designer level websites at one shot** - An AI-powered app builder that creates websites and applications through natural language conversations.

Frameable is an intelligent development assistant that transforms your ideas into fully functional web applications. Simply describe what you want to build, and Frameable will create it for you with real-time preview and deployment capabilities.

> **Note**: This project is a fork of [Adorable](https://github.com/freestyle-sh/Adorable) by Freestyle, an open-source version of Lovable - an AI agent that can make websites and apps through a chat interface.

## Features

- 🤖 **AI-Powered Development**: Natural language to code conversion
- 💬 **Interactive Chat Interface**: Real-time conversation with AI assistant
- 🚀 **Live Preview**: See your applications come to life instantly
- 🔄 **Real-time Collaboration**: Multiple users can work on the same project
- 📱 **Responsive Design**: Automatically generates mobile-friendly interfaces
- 🎨 **Modern UI Components**: Built with Tailwind CSS and Radix UI
- 🔐 **User Authentication**: Secure login with Stack Auth
- 📊 **Project Management**: Track and organize your applications
- 🌐 **Live Deployment**: Deploy applications with custom domains
- 🛠️ **Code Generation**: Full-stack applications with Next.js, React, and TypeScript

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **AI Integration**: Anthropic Claude, Freestyle Sandboxes, Mastra
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Stack Auth
- **Caching**: Redis
- **Deployment**: Freestyle Cloud Platform
- **State Management**: Zustand, TanStack Query

## Setup Instructions

### Dependencies

- Node.js
- PostgreSQL database ([Neon](https://neon.tech) is easy and has a good free tier)
- Redis (for caching and session management)
- Anthropic API key
- Freestyle API key
- Morph API key (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/David-Dohyun-Im/frameable.git
   cd frameable
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Get a Freestyle API key

   Head to [our API keys page](https://admin.freestyle.sh/dashboard/api-tokens) to get yours. We're totally free to use right now!

4. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL= {get it from Neon}

   # Redis
   REDIS_URL=redis://localhost:6379

   # Anthropic API
   ANTHROPIC_API_KEY=your_anthropic_api_key

   # Freestyle API
   FREESTYLE_API_KEY=your_freestyle_api_key

   # Stack Auth
   NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_client_key
   STACK_SECRET_SERVER_KEY=your_secret_server_key

   # Optional: Preview Domain
   PREVIEW_DOMAIN=your-domain.com

   # Optional: Morph API for fast edits
   MORPH_API_KEY=your_morph_api_key
   ```

5. Initialize the database:

   ```bash
   npx drizzle-kit push
   ```

6. Set up Redis

The easiest way to run Redis locally is with Docker:

```bash
docker run --name moov-redis -p 6379:6379 -d redis
```

This will start a Redis server on port 6379. If you already have Redis running, you can skip this step.

Add the following to your `.env` file (if not already present):

```env
REDIS_URL=redis://localhost:6379
```

6. Set up [Stack Auth](https://stack-auth.com)

Go to the [Stack Auth dashboard](https://app.stack-auth.com) and create a new application. In Configuration > Domains, enable `Allow all localhost callbacks for development` to be able to sign in locally.

You'll need to add the following environment variables to your `.env` file:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<your-publishable-client-key>
STACK_SECRET_SERVER_KEY=<your-secret-server-key>
```

7. Add a Preview Domain (optional)

Go to the [Freestyle dashboard](https://admin.freestyle.sh/dashboard/domains) and verify a new domain. Then follow the [DNS Instructions](https://docs.freestyle.sh/web/deploy-to-custom-domain) to point your domain to Freestyle.

Finally, add the following environment variable to your `.env` file:

```env
PREVIEW_DOMAIN=<your-domain> # formatted like moov.app
```

8. Add Morph for Fast Apply (optional)

Get a Morph API key from [morphllm.com](https://morphllm.com) and add it to your `.env` file to enable the fast edit tool:

```env
MORPH_API_KEY=<your-morph-api-key>
```

This automatically enables the Morph fast edit tool which provides faster code modifications.

9. Run the development server:

   ```bash
   npm run dev
   ```

10. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use Frameable

1. **Start Building**: Enter your project description in the main input field
2. **Chat with AI**: Use the chat interface to refine and iterate on your application
3. **Live Preview**: Watch your application update in real-time as you make changes
4. **Deploy**: Publish your application with a custom domain

### Example Prompts

- "Create a landing page for an AI-powered SaaS product"
- "Build a dashboard for tracking user analytics"
- "Make a portfolio website for a freelance designer"
- "Create a blog with a modern, responsive design"

## Developer Documentation

- [Forking Guide](./docs/forking.md) - Comprehensive guide for developers working with this codebase

## Deployment

For production deployment:

```bash
npm run build
npm run start
```

Or use the included deployment script:

```bash
./deploy.sh
```

## Contributing

We welcome contributions to Frameable! Here's how you can help:

1. **Report Issues**: Found a bug? Please report it on our issue tracker
2. **Feature Requests**: Have an idea? We'd love to hear it
3. **Code Contributions**: Submit pull requests for bug fixes or new features
4. **Documentation**: Help improve our documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

