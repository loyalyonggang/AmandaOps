# Amanda Brand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebrand the user-facing IvyeaOps experience as Amanda 跨境工作台 without renaming internal APIs, storage, or the IvyeaAgent runtime.

**Architecture:** Add one original SVG brand asset and reference it from the existing React surfaces. Change only user-visible strings and service metadata; retain internal identifiers for upstream compatibility.

**Tech Stack:** React, TypeScript, Vite, SVG, FastAPI, pytest

---

### Task 1: Add Amanda brand assets

**Files:**
- Create: `client/public/amanda-logo.svg`
- Modify: `client/index.html`

**Steps:**
1. Add the A-and-orbit SVG with no external dependencies.
2. Point the favicon and browser title at the Amanda brand.
3. Render the SVG at 22px and 256px to verify clarity.

### Task 2: Replace primary UI branding

**Files:**
- Modify: `client/src/pages/Login.tsx`
- Modify: `client/src/layouts/MainLayout.tsx`
- Modify: `client/src/components/AccountMenu.tsx`
- Modify: `client/src/pages/workbench/Console.tsx`
- Modify: `client/src/pages/Setup.tsx`
- Modify: `client/src/lib/tours.ts`
- Modify: `client/src/styles/workbench.css`

**Steps:**
1. Replace the login, sidebar, setup, task and tour labels with Amanda branding.
2. Replace app-level logo references while leaving the IvyeaAgent provider logo untouched.
3. Add only the CSS needed to size the login logo and longer sidebar wordmark.

### Task 3: Update supporting user-visible labels

**Files:**
- Modify: `client/src/pages/workbench/Market.tsx`
- Modify: `client/src/pages/workbench/Playbook.tsx`
- Modify: `client/src/pages/workbench/HubSettings.tsx`
- Modify: `client/src/pages/workbench/CommunityMarket.tsx`
- Modify: `client/src/pages/skill/SkillMarket.tsx`
- Modify: `client/src/components/UpdateModal.tsx`
- Modify: `client/src/components/settings/SubscriptionLogin.tsx`
- Modify: `client/src/agents/components/sidebar/view/subcomponents/SidebarProjectList.tsx`

**Steps:**
1. Replace only rendered product-name strings.
2. Keep code identifiers, storage keys and operational paths unchanged.
3. Search the built client for stale primary-brand labels.

### Task 4: Update service metadata and README

**Files:**
- Modify: `server/app/main.py`
- Modify: `server/app/routers/health.py`
- Modify: `README.md`

**Steps:**
1. Update OpenAPI and health metadata to Amanda 跨境工作台.
2. Update README title, badges and repository links.
3. Add explicit upstream IvyeaOps attribution and preserve AGPL notices.

### Task 5: Verify and publish

**Files:**
- Test: `client/` production build
- Test: `server/app/tests/test_auth_admin_session.py`
- Test: live `/api/health`, login and `/api/listing/projects`

**Steps:**
1. Run `npm run typecheck` and `npm run build` from `client/`; expect success.
2. Run the focused backend test; expect pass.
3. Restart the local server and verify health, login and Listing API responses.
4. Inspect the login page and sidebar in the browser.
5. Commit the scoped changes and push `main` to `origin` without force.
