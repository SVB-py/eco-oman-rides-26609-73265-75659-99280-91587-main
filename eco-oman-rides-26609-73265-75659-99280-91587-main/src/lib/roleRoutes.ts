export const roleRouteMap: Record<string, string> = {
  "school-driver": "/school/driver",
  "school-student": "/school/student",
  "school-admin": "/aurora",
  driver: "/school/driver",
  student: "/school/student",
  "community-driver": "/community/driver",
  "community-rider": "/community/rider",
  passenger: "/community/rider",
};

export const getRouteForRole = (role: string | null | undefined) => {
  if (!role) {
    return "/mode-selection";
  }

  return roleRouteMap[role] ?? "/mode-selection";
};
