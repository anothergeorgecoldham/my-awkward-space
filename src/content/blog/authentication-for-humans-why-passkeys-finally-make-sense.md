---
title: "Authentication for Humans Why Passkeys Finally Make Sense"
description: "Why passkeys are the first meaningful redesign of authentication in decades. A practical, security-first look at phishing resistance, WebAuthn, and enterprise reality."
date: 2026-02-16
author: "George Coldham"
category: "Authentication"
readTime: "10 min read"
slug: "authentication-for-humans-why-passkeys-finally-make-sense"
tags:
  - Passkeys
  - WebAuthn
  - FIDO2
  - Authentication
  - Phishing Resistant MFA
  - Security Architecture
  - Microsoft Entra
image: "/assets/images/blog/passkeys-authentication-humans-banner.webp"
imageAlt: "Passkeys authentication banner illustrating phishing-resistant login"
canonicalURL: "https://my.awkward.space/blog/authentication-for-humans-why-passkeys-finally-make-sense"
draft: false

ogTitle: "Authentication for Humans Why Passkeys Finally Make Sense"
ogDescription: "Why passkeys are the first meaningful redesign of authentication in decades."
ogImage: "/assets/images/blog/passkeys-authentication-humans-banner.webp"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: "Authentication for Humans Why Passkeys Finally Make Sense"
twitterDescription: "Passkeys fix the authentication model instead of patching it. Here's why they finally make sense."
twitterImage: "/assets/images/blog/passkeys-authentication-humans-banner.webp"

keywords:
  - passkeys
  - WebAuthn
  - FIDO2
  - phishing resistant authentication
  - passwordless authentication
---

![Passkeys Authentication Banner](/assets/images/blog/passkeys-authentication-humans-banner.webp)

# Authentication for Humans Why Passkeys Finally Make Sense

Passwords have had a very good run. Nearly sixty years after their introduction in early multi-user systems, they are still the default authentication model for a remarkable amount of the internet and enterprise IT. At this point, that should probably make us a little uncomfortable.

The **Verizon Data Breach Investigations Report** continues to show stolen credentials as one of the most common initial access vectors year after year[^1]. The specific techniques change, phishing kits improve, and defenders add new layers of detection, but the underlying problem remains stubbornly familiar: attackers keep finding ways to obtain or misuse credentials that users are expected to protect.

Over the years, we have added increasingly sophisticated controls around passwords. We have password managers to help people create and store stronger credentials, OTP applications and push notifications to add another factor, and conditional access systems to assess the context of a login. All of those things improve the situation, but they still compensate for the same basic design decision underneath it all: we are asking humans to manage shared secrets.

Passkeys are interesting because they change that underlying model rather than simply adding another layer around it.

---

## The Structural Problem with Passwords

Passwords are fundamentally transferable secrets. They are:

- Shared secrets  
- Reusable across services  
- Transferable if stolen  
- Dependent on human memory and judgement  

Even when MFA is added, many common methods still introduce another step that depends on the user interpreting what is happening correctly. A person may need to recognise a fake login page, notice that an authentication request is unexpected, or understand that an OTP should not be entered into a page they do not trust.

Adversary-in-the-middle phishing frameworks such as **Evilginx** demonstrate this limitation particularly well. OTP-based MFA can be intercepted and replayed in real time[^2]. The attacker does not necessarily need to break the MFA mechanism; they can place themselves between the user and the legitimate service and relay the authentication flow.

That leaves us asking ordinary users to distinguish a legitimate login experience from an increasingly convincing imitation, often while they are busy, distracted, or simply trying to get some work done.

That was always optimistic.

---

## What a Passkey Actually Is

