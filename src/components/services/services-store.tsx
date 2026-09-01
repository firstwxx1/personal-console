"use client";

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { serviceSites, type ServiceSite } from "@/data/services";

interface ServicesContextValue {
  services: ServiceSite[];
  setServices: Dispatch<SetStateAction<ServiceSite[]>>;
}

const ServicesContext = createContext<ServicesContextValue | null>(null);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<ServiceSite[]>(serviceSites);
  const value = useMemo(() => ({ services, setServices }), [services]);
  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) throw new Error("useServices must be used within ServicesProvider");
  return context;
}
