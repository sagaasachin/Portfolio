/**
 * Resolve a path inside the `public/` folder to a URL that respects the
 * Vite `base` (needed for GitHub Pages project pages such as /Portfolio/).
 *
 * Usage: asset("images/projects/todo.webp")
 */
export function asset(path = "") {
  const clean = String(path).replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${clean}`;
}
