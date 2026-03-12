---
title: "A Practical Microsoft 365 Security Baseline for 2026"
description: "A simple baseline of Microsoft 365 security controls that reduce common breach paths like business email compromise and identity takeover."
date: 2026-03-12
author: "George Coldham"
category: "Zero Trust"
readTime: "14 min read"
slug: "m365-security-baseline-2026"
tags:
  - Microsoft 365
  - Cloud Security
  - Identity Security
  - Security Architecture
image: "/assets/images/blog/m365-security-baseline-2026-banner.webp"
imageAlt: "Checklist style diagram of Microsoft 365 security baseline controls"
canonicalURL: "https://my.awkward.space/blog/m365-security-baseline-2026"
draft: false
ogTitle: "A Practical Microsoft 365 Security Baseline"
ogDescription: "Five Microsoft 365 misconfigurations that still cause breaches and the controls that prevent them."
ogImage: "/assets/images/blog/m365-security-baseline-2026-banner.webp"
ogType: "article"
twitterCard: "summary_large_image"
twitterTitle: "Microsoft 365 Security Baseline for 2026"
twitterDescription: "The controls that actually reduce identity compromise and BEC in Microsoft 365."
twitterImage: "/assets/images/blog/m365-security-baseline-2026-banner.webp"
keywords:
  - microsoft 365 baseline security
  - entra security controls
  - conditional access best practices
  - m365 identity protection
  - defender for office 365
---

![Checklist of Microsoft 365 security baseline controls](/assets/images/blog/m365-security-baseline-2026-banner.webp)

# A Practical Microsoft 365 Security Baseline for 2026

For a growing number of organisations, Microsoft 365 isn't just another SaaS product. It's the backbone — identity, email, collaboration, file storage, and increasingly, the security stack itself. Entra ID is the identity provider. Exchange Online handles email. SharePoint and OneDrive hold documents. Teams runs communication. For many environments, if Microsoft 365 goes down or gets compromised, so does the business.

That concentration means identity security isn't just one layer of defence. It's often the primary layer. If an attacker can compromise an identity in your tenant, they can usually reach email, files, and internal communication without needing to move laterally in the traditional sense. They're already inside the applications that matter.

And here's the uncomfortable part: the majority of cloud breaches don't involve software exploits. They don't require zero-days or sophisticated malware. They rely on control gaps — weak authentication, incomplete policies, monitoring blind spots, and configuration drift that quietly accumulates over time.

This post outlines a practical security baseline for Microsoft 365. It's not exhaustive and it won't cover every edge case, but it focuses on the controls that consistently make the biggest difference in reducing real-world breach paths.

---

## Five misconfigurations that still cause breaches

Before getting into the baseline itself, it's worth looking at five issues that still appear frequently in compromised tenants. These aren't theoretical risks. They're the configuration gaps that incident responders see over and over again.

---

### 1. Phishable MFA for privileged access

Most organisations have enabled MFA at this point, and that's genuinely good progress. But not all MFA is created equal, and the distinction matters more than most people realise.

Methods like SMS codes, voice verification, and email OTP all satisfy the technical requirement for a second factor. The problem is that they're all vulnerable to interception or social engineering. An attacker running a real-time phishing proxy can capture an SMS code just as easily as a password. From the identity provider's perspective, the login looks completely legitimate.

For privileged accounts — global administrators, Exchange administrators, security roles — this is a significant gap. These accounts have the most access and cause the most damage when compromised. They should be protected with phishing-resistant methods: passkeys, FIDO2 security keys, or certificate-based authentication. These methods are cryptographically bound to the legitimate service, which means a phishing proxy can't replay them.

The goal isn't to remove MFA options that work for general users. It's to ensure that your most sensitive accounts use methods that can't be phished.

---

### 2. Legacy authentication still enabled

Legacy authentication protocols — IMAP, POP3, SMTP AUTH, and older Office clients — were designed before modern security controls existed. They don't support Conditional Access, they don't support MFA, and they authenticate with basic credentials.

That makes them a bypass path. An attacker who obtains a username and password can authenticate directly via a legacy protocol, completely sidestepping any Conditional Access policies you've configured. It doesn't matter how sophisticated your policies are if there's a protocol-level side door.

The frustrating part is that many organisations leave legacy authentication enabled not because they need it, but because they've never checked. In most modern environments, it can be blocked entirely. Where there are genuine dependencies — older line-of-business applications or shared mailboxes with legacy integrations — those should be scoped tightly and monitored closely rather than left as a blanket exception.

