// Утилиты для работы с cookies
export const cookieUtils = {
  // Получить значение cookie по имени
  get: (name: string): string | null => {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  },

  // Установить cookie
  set: (
    name: string,
    value: string,
    options: {
      expires?: number; // дни
      path?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    } = {}
  ): void => {
    if (typeof document === "undefined") return;

    let cookie = `${name}=${value}`;

    if (options.expires) {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      cookie += `; expires=${date.toUTCString()}`;
    }

    if (options.path) cookie += `; path=${options.path}`;
    if (options.secure) cookie += "; secure";
    if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

    document.cookie = cookie;
  },

  // Удалить cookie
  remove: (name: string, path: string = "/"): void => {
    if (typeof document === "undefined") return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  },

  // Проверить существование cookie
  exists: (name: string): boolean => {
    return cookieUtils.get(name) !== null;
  },
};