Passkeys are built on **FIDO2** standards from the [FIDO Alliance](https://fidoalliance.org/) and implemented through **WebAuthn**, defined by the [World Wide Web Consortium (W3C)](https://www.w3.org/TR/webauthn-2/)[^3].

At a high level, creating a passkey involves the following:

- The device generates a public/private key pair.
- The public key is stored by the service.
- The private credential remains protected by the authenticator or, for a syncable passkey, within the platform's credential ecosystem.

There is no password for the user to remember, type, reuse, or accidentally disclose. Authentication becomes a cryptographic challenge-response exchange rather than a comparison against a shared secret.

In 2022, Apple, Google, and Microsoft jointly accelerated passkey adoption across their platforms[^4]. That was an important ecosystem shift: passkeys moved beyond standards discussions and became something ordinary users could realistically encounter on the devices and services they already use.

---

## Why Passkeys Break Phishing

One of the most important properties of WebAuthn is **origin binding**.

If you register a passkey at:

https://login.contoso.com

that credential cannot simply be presented to:

https://login-contoso-security-check.com

The phishing site can reproduce the branding, layout, wording, and every other visual cue that a user might normally rely on. The user can even be completely convinced that they are looking at the legitimate service. The credential is still bound to the legitimate relying party.

The browser and authenticator enforce that relationship as part of the protocol. The private credential will not produce a valid assertion for an unrelated relying party, so the security decision no longer rests entirely on whether the user notices that something looks wrong.

Traditional MFA often assumes that users can recognise deception reliably. Passkeys move a meaningful part of that responsibility into the protocol itself, where it can be enforced consistently rather than depending on human judgement at exactly the moment an attacker is trying to manipulate it.

That’s a material improvement.

---

## Credential Stuffing Doesn’t Work Here

Credential stuffing works because passwords are reused. Large breach datasets are fed into automated tooling, which attempts username and password combinations against other services at scale. The technique has been widely documented in both consumer and enterprise breaches[^1].

Passkeys are scoped to a relying party, with each service receiving its own credential. There is no reusable password for an attacker to recover from one breach and try somewhere else, so a list of stolen passwords offers no equivalent shortcut.

---

## Enterprise Reality

It is important not to oversell this. Modern identity systems such as **Microsoft Entra ID** support passkeys cleanly and at scale[^5], and they align well with cloud-first identity and Zero Trust models. Legacy on-premises Active Directory environments are more nuanced, however. Tier-0 systems and domain controllers still commonly rely on certificate-based authentication and smart cards.

Passkeys are ready for modern identity platforms, but they are not a magic eraser for every legacy protocol stack overnight.

If someone tells you otherwise, ask to see the architecture diagram.

---

## Usability Is Not a Side Benefit

Security teams often treat usability as an optional benefit, but that is a mistake. Password managers improved credential hygiene without eliminating phishing because the underlying shared secret remained. Passkeys take the secret out of the user's hands and remove the need to type it into a page.

Authentication becomes:

- Biometric or PIN unlock  
- Silent cryptographic signing  
- Done  

There is no password to reset or guess, and no authentication secret for the user to hand to the wrong page. Security improves because people are removed from routine secret handling. That alignment is rare: when usability and security move in the same direction, it is worth paying attention.

---

## Final Thought

For decades, we tried to train users to behave like security engineers. Passkeys take a different approach: they assume users are human, assume attackers are sophisticated, and use cryptography rather than judgement as the primary control.

That is why they finally make sense.

---

# References

[^1]: Verizon. *Data Breach Investigations Report (DBIR)*. https://www.verizon.com/business/resources/reports/dbir/  
[^2]: Evilginx GitHub repository and technical documentation. https://github.com/kgretzky/evilginx2  
[^3]: W3C. *Web Authentication: An API for accessing Public Key Credentials Level 2*. https://www.w3.org/TR/webauthn-2/  
[^4]: Apple, Google, Microsoft joint announcement on passkeys (2022). https://www.apple.com/newsroom/2022/05/apple-google-and-microsoft-commit-to-expanded-support-for-fido-standard/  
[^5]: Microsoft. *Passwordless authentication with Microsoft Entra ID*. https://learn.microsoft.com/entra/identity/authentication/howto-authentication-passwordless
