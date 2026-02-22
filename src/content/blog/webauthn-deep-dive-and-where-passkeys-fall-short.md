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
image: "/assets/images/blog/webauthn-technical-deep-dive-banner.png"
imageAlt: "WebAuthn technical deep dive banner illustrating authentication flows"
canonicalURL: "https://my.awkward.space/blog/webauthn-deep-dive-and-where-passkeys-fall-short"
draft: false

ogTitle: "WebAuthn Under the Hood and Where Passkeys Still Fall Short"
ogDescription: "A technical breakdown of WebAuthn flows and where passkeys still have limitations."
ogImage: "/assets/images/blog/webauthn-technical-deep-dive-banner.png"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: "WebAuthn Under the Hood and Where Passkeys Still Fall Short"
twitterDescription: "What actually happens in a WebAuthn flow, and where passkeys still don't solve everything."
twitterImage: "/assets/images/blog/webauthn-technical-deep-dive-banner.png"

keywords:
  - WebAuthn
  - passkeys limitations
  - FIDO2 authentication
  - phishing resistant MFA
  - identity architecture
---

![WebAuthn Technical Banner](/assets/images/blog/webauthn-technical-deep-dive-banner.png)

# WebAuthn Under the Hood and Where Passkeys Still Fall Short

In the previous article, I argued that passkeys fix a structural flaw: shared secrets managed by humans.

Now let’s go deeper.

First, what actually happens in a WebAuthn flow.  
Second, where passkeys still don’t solve everything.

Because nothing in security solves everything.

---

# Part 1 — What Actually Happens in WebAuthn

WebAuthn is standardised by the W3C and built on FIDO2 specifications from the FIDO Alliance[^1][^2].

Two flows matter:

- Registration (credential creation)  
- Authentication (assertion / signing)  

Let’s break them down properly.

---

## Registration Flow

### Step 1 — Challenge Generation

The relying party (the service) generates:

- A cryptographically random challenge  
- A Relying Party ID (typically the domain)  
- A user identifier  

This is sent to the browser through the WebAuthn API.

If your challenge isn’t random and single-use, you’ve already weakened the model.

---

### Step 2 — Key Pair Creation

The authenticator (Windows Hello, Touch ID, Android biometric, or hardware key) generates:

- A new public/private key pair  
- Binds it to the domain  
- Stores the private key securely (TPM, Secure Enclave, hardware module)

The private key never leaves the device.

That’s not marketing. That’s enforced by design.

---

### Step 3 — Attestation

The authenticator returns:

- The public key  
- Attestation data  
- A signature over the challenge  

The server verifies:

- The challenge matches  
- The origin matches  
- Policy requirements are satisfied  

Then it stores the public key.

Still no password anywhere.

---

## Authentication Flow

This is where phishing resistance becomes real.

### Step 1 — Fresh Challenge

The server issues a new challenge.

### Step 2 — Origin Enforcement

The browser enforces that the page origin matches the original Relying Party ID.

If it doesn’t, the process fails before the user does anything.

This is why adversary-in-the-middle frameworks such as Evilginx fail against properly implemented WebAuthn flows[^3].

They cannot forge the origin-bound signature.

---

### Step 3 — User Verification

The authenticator requires biometric or PIN verification.

This unlocks the private key locally.

### Step 4 — Challenge Signing

The authenticator signs:

- The challenge  
- Client data (including origin)  
- Authenticator data  

The server verifies using the stored public key.

Authentication succeeds.

No shared secret.  
No OTP.  
Nothing replayable in a meaningful way.

---

# Part 2 — Where Passkeys Still Fall Short

Now the uncomfortable part.

Passkeys are strong.

They are not magic.

---

## 1. Device Compromise Still Wins

If malware controls the endpoint:

- Session cookies can be stolen  
- Authenticated API calls can be replayed  
- Actions can be performed in the user’s context  

Passkeys protect authentication.  
They do not protect a compromised session.

Endpoint security still matters. A lot.

---

## 2. Recovery Flows Are Often Weaker

The moment you allow:

- SMS recovery  
- Email reset links  
- Helpdesk override  

You’ve introduced a human-targetable path.

Many breaches occur through recovery mechanisms, not primary authentication.

If recovery is weaker than login, attackers will pivot.

---

## 3. Legacy Infrastructure Constraints

Modern cloud identity systems such as Microsoft Entra ID support passkeys cleanly[^4].

Classic Active Directory environments are more constrained. Tier-0 hosts often still require certificate-based authentication.

Passkeys integrate well with cloud-first identity.

They are not a universal replacement for every legacy protocol stack overnight.

---

## 4. Synchronisation and Trust

Cloud-synchronised passkeys improve usability. They also introduce:

- Cloud trust dependencies  
- Policy design questions  
- Regulatory considerations  

In high-assurance environments, hardware-bound authenticators may still be preferred.

This is architecture, not ideology.

---

## 5. Governance Still Matters

Passkeys secure authentication events.

They do not fix:

- Weak identity proofing  
- Excessive privilege  
- Poor joiner/mover/leaver processes  

Security is still systemic.

---

# Conclusion

Passkeys eliminate shared secrets and enforce phishing resistance at the protocol level.

They do not eliminate:

- Compromised endpoints  
- Weak recovery flows  
- Poor governance  

The mature view is this:

Passkeys are a strong foundational control in a layered security model.

Not hype.  
Not theatre.  
Not a silver bullet.

Just better architecture.

---

# References

[^1]: FIDO Alliance. *FIDO2 Overview*. https://fidoalliance.org/fido2/  
[^2]: W3C. *Web Authentication Level 2 Specification*. https://www.w3.org/TR/webauthn-2/  
[^3]: Evilginx technical documentation. https://github.com/kgretzky/evilginx2  
[^4]: Microsoft Learn. *Passwordless authentication with Microsoft Entra ID*. https://learn.microsoft.com/entra/identity/authentication/howto-authentication-passwordless