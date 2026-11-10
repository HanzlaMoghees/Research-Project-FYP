export type UserRole = 'guest' | 'student' | 'supervisor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  title: string;
  studentIds?: string[]; // If supervisor, list of assigned students
  assignedSupervisorId?: string; // If student, supervisor id
  assignedSupervisorName?: string;
}

export type MilestoneStatus = 'not_started' | 'in_progress' | 'under_review' | 'needs_revision' | 'completed';

export interface DeliverableFile {
  id: string;
  milestoneId: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'zip' | 'other';
  fileSize: number; // in bytes
  fileUrl: string; // data URL or mock file path
  version: number; // 1, 2, 3...
  changeNote: string;
  uploadedBy: string;
  uploadedAt: string;
  textContentPreview?: string;
}

export interface FeedbackComment {
  id: string;
  milestoneId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  content: string;
  actionType?: 'comment' | 'approved' | 'changes_requested';
  createdAt: string;
  parentCommentId?: string; // for threaded replies
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  order: number;
  dueDate: string;
  status: MilestoneStatus;
  deliverables: DeliverableFile[];
  feedback: FeedbackComment[];
  completedAt?: string;
}

export type ProjectStatus = 'draft' | 'in_progress' | 'submitted_for_publication' | 'published' | 'archived';

export interface Project {
  id: string;
  title: string;
  abstract: string;
  researchArea: string;
  keywords: string[];
  year: number;
  status: ProjectStatus;
  isFeatured: boolean;
  featuredImage?: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentDepartment: string;
  supervisorId: string;
  supervisorName: string;
  supervisorEmail: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  milestones: Milestone[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'feedback' | 'approval' | 'revision' | 'deadline' | 'publish' | 'system';
  read: boolean;
  linkToProjectId?: string;
  linkToMilestoneId?: string;
  createdAt: string;
  emailSent: boolean;
  emailRecipient?: string;
}

export interface ResearchAreaOption {
  id: string;
  name: string;
  code: string;
  description: string;
}