---

### 3. Unrestricted MFA registration

This one is underappreciated. One of the first things an attacker does after compromising a credential is register their own MFA method — a phone number, an authenticator app, a security key. Once that's done, they have persistent access that survives a password reset.

Think about it: you detect a compromised account, reset the password, and assume the problem is resolved. But if the attacker registered their own authenticator app during the window they had access, they can pass MFA challenges with their own device. The account is still compromised.

Controlling MFA registration is essential. Requiring existing MFA or a Temporary Access Pass to register new methods means an attacker with just a stolen password can't bootstrap their own second factor. Alerting on authentication method changes gives your security team visibility into this activity, which is often one of the earliest indicators of a compromised identity.

---

### 4. Uncontrolled mailbox forwarding

Inbox forwarding rules are a favourite persistence mechanism during business email compromise. An attacker creates a rule that silently forwards copies of incoming email to an external address, then sits back and monitors communication.

This is particularly dangerous in invoice fraud scenarios. The attacker watches for payment-related conversations, then injects themselves at the right moment with modified bank details. Because they've been reading the entire thread, the fraudulent message often looks completely legitimate to the recipient.

The simplest mitigation is disabling external auto-forwarding at the transport level. This is a tenant-wide setting in Exchange Online that prevents any mailbox rule from forwarding email outside the organisation. For the rare cases where external forwarding is genuinely needed, it can be granted as a specific exception rather than left open by default.

It's worth auditing existing forwarding rules too. In many tenants, there are rules that were created months or years ago that nobody remembers setting up.

---

### 5. Limited audit logging

Logging is one of those controls that everyone agrees is important but few organisations invest in until something goes wrong. And by then, the logs you needed either don't exist or have already been overwritten.

The default audit log retention in Microsoft 365 is relatively short. If an incident is discovered weeks or months after the initial compromise — which is common — you may not have the logs to understand what happened. That makes scoping the incident harder, extends recovery timelines, and can turn a containable event into a much larger problem.

Beyond retention, there's the question of coverage. Are you logging sign-in activity, mailbox access, file downloads, admin actions, and changes to security configuration? Each of these tells a different part of the story during an investigation. Missing any one of them can leave blind spots that an attacker has already exploited.

Extending audit log retention and ensuring comprehensive coverage across workloads isn't glamorous, but it's one of the highest-value investments you can make in incident readiness.

---

## A practical Microsoft 365 security baseline

With those common failure points in mind, the following controls represent a practical starting point for most tenants. This isn't meant to be a compliance checklist. It's a set of controls that address the breach paths described above and that most organisations can realistically implement.

---

### Identity protection

Identity is the perimeter in Microsoft 365. If your identity controls are weak, everything downstream is exposed.

- **Require phishing-resistant MFA for privileged roles.** Global administrators, Exchange administrators, Security administrators, and other high-privilege roles should use passkeys, FIDO2 keys, or certificate-based authentication. Not SMS. Not email OTP.
- **Use authentication strengths in Conditional Access.** Entra ID lets you define authentication strength policies that specify which MFA methods are acceptable for different scenarios. Use them to enforce phishing-resistant methods where it matters most.
- **Block legacy authentication protocols.** Create a Conditional Access policy that blocks legacy authentication for all users. If exceptions are genuinely needed, scope them narrowly and review them regularly.
- **Enable Identity Protection risk policies.** Entra Identity Protection uses signals like impossible travel, anonymous IP addresses, and leaked credentials to flag risky sign-ins. Configure it to require MFA or block access when risk is detected. These policies catch things that static rules miss.

---

### Conditional Access

Conditional Access is the policy engine that ties everything together. It evaluates context — who's signing in, from where, on what device, at what risk level — and makes access decisions based on that context.

- **Require MFA for all users.** This should be the baseline for every tenant. Not just privileged users, not just external access — everyone. The attack surface reduction from universal MFA is substantial.
- **Require compliant or hybrid-joined devices for privileged access.** Device compliance adds a layer that credential theft alone can't bypass. If an attacker has stolen credentials but doesn't have a managed device, they can't authenticate to sensitive resources.
- **Restrict admin portal access to trusted networks or compliant devices.** Administrative actions should only happen from known, secure contexts. This limits the blast radius even if an admin credential is compromised.

---

### Privileged access

Standing privileges are a liability. If an account permanently holds Global Administrator rights, every moment it exists is a moment that access could be abused.

