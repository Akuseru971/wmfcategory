export interface CategoryNavItem {
  id: string;
  label: string;
  href: string;
}

export const CATEGORY_NAV: CategoryNavItem[] = [
  { id: "WMF-knives-1", label: "Knives", href: "/" },
  { id: "WMF-casserole", label: "Fusiontec", href: "/casserole" },
];
