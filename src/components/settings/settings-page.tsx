"use client";
import * as React from "react";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui";
import { AboutSettings } from "./about-settings";
import { AppearanceSettings, type Theme } from "./appearance-settings";
import { DangerZone } from "./danger-zone";
import { GeneralSettings, type GeneralState } from "./general-settings";
import { NotificationSettings, type NotificationState } from "./notification-settings";
import { SettingsNav, type SettingsCategory } from "./settings-nav";
import { ShortcutSettings } from "./shortcut-settings";
const defaultGeneral: GeneralState = { name: "Claw", space: "个人空间" };
const defaultNotifications: NotificationState = { 系统通知: true, "VPS 状态异常": true, "项目状态异常": true, 监控告警: false };
export function SettingsPage() { const [category, setCategory] = React.useState<SettingsCategory>("常规"); const [general, setGeneral] = React.useState(defaultGeneral); const [theme, setTheme] = React.useState<Theme>("深色"); const [compact, setCompact] = React.useState(false); const [notifications, setNotifications] = React.useState(defaultNotifications); const [saved, setSaved] = React.useState(false); function showSaved() { setSaved(true); window.setTimeout(() => setSaved(false), 2200); } function reset() { setGeneral(defaultGeneral); setTheme("深色"); setCompact(false); setNotifications(defaultNotifications); setSaved(false); }
  return <div className="mx-auto min-w-0 max-w-5xl"><div className="mb-5 flex min-w-0 items-start gap-3 sm:mb-6"><div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-elevated text-primary"><Settings className="h-4 w-4" aria-hidden="true" /></div><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-xl font-semibold tracking-tight">设置中心</h1><Badge variant="neutral">本地原型</Badge></div><p className="mt-1 text-sm text-muted-foreground">管理云端控制台的偏好设置。</p></div></div><div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)]"><aside className="min-w-0"><SettingsNav active={category} onChange={(next) => { setCategory(next); setSaved(false); }} /></aside><section className="min-w-0 space-y-4" aria-live="polite">{category === "常规" && <GeneralSettings state={general} onChange={setGeneral} saved={saved} onSaved={showSaved} />}{category === "外观" && <AppearanceSettings theme={theme} compact={compact} onThemeChange={setTheme} onCompactChange={setCompact} saved={saved} onSaved={showSaved} />}{category === "通知" && <NotificationSettings state={notifications} onChange={setNotifications} />}{category === "快捷键" && <ShortcutSettings />}{category === "关于" && <AboutSettings />}<DangerZone onReset={reset} /></section></div></div>;
}
