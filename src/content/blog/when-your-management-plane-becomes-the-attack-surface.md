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

Thousands of corporate devices wiped.
No ransomware.
No exploit chain.
No malware.

Just legitimate admin actions.

If you can wipe every device from a single admin account, that account is your biggest risk.

That is what makes the March 2026 incident involving Stryker worth paying attention to. Not because it was technically novel, but because it reflects a shift that many organizations still have not fully internalized.

---

## What actually happened

Public reporting indicates that an attacker, linked in some coverage to the Iran-aligned group Handala, gained privileged access to Stryker's Microsoft environment.

From there, they did not follow the usual playbook.

There was no obvious malware deployment, no noisy lateral movement, and no attempt to establish persistence through traditional means.

Instead, they moved directly to impact.

They used Microsoft Intune as the control plane.

Specifically, they used it exactly as it was designed:

- issuing remote wipe commands
- at scale
- against managed corporate devices

Reports suggest tens of thousands of devices were impacted. The attacker claimed significantly higher numbers, though as always, those figures should be treated with caution.

The operational impact was real. Ordering and logistics systems were disrupted, which is where the business felt it.

Importantly, there were statements indicating that product safety and core medical systems were not affected.

This was not indiscriminate destruction. It was targeted disruption, delivered through legitimate administrative capability.

---

## The part most people are missing

It is easy to look at an incident like this and assume something must have been exploited.

A vulnerability. A misconfiguration. A missed patch.

That does not appear to be the case here.

This was not a malware problem.

It was a control plane problem.

For years, we have operated with a fairly simple mental model:

- attacker tools are inherently suspicious
- enterprise admin tools are inherently trusted

That model made sense when attackers needed to bring their own capability into an environment.

It breaks down when the environment already contains everything they need.

If an attacker has admin access, your tooling becomes their tooling.

And in modern cloud-managed environments, that tooling is powerful by design. It is meant to operate at scale. It is meant to make large changes quickly.

Those are exactly the properties an attacker needs.

---

## Why traditional controls struggle here

Most detection strategies are still anchored around the idea that something malicious will happen on the endpoint.

A binary will execute. A process will behave abnormally. Network traffic will look suspicious.

None of that applies here.

- EDR and AV have nothing to detect because no malicious code is executed
- Network controls see normal, expected traffic to Microsoft services
- Device compliance continues to report devices as healthy right up until they are wiped

From the platform's perspective, everything is functioning normally.

The system did not fail. It behaved exactly as designed.

And that is what makes this class of attack difficult to reason about if your controls are focused in the wrong place.

---

## The real attack surface: identity and admin intent

In this model, the blast radius is not defined by how many endpoints you have.

It is defined by how much authority a single identity holds.

Specifically:

- who can perform high-impact actions
- how easily they can perform them
- how quickly those actions can be executed at scale

In Intune and similar endpoint management platforms, a sufficiently privileged identity can:

- wipe devices
- push configuration policies
- disable or weaken security controls
- reconfigure access to corporate resources

At enterprise scale, these are not just administrative functions.

They are destructive capabilities if misused.

And importantly, they are centralized. That is what makes them efficient for administrators and dangerous when compromised.

---

## What you should actually be watching

If your detections are still centered on endpoints, you are looking downstream of the problem.

The focus needs to shift to the admin plane, where decisions are made and actions are initiated.

That means paying attention to a different set of signals.

### Identity signals

These are often the earliest indicators that something is changing:

- Privileged role assignments
- PIM activations for high-impact roles
- Changes to administrative group membership

None of these are inherently malicious, but they define capability.

### Behavior signals

Once capability is established, behavior is what matters:

- Bulk device wipe actions
- Rapid, repeated high-impact operations
- Administrative actions occurring outside normal patterns

### Session context

The where and how matter as much as the what:

- Admin activity from a new or previously unseen device
- Changes in location or session characteristics
- Token reuse or unusual session continuity

---

## Correlation matters

Individually, many of these signals are low value.

Together, they tell a story.

What you are looking for are sequences like:

New privilege -> new session -> high-impact action -> scale

For example:

A newly activated Intune admin role followed by 500+ wipe actions within 5 minutes from a previously unseen device.

That is not an anomaly to triage later. That is your incident in progress.

This is where detection needs to evolve from single-event alerts to linked behavior over time.

---

## Design matters more than detection

There is a tendency to assume we can detect our way out of these problems.

In reality, the time window is too small.

If a single identity can wipe thousands of devices in minutes, detection becomes retrospective. You are analyzing what already happened.

That shifts the focus from detection to design.

You need to ask a more fundamental question:

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

This is one of the more important controls.

It introduces a deliberate checkpoint for actions that can have large-scale impact.

It is not about slowing down normal operations.
It is about ensuring that a single compromised identity does not translate directly into a large-scale incident.

---

## What this actually tells us

There was no zero-day.

No advanced exploit chain.

No particularly novel technique.

The attacker logged in and used the platform exactly as designed.

That is the shift.

The question is no longer just how you keep attackers out.

It is what happens when they get access to the same tools your administrators rely on every day.

---

## References

- CISA alert: https://www.cisa.gov/news-events/alerts/2026/03/18/cisa-urges-endpoint-management-system-hardening-after-cyberattack-against-us-organization
- Microsoft Intune security guidance: https://techcommunity.microsoft.com/blog/intunecustomersuccess/best-practices-for-securing-microsoft-intune/4502117
- Coverage: https://www.bleepingcomputer.com/news/security/cisa-warns-businesses-to-secure-microsoft-intune-systems-after-stryker-breach/
- Coverage: https://www.theregister.com/2026/03/19/microsoft_intune_lockdown_stryker/
- Coverage: https://techcrunch.com/2026/03/19/cisa-urges-companies-to-secure-microsoft-intune-systems-after-hackers-mass-wipe-stryker-devices/
