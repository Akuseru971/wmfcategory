export type CasseroleProductTypeId =
  | "high-casserole"
  | "low-casserole"
  | "saucepan"
  | "roaster"
  | "glass-lid"
  | "steamer"
  | "set"
  | "accessory";

export interface CasseroleProductType {
  id: CasseroleProductTypeId;
  label: string;
}

export const CASSEROLE_PRODUCT_TYPES: CasseroleProductType[] = [
  { id: "high-casserole", label: "ハイキャセロール" },
  { id: "low-casserole", label: "ローキャセロール" },
  { id: "saucepan", label: "ソースパン" },
  { id: "roaster", label: "ロースター" },
  { id: "glass-lid", label: "ガラス蓋" },
  { id: "steamer", label: "スチーマー" },
  { id: "set", label: "セット" },
  { id: "accessory", label: "アクセサリー" },
];

export function inferCasseroleProductType(
  name: string,
  subCategory?: string
): CasseroleProductTypeId | undefined {
  if (/セット/.test(name)) return "set";
  if (/ガラス蓋/.test(name)) return "glass-lid";
  if (/スチーマー|スチームプレート/.test(name)) return "steamer";
  if (/ハイキャセロール/.test(name)) return "high-casserole";
  if (/ローキャセロール/.test(name)) return "low-casserole";
  if (/ソースパン/.test(name)) return "saucepan";
  if (/ロースター/.test(name)) return "roaster";
  if (/クリーナー|磨き剤|クッキングボウル|マルチポット|ライスポット|ストックポット|パスタポット/.test(name)) {
    return "accessory";
  }
  if (subCategory === "accessories") return "accessory";
  return undefined;
}
