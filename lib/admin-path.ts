export const ADMIN_PATH = "/v-studio-ledger-x7k9" as const;
export const ADMIN_LOGIN_PATH = `${ADMIN_PATH}/login` as const;
export const ADMIN_API_LOGIN_PATH = `/api${ADMIN_PATH}/login` as const;

export function isAdminPath(pathname: string) {
  return pathname === ADMIN_PATH || pathname.startsWith(`${ADMIN_PATH}/`);
}
