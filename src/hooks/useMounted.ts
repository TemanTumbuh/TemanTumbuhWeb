"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  // Tidak ada eksternal store sungguhan untuk disubscribe — nilainya tidak
  // pernah berubah setelah mount, jadi tidak perlu memberi tahu React kapan
  // pun. Callback no-op ini memenuhi kontrak useSyncExternalStore.
  return () => {};
}

const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `true` hanya setelah komponen ter-hydrate di client, `false` selama SSR
 * dan pada render client PERTAMA (harus sama persis dengan HTML server).
 *
 * Dipakai untuk merender sesuatu yang bergantung pada state yang baru
 * tersedia di client (mis. sesi login dari localStorage) tanpa memicu
 * hydration mismatch. Dibangun di atas `useSyncExternalStore` — bukan
 * `useEffect(() => setState(true), [])` — karena men-set state langsung di
 * body effect memicu cascading render yang tidak perlu (ditangkap oleh
 * `react-hooks/set-state-in-effect`); ini persis kasus yang direkomendasikan
 * React docs untuk `useSyncExternalStore`.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
