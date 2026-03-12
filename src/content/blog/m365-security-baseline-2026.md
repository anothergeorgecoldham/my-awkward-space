---
title: "A Practical Microsoft 365 Security Baseline for 2026"
description: "A simple baseline of Microsoft 365 security controls that reduce common breach paths like business email compromise and identity takeover."
date: 2026-03-12
author: "George Coldham"
category: "Zero Trust"
readTime: "9 min read"
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

Microsoft 365 is now core infrastructure for identity, communication, and collaboration in many organisations.

That makes identity security the primary defensive layer for most environments.

The majority of cloud breaches don’t rely on software exploits. They rely on control gaps — authentication weaknesses, incomplete policies, or monitoring blind spots.

This post outlines a practical baseline that helps reduce the most common Microsoft 365 breach paths.

It is not exhaustive, but it covers the controls that consistently make the biggest difference.

---

## Five misconfigurations that still cause breaches

Before looking at the baseline, it’s worth highlighting five issues that still appear frequently in compromised tenants.

---

### 1. Phishable MFA for privileged access

Many environments enforce MFA but allow authentication methods vulnerable to phishing.

Examples include:

- SMS codes  

- voice verification  

- email OTP  

Phishing-resistant methods such as passkeys, FIDO2 security keys, or certificate authentication significantly reduce this risk.

---

### 2. Legacy authentication still enabled

Legacy protocols often bypass Conditional Access protections.

Protocols such as IMAP, POP, or older Office clients lack modern security enforcement and should generally be disabled.

---

### 3. Unrestricted MFA registration

One of the most common post-compromise actions is an attacker registering their own MFA method.

Once added, this can allow persistent access even after a password reset.

Monitoring authentication method changes is a useful early detection signal.

---

### 4. Uncontrolled mailbox forwarding

Inbox forwarding rules allow attackers to quietly monitor communications.

Forwarding rules are often used during invoice fraud attacks to intercept payment conversations.

Disabling external forwarding by default reduces this risk significantly.

---

### 5. Limited audit logging

Logging frequently receives attention only after an incident.

Short retention periods or incomplete audit coverage can make investigations difficult.

Extending audit logging provides essential visibility during incident response.

---

## A practical Microsoft 365 security baseline

The following controls represent a practical starting point for most tenants.

---

### Identity protection

- Require phishing-resistant MFA for privileged roles

- Use authentication strengths in Conditional Access

- Block legacy authentication protocols

- Enable Identity Protection risk policies

---

### Conditional Access

- Require MFA for all users

- Require compliant devices for privileged access

- Restrict admin access to trusted networks

---

### Privileged access

- Use Entra Privileged Identity Management

- Remove standing global administrator roles

- Require approval and MFA for privilege elevation

---

### Email protection

- Enable Defender for Office 365 anti-phishing policies

- Configure impersonation protection

- Disable external auto-forwarding

---

### Data protection

- Deploy Purview Data Loss Prevention across workloads

- Restrict external sharing to least privilege

- Apply sensitivity labels where appropriate

---

### Monitoring and response

- Alert on MFA method changes

- Alert on privileged role assignments

- Monitor suspicious inbox rules

- Extend audit log retention

---

## The governance layer

Security controls degrade over time.

Configuration drift, operational exceptions, and incomplete deployments slowly weaken even well-designed security architectures.

Maintaining a documented Microsoft 365 security baseline and regularly reviewing tenant configuration helps prevent this erosion.

Without governance, most environments eventually accumulate enough gaps for attackers to exploit.

---

## Final thought

Microsoft 365 security doesn’t fail because the platform lacks controls.

It fails when those controls are implemented partially, inconsistently, or only after an incident occurs.

A small set of well-enforced policies can dramatically reduce the most common breach paths.

The difficult part is not deploying the controls.

It is maintaining them consistently.

---

## References

[^1]: Microsoft Learn. *Authentication strengths*. https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths  

[^2]: Microsoft Learn. *Block legacy authentication*. https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication  

[^3]: Microsoft Learn. *Privileged Identity Management*. https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure  

