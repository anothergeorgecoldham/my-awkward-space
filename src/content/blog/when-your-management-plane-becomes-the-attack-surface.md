---
title: "When Your Management Plane Becomes the Attack Surface"
description: "How the March 2026 Stryker incident shows that identity and admin control planes, not malware, are now the primary enterprise attack surface."
date: 2026-03-20
author: "George Coldham"
category: "Zero Trust"
readTime: "9 min read"
slug: "when-your-management-plane-becomes-the-attack-surface"
tags:
  - Zero Trust
  - Microsoft Intune
  - Identity Security
  - Privileged Access
  - Incident Response
  - Control Plane Security
image: "/assets/images/blog/when-your-management-plane-becomes-the-attack-surface-banner.png"
imageAlt: "Illustration of a central admin identity connected to multiple corporate devices under attack"
canonicalURL: "https://my.awkward.space/blog/when-your-management-plane-becomes-the-attack-surface"
draft: false

ogTitle: "When Your Management Plane Becomes the Attack Surface"
ogDescription: "No malware, no exploit chain, just legitimate admin actions at scale."
ogImage: "/assets/images/blog/when-your-management-plane-becomes-the-attack-surface-banner.png"
ogType: "article"

twitterCard: "summary_large_image"
twitterTitle: "When Your Management Plane Becomes the Attack Surface"
twitterDescription: "What the Stryker Intune wipe incident reveals about identity, admin intent, and blast radius."
twitterImage: "/assets/images/blog/when-your-management-plane-becomes-the-attack-surface-banner.png"

keywords:
  - intune security
  - control plane attack
  - privileged identity risk
  - endpoint management hardening
  - admin plane detection
---

![Illustration of management plane compromise impact](/assets/images/blog/when-your-management-plane-becomes-the-attack-surface-banner.png)

# When Your Management Plane Becomes the Attack Surface

Thousands of corporate devices were wiped without ransomware, an exploit chain, or malware being deployed to each endpoint. The disruption came through legitimate administrative actions performed at scale.

If a single admin identity can wipe every managed device, the authority attached to that identity may represent a greater risk than any individual endpoint. That is what makes the March 2026 incident involving Stryker worth paying attention to: not that it was technically novel, but that it reflects a shift many organisations have not yet fully internalised.

---

## What actually happened

Public reporting indicates that an attacker, linked in some coverage to the Iran-aligned group Handala, gained privileged access to Stryker's Microsoft environment. From there, they do not appear to have followed the more familiar playbook of malware deployment, noisy lateral movement, and persistence through traditional means. Instead, the attacker moved directly to impact by using Microsoft Intune as the control plane.

More specifically, they appear to have used Intune exactly as it was designed:

- issuing remote wipe commands
- at scale
- against managed corporate devices

Reports suggest that tens of thousands of devices were affected. The attacker claimed significantly higher numbers, although claims made by the actor should be treated with caution. The operational impact was nevertheless real: ordering and logistics systems were disrupted, which is where the business felt the incident. Statements at the time indicated that product safety and core medical systems were not affected.

On the available reporting, this was targeted disruption delivered through legitimate administrative capability rather than indiscriminate destruction across every system.

---

## The part most people are missing

It is easy to look at an incident like this and assume that something on the endpoints must have been exploited: a vulnerability, a misconfiguration, or a missed patch. That does not appear to describe the principal mechanism here. This was not primarily a malware problem; it was a control-plane problem.

For years, we have operated with a fairly simple mental model:

- attacker tools are inherently suspicious
- enterprise admin tools are inherently trusted

That model made sense when attackers needed to bring their own capability into an environment. It breaks down when the environment already contains everything they need. Once an attacker gains sufficient administrative access, your tooling becomes their tooling.

In a modern cloud-managed environment, that tooling is deliberately powerful. It is designed to operate at scale and make large changes quickly, which are precisely the properties an attacker needs when the objective is rapid disruption.

---

## Why traditional controls struggle here

Many detection strategies are still anchored around the idea that something recognisably malicious will happen on the endpoint: a binary will execute, a process will behave abnormally, or network traffic will look suspicious. None of those signals necessarily applies when the harmful action is a legitimate command from an authorised management service.

- EDR and AV have nothing to detect because no malicious code is executed
- Network controls see normal, expected traffic to Microsoft services
- Device compliance continues to report devices as healthy right up until they are wiped

