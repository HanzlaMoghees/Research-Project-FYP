import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Project, Milestone, DeliverableFile, FeedbackComment, NotificationItem, UserRole } from '../types';
import { INITIAL_USERS, INITIAL_PROJECTS, INITIAL_NOTIFICATIONS, RESEARCH_AREAS } from '../data/seedData';

export type AppView = 
  | 'repository' 
  | 'featured' 
  | 'project_detail' 
  | 'student_projects' 
  | 'supervisor_portal' 
  | 'admin_console' 
  | 'analytics_dashboard';

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  users: User[];
  projects: Project[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  activeView: AppView;
  selectedProjectId: string | null;
  selectedMilestoneId: string | null;
  activeDeliverablePreview: DeliverableFile | null;
  
  // UI Modals
  isCreateProjectOpen: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isProfileModalOpen: boolean;
  isNotificationsDrawerOpen: boolean;
  isLocalRunModalOpen: boolean;
  toastMessage: { text: string; type: 'success' | 'info' | 'warning' } | null;

  // Search & Filter
  searchQuery: string;
  selectedArea: string;
  selectedYear: string;

  // Actions
  setActiveView: (view: AppView) => void;
  setSelectedProjectId: (id: string | null) => void;
  setSelectedMilestoneId: (id: string | null) => void;
  setActiveDeliverablePreview: (deliverable: DeliverableFile | null) => void;
  setIsCreateProjectOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean, mode?: 'login' | 'register') => void;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsNotificationsDrawerOpen: (open: boolean) => void;
  setIsLocalRunModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedArea: (area: string) => void;
  setSelectedYear: (year: string) => void;
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;

  // Role & Auth
  switchRole: (role: UserRole, specificUserId?: string) => void;
  login: (email: string, role: UserRole) => boolean;
  register: (name: string, email: string, role: UserRole, department: string) => void;
  logout: () => void;
  updateProfile: (name: string, department: string, title: string) => void;

  // Projects CRUD
  createProject: (data: { title: string; abstract: string; researchArea: string; keywords: string[]; supervisorId?: string }) => Project;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;

  // Milestones CRUD
  addMilestone: (projectId: string, title: string, description: string, dueDate: string) => void;
  updateMilestone: (projectId: string, milestoneId: string, updates: Partial<Milestone>) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;

  // Deliverables & Versions
  uploadDeliverable: (
    projectId: string, 
    milestoneId: string, 
    fileData: { fileName: string; fileType: 'pdf' | 'docx' | 'zip' | 'other'; fileSize: number; fileUrl: string; changeNote: string; textContentPreview?: string }
  ) => void;

  // Supervisor Feedback & Approvals
  addFeedback: (
    projectId: string, 
    milestoneId: string, 
    content: string, 
    actionType?: 'comment' | 'approved' | 'changes_requested', 
    parentCommentId?: string
  ) => void;

  // Publishing & Admin Actions
  requestPublication: (projectId: string) => void;
  publishProject: (projectId: string, shouldPublish: boolean) => void;
  toggleFeatured: (projectId: string) => void;
  assignSupervisor: (projectId: string, supervisorId: string) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Reset
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'scholarpulse_users_v2',
  PROJECTS: 'scholarpulse_projects_v2',
  NOTIFICATIONS: 'scholarpulse_notifications_v2',
  CURRENT_USER_ID: 'scholarpulse_current_user_id_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or seed
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved !== null ? saved : 'student-1'; // Default to Aisha Patel for immediate rich interaction
  });

  const currentUser = users.find(u => u.id === currentUserId) || null;
  const currentRole: UserRole = currentUser ? currentUser.role : 'guest';

  // Navigation & View
  const [activeView, setActiveView] = useState<AppView>('repository');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [activeDeliverablePreview, setActiveDeliverablePreview] = useState<DeliverableFile | null>(null);

  // Modals & Drawers
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isLocalRunModalOpen, setIsLocalRunModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUserId]);

  // Toast Helper
  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(prev => (prev?.text === text ? null : prev));
    }, 4500);
  };

  // Helper to add in-app notification & simulate email log
  const pushNotification = (
    userId: string,
    title: string,
    message: string,
    type: NotificationItem['type'],
    linkToProjectId?: string,
    linkToMilestoneId?: string
  ) => {
    const targetUser = users.find(u => u.id === userId);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId,
      title,
      message,
      type,
      read: false,
      linkToProjectId,
      linkToMilestoneId,
      createdAt: new Date().toISOString(),
      emailSent: true,
      emailRecipient: targetUser?.email || 'user@graduate.edu',
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Role switching
  const switchRole = (role: UserRole, specificUserId?: string) => {
    if (role === 'guest') {
      setCurrentUserId(null);
      showToast('Switched to Guest mode (Public read-only)', 'info');
      if (activeView === 'student_projects' || activeView === 'supervisor_portal' || activeView === 'admin_console') {
        setActiveView('repository');
      }
      return;
    }

    if (specificUserId) {
      setCurrentUserId(specificUserId);
      const user = users.find(u => u.id === specificUserId);
      showToast(`Switched account: ${user?.name} (${role})`, 'success');
      return;
    }

    const matchedUser = users.find(u => u.role === role);
    if (matchedUser) {
      setCurrentUserId(matchedUser.id);
      showToast(`Switched to ${role.toUpperCase()} account: ${matchedUser.name}`, 'success');
    }
  };

  const login = (email: string, role: UserRole): boolean => {
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Find default user of this role or create one
      user = users.find(u => u.role === role);
    }
    if (user) {
      setCurrentUserId(user.id);
      showToast(`Welcome back, ${user.name}! Logged in as ${user.role}.`, 'success');
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, role: UserRole, department: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      department: department || 'Department of Computer Science',
      title: role === 'student' ? 'Graduate Research Student' : role === 'supervisor' ? 'Academic Supervisor' : 'System Administrator',
      assignedSupervisorId: role === 'student' ? 'supervisor-1' : undefined,
      assignedSupervisorName: role === 'student' ? 'Dr. Marcus Vance' : undefined,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    showToast(`Account created successfully for ${name}!`, 'success');
  };

  const logout = () => {
    setCurrentUserId(null);
    showToast('Logged out successfully.', 'info');
    if (activeView === 'student_projects' || activeView === 'supervisor_portal' || activeView === 'admin_console') {
      setActiveView('repository');
    }
  };

  const updateProfile = (name: string, department: string, title: string) => {
    if (!currentUserId) return;
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, name, department, title } : u));
    showToast('Profile updated successfully.', 'success');
  };

  const openAuthModal = (open: boolean, mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(open);
  };

  // Projects CRUD
  const createProject = (data: { title: string; abstract: string; researchArea: string; keywords: string[]; supervisorId?: string }) => {
    const supId = data.supervisorId || (currentUser?.assignedSupervisorId || 'supervisor-1');
    const sup = users.find(u => u.id === supId) || users.find(u => u.role === 'supervisor')!;
    
    // Default 4 standard research milestones per academic standards
    const standardMilestones: Milestone[] = [
      {
        id: `m-${Date.now()}-1`,
        projectId: `proj-${Date.now()}`,
        title: 'Project Proposal & Scope Definition',
        description: 'Submission of research question, hypothesis, ethical clearances, and methodology design.',
        order: 1,
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        status: 'not_started',
        deliverables: [],
        feedback: []
      },
      {
        id: `m-${Date.now()}-2`,
        projectId: `proj-${Date.now()}`,
        title: 'Comprehensive Literature Review',
        description: 'Critical synthesis of foundational and current literature establishing theoretical rationale.',
        order: 2,
        dueDate: new Date(Date.now() + 75 * 86400000).toISOString(),
        status: 'not_started',
        deliverables: [],
        feedback: []
      },
      {
        id: `m-${Date.now()}-3`,
        projectId: `proj-${Date.now()}`,
        title: 'Implementation & Experimental Validation',
        description: 'Execution of experimental protocol, software implementation, benchmarks, or fieldwork data.',
        order: 3,
        dueDate: new Date(Date.now() + 150 * 86400000).toISOString(),
        status: 'not_started',
        deliverables: [],
        feedback: []
      },
      {
        id: `m-${Date.now()}-4`,
        projectId: `proj-${Date.now()}`,
        title: 'Final Thesis Manuscript & Oral Defense',
        description: 'Final archival manuscript compilation, defense presentation, and examination committee sign-off.',
        order: 4,
        dueDate: new Date(Date.now() + 210 * 86400000).toISOString(),
        status: 'not_started',
        deliverables: [],
        feedback: []
      }
    ];

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: data.title,
      abstract: data.abstract,
      researchArea: data.researchArea,
      keywords: data.keywords.length > 0 ? data.keywords : ['Research', 'Thesis'],
      year: new Date().getFullYear(),
      status: 'draft',
      isFeatured: false,
      studentId: currentUser?.id || 'student-1',
      studentName: currentUser?.name || 'Aisha Patel',
      studentEmail: currentUser?.email || 'aisha.patel@graduate.edu',
      studentDepartment: currentUser?.department || 'Department of Computer Science',
      supervisorId: sup.id,
      supervisorName: sup.name,
      supervisorEmail: sup.email,
      department: currentUser?.department || 'Department of Computer Science',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      milestones: standardMilestones
    };

    setProjects(prev => [newProject, ...prev]);
    showToast(`Project "${newProject.title}" created with 4 standard milestones!`, 'success');

    // Notify supervisor
    pushNotification(
      sup.id,
      'New Student Research Project Created',
      `${currentUser?.name || 'A student'} created a new thesis project: "${newProject.title}".`,
      'system',
      newProject.id
    );

    return newProject;
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    showToast('Project details updated successfully.', 'success');
  };

  const deleteProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (proj?.status === 'published' && currentRole !== 'admin') {
      showToast('Published projects cannot be deleted by students. Please contact an Administrator.', 'warning');
      return;
    }
    setProjects(prev => prev.filter(p => p.id !== projectId));
    showToast('Project deleted successfully.', 'info');
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
  };

  // Milestones
  const addMilestone = (projectId: string, title: string, description: string, dueDate: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const nextOrder = p.milestones.length + 1;
        const newMilestone: Milestone = {
          id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          projectId,
          title,
          description,
          order: nextOrder,
          dueDate,
          status: 'not_started',
          deliverables: [],
          feedback: []
        };
        return {
          ...p,
          updatedAt: new Date().toISOString(),
          milestones: [...p.milestones, newMilestone]
        };
      }
      return p;
    }));
    showToast('Milestone added to project roadmap.', 'success');
  };

  const updateMilestone = (projectId: string, milestoneId: string, updates: Partial<Milestone>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            const nextStatus = updates.status !== undefined ? updates.status : m.status;
            const completedAt = nextStatus === 'completed' && !m.completedAt ? new Date().toISOString() : updates.completedAt || m.completedAt;
            return { ...m, ...updates, completedAt };
          }
          return m;
        });

        // Automatically update project status if any milestone completed or all completed
        const allCompleted = updatedMilestones.every(m => m.status === 'completed');
        let nextProjectStatus = p.status;
        if (allCompleted && p.status === 'in_progress') {
          nextProjectStatus = 'in_progress';
        } else if (p.status === 'draft' && updatedMilestones.some(m => m.status !== 'not_started')) {
          nextProjectStatus = 'in_progress';
        }

        return {
          ...p,
          status: nextProjectStatus,
          updatedAt: new Date().toISOString(),
          milestones: updatedMilestones
        };
      }
      return p;
    }));
  };

  const deleteMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          updatedAt: new Date().toISOString(),
          milestones: p.milestones.filter(m => m.id !== milestoneId)
        };
      }
      return p;
    }));
    showToast('Milestone removed.', 'info');
  };

  // Upload deliverable with version increment
  const uploadDeliverable = (
    projectId: string,
    milestoneId: string,
    fileData: { fileName: string; fileType: 'pdf' | 'docx' | 'zip' | 'other'; fileSize: number; fileUrl: string; changeNote: string; textContentPreview?: string }
  ) => {
    const project = projects.find(p => p.id === projectId);
    const milestone = project?.milestones.find(m => m.id === milestoneId);
    if (!project || !milestone) return;

    const nextVersion = (milestone.deliverables.length > 0 
      ? Math.max(...milestone.deliverables.map(d => d.version)) + 1 
      : 1);

    const newDeliverable: DeliverableFile = {
      id: `del-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      milestoneId,
      fileName: fileData.fileName,
      fileType: fileData.fileType,
      fileSize: fileData.fileSize,
      fileUrl: fileData.fileUrl,
      version: nextVersion,
      changeNote: fileData.changeNote || (nextVersion === 1 ? 'Initial submission' : `Version ${nextVersion} revision`),
      uploadedBy: currentUser?.name || 'Researcher',
      uploadedAt: new Date().toISOString(),
      textContentPreview: fileData.textContentPreview || `Deliverable Version ${nextVersion}: ${fileData.fileName}. Uploaded for milestone "${milestone.title}".`
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: p.status === 'draft' ? 'in_progress' : p.status,
          updatedAt: new Date().toISOString(),
          milestones: p.milestones.map(m => {
            if (m.id === milestoneId) {
              return {
                ...m,
                status: 'under_review', // Set to Under Review upon new deliverable upload
                deliverables: [...m.deliverables, newDeliverable]
              };
            }
            return m;
          })
        };
      }
      return p;
    }));

    showToast(`Uploaded ${fileData.fileName} (v${nextVersion})! Milestone marked Under Review.`, 'success');

    // Notify assigned supervisor
    if (project.supervisorId) {
      pushNotification(
        project.supervisorId,
        `New Deliverable Uploaded (v${nextVersion})`,
        `${currentUser?.name || 'Student'} uploaded v${nextVersion} of "${fileData.fileName}" for milestone: "${milestone.title}".`,
        'feedback',
        projectId,
        milestoneId
      );
    }
  };

  // Feedback & Approvals
  const addFeedback = (
    projectId: string,
    milestoneId: string,
    content: string,
    actionType: 'comment' | 'approved' | 'changes_requested' = 'comment',
    parentCommentId?: string
  ) => {
    const project = projects.find(p => p.id === projectId);
    const milestone = project?.milestones.find(m => m.id === milestoneId);
    if (!project || !milestone) return;

    const newComment: FeedbackComment = {
      id: `fb-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      milestoneId,
      authorId: currentUser?.id || 'guest',
      authorName: currentUser?.name || 'Reviewer',
      authorRole: currentRole,
      authorAvatar: currentUser?.avatar,
      content,
      actionType,
      createdAt: new Date().toISOString(),
      parentCommentId
    };

    let nextMilestoneStatus = milestone.status;
    if (actionType === 'approved') {
      nextMilestoneStatus = 'completed';
    } else if (actionType === 'changes_requested') {
      nextMilestoneStatus = 'needs_revision';
    }

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          updatedAt: new Date().toISOString(),
          milestones: p.milestones.map(m => {
            if (m.id === milestoneId) {
              return {
                ...m,
                status: nextMilestoneStatus,
                completedAt: actionType === 'approved' ? new Date().toISOString() : m.completedAt,
                feedback: [...m.feedback, newComment]
              };
            }
            return m;
          })
        };
      }
      return p;
    }));

    if (actionType === 'approved') {
      showToast(`Milestone "${milestone.title}" marked as Approved!`, 'success');
      // Notify student
      pushNotification(
        project.studentId,
        'Milestone Approved!',
        `Your supervisor approved milestone "${milestone.title}" for project "${project.title}".`,
        'approval',
        projectId,
        milestoneId
      );
    } else if (actionType === 'changes_requested') {
      showToast(`Changes requested for milestone "${milestone.title}".`, 'info');
      // Notify student
      pushNotification(
        project.studentId,
        'Revision Requested by Supervisor',
        `Changes requested on milestone "${milestone.title}": "${content.slice(0, 100)}..."`,
        'revision',
        projectId,
        milestoneId
      );
    } else {
      showToast('Comment posted.', 'success');
      // If student replies, notify supervisor. If supervisor, notify student.
      const targetUserId = currentRole === 'student' ? project.supervisorId : project.studentId;
      pushNotification(
        targetUserId,
        `New Comment on Milestone "${milestone.title}"`,
        `${currentUser?.name}: "${content.slice(0, 90)}..."`,
        'feedback',
        projectId,
        milestoneId
      );
    }
  };

  // Request publication
  const requestPublication = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'submitted_for_publication', updatedAt: new Date().toISOString() } : p));
    showToast('Publication request submitted! An administrator will review your thesis for public repository listing.', 'success');

    // Notify Admin
    users.filter(u => u.role === 'admin').forEach(adminUser => {
      pushNotification(
        adminUser.id,
        'New Thesis Publication Request',
        `Student ${project.studentName} requested publication for "${project.title}".`,
        'publish',
        projectId
      );
    });
  };

  // Admin publish/unpublish
  const publishProject = (projectId: string, shouldPublish: boolean) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const nextStatus: Project['status'] = shouldPublish ? 'published' : 'in_progress';
    const publishedAt = shouldPublish ? new Date().toISOString() : undefined;

    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: nextStatus, publishedAt, updatedAt: new Date().toISOString() } : p));
    showToast(shouldPublish ? `Project "${project.title}" is now PUBLISHED in public repository!` : `Project "${project.title}" unpublished.`, 'success');

    // Notify student
    pushNotification(
      project.studentId,
      shouldPublish ? 'Thesis Published in Repository!' : 'Project Publication Status Changed',
      `Your research project "${project.title}" is ${shouldPublish ? 'now publicly visible in the institutional repository' : 'no longer published'}.`,
      'publish',
      projectId
    );
  };

  // Toggle Featured
  const toggleFeatured = (projectId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const nextFeatured = !p.isFeatured;
        showToast(nextFeatured ? `Project marked as Featured on Homepage!` : `Project removed from Featured showcase.`, 'info');
        return { ...p, isFeatured: nextFeatured, updatedAt: new Date().toISOString() };
      }
      return p;
    }));
  };

  // Assign Supervisor
  const assignSupervisor = (projectId: string, supervisorId: string) => {
    const sup = users.find(u => u.id === supervisorId);
    if (!sup) return;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          supervisorId: sup.id,
          supervisorName: sup.name,
          supervisorEmail: sup.email,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
    showToast(`Assigned ${sup.name} as thesis supervisor.`, 'success');
  };

  // Admin update user role
  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast(`User role updated to ${newRole}.`, 'info');
  };

  // Notifications read
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  // Reset to initial seed
  const resetToDefaultData = () => {
    setUsers(INITIAL_USERS);
    setProjects(INITIAL_PROJECTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUserId('student-1');
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    showToast('Reset system to default seed data.', 'info');
  };

  const unreadNotificationCount = notifications.filter(n => (!currentUserId || n.userId === currentUserId) && !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        users,
        projects,
        notifications,
        unreadNotificationCount,
        activeView,
        selectedProjectId,
        selectedMilestoneId,
        activeDeliverablePreview,
        isCreateProjectOpen,
        isAuthModalOpen,
        authModalMode,
        isProfileModalOpen,
        isNotificationsDrawerOpen,
        isLocalRunModalOpen,
        toastMessage,
        searchQuery,
        selectedArea,
        selectedYear,
        setActiveView,
        setSelectedProjectId,
        setSelectedMilestoneId,
        setActiveDeliverablePreview,
        setIsCreateProjectOpen,
        setIsAuthModalOpen: openAuthModal,
        setIsProfileModalOpen,
        setIsNotificationsDrawerOpen,
        setIsLocalRunModalOpen,
        setSearchQuery,
        setSelectedArea,
        setSelectedYear,
        showToast,
        switchRole,
        login,
        register,
        logout,
        updateProfile,
        createProject,
        updateProject,
        deleteProject,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        uploadDeliverable,
        addFeedback,
        requestPublication,
        publishProject,
        toggleFeatured,
        assignSupervisor,
        updateUserRole,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
