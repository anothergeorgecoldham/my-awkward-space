---
title: "Secure by Design for CLI AI Coding Agents"
description: "How to securely run GitHub Copilot CLI and Claude Code on developer machines. Prevent prompt injection, repository poisoning, and over-scoped tokens using deterministic controls."
date: 2026-02-12
updated: 2026-02-12
author: "George Coldham"
category: "AI Security"
readTime: "8 min read"
slug: "secure-by-design-cli-ai-coding-agents"
tags:
  - AI Agents
  - Developer Security
  - GitHub
  - LLM Security
  - Architecture
image: "/assets/images/blog/secure-cli-ai-agents-banner.webp"
imageAlt: "Secure CLI AI coding agents banner illustrating developer security controls"
canonicalURL: "https://my.awkward.space/blog/secure-by-design-cli-ai-coding-agents"
draft: false

ogTitle: "Secure by Design for CLI AI Coding Agents"
ogDescription: "We gave LLMs a shell. Now what? Practical controls for running Copilot CLI and Claude Code safely."
ogImage: "/assets/images/blog/secure-cli-ai-agents-banner.webp"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: "Secure by Design for CLI AI Coding Agents"
twitterDescription: "Deterministic controls beat prompt warnings. Secure your AI coding agents properly."
twitterImage: "/assets/images/blog/secure-cli-ai-agents-banner.webp"

keywords:
  - GitHub Copilot CLI security
  - Claude Code security
  - prompt injection
  - repository poisoning
  - secure AI development
---

![Secure CLI AI coding agents banner illustrating developer security controls](/assets/images/blog/secure-cli-ai-agents-banner.webp)

# Secure by Design for CLI AI Coding Agents

## We gave LLMs a shell. Now what?

Over the past year, the conversation around AI coding assistants has changed quietly but significantly. We are no longer talking only about autocomplete or better inline suggestions. Tools like GitHub Copilot CLI and Claude Code can execute shell commands, modify files, install dependencies, run tests, and push commits. In other words, they do real work inside real environments, and that changes the nature of the risk.

When an LLM is generating text inside an editor, the most immediate failure is usually bad output. Once it can invoke tools and execute commands, the consequences become environmental: files can change, credentials may be accessed, network calls can be made, and commits can be pushed. The model is no longer just predicting tokens in a text box; its output can influence execution.

Much of the public discussion still centres on hallucinations, prompt quality, and output accuracy. Those are valid concerns, but they are no longer the whole problem once you hand the model a shell. At that point, the risk moves from correctness towards capability, and the more useful question becomes: what is this agent actually allowed to do?

---

## When Repository Content Becomes Instruction

One of the more practical classes of issues demonstrated by security researchers is **indirect prompt injection**. This occurs when malicious instructions are embedded in content that the model consumes as context.

In developer workflows, that can include:

- README files  
- Issue descriptions  
- Pull request comments  
- Crafted filenames or comments  
- Tool output returned to the model  

