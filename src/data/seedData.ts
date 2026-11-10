import { User, Project, NotificationItem, ResearchAreaOption } from '../types';

export const RESEARCH_AREAS: ResearchAreaOption[] = [
  { id: 'ai-ml', name: 'Artificial Intelligence & Machine Learning', code: 'CS-AI', description: 'Deep learning, neural networks, computer vision, and NLP.' },
  { id: 'clean-energy', name: 'Clean Energy & Materials Science', code: 'EN-MAT', description: 'Renewable energy systems, photovoltaics, and battery storage.' },
  { id: 'robotics', name: 'Autonomous Robotics & Control', code: 'ROB-SYS', description: 'Robotic manipulation, sensor fusion, and autonomous navigation.' },
  { id: 'quantum', name: 'Quantum Computing & Information', code: 'QC-INF', description: 'Quantum error correction, superconducting qubits, and algorithms.' },
  { id: 'biomedical', name: 'Biomedical Engineering & Health Informatics', code: 'BIO-MED', description: 'Medical imaging, biosensors, and digital health technology.' },
  { id: 'cybersecurity', name: 'Cybersecurity & Distributed Systems', code: 'SEC-DIST', description: 'Zero-trust networks, cryptographic protocols, and cloud resilience.' },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'student-1',
    name: 'Aisha Patel',
    email: 'aisha.patel@graduate.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Department of Computer Science & Artificial Intelligence',
    title: 'M.Sc. Research Candidate',
    assignedSupervisorId: 'supervisor-1',
    assignedSupervisorName: 'Dr. Marcus Vance',
  },
  {
    id: 'student-2',
    name: 'Liam Chen',
    email: 'liam.chen@graduate.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'School of Sustainable Engineering & Materials',
    title: 'Ph.D. Researcher',
    assignedSupervisorId: 'supervisor-2',
    assignedSupervisorName: 'Dr. Sophia Lindqvist',
  },
  {
    id: 'student-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@graduate.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Laboratory for Autonomous Systems & Robotics',
    title: 'M.Sc. Candidate in Mechatronics',
    assignedSupervisorId: 'supervisor-1',
    assignedSupervisorName: 'Dr. Marcus Vance',
  },
  {
    id: 'supervisor-1',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@faculty.edu',
    role: 'supervisor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Department of Computer Science & Artificial Intelligence',
    title: 'Associate Professor & Research Chair',
    studentIds: ['student-1', 'student-3', 'student-4'],
  },
  {
    id: 'supervisor-2',
    name: 'Dr. Sophia Lindqvist',
    email: 's.lindqvist@faculty.edu',
    role: 'supervisor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'School of Sustainable Engineering & Materials',
    title: 'Professor of Renewable Energy Systems',
    studentIds: ['student-2'],
  },
  {
    id: 'admin-1',
    name: 'Prof. Eleanor Wright',
    email: 'admin.wright@university.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Office of Graduate Studies & Research Governance',
    title: 'Dean of Graduate Research & System Administrator',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Deep Multi-Modal Segmentation for Early Glioblastoma Detection in Brain MRI',
    abstract: 'This thesis develops an attention-gated 3D convolutional neural network integrated with contrast-enhanced diffusion MRI features for early volumetric segmentation of glioblastoma multiforme. Evaluated against the BraTS 2025 benchmark, the proposed architecture improves boundary Hausdorff distance by 18.4% and accelerates inference to under 420 milliseconds per full volumetric scan.',
    researchArea: 'Artificial Intelligence & Machine Learning',
    keywords: ['Deep Learning', 'Medical Imaging', 'MRI Segmentation', 'Convolutional Networks', 'Neuro-oncology'],
    year: 2026,
    status: 'published',
    isFeatured: true,
    featuredImage: '/src/assets/images/research_ai_healthcare_1794326264048.jpg',
    studentId: 'student-1',
    studentName: 'Aisha Patel',
    studentEmail: 'aisha.patel@graduate.edu',
    studentDepartment: 'Department of Computer Science & Artificial Intelligence',
    supervisorId: 'supervisor-1',
    supervisorName: 'Dr. Marcus Vance',
    supervisorEmail: 'm.vance@faculty.edu',
    department: 'Department of Computer Science & Artificial Intelligence',
    createdAt: '2025-09-15T08:30:00Z',
    updatedAt: '2026-03-20T14:15:00Z',
    publishedAt: '2026-03-22T09:00:00Z',
    milestones: [
      {
        id: 'm-101',
        projectId: 'proj-1',
        title: 'Project Proposal & Ethics Clearance',
        description: 'Formal submission of research problem definition, ethics approval for anonymized medical scan dataset access, and compute resource allocation.',
        order: 1,
        dueDate: '2025-10-15T00:00:00Z',
        status: 'completed',
        completedAt: '2025-10-12T11:20:00Z',
        deliverables: [
          {
            id: 'del-101-1',
            milestoneId: 'm-101',
            fileName: 'Glioblastoma_Research_Proposal_v1.pdf',
            fileType: 'pdf',
            fileSize: 2450000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Initial formal research proposal submitted for faculty review.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2025-10-05T16:00:00Z',
            textContentPreview: 'Research Proposal: Multi-Modal Segmentation of Glioblastoma Brain Scans. Primary Objective: Formulate attention gating modules for 3D U-Net architectures with clinical validation.'
          },
          {
            id: 'del-101-2',
            milestoneId: 'm-101',
            fileName: 'Glioblastoma_Research_Proposal_v2_Final.pdf',
            fileType: 'pdf',
            fileSize: 2580000,
            fileUrl: '#mock-file-viewer',
            version: 2,
            changeNote: 'Incorporated IRB ethics committee reference number and GPU cluster timeline per Dr. Vance.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2025-10-11T09:30:00Z',
            textContentPreview: 'Approved Proposal v2: Ethics clearance ID: MED-ETH-2025-089. Added compute provisioning on A100 GPU cluster.'
          }
        ],
        feedback: [
          {
            id: 'fb-101-1',
            milestoneId: 'm-101',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'The core mathematical formulation is strong. Please append the IRB protocol number in Section 3 before final sign-off.',
            actionType: 'changes_requested',
            createdAt: '2025-10-07T14:30:00Z',
          },
          {
            id: 'fb-101-2',
            milestoneId: 'm-101',
            authorId: 'student-1',
            authorName: 'Aisha Patel',
            authorRole: 'student',
            content: 'Updated in v2 with official IRB clearance document appended as Appendix A.',
            actionType: 'comment',
            createdAt: '2025-10-11T10:00:00Z',
            parentCommentId: 'fb-101-1',
          },
          {
            id: 'fb-101-3',
            milestoneId: 'm-101',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Proposal approved without reservation. Proceed to Literature Review.',
            actionType: 'approved',
            createdAt: '2025-10-12T11:20:00Z',
          }
        ]
      },
      {
        id: 'm-102',
        projectId: 'proj-1',
        title: 'Comprehensive Literature Review',
        description: 'Systematic analysis of 94 peer-reviewed papers on deep learning architectures, cross-modality synthesis, and tumor sub-region boundary delineation.',
        order: 2,
        dueDate: '2025-12-10T00:00:00Z',
        status: 'completed',
        completedAt: '2025-12-08T15:45:00Z',
        deliverables: [
          {
            id: 'del-102-1',
            milestoneId: 'm-102',
            fileName: 'Systematic_Literature_Review_Segmentation.pdf',
            fileType: 'pdf',
            fileSize: 4200000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Complete chapter with comparative taxonomy of CNN vs Vision Transformer segmentation backbones.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2025-12-05T18:20:00Z',
            textContentPreview: 'Chapter 2: State-of-the-Art in Automated Brain Lesion Segmentation. Analysis of BraTS benchmarks 2021-2024.'
          }
        ],
        feedback: [
          {
            id: 'fb-102-1',
            milestoneId: 'm-102',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Exemplary bibliographic synthesis. The comparison table of loss functions is publication-grade.',
            actionType: 'approved',
            createdAt: '2025-12-08T15:45:00Z',
          }
        ]
      },
      {
        id: 'm-103',
        projectId: 'proj-1',
        title: 'Model Architecture & Benchmark Implementation',
        description: 'PyTorch implementation of the dual-pathway 3D convolutional encoder with cross-attention bottleneck and Hausdorff loss weighting.',
        order: 3,
        dueDate: '2026-02-15T00:00:00Z',
        status: 'completed',
        completedAt: '2026-02-14T17:10:00Z',
        deliverables: [
          {
            id: 'del-103-1',
            milestoneId: 'm-103',
            fileName: 'Architecture_Source_Code_and_Weights.zip',
            fileType: 'zip',
            fileSize: 18500000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Model training pipelines, data pre-processing scripts, and pre-trained checkpoints.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2026-02-10T12:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-103-1',
            milestoneId: 'm-103',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Code is well documented and modular. Verification runs on cluster node confirmed reproduceable Dice scores.',
            actionType: 'approved',
            createdAt: '2026-02-14T17:10:00Z',
          }
        ]
      },
      {
        id: 'm-104',
        projectId: 'proj-1',
        title: 'Final Thesis Manuscript & Defense Presentation',
        description: 'Complete 128-page master thesis manuscript, defense presentation slides, and clinical evaluation metrics.',
        order: 4,
        dueDate: '2026-03-15T00:00:00Z',
        status: 'completed',
        completedAt: '2026-03-20T14:15:00Z',
        deliverables: [
          {
            id: 'del-104-1',
            milestoneId: 'm-104',
            fileName: 'Final_Thesis_Aisha_Patel_Glioblastoma.pdf',
            fileType: 'pdf',
            fileSize: 14200000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Official archival thesis manuscript approved by examination committee.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2026-03-18T10:00:00Z',
            textContentPreview: 'Title: Deep Multi-Modal Segmentation for Early Glioblastoma Detection. Candidate: Aisha Patel. Degree: Master of Science. Supervisor: Dr. Marcus Vance.'
          }
        ],
        feedback: [
          {
            id: 'fb-104-1',
            milestoneId: 'm-104',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Outstanding defense presentation. Grade awarded: High Distinction (A+). Approved for institutional repository publication.',
            actionType: 'approved',
            createdAt: '2026-03-20T14:15:00Z',
          }
        ]
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Perovskite-Silicon Tandem Photovoltaics Under Accelerated Thermal Stress',
    abstract: 'This experimental study investigates degradation mechanisms of 2T monolithic perovskite-silicon tandem solar cells subjected to thermal cycling between -40°C and 85°C. By deploying a self-assembled methyl-substituted carbazole passivation monolayer, the champion tandem device sustained 93.2% of its initial 31.4% power conversion efficiency after 1,200 continuous thermal stress hours.',
    researchArea: 'Clean Energy & Materials Science',
    keywords: ['Perovskite Photovoltaics', 'Silicon Tandem', 'Thermal Degradation', 'Surface Passivation', 'Solar Energy'],
    year: 2025,
    status: 'published',
    isFeatured: true,
    featuredImage: '/src/assets/images/research_clean_energy_1794326264455.jpg',
    studentId: 'student-2',
    studentName: 'Liam Chen',
    studentEmail: 'liam.chen@graduate.edu',
    studentDepartment: 'School of Sustainable Engineering & Materials',
    supervisorId: 'supervisor-2',
    supervisorName: 'Dr. Sophia Lindqvist',
    supervisorEmail: 's.lindqvist@faculty.edu',
    department: 'School of Sustainable Engineering & Materials',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-11-28T16:30:00Z',
    publishedAt: '2025-12-01T10:00:00Z',
    milestones: [
      {
        id: 'm-201',
        projectId: 'proj-2',
        title: 'Project Proposal & Cleanroom Safety Protocol',
        description: 'Scope definition for tandem fabrication line in Class 100 cleanroom and chemical hazard containment documentation.',
        order: 1,
        dueDate: '2025-02-15T00:00:00Z',
        status: 'completed',
        completedAt: '2025-02-12T10:00:00Z',
        deliverables: [
          {
            id: 'del-201-1',
            milestoneId: 'm-201',
            fileName: 'Tandem_Solar_Proposal_v1.pdf',
            fileType: 'pdf',
            fileSize: 3100000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Initial proposal submission.',
            uploadedBy: 'Liam Chen',
            uploadedAt: '2025-02-08T11:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-201-1',
            milestoneId: 'm-201',
            authorId: 'supervisor-2',
            authorName: 'Dr. Sophia Lindqvist',
            authorRole: 'supervisor',
            content: 'Approved. Cleanroom allocation confirmed for Tuesdays and Thursdays.',
            actionType: 'approved',
            createdAt: '2025-02-12T10:00:00Z',
          }
        ]
      },
      {
        id: 'm-202',
        projectId: 'proj-2',
        title: 'Material Synthesis & Thin-Film Characterization',
        description: 'X-ray diffraction and photoluminescence mapping of perovskite absorber layers on textured silicon wafers.',
        order: 2,
        dueDate: '2025-05-30T00:00:00Z',
        status: 'completed',
        completedAt: '2025-05-28T14:00:00Z',
        deliverables: [
          {
            id: 'del-202-1',
            milestoneId: 'm-202',
            fileName: 'Spectroscopy_XRD_Raw_Data.zip',
            fileType: 'zip',
            fileSize: 22400000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Raw synchrotron and lab XRD spectra files with automated peak fitting notebook.',
            uploadedBy: 'Liam Chen',
            uploadedAt: '2025-05-25T17:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-202-1',
            milestoneId: 'm-202',
            authorId: 'supervisor-2',
            authorName: 'Dr. Sophia Lindqvist',
            authorRole: 'supervisor',
            content: 'Excellent grain boundary uniformity evidenced in the photoluminescence maps.',
            actionType: 'approved',
            createdAt: '2025-05-28T14:00:00Z',
          }
        ]
      },
      {
        id: 'm-203',
        projectId: 'proj-2',
        title: 'Thermal Cycling Environmental Chamber Testing',
        description: 'Executing 1200 hours of cyclic thermal stress in environmental climate chambers following IEC 61215 standards.',
        order: 3,
        dueDate: '2025-09-15T00:00:00Z',
        status: 'completed',
        completedAt: '2025-09-14T18:00:00Z',
        deliverables: [
          {
            id: 'del-203-1',
            milestoneId: 'm-203',
            fileName: 'Thermal_Cycling_Report_1200h.pdf',
            fileType: 'pdf',
            fileSize: 5600000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Complete degradation curves and impedance spectroscopy measurements.',
            uploadedBy: 'Liam Chen',
            uploadedAt: '2025-09-10T14:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-203-1',
            milestoneId: 'm-203',
            authorId: 'supervisor-2',
            authorName: 'Dr. Sophia Lindqvist',
            authorRole: 'supervisor',
            content: 'Remarkable retention stability. Results are ready for final thesis compilation.',
            actionType: 'approved',
            createdAt: '2025-09-14T18:00:00Z',
          }
        ]
      },
      {
        id: 'm-204',
        projectId: 'proj-2',
        title: 'Doctoral Dissertation Manuscript & Committee Review',
        description: 'Comprehensive dissertation monograph and peer-reviewed journal manuscript draft.',
        order: 4,
        dueDate: '2025-11-20T00:00:00Z',
        status: 'completed',
        completedAt: '2025-11-28T16:30:00Z',
        deliverables: [
          {
            id: 'del-204-1',
            milestoneId: 'm-204',
            fileName: 'PhD_Dissertation_Liam_Chen_Tandems.pdf',
            fileType: 'pdf',
            fileSize: 18900000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Final signed dissertation following successful public oral defense.',
            uploadedBy: 'Liam Chen',
            uploadedAt: '2025-11-25T11:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-204-1',
            milestoneId: 'm-204',
            authorId: 'supervisor-2',
            authorName: 'Dr. Sophia Lindqvist',
            authorRole: 'supervisor',
            content: 'Congratulations Dr. Chen! Dissertation accepted with high honors.',
            actionType: 'approved',
            createdAt: '2025-11-28T16:30:00Z',
          }
        ]
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Visual-Tactile Sensor Fusion for Precision Micro-Assembly in Collaborative Robotics',
    abstract: 'This project addresses high-precision component insertion tolerances (< 25 micrometers) in industrial cobots by fusing high-speed optical camera tracking with high-density optical gel-based tactile sensors (GelSight). Using a reinforcement learning policy with domain randomization, insertion success rate increases from 71.2% to 98.7% under variable lighting and surface reflectivity.',
    researchArea: 'Autonomous Robotics & Control',
    keywords: ['Sensor Fusion', 'Tactile Sensing', 'Micro-Assembly', 'Cobots', 'Reinforcement Learning'],
    year: 2026,
    status: 'in_progress',
    isFeatured: true,
    featuredImage: '/src/assets/images/research_robotics_1794326265085.jpg',
    studentId: 'student-3',
    studentName: 'Elena Rostova',
    studentEmail: 'elena.rostova@graduate.edu',
    studentDepartment: 'Laboratory for Autonomous Systems & Robotics',
    supervisorId: 'supervisor-1',
    supervisorName: 'Dr. Marcus Vance',
    supervisorEmail: 'm.vance@faculty.edu',
    department: 'Laboratory for Autonomous Systems & Robotics',
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2026-03-24T09:15:00Z',
    milestones: [
      {
        id: 'm-301',
        projectId: 'proj-3',
        title: 'Formal Thesis Proposal & Gripper Hardware Spec',
        description: 'System specifications for 6-DOF robotic manipulator, GelSight tactile fingertips, and dual RGB-D cameras.',
        order: 1,
        dueDate: '2025-11-25T00:00:00Z',
        status: 'completed',
        completedAt: '2025-11-23T14:00:00Z',
        deliverables: [
          {
            id: 'del-301-1',
            milestoneId: 'm-301',
            fileName: 'Robotics_Sensor_Fusion_Proposal_v1.pdf',
            fileType: 'pdf',
            fileSize: 3800000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Initial proposal and sensor budget.',
            uploadedBy: 'Elena Rostova',
            uploadedAt: '2025-11-20T10:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-301-1',
            milestoneId: 'm-301',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Approved. Hardware requisition order has been submitted to the robotics inventory.',
            actionType: 'approved',
            createdAt: '2025-11-23T14:00:00Z',
          }
        ]
      },
      {
        id: 'm-302',
        projectId: 'proj-3',
        title: 'Sensor Calibration & Cross-Modal Calibration Rig',
        description: 'Rigid body spatial calibration between stereo visual tracking and deformable silicone tactile sensor grid.',
        order: 2,
        dueDate: '2026-01-20T00:00:00Z',
        status: 'completed',
        completedAt: '2026-01-18T16:20:00Z',
        deliverables: [
          {
            id: 'del-302-1',
            milestoneId: 'm-302',
            fileName: 'Calibration_Rig_CAD_and_Results.zip',
            fileType: 'zip',
            fileSize: 15400000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Step files for 3D printed calibration target and ROS2 transformation publisher.',
            uploadedBy: 'Elena Rostova',
            uploadedAt: '2026-01-15T12:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-302-1',
            milestoneId: 'm-302',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Sub-millimeter calibration achieved. Approved to commence reinforcement learning trials.',
            actionType: 'approved',
            createdAt: '2026-01-18T16:20:00Z',
          }
        ]
      },
      {
        id: 'm-303',
        projectId: 'proj-3',
        title: 'Policy Training & Experimental Insertion Trials',
        description: 'Sim-to-real transfer with 10,000 simulated peg-in-hole cycles followed by physical testing on micro-connectors.',
        order: 3,
        dueDate: '2026-03-30T00:00:00Z',
        status: 'under_review',
        deliverables: [
          {
            id: 'del-303-1',
            milestoneId: 'm-303',
            fileName: 'Insertion_Policy_Trial_Report_v1.docx',
            fileType: 'docx',
            fileSize: 6200000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Initial draft containing insertion force-torque curves and trial video recordings link.',
            uploadedBy: 'Elena Rostova',
            uploadedAt: '2026-03-15T11:00:00Z',
          },
          {
            id: 'del-303-2',
            milestoneId: 'm-303',
            fileName: 'Insertion_Policy_Trial_Report_v2_Revision.docx',
            fileType: 'docx',
            fileSize: 6850000,
            fileUrl: '#mock-file-viewer',
            version: 2,
            changeNote: 'Added latency benchmarks for real-time contact detection and tactile normal vector filtering per supervisor feedback.',
            uploadedBy: 'Elena Rostova',
            uploadedAt: '2026-03-22T17:30:00Z',
            textContentPreview: 'Revised Chapter 4: Added Section 4.3 quantifying control cycle latency at 125 Hz. Tactical feedback reduces contact peak forces from 14.2N to 3.1N.'
          }
        ],
        feedback: [
          {
            id: 'fb-303-1',
            milestoneId: 'm-303',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'The trial results look encouraging, but you need to explicitly quantify the latency budget of the tactile image processing pipeline. If latency exceeds 15ms, closed-loop contact will oscillate.',
            actionType: 'changes_requested',
            createdAt: '2026-03-18T09:30:00Z',
          },
          {
            id: 'fb-303-2',
            milestoneId: 'm-303',
            authorId: 'student-3',
            authorName: 'Elena Rostova',
            authorRole: 'student',
            content: 'Thank you Dr. Vance! I have updated the report with v2 including the GPU TensorRT acceleration benchmarks which brought latency down to 7.8ms.',
            actionType: 'comment',
            createdAt: '2026-03-22T17:45:00Z',
            parentCommentId: 'fb-303-1',
          }
        ]
      },
      {
        id: 'm-304',
        projectId: 'proj-3',
        title: 'Final Thesis Manuscript & Demonstration Defense',
        description: 'Complete M.Sc. thesis writeup, committee review, and live laboratory robotic demonstration.',
        order: 4,
        dueDate: '2026-05-15T00:00:00Z',
        status: 'not_started',
        deliverables: [],
        feedback: []
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Fault-Tolerant Quantum Error Correction Protocols on Heavy-Hexagon Architectures',
    abstract: 'Superconducting transmon qubit processors with heavy-hexagon topological connectivity require tailored surface code variants to overcome nearest-neighbor communication constraints. This project presents a syndrome extraction protocol utilizing weight-4 and weight-2 gauge stabilizers that achieves a 1.28x reduction in total CNOT circuit depth while increasing fault-tolerance thresholds to 0.82%.',
    researchArea: 'Quantum Computing & Information',
    keywords: ['Quantum Computing', 'Error Correction', 'Surface Codes', 'Superconducting Qubits', 'Fault Tolerance'],
    year: 2026,
    status: 'submitted_for_publication',
    isFeatured: true,
    featuredImage: '/src/assets/images/research_quantum_1794326265070.jpg',
    studentId: 'student-4',
    studentName: 'Tariq Al-Mansoor',
    studentEmail: 'tariq.mansoor@graduate.edu',
    studentDepartment: 'Institute for Quantum Science & Technology',
    supervisorId: 'supervisor-1',
    supervisorName: 'Dr. Marcus Vance',
    supervisorEmail: 'm.vance@faculty.edu',
    department: 'Institute for Quantum Science & Technology',
    createdAt: '2025-08-20T08:00:00Z',
    updatedAt: '2026-03-19T15:00:00Z',
    milestones: [
      {
        id: 'm-401',
        projectId: 'proj-4',
        title: 'Proposal & Qubit Architecture Synthesis',
        description: 'Syndrome circuit design on IBM Eagle and Heron heavy-hexagon topologies.',
        order: 1,
        dueDate: '2025-10-01T00:00:00Z',
        status: 'completed',
        completedAt: '2025-09-28T10:00:00Z',
        deliverables: [
          {
            id: 'del-401-1',
            milestoneId: 'm-401',
            fileName: 'Heavy_Hex_QEC_Proposal.pdf',
            fileType: 'pdf',
            fileSize: 4500000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Initial proposal approved by faculty.',
            uploadedBy: 'Tariq Al-Mansoor',
            uploadedAt: '2025-09-25T11:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-401-1',
            milestoneId: 'm-401',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Rigorous theoretical premise. Ready to proceed.',
            actionType: 'approved',
            createdAt: '2025-09-28T10:00:00Z',
          }
        ]
      },
      {
        id: 'm-402',
        projectId: 'proj-4',
        title: 'Monte Carlo Stabilizer Simulation Framework',
        description: 'High-performance Clifford simulator implementation in C++ evaluating threshold under depolarizing noise models.',
        order: 2,
        dueDate: '2025-12-20T00:00:00Z',
        status: 'completed',
        completedAt: '2025-12-18T14:00:00Z',
        deliverables: [
          {
            id: 'del-402-1',
            milestoneId: 'm-402',
            fileName: 'Clifford_Sim_Source_and_Benchmarks.zip',
            fileType: 'zip',
            fileSize: 12800000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Source code and simulation batch logs for code distance d=3, 5, 7.',
            uploadedBy: 'Tariq Al-Mansoor',
            uploadedAt: '2025-12-15T18:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-402-1',
            milestoneId: 'm-402',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Simulation results substantiate the 0.82% threshold claim.',
            actionType: 'approved',
            createdAt: '2025-12-18T14:00:00Z',
          }
        ]
      },
      {
        id: 'm-403',
        projectId: 'proj-4',
        title: 'Final Thesis Manuscript & Publication Request',
        description: 'Complete dissertation prepared for institutional archive publication.',
        order: 3,
        dueDate: '2026-03-10T00:00:00Z',
        status: 'completed',
        completedAt: '2026-03-15T12:00:00Z',
        deliverables: [
          {
            id: 'del-403-1',
            milestoneId: 'm-403',
            fileName: 'Quantum_Error_Correction_Thesis_Final.pdf',
            fileType: 'pdf',
            fileSize: 11200000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Final thesis document submitted for repository publication.',
            uploadedBy: 'Tariq Al-Mansoor',
            uploadedAt: '2026-03-12T09:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-403-1',
            milestoneId: 'm-403',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Defense passed with honors. Submitted to Dean of Graduate Studies for publication in public repository.',
            actionType: 'approved',
            createdAt: '2026-03-15T12:00:00Z',
          }
        ]
      }
    ]
  },
  {
    id: 'proj-5',
    title: 'Privacy-Preserving Federated Learning for Distributed Electronic Health Records',
    abstract: 'Training clinical diagnostic models across multi-hospital consortia requires strict privacy guarantees under HIPAA and GDPR. This research develops a differential-privacy enabled federated averaging framework using adaptive gradient clipping and secure multi-party aggregation, retaining 96.4% centralized benchmark accuracy while guaranteeing epsilon-delta differential privacy.',
    researchArea: 'Cybersecurity & Distributed Systems',
    keywords: ['Federated Learning', 'Differential Privacy', 'Electronic Health Records', 'Secure Aggregation', 'Distributed Systems'],
    year: 2026,
    status: 'in_progress',
    isFeatured: false,
    studentId: 'student-1',
    studentName: 'Aisha Patel',
    studentEmail: 'aisha.patel@graduate.edu',
    studentDepartment: 'Department of Computer Science & Artificial Intelligence',
    supervisorId: 'supervisor-1',
    supervisorName: 'Dr. Marcus Vance',
    supervisorEmail: 'm.vance@faculty.edu',
    department: 'Department of Computer Science & Artificial Intelligence',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-03-23T11:00:00Z',
    milestones: [
      {
        id: 'm-501',
        projectId: 'proj-5',
        title: 'Project Proposal & Privacy Threat Model',
        description: 'Mathematical formulation of Byzantine adversaries and gradient inversion attack vectors in hospital consortia.',
        order: 1,
        dueDate: '2026-02-10T00:00:00Z',
        status: 'completed',
        completedAt: '2026-02-08T15:00:00Z',
        deliverables: [
          {
            id: 'del-501-1',
            milestoneId: 'm-501',
            fileName: 'Federated_Health_Proposal_v1.pdf',
            fileType: 'pdf',
            fileSize: 2100000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Initial proposal submission.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2026-02-05T14:00:00Z',
          }
        ],
        feedback: [
          {
            id: 'fb-501-1',
            milestoneId: 'm-501',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Approved. Threat model is well defined.',
            actionType: 'approved',
            createdAt: '2026-02-08T15:00:00Z',
          }
        ]
      },
      {
        id: 'm-502',
        projectId: 'proj-5',
        title: 'Literature Review on Secure Multi-Party Aggregation',
        description: 'Survey of homomorphic encryption vs additive secret sharing in federated clinical telemetry.',
        order: 2,
        dueDate: '2026-03-25T00:00:00Z',
        status: 'under_review',
        deliverables: [
          {
            id: 'del-502-1',
            milestoneId: 'm-502',
            fileName: 'Literature_Review_Secure_Aggregation.pdf',
            fileType: 'pdf',
            fileSize: 3400000,
            fileUrl: '#mock-file-viewer',
            version: 1,
            changeNote: 'Draft containing 62 citations on secure aggregation protocols.',
            uploadedBy: 'Aisha Patel',
            uploadedAt: '2026-03-20T16:00:00Z',
            textContentPreview: 'Literature Review: Privacy Preserving Federated Learning in Healthcare. Chapter 2 evaluates Paillier cryptosystems against Shamir secret sharing.'
          }
        ],
        feedback: [
          {
            id: 'fb-502-1',
            milestoneId: 'm-502',
            authorId: 'supervisor-1',
            authorName: 'Dr. Marcus Vance',
            authorRole: 'supervisor',
            content: 'Currently reviewing this chapter. Please verify citation #41 regarding communication overhead.',
            actionType: 'comment',
            createdAt: '2026-03-21T11:00:00Z',
          }
        ]
      },
      {
        id: 'm-503',
        projectId: 'proj-5',
        title: 'Distributed Simulation & Differential Privacy Proof',
        description: 'Simulating 50 client nodes with heterogeneous non-IID class distribution across 4 clinical diagnostic tasks.',
        order: 3,
        dueDate: '2026-04-30T00:00:00Z',
        status: 'in_progress',
        deliverables: [],
        feedback: []
      },
      {
        id: 'm-504',
        projectId: 'proj-5',
        title: 'Thesis Manuscript & Archival Submission',
        description: 'Final thesis defense and submission to the university repository.',
        order: 4,
        dueDate: '2026-06-15T00:00:00Z',
        status: 'not_started',
        deliverables: [],
        feedback: []
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'student-3',
    title: 'Feedback Posted by Dr. Marcus Vance',
    message: 'Dr. Marcus Vance requested changes on Milestone: "Policy Training & Experimental Insertion Trials" (Project: Visual-Tactile Sensor Fusion).',
    type: 'revision',
    read: false,
    linkToProjectId: 'proj-3',
    linkToMilestoneId: 'm-303',
    createdAt: '2026-03-18T09:30:00Z',
    emailSent: true,
    emailRecipient: 'elena.rostova@graduate.edu',
  },
  {
    id: 'notif-2',
    userId: 'supervisor-1',
    title: 'New Document Version Uploaded',
    message: 'Elena Rostova uploaded v2 of "Insertion_Policy_Trial_Report_v2_Revision.docx" for milestone review.',
    type: 'feedback',
    read: false,
    linkToProjectId: 'proj-3',
    linkToMilestoneId: 'm-303',
    createdAt: '2026-03-22T17:30:00Z',
    emailSent: true,
    emailRecipient: 'm.vance@faculty.edu',
  },
  {
    id: 'notif-3',
    userId: 'student-1',
    title: 'Thesis Approved for Publication!',
    message: 'Your project "Deep Multi-Modal Segmentation for Early Glioblastoma Detection in Brain MRI" has been published in the repository.',
    type: 'publish',
    read: true,
    linkToProjectId: 'proj-1',
    createdAt: '2026-03-22T09:00:00Z',
    emailSent: true,
    emailRecipient: 'aisha.patel@graduate.edu',
  },
  {
    id: 'notif-4',
    userId: 'student-1',
    title: 'Milestone Deadline Approaching',
    message: 'Milestone "Literature Review on Secure Multi-Party Aggregation" is due in 2 days (March 25).',
    type: 'deadline',
    read: false,
    linkToProjectId: 'proj-5',
    linkToMilestoneId: 'm-502',
    createdAt: '2026-03-23T08:00:00Z',
    emailSent: true,
    emailRecipient: 'aisha.patel@graduate.edu',
  },
  {
    id: 'notif-5',
    userId: 'admin-1',
    title: 'Publication Request Pending',
    message: 'Project "Fault-Tolerant Quantum Error Correction Protocols" has been submitted for publication by Dr. Marcus Vance.',
    type: 'publish',
    read: false,
    linkToProjectId: 'proj-4',
    createdAt: '2026-03-19T15:00:00Z',
    emailSent: true,
    emailRecipient: 'admin.wright@university.edu',
  }
];
