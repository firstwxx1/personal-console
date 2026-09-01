"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  Box,
  CornerDownLeft,
  FileText,
  Globe2,
  Search,
  Server,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { searchLocalResults, type SearchResult, type SearchResultType } from "@/lib/search";
import { useServices } from "@/components/services/services-store";

const openSearchEvent = "personal-console:open-search";

const resultIcons: Record<SearchResultType, LucideIcon> = {
  project: Box,
  server: Server,
  service: Globe2,
  note: FileText
};

export function GlobalSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { services } = useServices();
  const results = useMemo(() => searchLocalResults(query, services), [query, services]);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const open = () => {
    setIsOpen(true);
    setSelectedIndex(0);
  };

  const navigateToResult = (result: SearchResult) => {
    if (result.external) {
      window.open(result.href, "_blank", "noreferrer");
    } else {
      router.push(result.href);
    }
    close();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        close();
      }
    };

    const handleOpenSearch = () => open();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(openSearchEvent, handleOpenSearch);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(openSearchEvent, handleOpenSearch);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) {
    return null;
  }

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setSelectedIndex((index) => (index + 1) % results.length);
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setSelectedIndex((index) => (index - 1 + results.length) % results.length);
    }

    if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      navigateToResult(results[selectedIndex]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/45 px-3 py-[max(1rem,8vh)] sm:px-6" role="dialog" aria-modal="true" aria-label="全局搜索">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="关闭全局搜索" onClick={close} />
      <section className="relative flex max-h-[84vh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-3 sm:px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="搜索项目、服务器、网站或笔记"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:text-base"
            aria-label="搜索项目、服务器、网站或笔记"
          />
          <button type="button" onClick={close} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated hover:text-foreground" aria-label="关闭全局搜索" title="关闭全局搜索">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto p-2">
          {!query.trim() && <p className="px-2 pb-2 pt-1 text-xs font-medium text-muted-foreground">推荐内容</p>}
          {results.length > 0 ? (
            <div className="space-y-1" role="listbox" aria-label="搜索结果">
              {results.map((result, index) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  selected={index === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onSelect={close}
                />
              ))}
            </div>
          ) : (
            <div className="px-3 py-12 text-center">
              <p className="text-sm font-medium">没有找到相关内容</p>
              <p className="mt-1 text-xs text-muted-foreground">尝试搜索项目、服务器、网站或笔记</p>
            </div>
          )}
        </div>

        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-3 py-2 text-[11px] text-muted-foreground sm:px-4">
          <span className="inline-flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5"><ArrowUp className="h-3 w-3" /></kbd><kbd className="rounded border border-border bg-muted px-1 py-0.5"><ArrowDown className="h-3 w-3" /></kbd>选择</span>
          <span className="inline-flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5"><CornerDownLeft className="h-3 w-3" /></kbd>打开</span>
          <span className="inline-flex items-center gap-1"><kbd className="rounded border border-border bg-muted px-1 py-0.5">Esc</kbd>关闭</span>
        </footer>
      </section>
    </div>
  );
}

function SearchResultItem({
  result,
  selected,
  onMouseEnter,
  onSelect
}: {
  result: SearchResult;
  selected: boolean;
  onMouseEnter: () => void;
  onSelect: () => void;
}) {
  const Icon = resultIcons[result.type];
  const className = `flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${selected ? "bg-elevated text-foreground" : "hover:bg-elevated/70"}`;
  const content = <>
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary"><Icon className="h-4 w-4" aria-hidden="true" /></span>
    <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="truncate text-sm font-medium">{result.title}</span><span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{result.typeLabel}</span></span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{result.description}</span></span>
  </>;

  if (result.external) {
    return <a href={result.href} target="_blank" rel="noreferrer" className={className} role="option" aria-selected={selected} onMouseEnter={onMouseEnter} onClick={onSelect}>{content}</a>;
  }

  return <Link href={result.href} className={className} role="option" aria-selected={selected} onMouseEnter={onMouseEnter} onClick={onSelect}>{content}</Link>;
}
