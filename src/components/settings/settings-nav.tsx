import { Bell, Info, Keyboard, Palette, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const SETTINGS_CATEGORIES = ["常规", "外观", "通知", "快捷键", "关于"] as const;
export type SettingsCategory = (typeof SETTINGS_CATEGORIES)[number];
const icons = { 常规: User, 外观: Palette, 通知: Bell, 快捷键: Keyboard, 关于: Info };

export function SettingsNav({ active, onChange }: { active: SettingsCategory; onChange: (category: SettingsCategory) => void }) {
  return <nav aria-label="设置分类" className="min-w-0">
    <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">设置</p>
    <div className="flex gap-1 overflow-x-auto pb-1 md:block md:space-y-1">{SETTINGS_CATEGORIES.map((category) => { const Icon = icons[category]; return <button key={category} type="button" onClick={() => onChange(category)} aria-current={active === category ? "page" : undefined} className={cn("flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors shrink-0 min-h-10 md:w-full", active === category ? "border-primary/30 bg-primary/10 text-primary" : "border-transparent text-muted-foreground hover:border-border hover:bg-elevated hover:text-foreground")}><Icon className="h-4 w-4" aria-hidden="true" />{category}</button>; })}</div>
  </nav>;
}
