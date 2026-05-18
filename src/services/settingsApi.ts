// Simulated Settings API service for EventLens AI Settings Panel
import { mockSettings, SettingsData, TeamMember } from "../data/settingsMock";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const settingsApi = {
  // Get entire settings package
  getSettings: async (): Promise<SettingsData> => {
    await delay(500);
    return { ...mockSettings };
  },

  // Save general profile modifications
  updateGeneralSettings: async (data: Partial<SettingsData>) => {
    await delay(700);
    return { 
      success: true, 
      message: "Studio profile saved successfully", 
      data 
    };
  },

  // Save White Label branding settings
  updateBrandingSettings: async (data: Partial<SettingsData>) => {
    await delay(800);
    return { 
      success: true, 
      message: "White-label branding and domain connected", 
      data 
    };
  },

  // Update gallery display rules
  updateGallerySettings: async (data: Partial<SettingsData>) => {
    await delay(500);
    return { 
      success: true, 
      message: "Gallery rule configurations synced", 
      data 
    };
  },

  // Save AI models & scanning strictness thresholds
  updateAiSettings: async (data: Partial<SettingsData>) => {
    await delay(600);
    return { 
      success: true, 
      message: "Neural indexing parameters saved", 
      data 
    };
  },

  // Trigger catalog-wide facial re-indexing
  reprocessPhotos: async () => {
    await delay(1800);
    return { 
      success: true, 
      message: "Facial indexing queue successfully rebooted. Processing 14,250 event photos." 
    };
  },

  // Toggle notification parameters
  updateNotificationSettings: async (data: Partial<SettingsData>) => {
    await delay(500);
    return { 
      success: true, 
      message: "Alert and delivery parameters updated", 
      data 
    };
  },

  // Invite new studio member
  inviteTeamMember: async (email: string, role: "Admin" | "Staff" | "Viewer"): Promise<{ success: boolean; message: string; member: TeamMember }> => {
    await delay(900);
    const newMember: TeamMember = {
      id: `tm-${Math.floor(Math.random() * 1000)}`,
      name: email.split("@")[0],
      email,
      role,
      status: "Pending",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    };
    return {
      success: true,
      message: `Invitation successfully dispatched to ${email}`,
      member: newMember
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeTeamMember: async (id: string) => {
    await delay(700);
    return { 
      success: true, 
      message: "Access revoked. Team member removed." 
    };
  },

  // Edit team member's permission level
  editMemberRole: async (id: string, role: "Admin" | "Staff" | "Viewer") => {
    await delay(600);
    return { 
      success: true, 
      message: `Role permissions updated to ${role}` 
    };
  },

  // Danger zone: Biometric data scrub
  deleteGuestData: async () => {
    await delay(2200);
    return { 
      success: true, 
      message: "Compliance scrub: All guest biometric signatures securely and permanently scrubbed from search registers." 
    };
  }
};
