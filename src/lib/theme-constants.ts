/** Shared by the client theme hook and the server layout's <head> script. */
export const THEME_STORAGE_KEY = "lp-theme";

/**
 * Runs in <head> before first paint so a saved choice never flashes the
 * wrong theme. Must stay dependency-free and tolerate blocked storage.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
