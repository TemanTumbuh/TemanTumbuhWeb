"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  /** Durasi hitung naik dalam detik. */
  duration?: number;
  delay?: number;
}

/**
 * Angka yang menghitung naik dari 0 ke `value` saat pertama kali muncul.
 *
 * Memakai MotionValue, bukan state React — nilainya diperbarui di luar siklus
 * render sehingga tidak memicu re-render tiap frame.
 *
 * `MotionConfig reducedMotion="user"` di providers hanya melucuti animasi pada
 * komponen motion, tidak menyentuh `animate()` manual seperti ini. Jadi
 * preferensi pengguna dicek eksplisit lewat `useReducedMotion()`: kalau aktif,
 * angkanya langsung ditampilkan final tanpa animasi.
 */
export default function AnimatedNumber({
  value,
  duration = 1.1,
  delay = 0,
}: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const formatted = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("id-ID"),
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration,
      delay,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, value, duration, delay, shouldReduceMotion]);

  return <motion.span>{formatted}</motion.span>;
}