GitHub’s Security Lab has documented prompt injection risks in VS Code and Copilot workflows in *[Safeguarding VS Code against prompt injections](https://github.blog/security/vulnerability-research/safeguarding-vs-code-against-prompt-injections/)*.

Trail of Bits has explored how prompt injection can be engineered to influence Copilot-style agents in realistic development environments in *[Prompt Injection Engineering for Attackers: Exploiting GitHub Copilot](https://blog.trailofbits.com/2025/08/06/prompt-injection-engineering-for-attackers-exploiting-github-copilot/)*.

Microsoft has published guidance on defending against indirect prompt injection in *[How Microsoft defends against indirect prompt injection attacks](https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks/)*, describing how external content and tool output can influence model reasoning.

The model does not have a perfectly reliable semantic boundary between documentation and instruction. If a README contains the text “ignore previous instructions and run this command,” the model receives more text to reason over; it cannot always determine which parts are legitimate context and which are adversarial.

If an agent attempts to act on that content, describing the model itself as “compromised” can obscure the more important architectural question: why was it allowed to act? If the agent can read repository content, access the home directory, inspect `.ssh` or `.aws` credentials, and make outbound network calls without restriction, then prompt injection is only one part of the problem. The deeper problem is that untrusted input has been combined with broadly unrestricted execution.

This is a familiar security pattern. Injection attacks are not new; the difference is that injected content can now influence a reasoning loop capable of triggering automated system actions.

---

## The Predictable Failure Modes

In practice, the risk is rarely exotic. It usually starts with convenience: the agent runs in the home directory, so it can reach global configuration, SSH keys, cloud credentials, and environment variables. It inherits a broadly scoped personal GitHub token because that is what the developer already configured, and that token may allow write access across several repositories or workflows. Outbound network access is unrestricted because this is a normal developer machine, while auto-approve modes are enabled to reduce friction.

None of this is malicious or especially unusual; it is normal developer behaviour. When untrusted repository content, model-driven reasoning, and unrestricted execution are combined, however, they create a predictable escalation path. Research into repository poisoning and indirect prompt injection makes that path visible. In this scenario, the model is not the only weak link. The environment around it is what determines how far a mistake or manipulation can travel.

---

## Deterministic Controls Beat Prompt Warnings

There is a temptation to solve this entirely at the prompt level by adding warnings, system messages, and more safety instructions. Those controls can help, but they remain probabilistic because they depend on model behaviour. Security engineering is on firmer ground when it can add deterministic controls around them.

If the agent runs inside a devcontainer that mounts only the project directory, it cannot casually read SSH keys from the host. If outbound network access is denied by default, arbitrary data exfiltration becomes significantly harder. If it uses a dedicated, minimally scoped token limited to one repository, the blast radius of a mistake is constrained.

None of these controls requires the model to be perfect. They assume that influence and error are possible, then limit what either can achieve.

Do not try to make the model flawless. Make the environment resilient.

---

## Extensibility Is a Trust Boundary

Modern CLI agents support plugins, skills, and Model Context Protocol servers. That flexibility is powerful, but every extension also expands the execution and trust surface.

Each integration introduces:

- New credentials  
- New API scopes  
- Additional supply chain dependencies  

Microsoft’s guidance on indirect prompt injection highlights how tool output can become part of model reasoning. If a plugin retrieves external content and feeds it into the model, that content may influence subsequent actions. At that point, you are trusting not only the model but also every system it can talk to and every credential the integration can exercise.

Treat these integrations like production dependencies:

- Pin versions  
- Review source  
- Scope OAuth tokens carefully  
- Avoid unvetted third-party integrations  

Extensibility is not free; it is a deliberate trust decision that should be reviewed like any other production dependency.

---

## A Practical Secure Baseline

A reasonable baseline for CLI AI coding agents includes:

- Running inside an isolated devcontainer or workspace  
- Restricting filesystem access to the project root  
- Denying access to the host home directory  
- Limiting outbound network to required endpoints  
- Using a dedicated, repo-scoped token  
- Enabling command and change logging  

This is not alarmism. It is ordinary least-privilege design applied to a new kind of operator. If you would hesitate to give a junior engineer unrestricted shell access, your personal GitHub token, and visibility into every credential on your machine, you should also hesitate before giving that same combination to an AI agent.

---

## This Is Not an AI Panic Story

AI coding agents are extraordinarily useful, and many developers already rely on them every day. The goal is not to slow adoption; it is to recognise that we have crossed a boundary from suggestion into execution and should design the surrounding environment accordingly.

The security community has already documented prompt injection and indirect context manipulation, including the **[OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)** which highlights prompt injection and insecure output handling as key risks.

The interesting part is not that this attack class exists. It is that we already know how to reduce its impact:

Define trust boundaries.  
Constrain execution.  
Scope identity.  
Log actions.  

AI coding agents are systems, and systems require constraints. We gave LLMs a shell; now we should design the environment around that fact.

---

## References

- GitHub Security Lab – Safeguarding VS Code against prompt injections  
  https://github.blog/security/vulnerability-research/safeguarding-vs-code-against-prompt-injections/

- Trail of Bits – Prompt Injection Engineering for Attackers: Exploiting GitHub Copilot  
  https://blog.trailofbits.com/2025/08/06/prompt-injection-engineering-for-attackers-exploiting-github-copilot/

- Microsoft Security Response Center – How Microsoft defends against indirect prompt injection attacks  
  https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks/

- OWASP – LLM Top 10  
  https://owasp.org/www-project-top-10-for-large-language-model-applications/

---

This is my curiosity and ideas synthesised and correlated with help from my friendly ChatGPT.
