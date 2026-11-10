# ScholarPulse — Research Project Manager

> **A Web Platform for Graduate Thesis Tracking and Supervisor Feedback**  
> *Web Application Development / Education / Project Management System*

ScholarPulse is a full-featured web platform that modernizes graduate thesis management. It replaces scattered emails, lost files, and missed feedback threads with a structured milestone roadmap, strict deliverable document versioning (`v1`, `v2`, `v3...`), supervisor review workflows, transparent progress analytics, and an institutional open-access repository.

---

## 🚀 How to Run This Project on Your Local Machine

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x` or `v22.x`)
- **npm**: `v9.0.0` or higher (included with Node.js)
- A modern web browser (Chrome, Edge, Firefox, Safari)

To check your current versions, run:
```bash
node -v
npm -v
```

---

### 2. Installation Steps

#### Step 1: Clone or Download the Project
```bash
git clone <repository-url>
cd scholarpulse
```

#### Step 2: Install Dependencies
Install all required runtime and development dependencies (React 19, Vite, Tailwind CSS v4, Lucide icons, Motion):
```bash
npm install
```

#### Step 3: Configure Environment Variables (Optional)
The project comes pre-configured with defaults. If you wish to specify custom environment variables, copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Contents of `.env`:
```env
# Optional Gemini API Key
GEMINI_API_KEY=""

# Local development URL
APP_URL="http://localhost:3000"
```

#### Step 4: Run the Development Server
```bash
npm run dev
```

The Vite development server will start on:
```
➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

Open your browser and navigate to **`http://localhost:3000`**.

---

### 3. Production Build & Deployment

To compile and bundle optimized static assets for production:
```bash
# Type check and build static files into /dist
npm run build

# Preview the production build locally
npm run preview
```

To run TypeScript verification:
```bash
npm run lint
```

---

## 👥 The Four User Roles & Demo Accounts

ScholarPulse implements role-governed permissions across four user tiers. You can use the **Persona Switcher** in the top navigation bar or log in with the following demo accounts:

| Role | Name | Email | Purpose & Permissions |
| :--- | :--- | :--- | :--- |
| **Student** | Aisha Patel | `aisha.patel@graduate.edu` | Manage own theses, upload deliverables (PDF, DOCX, ZIP) with auto-incremented versions, respond to supervisor feedback, request publication. |
| **Student (Revisions)** | Elena Rostova | `elena.rostova@graduate.edu` | Robotics researcher with active *"Needs Revision"* milestone to test student correction and re-upload workflows. |
| **Supervisor** | Dr. Marcus Vance | `m.vance@faculty.edu` | Faculty supervisor. View assigned advisees, review submitted deliverables, write comments, approve milestones, or request revisions. |
| **Administrator** | Prof. Eleanor Wright | `admin.wright@university.edu` | Dean / System Admin. Publish/unpublish projects, choose *Featured* projects for home showcase, assign supervisors, manage user roles. |
| **Guest User** | Public Visitor | *Unauthenticated* | Read-only access to published theses, research abstracts, and featured showcases. |

---

## 🌟 Key Features

1. **FR-01: User Registration & Login**:
   - Role-based views for Guest, Student, Supervisor, and Administrator.
   - Profile management with department, title, and password updating.

2. **FR-02: Create and Manage Projects**:
   - Create research projects with title, abstract, research discipline, and keywords.
   - Edit or delete drafts until published.

3. **FR-03: Milestones & Progress Tracking**:
   - Standard 4-phase academic roadmap (*Proposal & Ethics*, *Literature Review*, *Implementation & Experiments*, *Final Thesis Manuscript*).
   - Real-time progress bar calculated from completed milestones with tabular numerals (`tabular-nums`).

4. **FR-04: Document Uploads with Version Control**:
   - Upload deliverables in **PDF**, **DOCX**, or **ZIP** format (validated on client up to 25MB).
   - Immutable version tracking (`v1`, `v2`, `v3...`) with change notes, timestamps, and previous version download/preview.

