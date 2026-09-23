---
title: "WebAuthn Under the Hood and Where Passkeys Still Fall Short"
description: "A technical breakdown of WebAuthn registration and authentication flows, plus a practical look at where passkeys do not solve every security problem."
date: 2026-02-20
author: "George Coldham"
category: "Authentication"
readTime: "12 min read"
slug: "webauthn-deep-dive-and-where-passkeys-fall-short"
tags:
  - WebAuthn
  - Passkeys
  - FIDO2
  - Phishing Resistant MFA
  - Identity Architecture
  - Security Engineering
image: "/assets/images/blog/webauthn-technical-deep-dive-banner.webp"
imageAlt: "WebAuthn technical deep dive banner illustrating authentication flows"
canonicalURL: "https://my.awkward.space/blog/webauthn-deep-dive-and-where-passkeys-fall-short"
draft: false

ogTitle: "WebAuthn Under the Hood and Where Passkeys Still Fall Short"
ogDescription: "A technical breakdown of WebAuthn flows and where passkeys still have limitations."
ogImage: "/assets/images/blog/webauthn-technical-deep-dive-banner.webp"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: "WebAuthn Under the Hood and Where Passkeys Still Fall Short"
twitterDescription: "What actually happens in a WebAuthn flow, and where passkeys still don't solve everything."
twitterImage: "/assets/images/blog/webauthn-technical-deep-dive-banner.webp"

keywords:
  - WebAuthn
  - passkeys limitations
  - FIDO2 authentication
  - phishing resistant MFA
  - identity architecture
---

![WebAuthn Technical Banner](/assets/images/blog/webauthn-technical-deep-dive-banner.webp)

# WebAuthn Under the Hood and Where Passkeys Still Fall Short

In the previous article, I argued that passkeys address a structural flaw in authentication: shared secrets managed by humans. This time, I want to go a little deeper into what actually happens during a WebAuthn flow and then look at the places where passkeys still do not solve everything.

Nothing in security solves everything, after all.

---

# Part 1 — What Actually Happens in WebAuthn

WebAuthn is standardised by the W3C and built on FIDO2 specifications from the FIDO Alliance[^1][^2].

For this discussion, two flows matter:

- Registration (credential creation)  
- Authentication (assertion / signing)  

Understanding both makes it easier to see where the phishing resistance comes from, rather than treating it as a property that simply appears by magic.

---

## Registration Flow

### Step 1 — Challenge Generation

The relying party (the service) generates:

- A cryptographically random challenge  
- A Relying Party ID (typically the domain)  
- A user identifier  

These values are sent to the browser through the WebAuthn API. The challenge needs to be random and single-use; if it is predictable or can be replayed, the implementation has already weakened the model before the authenticator becomes involved.

---

### Step 2 — Key Pair Creation

The authenticator — Windows Hello, Touch ID, an Android device credential, or a hardware security key, for example — generates:

- A new public/private key pair  
- Binds it to the domain  
- Protects the private credential using the available authenticator security, such as a TPM, Secure Enclave, or hardware module

For a device-bound credential, the private key remains within that authenticator. Syncable passkeys extend the model by allowing credential material to move through a provider's protected sync ecosystem, but the private key is still not disclosed to the relying party or typed by the user. That distinction matters when choosing between convenience and higher-assurance, hardware-bound authentication.

---

### Step 3 — Attestation

The authenticator returns the newly created public-key credential, including:

- The public key  
- Authenticator data and, depending on policy and authenticator behaviour, an attestation statement
- Data that binds the creation ceremony to the server's challenge

The server verifies:

- The challenge matches  
- The origin matches  
- Policy requirements are satisfied  

The server then stores the public key and the credential information it will need for later authentication. At no point does it receive a password or the private credential.

---

## Authentication Flow

The authentication ceremony is where the practical phishing resistance becomes clear.

### Step 1 — Fresh Challenge

The server issues a new challenge.

### Step 2 — Origin Enforcement

The browser enforces that the page origin matches the original Relying Party ID.

If it does not, the relying party will not receive a valid assertion for its origin. This is why adversary-in-the-middle frameworks such as Evilginx cannot simply relay a properly implemented WebAuthn ceremony in the way they can relay a password and OTP flow[^3]: they cannot produce the origin-bound assertion required by the legitimate relying party.

---

### Step 3 — User Verification

Where user verification is required, the authenticator asks for a biometric or PIN. That verification authorises local use of the private credential; the biometric or PIN itself is not sent to the relying party.

### Step 4 — Challenge Signing

The authenticator signs:

- The challenge  
- Client data (including origin)  
- Authenticator data  

The server verifies the response using the stored public key and, if the checks pass, authentication succeeds. There is no shared password or OTP to capture and replay, and the signed assertion is bound to the ceremony rather than being a reusable bearer secret.

---

# Part 2 — Where Passkeys Still Fall Short

That mechanism is strong, but it is not magic. Passkeys improve the authentication event; they do not remove every other identity, endpoint, or governance risk around it.

---

## 1. Device Compromise Still Wins

If malware controls an endpoint, it may still be able to act after authentication. For example:

- Session cookies can be stolen  
- Authenticated API calls can be replayed  
- Actions can be performed in the user’s context  

Passkeys protect the authentication ceremony; they do not, by themselves, protect a session or endpoint that has already been compromised. Endpoint security and session protection therefore continue to matter a great deal.

---

## 2. Recovery Flows Are Often Weaker

Recovery is frequently where a strong primary authentication method is weakened. The moment an account allows:

- SMS recovery  
- Email reset links  
- Helpdesk override  

it has introduced a more human-targetable path. Many account compromises occur through recovery mechanisms rather than the primary authentication flow, and attackers will naturally pivot if recovery is materially weaker than login.

---

## 3. Legacy Infrastructure Constraints

Modern cloud identity systems such as Microsoft Entra ID support passkeys cleanly[^4], and passkeys integrate well with cloud-first identity. Classic Active Directory environments are more constrained, however, and Tier-0 hosts often still require certificate-based authentication. Passkeys are therefore not a universal replacement for every legacy protocol stack overnight.

---

## 4. Synchronisation and Trust

Cloud-synchronised passkeys improve usability and recovery, but they also introduce:

- Cloud trust dependencies  
- Policy design questions  
- Regulatory considerations  

In high-assurance environments, hardware-bound authenticators may still be preferred. That is an architectural choice based on assurance, recovery, and regulatory requirements rather than an ideological argument about whether passkeys are good or bad.

---

## 5. Governance Still Matters

Passkeys strengthen authentication events, but they do not fix:

- Weak identity proofing  
- Excessive privilege  
- Poor joiner/mover/leaver processes  

Security remains systemic. A phishing-resistant sign-in cannot compensate for an identity that was poorly verified, given excessive privilege, or left active after its owner changed roles.

---

# Conclusion

Passkeys remove the shared password from the authentication ceremony and provide phishing resistance through protocol-level origin binding. They do not eliminate:

- Compromised endpoints  
- Weak recovery flows  
- Poor governance  

The mature view is that passkeys are a strong foundational control within a layered security model. They are not a silver bullet, but they are better architecture for the problem they are designed to solve.

---

# References

[^1]: FIDO Alliance. *FIDO2 Overview*. https://fidoalliance.org/fido2/  
[^2]: W3C. *Web Authentication Level 2 Specification*. https://www.w3.org/TR/webauthn-2/  
[^3]: Evilginx technical documentation. https://github.com/kgretzky/evilginx2  
[^4]: Microsoft Learn. *Passwordless authentication with Microsoft Entra ID*. https://learn.microsoft.com/entra/identity/authentication/howto-authentication-passwordless
