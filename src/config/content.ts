export const siteConfig = {
  name: "My Awkward Space",
  title: "George Coldham - Microsoft Security and AI Professional",
  description: "A simple blog website built with Astro, featuring blog posts, an about page, and social links.",
  social: {
    github: "https://github.com/anothergeorgecoldham",
    linkedin: "https://www.linkedin.com/in/georgecoldham",
    email: "mailto:george.coldham@microsoft.com",
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
  // Set to null to hide the upcoming talk section
  upcomingTalk: {
    title: "Zero Trust in a SaaS and AI World",
    conference: "NDC Sydney 2026",
    date: "April 23, 2026",
    location: "Sydney, Australia",
    url: "https://ndcsydney.com/agenda/zero-trust-in-a-saas-and-ai-world-0ye5/00u4q0zg1bj",
  },
};


export const aboutContent = {
  meta: {
    title: "About | George Coldham",
    description:
      "Cloud Solution Architect focused on Microsoft security, identity, and the modern browser control plane. Speaker and community organiser based in Perth, WA.",
  },

  title: "About me",
  description:
    "I’m George Coldham — a Cloud Solution Architect in the Microsoft ecosystem, based in Perth (Western Australia). I help teams reduce real-world risk in SaaS and AI-heavy environments, where generative and agentic AI amplify normal human behaviour into security incidents. My work sits at the intersection of identity, the browser, data protection, and automation — with a strong preference for controls that actually survive contact with humans.",

  // These map to your “Focus areas” chips
skills: [
  // AI × Security (lead with this)
  "Generative AI security",
  "Agentic AI risk & controls",
  "Microsoft Security Copilot",
  "AI Security Posture Management (AI-SPM)",
  "AI threat protection & abuse scenarios",
  "Prompt, data & model risk",

  // Identity, browser & SaaS
  "Microsoft Entra (Identity)",
  "Browser & session security",
  "SaaS governance & OAuth risk",
  "Conditional Access patterns",

  // Data & platform controls
  "Microsoft Defender XDR",
  "Data protection (MIP / DLP)",
  "Endpoint controls (Windows)",

  // Architecture & practice
  "Zero Trust architecture",
  "Threat modelling (MITRE-aligned)",
  "Security automation & reporting",
  "Practical policy design",
],

  experience: {
    title: "What I do",
    items: [
      {
        period: "Now",
        position: "Cloud Solution Architect",
        company: "Microsoft (ANZ)",
        description:
          "Partner with organisations to design and improve security outcomes across identity, endpoint, data, and cloud. I focus on the modern control plane: OAuth consent, session/token abuse, unmanaged browsers, and how AI tools accelerate everyday risky behaviour.",
      },
      {
        period: "Ongoing",
        position: "Speaker & community organiser",
        company: "Global Security Community / Global Security Bootcamp",
        description:
          "Build repeatable community formats that help security professionals level up together. I create practical talks, templates, and workshop material that chapters can reuse globally — with an emphasis on actionable takeaways, not theatre.",
      },
      {
        period: "Always",
        position: "Builder mindset",
        company: "Automation, demos, and “show me” security",
        description:
          "I like security that you can prove. I build small tools and repeatable workflows (often using Microsoft-first approaches) to document configuration, detect drift, and turn tribal knowledge into something you can hand to the next person without a two-hour meeting.",
      },
    ],
  },

  speaking: {
    title: "What I speak about",
    description:
      "My talks focus on how modern security actually fails — and how AI accelerates both risk and opportunity. I aim to give practitioners mental models they can reuse on Monday, not just features to remember.",
    topics: [
      "The browser as the new security edge",
      "AI-powered data exfiltration without malware",
      "Security Copilot: what it changes (and what it doesn’t)",
      "OAuth, tokens, and ‘nothing was hacked’ incidents",
      "Agentic AI and the next wave of identity abuse",
      "Designing controls that survive real users",
    ],
  },

  connect: {
    title: "Connect",
    description:
      "If you’re organising an event, building a security program, or want to compare notes on AI, identity, or browser risk, you can reach me at",
    email: {
      href: "mailto:george.coldham@microsoft.com",
      text: "george.coldham@microsoft.com",
    },
  },
};