From the platform's perspective, the relevant components may appear to be functioning normally. The system has not failed in the conventional sense; it has carried out an authorised command exactly as designed. That makes this class of attack difficult to reason about when controls are concentrated on the endpoint rather than on the identity and intent behind administrative actions.

---

## The real attack surface: identity and admin intent

In this model, blast radius is not defined only by the number of endpoints. It is also defined by how much authority a single identity holds, including:

- who can perform high-impact actions
- how easily they can perform them
- how quickly those actions can be executed at scale

In Intune and similar endpoint management platforms, a sufficiently privileged identity can:

- wipe devices
- push configuration policies
- disable or weaken security controls
- reconfigure access to corporate resources

At enterprise scale, these are not merely administrative conveniences. They become destructive capabilities when misused. Their centralisation is what makes them efficient for administrators, but it is also what makes them dangerous when the controlling identity or session is compromised.

---

## What you should actually be watching

If detections remain centred on endpoints, they are looking downstream of the decision that caused the problem. The focus also needs to include the admin plane, where high-impact actions are initiated, and that means paying attention to a different set of signals.

### Identity signals

These are often the earliest indications that an identity's effective capability is changing:

- Privileged role assignments
- PIM activations for high-impact roles
- Changes to administrative group membership

None is inherently malicious, but together they define what an identity is able to do.

### Behavior signals

Once that capability is established, behaviour becomes the next part of the picture:

- Bulk device wipe actions
- Rapid, repeated high-impact operations
- Administrative actions occurring outside normal patterns

### Session context

Where and how an action occurs can matter as much as the action itself:

- Admin activity from a new or previously unseen device
- Changes in location or session characteristics
- Token reuse or unusual session continuity

---

## Correlation matters

Individually, many of these signals are low value. Together, they can tell a much more useful story. The sequences worth looking for resemble:

New privilege -> new session -> high-impact action -> scale

For example:

A newly activated Intune admin role followed by 500+ wipe actions within 5 minutes from a previously unseen device.

That is not simply an anomaly to place in a queue for later triage; it is a plausible incident in progress. Detection therefore needs to evolve beyond isolated event alerts towards linked behaviour over time.

---

## Design matters more than detection

There is a tendency to assume that we can detect our way out of these problems. In reality, the available response window may be extremely small. If one identity can wipe thousands of devices in minutes, an alert can become retrospective before an analyst has time to act; the team is already analysing what happened.

That shifts some of the emphasis from detection to design and raises a more fundamental question:

Should any one identity be able to do this in the first place?

---

## Practical hardening (what actually helps)

Guidance from CISA and Microsoft aligns well here, but it is worth translating it into intent rather than just controls.

### Reduce blast radius

- Limit which roles can perform destructive actions like wipe
- Separate duties so that no single role has full control
- Regularly review who holds these privileges

### Remove standing privilege

- Use just-in-time access (PIM) rather than permanent assignments
- Require explicit activation for high-impact roles
- Time-bound that access tightly

### Strengthen authentication

- Enforce phishing-resistant MFA for all privileged roles
- Apply conditional access policies specifically for admin sessions
- Treat admin access differently from standard user access

### Add friction where it matters

- Multi-admin approval for high-impact actions, including wipe

This is one of the more important controls because it introduces a deliberate checkpoint for actions with large-scale consequences. The point is not to slow down normal operations indiscriminately; it is to prevent a single compromised identity from translating directly into an enterprise-wide incident.

---

## What this actually tells us

Based on the public reporting, this incident did not depend on a zero-day, an advanced exploit chain, or a particularly novel technique. The attacker gained access and used powerful platform capabilities in the way they were designed to operate.

That is the shift. The question is no longer only how you keep attackers out; it is also what happens when they gain access to the same tools your administrators rely on every day.

---

## References

- CISA alert: https://www.cisa.gov/news-events/alerts/2026/03/18/cisa-urges-endpoint-management-system-hardening-after-cyberattack-against-us-organization
- Microsoft Intune security guidance: https://techcommunity.microsoft.com/blog/intunecustomersuccess/best-practices-for-securing-microsoft-intune/4502117
- Coverage: https://www.bleepingcomputer.com/news/security/cisa-warns-businesses-to-secure-microsoft-intune-systems-after-stryker-breach/
- Coverage: https://www.theregister.com/2026/03/19/microsoft_intune_lockdown_stryker/
- Coverage: https://techcrunch.com/2026/03/19/cisa-urges-companies-to-secure-microsoft-intune-systems-after-hackers-mass-wipe-stryker-devices/
