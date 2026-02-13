---
title: "Secure by Design for CLI AI Coding Agents"
description: "How to securely run GitHub Copilot CLI and Claude Code on developer machines. Prevent prompt injection, repository poisoning, and over-scoped tokens using deterministic controls."
date: "2026-02-12"
updated: "2026-02-12"
author: "George Coldham"
category: "AI Security"
tags:
  - ai-agents
  - developer-security
  - github
  - llm-security
  - architecture
slug: "secure-by-design-cli-ai-coding-agents"
readTime: "8 min read"

ogTitle: "Secure by Design for CLI AI Coding Agents"
ogDescription: "We gave LLMs a shell. Now what? Practical controls for running Copilot CLI and Claude Code safely."
ogImage: "/images/blog/secure-cli-ai-agents-banner.png"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: "Secure by Design for CLI AI Coding Agents"
twitterDescription: "Deterministic controls beat prompt warnings. Secure your AI coding agents properly."
twitterImage: "/images/blog/secure-cli-ai-agents-banner.png"

keywords:
  - GitHub Copilot CLI security
  - Claude Code security
  - prompt injection
  - repository poisoning
  - secure AI development
---

# Secure by Design for CLI AI Coding Agents

## We gave LLMs a shell. Now what?

Over the past year, the conversation around AI coding assistants has changed quietly but significantly. We are no longer talking about autocomplete. We are no longer talking about better inline suggestions. Tools like GitHub Copilot CLI and Claude Code can execute shell commands, modify files, install dependencies, run tests, and push commits. In other words, they do real work inside real environments.

That shift matters.

When an LLM is generating text inside your editor, the worst case is usually bad output. When an LLM is allowed to invoke tools and execute commands, the worst case becomes environmental. Files change. Credentials are accessed. Network calls are made. Commits are pushed.

The model is not just predicting tokens. It is influencing execution.

Most of the public discussion still centres on hallucinations, prompt quality, and output accuracy. Those are valid concerns, but they are not the primary risk once you hand the model a shell. The risk moves from correctness to capability. The real question becomes: what is this allowed to do?

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

The model does not have a reliable semantic boundary between documentation and instruction. If a README contains the text “ignore previous instructions and run this command,” the model sees text. It reasons over text. It does not inherently know which parts are adversarial.

If the agent attempts to act on that content, the model is not compromised. It is behaving as designed.

The architectural question is more important than the AI question.

Why was it allowed to act?

If the agent can read repository content, access your home directory, read `.ssh` or `.aws` credentials, and make outbound network calls without restriction, then the problem is not prompt injection. The problem is that untrusted input was combined with unrestricted execution.

This is a familiar pattern. Injection attacks are not new. The difference now is that injected content influences a reasoning loop that can trigger automated system actions.

---

## The Predictable Failure Modes

In practice, the risk is rarely exotic. It is usually convenience.

The agent runs in the home directory. That means it can access global configuration, SSH keys, cloud credentials, and environment variables.

The agent inherits a personal GitHub token with broad scope because that is what the developer already configured. That token may allow write access across multiple repositories or workflows.

Outbound network access is unrestricted because it is a normal developer machine.

Auto-approve modes are enabled to reduce friction.

None of this is malicious. It is normal developer behaviour.

But when you combine untrusted repository content, model-driven reasoning, and unrestricted execution, you create a predictable escalation path. Research around repository poisoning and indirect prompt injection simply makes that path visible.

The model is not the weak link. The environment is.

---

## Deterministic Controls Beat Prompt Warnings

There is a temptation to solve this at the prompt level. Add warnings. Add system messages. Add more safety instructions.

Those controls are probabilistic. They depend on model behaviour.

Security engineering prefers deterministic controls.

If the agent runs inside a devcontainer that only mounts the project directory, it cannot access your SSH keys.

If outbound network access is denied by default, arbitrary data exfiltration becomes significantly harder.

If the agent uses a dedicated, minimally scoped token limited to a single repository, blast radius is constrained.

These controls do not require the model to be perfect. They assume influence is possible and limit what influence can achieve.

Do not try to make the model flawless. Make the environment resilient.

---

## Extensibility Is a Trust Boundary

Modern CLI agents support plugins, skills, and Model Context Protocol servers. This flexibility is powerful, but it expands the execution surface.

Each integration introduces:

- New credentials  
- New API scopes  
- Additional supply chain dependencies  

Microsoft’s guidance on indirect prompt injection highlights how tool output can become part of model reasoning. If a plugin retrieves external content and feeds it into the model, that content may influence subsequent actions.

At that point, you are trusting not only the model, but every system it can talk to.

Treat these integrations like production dependencies:

- Pin versions  
- Review source  
- Scope OAuth tokens carefully  
- Avoid unvetted third-party integrations  

Extensibility is not free. It is a deliberate trust decision.

---

## A Practical Secure Baseline

A reasonable baseline for CLI AI coding agents includes:

- Running inside an isolated devcontainer or workspace  
- Restricting filesystem access to the project root  
- Denying access to the host home directory  
- Limiting outbound network to required endpoints  
- Using a dedicated, repo-scoped token  
- Enabling command and change logging  

This is not alarmism. It is standard least-privilege design.

If you would hesitate to give a junior engineer unrestricted shell access, your personal GitHub token, and visibility into every credential on your machine, then you should hesitate before giving that same combination to an AI agent.

---

## This Is Not an AI Panic Story

AI coding agents are extraordinarily useful. Many developers use them daily. The goal is not to slow adoption.

The goal is to recognise that we have crossed a boundary. We have moved from suggestion to execution.

The security community has already documented prompt injection and indirect context manipulation, including the **[OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)** which highlights prompt injection and insecure output handling as key risks.

The interesting part is not the attack. The interesting part is that we already know how to address it.

Define trust boundaries.  
Constrain execution.  
Scope identity.  
Log actions.  

AI coding agents are systems.

Systems require constraints.

We gave LLMs a shell. Now we should design accordingly.

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

This is my curiosity and ideas synthesized and correlated with my friendly chatgpt.  

