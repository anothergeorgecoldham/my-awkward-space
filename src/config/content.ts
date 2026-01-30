export const siteConfig = {
  name: "George Coldham",
  title: "George Coldham - My Awkward Space",
  description: "A simple blog website built with Astro, featuring blog posts, an about page, and social links.",
  social: {
    github: "https://github.com/anothergeorgecoldham",
    twitter: "https://twitter.com/",
    email: "mailto:george@example.com",
  },
};

export const homeContent = {
  title: "Welcome to My Awkward Space",
  description:
    "A collection of my thoughts, ideas, and experiences. Exploring the intersection of technology, creativity, and life.",
  buttons: {
    about: {
      text: "View About",
      href: "/about/",
    },
    posts: {
      text: "Read Posts",
      href: "/posts/",
    },
  },
  images: {
    light: "https://multiplepage-portfolio.edgeone.app/assets/images/tech-background-light.svg",
    dark: "/assets/images/tech-background-dark.svg",
  },
};

export const aboutContent = {
  meta: {
    title: "About - George Coldham",
    description: "Learn more about George Coldham",
  },
  title: "About Me",
  description:
    "Welcome to my space on the web! This is where I share my thoughts, experiences, and learnings. I'm passionate about technology and sharing knowledge with others.",
  skills: [
    "Web Development",
    "Writing",
    "Problem Solving",
    "Learning",
  ],
  image: {
    src: "/assets/images/about/coder.jpg",
    alt: "Profile",
  },
  experience: {
    title: "Experience",
    items: [
      {
        period: "Present",
        position: "Blogger & Developer",
        company: "My Awkward Space",
        description:
          "Writing about technology, experiences, and learnings.",
      },
    ],
  },
  connect: {
    title: "Let's Connect",
    description:
      "Feel free to reach out if you want to collaborate or just say hi! You can find me on social media or drop me an",
    email: {
      text: "email",
      href: "mailto:george@example.com",
    },
  },
};

export const projectsContent = {
  meta: {
    title: "Projects - George Coldham",
    description: "Showcase of my projects",
  },
  title: "My Projects",
  description:
    "Here are some projects I've been working on. Each project represents a journey of learning and growth.",
  projects: [
    {
      title: "My Awkward Space",
      description:
        "A personal blog built with Astro, featuring a modern design with dark/light mode support.",
      image: "/assets/images/projects/project1.jpg",
      href: "/",
    },
  ],
};
