"use client";

import type { MenuItem } from "@/app/interface/admin/menu";

const KEY = "admin_menu_items_v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getAllMenu(): MenuItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<MenuItem[]>(localStorage.getItem(KEY), []);
}

export function saveAllMenu(items: MenuItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addMenu(item: MenuItem) {
  const all = getAllMenu();
  all.unshift(item);
  saveAllMenu(all);
}

export function updateMenu(id: string, patch: Partial<MenuItem>) {
  const all = getAllMenu();
  const idx = all.findIndex((i) => i.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    saveAllMenu(all);
  }
}

export function deleteMenu(id: string) {
  const all = getAllMenu().filter((i) => i.id !== id);
  saveAllMenu(all);
}

export function getMenuById(id: string): MenuItem | undefined {
  return getAllMenu().find((i) => i.id === id);
}

// Optional: simple seeding if storage empty
export function seedIfEmpty(): void {
  const all = getAllMenu();
  if (all.length === 0) {
    // const now = new Date().toISOString();
    saveAllMenu([
      {
        id: crypto.randomUUID(),
        name: "Nasi Goreng Spesial",
        description: "Nasi goreng dengan topping ayam, telur, dan sayuran.",
        price: 25000,
        categoryId: "Main Course",
        stock: 20,
        unit: "porsi",
        status: "active",
        imageUrl: "/menu-nasi-goreng.jpg",
      },
      {
        id: crypto.randomUUID(),
        name: "Es Teh Manis",
        description: "Minuman teh manis dingin.",
        price: 8000,
        categoryId: "Beverage",
        stock: 100,
        unit: "gelas",
        status: "active",
        imageUrl: "/menu-es-teh.jpg",
      },
    ]);
  }
}
