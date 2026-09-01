"use client";

import { useEffect, useState } from "react";
import type { KomariServer } from "@/lib/komari/mapper";
import { VpsStatus } from "./vps-status";

const REFRESH_INTERVAL_MS = 3000;

export function LiveVpsStatus({ initialServers }: { initialServers: KomariServer[] }) {
  const [servers, setServers] = useState(initialServers);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/monitoring/servers", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { data?: KomariServer[] };
        if (active && Array.isArray(payload.data)) setServers(payload.data);
      } catch {
        // Keep the last successful snapshot.
      }
    };
    const timer = window.setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  return <VpsStatus servers={servers} />;
}
