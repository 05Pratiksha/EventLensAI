"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
   User, Image as ImageIcon, Cpu, Bell, CreditCard, 
   Shield, Users, Save, Check, RefreshCw, X, ChevronRight, 
   Plus, Trash2, ShieldCheck, Lock, UploadCloud, 
   Laptop, Smartphone
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SettingsData, TeamMember } from "@/data/settingsMock";
import { settingsApi } from "@/services/settingsApi";

// Custom premium Slide Toggle Component
function ToggleSwitch({ 
  checked, 
  onChange, 
  label, 
  description 
}: { 
  checked: boolean; 
  onChange: (val: boolean) => void; 
  label: string; 
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1 pr-4">
        <label className="text-sm font-semibold text-foreground block">{label}</label>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative focus:outline-none shrink-0 ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-white shadow-md"
        />
      </button>
    </div>
  );
}

export function SettingsView() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "general" | "gallery" | "ai" | "notifications" | "billing" | "security" | "team"
  >("general");

  // Interactive Form State variables
  const [studioName, setStudioName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Branding Previews State
  const [logoUrl, setLogoUrl] = useState("");
  const [brandColor, setBrandColor] = useState("");
  const [fontStyle, setFontStyle] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [customDomain, setCustomDomain] = useState("");

  // Gallery Configuration State
  const [isPublic, setIsPublic] = useState(false);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [watermarkOnPhotos, setWatermarkOnPhotos] = useState(true);
  const [guestUploadAllowed, setGuestUploadAllowed] = useState(true);
  const [imageQuality, setImageQuality] = useState<"standard" | "high" | "original">("original");
  const [layoutStyle, setLayoutStyle] = useState<"grid" | "masonry" | "justified">("masonry");

  // AI & Processing Settings
  const [faceSensitivity, setFaceSensitivity] = useState(0.88);
  const [autoIndexing, setAutoIndexing] = useState(true);
  const [aiStatus, setAiStatus] = useState<"idle" | "indexing" | "syncing">("idle");
  const [aiProgressCount, setAiProgressCount] = useState(14250);

  // Notification toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [whatsappNotif, setWhatsappNotif] = useState(true);
  const [pubAlert, setPubAlert] = useState(true);
  const [aiAlert, setAiAlert] = useState(true);
  const [dlNotif, setDlNotif] = useState(false);

  // Security variables
  const [consentColl, setConsentColl] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // Team records state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Staff" | "Viewer">("Staff");
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // General loading & feedback states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reprocessing, setReprocessing] = useState(false);
  const [purging, setPurging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "warning" | "danger">("success");

  // Load mock data on initial render
  useEffect(() => {
    async function load() {
      const data = await settingsApi.getSettings();
      setSettings(data);
      
      // Initialize forms
      setStudioName(data.studioName);
      setOwnerName(data.ownerName);
      setEmail(data.email);
      setPhone(data.phone);

      setLogoUrl(data.logo);
      setBrandColor(data.brandColor);
      setFontStyle(data.fontStyle);
      setBannerUrl(data.bannerImage);
      setWatermarkText(data.watermarkText);
      setWatermarkEnabled(data.watermarkEnabled);
      setCustomDomain(data.customDomain);

      setIsPublic(data.isPublic);
      setAllowDownloads(data.allowDownloads);
      setWatermarkOnPhotos(data.watermarkOnPhotos);
      setGuestUploadAllowed(data.guestUploadAllowed);
      setImageQuality(data.imageQuality);
      setLayoutStyle(data.layoutStyle);

      setFaceSensitivity(data.faceMatchingSensitivity);
      setAutoIndexing(data.autoIndexing);
      setAiStatus(data.processingStatus);

      setEmailNotif(data.emailNotifications);
      setWhatsappNotif(data.whatsappNotifications);
      setPubAlert(data.eventPublishedAlerts);
      setAiAlert(data.aiMatchReadyAlerts);
      setDlNotif(data.downloadNotifications);

      setConsentColl(data.consentCollection);
      setTwoFactor(data.twoFactorEnabled);
      
      setTeamMembers(data.members);
      setLoading(false);
    }
    load();
  }, []);

  // Display custom premium Toast messages
  const showToast = (msg: string, type: "success" | "warning" | "danger" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle General Profile saving
  const handleSaveGeneral = async () => {
    setSaving(true);
    const res = await settingsApi.updateGeneralSettings({
      studioName, ownerName, email, phone
    });
    setSaving(false);
    showToast(res.message);
  };

  // Handle White label branding saving
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveBranding = async () => {
    setSaving(true);
    const res = await settingsApi.updateBrandingSettings({
      logo: logoUrl, brandColor, fontStyle, bannerImage: bannerUrl, watermarkText, watermarkEnabled, customDomain
    });
    setSaving(false);
    showToast(res.message);
  };

  // Handle Gallery options saving
  const handleSaveGallery = async () => {
    setSaving(true);
    const res = await settingsApi.updateGallerySettings({
      isPublic, allowDownloads, watermarkOnPhotos, guestUploadAllowed, imageQuality, layoutStyle
    });
    setSaving(false);
    showToast(res.message);
  };

  // Handle AI Neural settings saving
  const handleSaveAI = async () => {
    setSaving(true);
    const res = await settingsApi.updateAiSettings({
      faceMatchingSensitivity: faceSensitivity, autoIndexing
    });
    setSaving(false);
    showToast(res.message);
  };

  // Reprocess Photos Action
  const handleReprocessPhotos = async () => {
    setReprocessing(true);
    setAiStatus("indexing");
    setAiProgressCount(100);
    
    // Simulate active processing loop increment
    const interval = setInterval(() => {
      setAiProgressCount(prev => {
        if (prev >= 14250) {
          clearInterval(interval);
          return 14250;
        }
        return prev + 2350;
      });
    }, 250);

    const res = await settingsApi.reprocessPhotos();
    clearInterval(interval);
    setAiProgressCount(14250);
    setAiStatus("idle");
    setReprocessing(false);
    showToast(res.message);
  };

  // Save Notifications
  const handleSaveNotifications = async () => {
    setSaving(true);
    const res = await settingsApi.updateNotificationSettings({
      emailNotifications: emailNotif, whatsappNotifications: whatsappNotif, eventPublishedAlerts: pubAlert, aiMatchReadyAlerts: aiAlert, downloadNotifications: dlNotif
    });
    setSaving(false);
    showToast(res.message);
  };

  // Danger Zone Biometric scrubbing
  const handleDeleteGuestData = async () => {
    const confirm = window.confirm("Are you absolutely sure you want to securely purge all face signatures? This process cannot be undone.");
    if (!confirm) return;

    setPurging(true);
    const res = await settingsApi.deleteGuestData();
    setPurging(false);
    showToast(res.message, "danger");
  };

  // Team: Send Invite Action
  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteEmail.includes("@")) {
      showToast("Please supply a valid team email.", "warning");
      return;
    }
    setSaving(true);
    const res = await settingsApi.inviteTeamMember(inviteEmail, inviteRole);
    setTeamMembers(prev => [...prev, res.member]);
    setInviteEmail("");
    setSaving(false);
    showToast(res.message);
  };

  // Team: Remove Member Action
  const handleRemoveMember = async (id: string) => {
    const confirm = window.confirm("Revoke this member's access from your studio database?");
    if (!confirm) return;

    setSaving(true);
    const res = await settingsApi.removeTeamMember(id);
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    setSaving(false);
    showToast(res.message, "warning");
  };

  // Team: Open edit permissions modal
  const openEditModal = (member: TeamMember) => {
    setEditingMember({ ...member });
  };

  // Team: Save permissions changes
  const saveMemberRole = async () => {
    if (!editingMember) return;
    setSaving(true);
    const res = await settingsApi.editMemberRole(editingMember.id, editingMember.role);
    setTeamMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, role: editingMember.role } : m));
    setEditingMember(null);
    setSaving(false);
    showToast(res.message);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-8 h-8 text-violet-500 animate-spin" />
          <span className="text-muted-foreground text-xs font-mono tracking-widest uppercase">Fetching Studio Databases...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Sidebar Menu Toggles config
  const menuItems: {
    id: "general" | "gallery" | "ai" | "notifications" | "billing" | "security" | "team";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "general", label: "General Profile", icon: User },
    { id: "gallery", label: "Gallery Config", icon: ImageIcon },
    { id: "ai", label: "AI & Neural Match", icon: Cpu },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "security", label: "Security & Audits", icon: Shield },
    { id: "team", label: "Team Management", icon: Users },
  ];

  return (
    <DashboardLayout>
      <div className="relative">
        <SectionHeader 
          title="Settings & White Label" 
          description="Configure neural matching sensitivity, build customized white-label galleries, audits logs, and manage studio access credentials."
        />

        {/* Dynamic Navigation Sidebar + Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20 items-stretch">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-1 z-20">
            {/* Desktop Navigation Sidebar (sticky) */}
            <div className="hidden lg:block sticky top-24 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 block mb-3">Studio Workspace</span>
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                    activeTab === item.id 
                      ? "bg-primary/[0.08] border border-primary/30 text-foreground font-bold shadow-lg shadow-primary/5" 
                      : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${activeTab === item.id ? "text-primary" : "text-muted-foreground"}`} />
                    {item.label}
                  </div>
                  {activeTab === item.id && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
                </button>
              ))}
            </div>

            {/* Mobile Scrollbar Navigation Bar */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-none snap-x max-w-[calc(100vw-3rem)]">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`snap-center flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border whitespace-nowrap transition-all duration-300 ${
                    activeTab === item.id 
                      ? "bg-primary/10 border-primary/30 text-foreground" 
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Dashboard Settings content panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                
                {/* 1. GENERAL PROFILE SETTINGS */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl relative overflow-hidden bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Studio Profile Settings
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Profile avatar photo upload */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                          <div className="relative group cursor-pointer">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors duration-300">
                              <img src={settings?.profilePhoto} alt="Marcus" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                              <UploadCloud className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-foreground block">Profile Avatar</span>
                            <span className="text-xs text-muted-foreground block mt-0.5 mb-3">Upload your high-res headshot. Recommended size: 256x256.</span>
                            <div className="flex gap-2">
                              <Button variant="outline" className="h-8 text-xs font-semibold">Upload Portrait</Button>
                              <Button variant="ghost" className="h-8 text-xs text-red-500 hover:text-red-400 hover:bg-red-500/10">Delete Photo</Button>
                            </div>
                          </div>
                        </div>

                        {/* Text fields grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Studio Name</label>
                            <input 
                              type="text" 
                              value={studioName} 
                              onChange={e => setStudioName(e.target.value)} 
                              className="w-full h-11 bg-secondary border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Owner Name</label>
                            <input 
                              type="text" 
                              value={ownerName} 
                              onChange={e => setOwnerName(e.target.value)} 
                              className="w-full h-11 bg-secondary border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Business Email</label>
                            <input 
                              type="email" 
                              value={email} 
                              onChange={e => setEmail(e.target.value)} 
                              className="w-full h-11 bg-secondary border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Contact Phone Number</label>
                            <input 
                              type="text" 
                              value={phone} 
                              onChange={e => setPhone(e.target.value)} 
                              className="w-full h-11 bg-secondary border border-border rounded-xl px-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Account credentials */}
                        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-sm font-semibold text-foreground block">Account Security Password</span>
                            <span className="text-xs text-muted-foreground block mt-0.5">Protect credentials from database hijack. Make passwords tough.</span>
                          </div>
                          <Button variant="outline" className="h-9 text-xs flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                            Change Security Password
                          </Button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-8 pt-6 border-t border-border flex items-center justify-end gap-3">
                        <Button variant="ghost" className="h-10 text-xs font-bold text-muted-foreground hover:text-foreground">Cancel</Button>
                        <Button 
                          variant="premium" 
                          onClick={handleSaveGeneral} 
                          disabled={saving}
                          className="h-10 text-xs font-bold flex items-center gap-2"
                        >
                          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          Save Profile Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. GALLERY OPTIONS SETTINGS */}
                {activeTab === "gallery" && (
                  <div className="space-y-6">
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl relative overflow-hidden bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        Interactive Gallery Rules
                      </h3>

                      <div className="space-y-6">
                        {/* Switch block toggles */}
                        <div className="divide-y divide-border">
                          <ToggleSwitch 
                            checked={isPublic}
                            onChange={setIsPublic}
                            label="Public Event Directories"
                            description="Let random guests explore the entire indexed folder catalogs instead of requiring strict selfie matches."
                          />

                          <ToggleSwitch 
                            checked={allowDownloads}
                            onChange={setAllowDownloads}
                            label="Enable Full-Resolution Downloads"
                            description="Let matched attendees download the high-res original assets directly into their device drives."
                          />

                          <ToggleSwitch 
                            checked={watermarkOnPhotos}
                            onChange={setWatermarkOnPhotos}
                            label="Render Watermarks on Download Preview"
                            description="Enforce watermarks for standard inline grids, but reveal clean high-res assets upon valid premium payments."
                          />

                          <ToggleSwitch 
                            checked={guestUploadAllowed}
                            onChange={setGuestUploadAllowed}
                            label="Enable Guest Selfie Searches"
                            description="Allow guests to capture or upload selfies to query their matching directories."
                          />
                        </div>

                        {/* Selector grids for layouts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                          {/* Image Quality Selector */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Image Asset Storage Quality</label>
                            <div className="grid grid-cols-3 gap-2">
                              {(
                                [
                                  { id: "standard", label: "Standard", desc: "1080p (2MB)" },
                                  { id: "high", label: "High Res", desc: "4K (8MB)" },
                                  { id: "original", label: "Original", desc: "RAW (30MB+)" },
                                ] as { id: "standard" | "high" | "original"; label: string; desc: string }[]
                              ).map(quality => (
                                <button
                                  key={quality.id}
                                  type="button"
                                  onClick={() => setImageQuality(quality.id)}
                                  className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                    imageQuality === quality.id 
                                      ? "bg-primary/10 border-primary/30 text-foreground" 
                                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <span className="text-xs font-bold block">{quality.label}</span>
                                  <span className="text-[9px] text-muted-foreground block mt-0.5">{quality.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>
 
                          {/* Layout Style Selector */}
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Grid Display Layout</label>
                            <div className="grid grid-cols-3 gap-2">
                              {(
                                [
                                  { id: "grid", label: "Square Grid", desc: "Fixed 1:1 ratios" },
                                  { id: "masonry", label: "Masonry", desc: "Pinterest fluid" },
                                  { id: "justified", label: "Justified", desc: "Rows justified" },
                                ] as { id: "grid" | "masonry" | "justified"; label: string; desc: string }[]
                              ).map(layout => (
                                <button
                                  key={layout.id}
                                  type="button"
                                  onClick={() => setLayoutStyle(layout.id)}
                                  className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                    layoutStyle === layout.id 
                                      ? "bg-primary/10 border-primary/30 text-foreground" 
                                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <span className="text-xs font-bold block">{layout.label}</span>
                                  <span className="text-[9px] text-muted-foreground block mt-0.5">{layout.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-8 pt-6 border-t border-border flex items-center justify-end gap-3">
                        <Button variant="ghost" className="h-10 text-xs font-bold text-muted-foreground hover:text-foreground">Cancel</Button>
                        <Button 
                          variant="premium" 
                          onClick={handleSaveGallery} 
                          disabled={saving}
                          className="h-10 text-xs font-bold flex items-center gap-2"
                        >
                          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          Save Gallery Options
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. AI & NEURAL SCANNING SETTINGS */}
                {activeTab === "ai" && (
                  <div className="space-y-6">
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl relative overflow-hidden bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        AI Neural Matching Engine
                      </h3>

                      <div className="space-y-6">
                        {/* Sensitivity match threshold slider */}
                        <div className="p-4 bg-secondary border border-border rounded-2xl space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-semibold text-foreground block">Face Matching Confidence Cutoff</span>
                              <span className="text-xs text-muted-foreground mt-0.5 block">Determine how strictly face geometry must align to trigger match confirmations.</span>
                            </div>
                            <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary shadow-sm">
                              {(faceSensitivity * 100).toFixed(0)}% strictness
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <input 
                              type="range" 
                              min="0.5" 
                              max="0.98" 
                              step="0.01"
                              value={faceSensitivity}
                              onChange={e => setFaceSensitivity(parseFloat(e.target.value))}
                              className="w-full h-1.5 bg-muted border border-border rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                              <span>Broad Recall (Low)</span>
                              <span className="text-primary">Optimal Target (0.88)</span>
                              <span>Ultra strict (High)</span>
                            </div>
                          </div>
                        </div>

                        {/* Switch block toggles */}
                        <div className="divide-y divide-border">
                          <ToggleSwitch 
                            checked={autoIndexing}
                            onChange={setAutoIndexing}
                            label="Automated Neural Indexing"
                            description="Automatically extract biometric templates and run index operations immediately upon catalog uploads."
                          />
                        </div>

                        {/* AI processing status indicators */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                          
                          <div className="p-4 rounded-xl bg-secondary border border-border space-y-1 relative">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">AI Core Status</span>
                            <div className="flex items-center gap-2 pt-1.5">
                              {aiStatus === "idle" ? (
                                <>
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Neural Standby</span>
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin" />
                                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Indexing Catalog...</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-secondary border border-border space-y-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Biometric Templates</span>
                            <p className="text-lg font-bold font-mono text-foreground pt-1">
                              {aiProgressCount.toLocaleString()} <span className="text-[10px] text-muted-foreground uppercase">Faces</span>
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-secondary border border-border space-y-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Neural Queue</span>
                            <p className="text-lg font-bold font-mono text-foreground pt-1">
                              {reprocessing ? "14,250" : "0"} <span className="text-[10px] text-muted-foreground uppercase">Jobs</span>
                            </p>
                          </div>
                        </div>

                        {/* AI Reprocessing Button Trigger */}
                        <div className="p-4 bg-primary/[0.02] border border-primary/20 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div>
                            <span className="text-sm font-semibold text-foreground block">Biometric Index Rebuild</span>
                            <span className="text-xs text-muted-foreground block mt-0.5">Need to rebuild face indexes for existing photos with modified sensitivity settings?</span>
                          </div>
                          <Button 
                            onClick={handleReprocessPhotos}
                            disabled={reprocessing}
                            variant="outline" 
                            className="h-10 text-xs font-bold border-primary/20 text-primary hover:bg-primary/10 shrink-0 flex items-center gap-1.5"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${reprocessing ? "animate-spin" : ""}`} />
                            {reprocessing ? "Re-Indexing Catalog..." : "Reprocess Event Photos"}
                          </Button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-8 pt-6 border-t border-border flex items-center justify-end gap-3">
                        <Button variant="ghost" className="h-10 text-xs font-bold text-muted-foreground hover:text-foreground">Cancel</Button>
                        <Button 
                          variant="premium" 
                          onClick={handleSaveAI} 
                          disabled={saving}
                          className="h-10 text-xs font-bold flex items-center gap-2"
                        >
                          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          Save AI Config
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. NOTIFICATION SETTINGS */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl relative overflow-hidden bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        Multi-Channel Notifications
                      </h3>

                      <div className="space-y-6">
                        <div className="divide-y divide-border">
                          <ToggleSwitch 
                            checked={emailNotif}
                            onChange={setEmailNotif}
                            label="Email Delivery Channel"
                            description="Deliver event access links, pricing confirmations, and login alerts via electronic mail."
                          />

                          <ToggleSwitch 
                            checked={whatsappNotif}
                            onChange={setWhatsappNotif}
                            label="WhatsApp Delivery Channel"
                            description="Send matched directories and guest download links directly to mobile text streams for massive open rates."
                          />

                          <ToggleSwitch 
                            checked={pubAlert}
                            onChange={setPubAlert}
                            label="Alert: Event Directories Published"
                            description="Notify subscribers as soon as catalogs are fully compiled and published by your studio staff."
                          />

                          <ToggleSwitch 
                            checked={aiAlert}
                            onChange={setAiAlert}
                            label="Alert: Neural Matches Confirmed"
                            description="Notify guests as soon as facial matching scans discover portraits containing their identity signatures."
                          />

                          <ToggleSwitch 
                            checked={dlNotif}
                            onChange={setDlNotif}
                            label="Alert: Guest Downloads Logs"
                            description="Receive an immediate alert notification whenever a visitor triggers an asset save download."
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-8 pt-6 border-t border-border flex items-center justify-end gap-3">
                        <Button variant="ghost" className="h-10 text-xs font-bold text-muted-foreground hover:text-foreground">Cancel</Button>
                        <Button 
                          variant="premium" 
                          onClick={handleSaveNotifications} 
                          disabled={saving}
                          className="h-10 text-xs font-bold flex items-center gap-2"
                        >
                          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          Save Notifications
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. BILLING & SUBSCRIPTION */}
                {activeTab === "billing" && (
                  <div className="space-y-6">
                    {/* Workspace Quotas usage cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Storage Quota */}
                      <div className="glass-luxury p-6 rounded-2xl space-y-4 bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Workspace Media Storage</span>
                        <div className="flex items-end justify-between">
                          <p className="text-xl font-bold text-foreground font-mono">
                            842 <span className="text-xs text-muted-foreground font-sans font-normal">/ 2,000 GB Used</span>
                          </p>
                          <span className="text-[10px] font-bold text-muted-foreground font-mono">42.1% Used</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#E5C158] to-[#A38A4D]" style={{ width: "42.1%" }} />
                        </div>
                      </div>

                      {/* AI Scan Quota */}
                      <div className="glass-luxury p-6 rounded-2xl space-y-4 bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">AI Matching Scans</span>
                        <div className="flex items-end justify-between">
                          <p className="text-xl font-bold text-foreground font-mono">
                            42,500 <span className="text-xs text-muted-foreground font-sans font-normal">/ 100,000 Scans</span>
                          </p>
                          <span className="text-[10px] font-bold text-muted-foreground font-mono">42.5% Used</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#E5C158] to-[#A38A4D]" style={{ width: "42.5%" }} />
                        </div>
                      </div>
                    </div>

                    {/* Subscription Comparison plans */}
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl space-y-6 bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <div>
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-primary" />
                          Compare Studio Plans
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Your studio is currently subscribed to the <strong className="text-primary">Pro Plan</strong>.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                        
                        {/* Free plan */}
                        <div className="p-6 rounded-2xl bg-secondary/20 border border-border flex flex-col justify-between space-y-6">
                          <div>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Starter Tier</span>
                            <h4 className="text-xl font-extrabold text-foreground">Free Plan</h4>
                            <p className="text-[10px] text-muted-foreground mt-2 block">For individual amateur photographers test-driving matching tools.</p>
                            <p className="text-2xl font-black font-mono text-foreground mt-4">$0 <span className="text-[10px] text-muted-foreground uppercase font-sans font-normal">Forever</span></p>
                            
                            <ul className="text-[10px] text-muted-foreground space-y-2.5 pt-6 border-t border-border mt-6">
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> 10GB Active Storage</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> 500 AI Matches / Month</li>
                              <li className="flex items-center gap-2 text-muted-foreground/30"><X className="w-3.5 h-3.5 shrink-0" /> Anti-theft Watermarking</li>
                              <li className="flex items-center gap-2 text-muted-foreground/30"><X className="w-3.5 h-3.5 shrink-0" /> White label domain hosting</li>
                            </ul>
                          </div>
                          <Button variant="outline" className="w-full h-9 text-xs border-border hover:bg-secondary text-foreground font-bold">Current Plan</Button>
                        </div>

                        {/* Pro plan */}
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-primary/[0.02] to-secondary/30 dark:to-background border border-primary/20 flex flex-col justify-between space-y-6 relative shadow-lg shadow-primary/5">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-[#E5C158] text-[8px] font-black text-black uppercase tracking-widest">Active Choice</div>
                          <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Professional Tier</span>
                            <h4 className="text-xl font-extrabold text-foreground">Pro Plan</h4>
                            <p className="text-[10px] text-muted-foreground mt-2 block">For luxury event photographers, agency teams, and professional studios.</p>
                            <p className="text-2xl font-black font-mono text-foreground mt-4">$79 <span className="text-[10px] text-muted-foreground uppercase font-sans font-normal">/ Month</span></p>
                            
                            <ul className="text-[10px] text-foreground/80 space-y-2.5 pt-6 border-t border-border mt-6">
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> 2TB Storage Space</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> 100,000 AI Matches</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Anti-theft Watermarking</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Custom Domain Integration</li>
                            </ul>
                          </div>
                          <Button disabled variant="premium" className="w-full h-9 text-xs font-bold shadow-md">Active Plan</Button>
                        </div>

                        {/* Enterprise plan */}
                        <div className="p-6 rounded-2xl bg-secondary/20 border border-border flex flex-col justify-between space-y-6">
                          <div>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Consolidated Tier</span>
                            <h4 className="text-xl font-extrabold text-foreground">Enterprise</h4>
                            <p className="text-[10px] text-muted-foreground mt-2 block">For large scale stadiums, massive festivals, and global photography agencies.</p>
                            <p className="text-2xl font-black font-mono text-foreground mt-4">Custom <span className="text-[10px] text-muted-foreground uppercase font-sans font-normal">Pricing</span></p>
                            
                            <ul className="text-[10px] text-muted-foreground space-y-2.5 pt-6 border-t border-border mt-6">
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Unlimited Dedicated Storage</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Custom Neural Models (Private Servers)</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> Dedicated Account Manager</li>
                              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary shrink-0" /> SLA Security Audits</li>
                            </ul>
                          </div>
                          <Button variant="outline" className="w-full h-9 text-xs border-border hover:bg-secondary text-foreground font-bold">Contact Sales</Button>
                        </div>
                      </div>

                      {/* Payment History invoice logs */}
                      <div className="pt-8 border-t border-border space-y-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Transaction History</span>
                        
                        <div className="overflow-x-auto rounded-xl border border-border bg-secondary/20">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-border bg-secondary/40 text-muted-foreground">
                                <th className="p-3.5 font-bold uppercase tracking-wider">Invoice ID</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider">Billing Date</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider">Amount Paid</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider text-right">Receipt</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {settings?.paymentHistory.map(invoice => (
                                <tr key={invoice.id} className="hover:bg-secondary/40 transition-colors">
                                  <td className="p-3.5 font-mono font-bold text-foreground">{invoice.id}</td>
                                  <td className="p-3.5 text-foreground/80">{invoice.date}</td>
                                  <td className="p-3.5 text-foreground/80 font-mono font-bold">{invoice.amount}</td>
                                  <td>
                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                      {invoice.status}
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-right">
                                    <button className="text-[10px] font-bold text-primary hover:text-primary/80 underline bg-transparent border-none cursor-pointer">
                                      Download PDF
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. SECURITY & PRIVACY */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl relative overflow-hidden bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Security & Biometric Compliance
                      </h3>

                      <div className="space-y-6">
                        <div className="divide-y divide-border">
                          <ToggleSwitch 
                            checked={consentColl}
                            onChange={setConsentColl}
                            label="Biometric Consent Checkbox"
                            description="Require event guests to explicitly approve biometric metadata terms before triggering face matching searches."
                          />

                          <ToggleSwitch 
                            checked={twoFactor}
                            onChange={setTwoFactor}
                            label="Two-Factor Authentication (2FA)"
                            description="Enforce security code requests upon new studio dashboard logins."
                          />
                        </div>

                        {/* Active Session Logs */}
                        <div className="pt-6 border-t border-border space-y-4">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Active Logged Sessions</span>
                          
                          <div className="space-y-3">
                            {settings?.sessions.map(session => (
                              <div key={session.id} className="p-4 rounded-xl bg-secondary/20 border border-border flex items-start justify-between gap-4">
                                <div className="flex gap-3 items-start">
                                  {session.device.includes("MacBook") || session.device.includes("Windows") ? (
                                    <Laptop className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                  ) : (
                                    <Smartphone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-foreground block">{session.device}</span>
                                      {session.active && (
                                        <span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 rounded tracking-wider animate-pulse">
                                          Current Session
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground mt-1 block">
                                      IP Address: <strong className="font-mono text-foreground/80">{session.ip}</strong> â€¢ Location: <strong className="text-foreground/80">{session.location}</strong>
                                    </span>
                                  </div>
                                </div>
                                {!session.active && (
                                  <button className="text-[10px] font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-500/5 px-2.5 py-1 border border-red-500/10 rounded-lg bg-transparent shrink-0">
                                    Revoke Session
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Danger zone: Biometric scrubbing card */}
                        <div className="p-6 bg-red-500/[0.04] border border-red-500/20 rounded-2xl space-y-4 pt-6 mt-8">
                          <div>
                            <span className="text-sm font-bold text-red-600 dark:text-red-400 block">Danger Zone: Biometric Scrub</span>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              Permanently wipe all guest face geometry templates and index registers from active search galleries. Guests will no longer be able to discover past event catalogs using selfies. This database scrub is irreversible.
                            </p>
                          </div>
                          
                          <Button 
                            onClick={handleDeleteGuestData}
                            disabled={purging}
                            className="h-10 text-xs font-bold bg-red-600 hover:bg-red-500 border-none text-white flex items-center gap-1.5 shrink-0 shadow-lg shadow-red-950/20"
                          >
                            {purging ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            {purging ? "Purging Neural Registers..." : "Delete Biometric Signature Databases"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. TEAM MANAGEMENT */}
                {activeTab === "team" && (
                  <div className="space-y-6">
                    <div className="glass-luxury p-6 md:p-8 rounded-2xl relative overflow-hidden bg-secondary/45 border border-border shadow-xl backdrop-blur-3xl">
                      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Studio Team Members
                      </h3>

                      <div className="space-y-6">
                        {/* Invite member form */}
                        <form onSubmit={handleInviteMember} className="p-4 bg-secondary/20 border border-border rounded-2xl space-y-4">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Invite Studio Member</span>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                              type="email" 
                              required
                              value={inviteEmail}
                              onChange={e => setInviteEmail(e.target.value)}
                              placeholder="colleague@yourstudio.com"
                              className="flex-1 h-10 bg-background border border-border rounded-xl px-4 text-xs text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all"
                            />
                            
                            <select
                              value={inviteRole}
                              onChange={e => setInviteRole(e.target.value as "Admin" | "Staff" | "Viewer")}
                              className="h-10 rounded-xl border border-border bg-background px-4 text-xs text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Staff">Staff</option>
                              <option value="Viewer">Viewer</option>
                            </select>

                            <Button 
                              type="submit" 
                              disabled={saving}
                              variant="premium"
                              className="h-10 text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Send Workspace Invite
                            </Button>
                          </div>
                        </form>

                        {/* Team Table list */}
                        <div className="pt-4 space-y-3">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Active Workspace Access</span>
                          
                          <div className="overflow-x-auto rounded-xl border border-border bg-secondary/20">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-border bg-secondary/40 text-muted-foreground">
                                  <th className="p-3.5 font-bold uppercase tracking-wider">Member Name</th>
                                  <th className="p-3.5 font-bold uppercase tracking-wider">Workspace Role</th>
                                  <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                                  <th className="p-3.5 font-bold uppercase tracking-wider text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {teamMembers.map(member => (
                                  <tr key={member.id} className="hover:bg-secondary/40 transition-colors">
                                    <td className="p-3.5 flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0 bg-muted">
                                        <img src={member.avatar} alt="avatar" className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                        <span className="font-bold text-foreground block">{member.name}</span>
                                        <span className="text-[10px] text-muted-foreground mt-0.5 block">{member.email}</span>
                                      </div>
                                    </td>
                                    <td className="p-3.5 font-semibold text-foreground/80">
                                      {member.role}
                                    </td>
                                    <td>
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                                        member.status === "Active" 
                                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                          : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                      }`}>
                                        {member.status}
                                      </span>
                                    </td>
                                    <td className="p-3.5 text-right space-x-3">
                                      <button 
                                        onClick={() => openEditModal(member)}
                                        className="text-[10px] font-bold text-primary hover:text-primary/80 underline bg-transparent border-none cursor-pointer"
                                      >
                                        Edit
                                      </button>
                                      {member.role !== "Admin" && (
                                        <button 
                                          onClick={() => handleRemoveMember(member.id)}
                                          className="text-[10px] font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 bg-transparent border-none cursor-pointer"
                                        >
                                          Revoke Access
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* 9. Popup Edit Permissions Modal (Unified Framer Motion popup) */}
        <AnimatePresence>
          {editingMember && (
            <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="glass-luxury border border-border rounded-2xl p-6 w-full max-w-[400px] text-left space-y-4 shadow-[0_0_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_rgba(0,0,0,0.85)] relative bg-secondary/95 dark:bg-secondary/45 backdrop-blur-3xl"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setEditingMember(null)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="pb-2 border-b border-border">
                  <h4 className="font-bold text-foreground text-base">Edit Team Permission</h4>
                  <p className="text-xs text-muted-foreground mt-1">Alter workspace permissions for {editingMember.name}.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Team Member</span>
                    <p className="text-xs font-semibold text-foreground/90">{editingMember.email}</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Choose Permission Role</label>
                    <select
                      value={editingMember.role}
                      onChange={e => setEditingMember(prev => prev ? { ...prev, role: e.target.value as "Admin" | "Staff" | "Viewer" } : null)}
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-xs text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/45 transition-all"
                    >
                      <option value="Admin">Admin (Full Access & Billing)</option>
                      <option value="Staff">Staff (Upload catalogs & neural indexing)</option>
                      <option value="Viewer">Viewer (Read-only catalog inspections)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex gap-2 justify-end">
                  <Button 
                    variant="ghost" 
                    onClick={() => setEditingMember(null)}
                    className="h-9 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="premium"
                    onClick={saveMemberRole}
                    disabled={saving}
                    className="h-9 text-xs font-bold text-white border-none"
                  >
                    {saving ? "Saving Changes..." : "Save Modifications"}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 10. Unified Toast notification prompt */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 30, x: "-50%" }}
              className={`fixed bottom-8 left-1/2 z-50 px-6 py-3.5 rounded-full border shadow-2xl backdrop-blur-md flex items-center gap-3 ${
                toastType === "success" 
                  ? "bg-emerald-500/10 dark:bg-emerald-950/80 border-emerald-500/30 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-300"
                  : toastType === "warning"
                    ? "bg-amber-500/10 dark:bg-amber-950/80 border-amber-500/30 dark:border-amber-500/40 text-amber-600 dark:text-amber-300"
                    : "bg-red-500/10 dark:bg-red-950/80 border-red-500/30 dark:border-red-500/40 text-red-600 dark:text-red-300"
              }`}
            >
              <ShieldCheck className="w-5 h-5 shrink-0 animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
