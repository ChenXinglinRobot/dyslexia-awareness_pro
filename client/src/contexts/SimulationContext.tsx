/* ============================================================
   SimulationContext — 阅读障碍模拟开关 + 强度的全局状态

   PRODUCT.md 硬约束:
   "Simulation features (blur, jitter, overlap) are opt-in through
    explicit user controls — never automatic."

   因此:
   - enabled 默认 false(opt-in)
   - 不持久化到 localStorage,每次刷新恢复默认关闭
   ============================================================ */

import React, { createContext, useContext, useState } from "react";

interface SimulationContextType {
  /** 是否开启模拟体验。默认 false,符合 PRODUCT.md opt-in 约束 */
  enabled: boolean;
  /** 强度,范围 0..1,默认 0.5 */
  intensity: number;
  /** 切换 enabled */
  toggle: () => void;
  /** 设置强度,自动 clamp 到 [0, 1] */
  setIntensity: (v: number) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [intensity, setIntensityRaw] = useState(0.5);

  const setIntensity = (v: number) => setIntensityRaw(Math.min(1, Math.max(0, v)));
  const toggle = () => setEnabled((prev) => !prev);

  return (
    <SimulationContext.Provider value={{ enabled, intensity, toggle, setIntensity }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error("useSimulation must be used within SimulationProvider");
  return ctx;
}