5. **FR-05: Supervisor Feedback & Approval**:
   - Official sign-off controls: *Approve Milestone*, *Request Changes*, or *Advisory Comment*.
   - Threaded student responses for seamless revisions.

6. **FR-06: Search & Filter**:
   - Live search by title, keyword, or author.
   - Filter by academic research area and year (`ALL`, `2026`, `2025`, `2024`).
   - Clear *"No results found"* empty state.

7. **FR-07: Project Detail Page**:
   - Full thesis layout with abstract, candidate, supervisor, keyword tags, milestone timeline, and deliverable download simulation.

8. **FR-08: Featured Projects**:
   - Curated research showcase with high-resolution laboratory imagery on the homepage.

9. **FR-09: In-App & Email Notifications**:
   - In-app notification center and simulated transactional email outbox logging delivery of feedback, approval, and deadline alerts.

10. **FR-10: Progress Dashboard & Charts**:
    - Interactive visual charts for milestone status breakdown, research discipline distribution, and overdue deadline monitoring.

11. **FR-11: Mobile-Friendly Responsive Design**:
    - Designed with touch targets ($\ge 44\text{px}$), collapsible navigation drawers, and fluid typography.

---

## 🛠️ Project Structure

```
├── .env.example                     # Environment template
├── index.html                       # HTML entry point with fonts
├── metadata.json                    # Application metadata
├── package.json                     # Scripts and dependencies
├── tsconfig.json                    # TypeScript compiler options
├── vite.config.ts                   # Vite configuration
├── src/
│   ├── main.tsx                     # React root mount
│   ├── App.tsx                      # Root component with view routing
│   ├── index.css                    # Tailwind CSS v4 and typography
│   ├── types/
│   │   └── index.ts                 # TypeScript data contracts & models
│   ├── data/
│   │   └── seedData.ts              # Seed theses, milestones, and users
│   ├── context/
│   │   └── AppContext.tsx           # State management & localStorage sync
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx           # 3-zone header & notifications
│       │   ├── PersonaBanner.tsx    # Role switcher & local run guide
│       │   └── Footer.tsx           # Institutional archive footer
│       ├── common/
│       │   ├── ProgressBar.tsx      # Tabular milestone progress bar
│       │   ├── StatusIndicator.tsx  # Zero-pill accessible status badges
│       │   ├── Toast.tsx            # Transient alert notifications
│       │   └── LocalRunModal.tsx    # Local execution instructions modal
│       ├── repository/
│       │   ├── RepositoryView.tsx   # Searchable archive & hero
│       │   ├── ProjectCard.tsx      # Scholarly research card
│       │   ├── ProjectDetailPage.tsx# Comprehensive thesis detail view
│       │   └── ProjectSearchFilter.tsx # Discipline & year filter bar
│       ├── featured/
│       │   ├── FeaturedProjectsSection.tsx # Homepage laboratory showcase
│       │   └── FeaturedView.tsx     # Dedicated honors research view
│       ├── projects/
│       │   ├── StudentProjectsView.tsx # Student thesis workspace
│       │   └── CreateProjectModal.tsx  # Project creation form
│       ├── milestones/
│       │   ├── MilestoneDetailModal.tsx # Uploads, versions, supervisor review
│       │   └── DocumentViewerModal.tsx  # Deliverable preview and download
│       ├── supervisor/
│       │   └── SupervisorPortalView.tsx # Advisee queue & evaluations
│       ├── admin/
│       │   └── AdminConsoleView.tsx    # Governance, publishing, user roles
│       ├── dashboard/
│       │   └── AnalyticsDashboardView.tsx # Milestone breakdown & overdue alerts
│       ├── auth/
│       │   ├── AuthModal.tsx        # Login & registration modal
│       │   └── ProfileModal.tsx     # User credentials & password
│       └── notifications/
│           └── NotificationDrawer.tsx  # In-app notifications & email logs
```

---

## 📄 License
Academic Research / Open Access. Distributed for academic project management and thesis tracking.
