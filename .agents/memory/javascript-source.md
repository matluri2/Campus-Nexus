---
name: JavaScript source deliverables
description: User's language requirement for standalone website code exports
---
Standalone website source deliverables must use plain `.js` files with no `.jsx`, `.tsx`, or TypeScript source. HTML and CSS may remain as the browser entry and presentation assets.

**Why:** The user explicitly requested JavaScript rather than JSX, TypeScript, or another application source language.

**How to apply:** When generating an editable website package, transform JSX syntax into JavaScript and verify that the source archive contains no `.jsx`, `.tsx`, or `.ts` files.
