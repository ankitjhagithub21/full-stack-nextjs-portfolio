# Portfolio Website Template

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This template features a sleek dark theme with purple/pink gradient accents, smooth animations, and a content management system powered by MongoDB.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16, TypeScript, Tailwind CSS, Framer Motion
- **Optimized Performance**: Single API call for all portfolio data
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Admin Dashboard**: Content management system for portfolio data
- **Cloudinary Integration**: Optimized image hosting and delivery
- **Component-Based Architecture**: Reusable and maintainable code
- **SEO Optimized**: Meta tags and semantic HTML
- **Dark Theme**: Eye-catching dark theme with gradient accents

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn or pnpm
- MongoDB (local or cloud instance)
- Cloudinary account (for image hosting)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/portfolio
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── (public)/           # Public routes
│   │   └── page.tsx       # Home page
│   ├── (admin)/           # Admin dashboard routes
│   └── api/               # API routes
│       ├── home/          # Single API endpoint for portfolio data
│       ├── about/         # About data management
│       ├── projects/      # Projects data management
│       ├── skills/        # Skills data management
│       ├── experience/    # Experience data management
│       ├── education/     # Education data management
│       └── contact/       # Contact form handling
├── components/
│   ├── portfolio/         # Portfolio components
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── experience.tsx
│   │   ├── education.tsx
│   │   ├── projects.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   └── ui/               # Reusable UI components
├── hooks/
│   └── usePortfolioData.ts # Custom hook for data fetching
├── lib/
│   ├── db.ts             # Database connection
│   └── cloudinary.ts     # Cloudinary configuration
├── models/              # MongoDB schemas
└── public/              # Static assets
```

## 🎨 Customization Guide

### 1. Personal Information

Update your personal information in the admin dashboard or directly in the database:

- **About Section**: Name, bio, profile picture, skills, stats
- **Contact Information**: Email, social media links
- **Footer**: Personal details and links

### 2. Styling and Theme

**Color Scheme**: The theme uses purple and pink gradients. To customize:

1. Edit `tailwind.config.js` for global colors
2. Update gradient classes in components:
   - `from-purple-400 to-pink-400`
   - `from-purple-500 to-pink-500`

**Typography**: Font settings are in `app/layout.tsx` and `tailwind.config.js`

### 3. Adding Content

**Projects**:
```typescript
// Via admin dashboard or API
{
  title: "Project Name",
  description: "Project description",
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://project-demo.com",
  image: "project-image.jpg"
}
```

**Skills**:
```typescript
{
  name: "React",
  category: "Frontend",
  level: 90,
  order: 1
}
```

**Experience**:
```typescript
{
  company: "Company Name",
  position: "Senior Developer",
  description: "Job description",
  startDate: "2023-01-01",
  currentlyWorking: true,
  location: "Remote"
}
```

### 4. Component Customization

Each component is modular and can be customized:

- **Hero Section**: `components/portfolio/hero.tsx`
- **About Section**: `components/portfolio/about.tsx`
- **Skills Section**: `components/portfolio/skills.tsx`
- **Projects Section**: `components/portfolio/projects.tsx`
- **Footer**: `components/portfolio/footer.tsx`

### 5. Social Links

Update social media links in the footer component:
```typescript
const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yourusername", label: "Twitter" },
  { icon: Mail, href: "mailto:your.email@example.com", label: "Email" }
]
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

**Build the project**:
```bash
npm run build
```

**Start production server**:
```bash
npm start
```

## 📊 Performance Optimization

This template includes several optimizations:

- **Single API Call**: All portfolio data fetched in one request
- **Image Optimization**: Cloudinary integration for optimized images
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Components load as needed
- **Minimal Bundle**: Tree-shaking and optimization

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**1. Database Connection Error**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Verify network connectivity

**2. Cloudinary Upload Error**
- Verify Cloudinary credentials
- Check folder permissions
- Ensure API key has upload permissions

**3. Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript types
- Verify all imports

**4. Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting class names
- Verify responsive breakpoints

### Getting Help

- Check the [Issues](https://github.com/yourusername/your-portfolio/issues) page
- Review the [Next.js Documentation](https://nextjs.org/docs)
- Consult the [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🌟 Show Your Support

If you find this template helpful, please:

- ⭐ Star the repository
- 🐦 Follow on Twitter
- 📝 Share your portfolio built with this template

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
