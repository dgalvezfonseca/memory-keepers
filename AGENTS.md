<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
# Mikuva Project Instructions

## Required design skills

Before making visual, UX, layout, typography, responsive, user-facing copy, or component-level changes:

1. Read `DESIGN.md` completely if it exists.
2. Read the applicable repository-local skill completely from `.agents/skills/<skill-name>/SKILL.md` before acting.
3. Inspect the existing implementation before editing.

Use the repository-local skills as follows:

- Use `frontend-design` when creating, reshaping, reviewing, or polishing pages and components where visual direction, hierarchy, typography, composition, motion, responsive behavior, accessibility, or interface copy matters.
- Use `design-system` when auditing, documenting, or extending tokens, colors, typography, spacing, radii, shadows, motion, component variants and states, accessibility contracts, or reusable UI patterns.
- Use `design-md` only when creating, extracting, validating, updating, diffing, previewing, or exporting a `DESIGN.md` design-system document. Do not create `DESIGN.md` proactively; create it only when the user requests it.
- When a task spans several areas, use the smallest applicable set. For example, use `design-md` for the design document, `frontend-design` for the visual direction, and `design-system` for reusable tokens or component contracts.

Always reuse existing components and tokens where appropriate. Do not create a parallel design system, redesign sections merely to make them more uniform, or introduce generic AI-generated interface patterns.

## Mikuva visual intent

Mikuva is a professional memory-preservation and digitization service.

The interface must feel:

- human
- photographic
- editorial
- warm
- trustworthy
- premium
- modern
- emotionally restrained

It must NOT look like:

- a SaaS landing page
- a generic ecommerce template
- a Lovable default
- an AI-generated bento-grid website
- a fintech dashboard
- a startup template

## Anti-AI design rules

Avoid:

- repetitive 3-card grids
- icon-circle-title-description sections repeated everywhere
- excessive pills and badges
- decorative gradients
- purple/pink gradients
- glassmorphism
- random blobs
- excessive rounded rectangles
- fake testimonials
- fake statistics
- fake trust badges
- unnecessary dashboards
- centered text in every section
- identical section compositions

Prefer:

- real photography
- editorial layouts
- controlled asymmetry
- strong typography
- negative space
- varied composition
- subtle photographic references
- restrained use of the Mikuva pink
- deliberate hierarchy

## Architecture

Preserve the existing project architecture:

- TanStack Start
- TanStack Router
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- Bun

Do not migrate to Next.js.

## Validation

After significant implementation changes:

- run typecheck
- run lint
- run build
- verify responsive behavior
- verify accessibility
