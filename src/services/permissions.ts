type Permission = {
  id: string;
  name: string;
};

export const Permissions: Permission[] = [
  { id: "DASHBOARD", name: "דף הבית" },
  { id: "INVOICE", name: "חשבונית חדשה" },
  { id: "ORDER", name: "הזמנה חדשה" },
  { id: "PLATOT", name: "עריכת פלטות" },
  { id: "SUPPLIER/ORDER", name: "קבלת סחורה" },
  { id: "SUPPLIER/REPORT", name: "דוחות ספקים" },
  { id: "PRODUCTS", name: "החלפת סחורה" },
  { id: "PRODUCTS/REPORT", name: "דוחות החלפת סחורה" },
  { id: "USERS", name: "ניהול משתמשים" },
  { id: "CALCULATOR", name: "מחשבון סופגניות" },
];
