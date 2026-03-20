"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { isOpenNow, getNextOpening } from "@/lib/openClosed";
import type { Hours } from "@/types";

export function OpenClosedWidget({ hours }: { hours: Hours | null }) {
  const open = useMemo(() => isOpenNow(hours), [hours]);
  const nextOpening = useMemo(() => getNextOpening(hours), [hours]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl bg-amber-50 border border-amber-200 p-6 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-block w-4 h-4 rounded-full ${
            open ? "bg-green-500 animate-pulse" : "bg-amber-400"
          }`}
        />
        <div>
          <p className="font-semibold text-amber-950">
            {open ? "Ouvert" : "Fermé"}
          </p>
          {!open && nextOpening && (
            <p className="text-sm text-amber-700">Prochaine ouverture : {nextOpening}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