- **Use Entra Privileged Identity Management (PIM).** PIM allows you to make privileged roles eligible rather than permanent. Users activate the role when they need it, for a defined period, with approval and MFA required.
- **Remove standing Global Administrator assignments.** No account should hold Global Administrator as a permanent assignment. Use PIM for just-in-time activation, and keep the number of eligible accounts to the minimum necessary.
- **Require approval and MFA for privilege elevation.** Adding a human approval step for the most sensitive roles means a compromised identity can't silently escalate its own access. Combined with MFA at activation, this significantly raises the bar for attackers.

---

### Email protection

Email remains the primary entry point for most attacks against Microsoft 365 tenants. Business email compromise, credential phishing, and malware delivery all start in the inbox.

- **Enable Defender for Office 365 anti-phishing policies.** These go beyond basic spam filtering to detect impersonation attempts, spoofing, and advanced phishing techniques. Configure them with aggressive settings for high-value targets like finance and executive teams.
- **Configure impersonation protection.** Defender for Office 365 can specifically protect against attackers impersonating your executives, partners, or domains. This is particularly effective against the kind of targeted BEC attacks that lead to invoice fraud.
- **Disable external auto-forwarding.** As discussed above, block external forwarding at the transport level and audit any existing rules. This closes one of the most common persistence paths in email compromise.

---

### Data protection

Controlling data access and movement is especially important in environments where sensitive information lives across multiple Microsoft 365 workloads.

- **Deploy Purview Data Loss Prevention across workloads.** DLP policies should cover Exchange, SharePoint, OneDrive, and Teams. Gaps between workloads create exfiltration paths that attackers actively look for.
- **Restrict external sharing to least privilege.** Review sharing defaults in SharePoint and OneDrive. Many tenants allow anonymous sharing links by default, which is almost certainly more permissive than intended.
- **Apply sensitivity labels where appropriate.** Sensitivity labels help classify and protect information consistently. They're most effective when applied to the content that matters most — financial data, personal information, intellectual property — rather than trying to label everything at once.

---

### Monitoring and response

Prevention is important, but detection gives you the ability to catch what prevention misses. Every control in this baseline can be circumvented given enough time and the right conditions. Monitoring is what limits the damage.

- **Alert on MFA method changes.** As covered earlier, MFA registration by an attacker is one of the first post-compromise actions. Detecting it quickly can mean the difference between a contained incident and a long-term compromise.
- **Alert on privileged role assignments.** Any change to administrative roles should generate an alert. If someone is granted Global Administrator outside of your normal change process, you want to know immediately.
- **Monitor suspicious inbox rules.** Rules that forward, redirect, or delete email — especially to external addresses — are strong indicators of compromise. Automated detection here catches persistence mechanisms early.
- **Extend audit log retention.** Ensure you have sufficient log retention to support investigation timelines. For many organisations, the default retention period isn't long enough to cover the typical dwell time between initial compromise and detection.

---

## The governance layer

Here's the thing about security baselines: they decay. Not because someone deliberately weakens them, but because environments change and entropy is relentless.

A Conditional Access policy gets an exception for a migration project that never gets removed. A new admin is granted standing privileges because PIM activation felt like too much friction. Legacy authentication gets re-enabled for one application and stays on for everything. Each individual change seems reasonable in context. Over time, they accumulate.

Configuration drift is the quiet killer of cloud security posture. The controls you deployed six months ago may not reflect what's actually enforced today.

Maintaining a documented baseline and regularly reviewing tenant configuration against it is the only reliable way to prevent this erosion. Tools like Microsoft Secure Score, Entra recommendations, and third-party posture management solutions can help automate this, but they work best when you have a clearly defined target state to measure against.

Without governance, most environments eventually accumulate enough gaps for an attacker to chain together into a viable breach path.

---

## Final thought

Microsoft 365 security doesn't fail because the platform lacks controls. The tooling is genuinely comprehensive — arguably more capable than most organisations realise.

It fails when those controls are implemented partially, inconsistently, or only after an incident forces the conversation. A tenant with a handful of well-enforced policies is in a dramatically better position than one with dozens of policies that are riddled with exceptions.

The difficult part isn't deploying the controls. It's maintaining them consistently over time, through staff changes, project pressures, and the slow drift of operational convenience.

A practical baseline, regularly reviewed and honestly maintained, is worth more than a perfect-on-paper architecture that nobody checks.

---

## References

- Microsoft Learn. *Authentication strengths*. https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths

- Microsoft Learn. *Block legacy authentication*. https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication

- Microsoft Learn. *Privileged Identity Management*. https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure
