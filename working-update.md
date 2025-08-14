## Detailed Implementation Plan

### Phase 1: Technical Infrastructure & Data Sources

#### 1.1 Dependency Registry Data Integration

- [ ] **Dependency visualization data**
  - Parse package.json files from ts-libs monorepo (build a `.github/prompts/retrieve-package-info.prompt.md` file to do this, not an API endpoint for now)
  - Build dependency graph showing core-ts-lib → other packages that are maintained by me (`@aneuhold` prefix)
  - Map out the interconnection web

- [ ] **Apache ECharts integration**
  - Set up chart components for:
    - Package dependency network (network graph)

#### 1.2 Content Management System

- [ ] **Project data structure**
  - Extend existing `projects.ts` config
  - Add fields for: technical highlights, architecture diagrams, demo credentials
  - Include chronological ordering (most recent first)
  - Add project categories (Infrastructure, Full-Stack, Tooling)

### Phase 2: Layout Implementation - "Engineering Journey Timeline"

#### 2.1 Hero Section Redesign

- [ ] **Update Hero component**
  - Lead with "Senior Software Engineer"
  - Highlight "Building Production Systems & Infrastructure"
  - Add brief tagline about full-stack systems thinking

#### 2.2 Timeline Component Architecture

- [ ] **Timeline container component**
  - Chronological layout (2025 → earlier)
  - Responsive design for mobile/desktop
  - Smooth scroll navigation between projects

- [ ] **Project timeline cards**
  - Larger format than current project cards
  - Technical highlights section with key technologies
  - "Engineering Impact" callouts (e.g., "Dual Registry Publishing", "Monorepo Architecture")
  - Interactive elements (expandable details, live stats)

#### 2.3 Project-Specific Implementations

**ts-libs Monorepo Showcase:**

- [ ] **Interactive dependency graph**
  - Network visualization showing core-ts-lib as center node
  - Clickable nodes leading to package details
  - Real-time download stats overlay

- [ ] **Dual publishing demo**
  - Publishing workflow visualization
  - Code snippet showing JSR import syntax

- [ ] **Package timeline**
  - Chronological view of package evolution
  - Version release highlights
  - Usage examples from other projects

**Dashboard + Digital Ocean Functions:**

- [ ] **Demo credentials section**
  - Secure test account details
  - Clear instructions for exploration
  - Link to live demo environment
- [ ] **Architecture showcase**
  - System diagram: SvelteKit → DO Functions → MongoDB
  - API endpoint documentation
  - Performance metrics display

- [ ] **Technical deep-dive**
  - Database schema decisions
  - Authentication flow diagram
  - Scalability considerations

**main-scripts Tooling:**

- [ ] **Command showcase**
  - "Day in the life" workflow demonstration
  - Real-world use case examples:
    - `tb pkg` workflow for publishing
    - `tb open` project detection logic
    - `tb clean branches` git automation

- [ ] **Integration highlights**
  - How main-scripts powers ts-libs publishing
  - Connection to core-ts-lib functionality
  - Productivity metrics (time saved, automation achieved)

### Phase 3: Advanced Features & Polish

#### 3.1 Interactive Elements

- [ ] **Live data integration**
  - Real-time package download counters
  - GitHub repo stats (stars, forks, recent activity)
  - Build status indicators for public repos

- [ ] **Code snippet integration**
  - Syntax-highlighted examples
  - Copy-to-clipboard functionality
  - Real import statements for each package

#### 3.2 Performance & UX

- [ ] **Performance optimization**
  - Lazy loading for charts and heavy content

- [ ] **Mobile responsiveness**
  - Timeline layout adaptation
  - Chart responsiveness
  - Touch-friendly interactions

### Phase 4: Content Refinement

#### 4.1 Technical Writing

- [ ] **Engineering narratives**
  - Write compelling descriptions focusing on technical decisions
  - Highlight problem-solving approach
  - Emphasize production-ready thinking

- [ ] **Employer-focused messaging**
  - Frame projects in terms of business value
  - Highlight scalability and maintainability decisions
  - Showcase full-stack thinking and infrastructure mindset

#### 4.2 SEO & Discoverability

- [ ] **Technical SEO**
  - Meta descriptions emphasizing engineering skills
  - Structured data for projects
  - OpenGraph images showing architecture diagrams

---

## Success Metrics

**Technical Demonstration:**

- Visitors can see real download stats from both registries
- Dependency relationships are clearly visualized
- Production system (dashboard) is accessible and functional

**Engineering Narrative:**

- Clear progression from individual tools → interconnected systems
- Infrastructure thinking is evident (monorepos, publishing workflows)
- Production maintenance mindset is showcased

**Employer Appeal:**

- Demonstrates ability to build and maintain real systems
- Shows modern development practices (dual publishing, monorepos)
- Highlights productivity tooling and automation mindset

--- Possible future things

- [ ] **Screenshot management**
  - Create asset management system for dashboard screenshots
  - Implement responsive image loading
  - Add image optimization pipeline
