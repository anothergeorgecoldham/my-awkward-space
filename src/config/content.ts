export const siteConfig = {
  name: "My Awkward Space",
  title: "George Coldham - Microsoft Security and AI Professional",
  description: "A professional portfolio for George Coldham, Microsoft Security and AI Professional and public speaker.",
  social: {
    github: "https://github.com/anothergeorgecoldham",
    linkedin: "https://www.linkedin.com/in/georgecoldham",
    email: "mailto:george.coldham@microsoft.com",
  },
};

export const homeContent = {
  title: "My Awkward Space",
  description:
    "I’m George Coldham. I work at the intersection of Security and AI in the Microsoft ecosystem — threat protection, identity, browser/session control planes, and the messy reality of how data leaks without malware. I speak at conferences and organise community events to help security professionals level up together.",
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
      "Cloud Solution Architect focused on Microsoft Security and AI. Community Leader and Public Speaker based in Perth, Western Australia.",
  },

  title: "About me",
  description:
    "I’m George Coldham — a Cloud Solution Architect at Microsoft in the Security Solution area, based in Perth (Western Australia). I help teams reduce real-world risk in SaaS and AI-heavy environments, where generative and agentic AI amplify normal human behaviour into security incidents. My work sits at the intersection of threat protection, identity, SaaS, data protection, and automation — with a strong preference for controls that actually survive contact with humans.",

  // These map to your “Focus areas” chips
skills: [
  // AI × Security (lead with this)
  "Generative AI Security",
  "Agentic AI Risk & Controls",
  "Microsoft Security Copilot",
  "AI Security Posture Management (AISPM)",
  "AI Threat Protection & Abuse Scenarios",
  "Prompt, Data & Model Risk",

  // Identity, browser & SaaS
  "Microsoft Entra (Identity)",
  "Microsoft Threat Protection",
  "Browser & Session Security",
  "SaaS Governance & OAuth Risk",

  // Data & platform controls
  "Microsoft Defender XDR",

  // Architecture & practice
  "Zero Trust Architecture",
  "Cloud Security Posture Management (CSPM)",
],  

  experience: {
    title: "What I do",
    items: [
      {
        period: "Now",
        position: "Cloud Solution Architect",
        company: "Microsoft (ANZ)",
        description:
          "Partner with enterprise scale organisations to design and improve security outcomes across threat protection, identity, data, devices and cloud. I focus on the modern control plane: OAuth consent, session/token abuse, unmanaged browsers, and how AI tools accelerate productivity but could enable risky behaviour.",
      },
      {
      period: "Ongoing",
      position: "Speaker & community organiser",
      company:
        "Global Security Community · Perth Global AI Community · Perth Microsoft Security Meetup · Perth GitHub Meetup",
      description:
      "I present locally and internationally on emerging security topics, helping practitioners understand how new technologies and AI change risk at scale. I also build and enable professional communities — either by bringing practitioners together directly, or by creating repeatable formats and resources that others can reuse to run sustainable communities.",
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
