export const siteConfig = {
  name: "My Awkward Space",
  title: "George Coldham - Microsoft Security and AI Technologist",
  description: "A simple blog website built with Astro, featuring blog posts, an about page, and social links.",
  social: {
    github: "https://github.com/anothergeorgecoldham",
    twitter: "https://twitter.com/georgecoldham",
    email: "mailto:george+mas@coldham.com.au",
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
      text: "Read Blog",
      href: "/blog/",
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
    "Microsoft Security",
    "Cyber Security",
    "Generative AI",
    "Speaking",
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
        position: "Cloud Solution Architect - Security Solution Area",
        company: "Microsoft ANZ",
        description:
          "I will fill this out later",
      },
    ],
  },
  connect: {
    title: "Let's Connect",
    description:
      "Feel free to reach out if you want to collaborate or just say hi! You can find me on social media or drop me an",
    email: {
      text: "email",
      href: "mailto:george+mas@coldham.com.au",
    },
  },
};

