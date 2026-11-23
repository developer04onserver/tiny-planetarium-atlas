import { celestials } from "./catalog.js";
import { filterCelestials, randomCelestial } from "./logic.js";
import "./style.css";

const byId = (id) => {
  const node = document.getElementById(id);
  if (!node) throw new Error("Required interface node not found: #" + id);
  return node;
};
const grid = byId("world-grid");
const query = byId("query");
const kind = byId("kind");
const empty = byId("empty");
const resultCount = byId("result-count");
const favoritesButton = byId("favorites-only");
const motionButton = byId("motion");
const dialog = byId("detail-dialog");
const detailArt = byId("detail-art");
const detailKind = byId("detail-kind");
const detailName = byId("detail-name");
const detailDescription = byId("detail-description");
const detailFavorite = byId("detail-favorite");
const detailId = byId("detail-id");
let favoriteIds = loadFavorites();
let favoritesOnly = false;
let motionPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentId = null;

function loadFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem("tiny-planetarium:favorites") || "[]");
    return new Set(Array.isArray(parsed) ? parsed.filter(value => typeof value === "string") : []);
  } catch {
    return new Set();
  }
}
function saveFavorites() {
  try { localStorage.setItem("tiny-planetarium:favorites", JSON.stringify([...favoriteIds])); }
  catch { /* Private browsing or disabled storage should not block exploration. */ }
}
function syncSvg(object) {
  const svg = object.contentDocument?.documentElement;
  if (!svg || typeof svg.pauseAnimations !== "function") return;
  if (motionPaused) svg.pauseAnimations();
  else svg.unpauseAnimations();
}
function createWorldCard(item, index) {
  const card = document.createElement("article");
  card.className = "world-card";
  card.dataset.id = item.id;
  card.style.setProperty("--tone", item.primary);
  card.style.setProperty("--accent", item.accent);

  const open = document.createElement("button");
  open.type = "button";
  open.className = "world-open";
  open.dataset.open = item.id;
  open.setAttribute("aria-label", "Open field notes for " + item.name);
  const visual = document.createElement("div");
  visual.className = "world-visual";
  const art = document.createElement("object");
  art.className = "celestial-svg";
  art.data = item.src;
  art.type = "image/svg+xml";
  art.width = "132"; art.height = "132";
  art.setAttribute("aria-hidden", "true");
  art.addEventListener("load", () => syncSvg(art));
  visual.append(art);
  const meta = document.createElement("div");
  meta.className = "world-meta";
  const name = document.createElement("h3");
  name.textContent = item.name;
  const type = document.createElement("span");
  type.textContent = item.kind;
  meta.append(name,type);
  const number = document.createElement("span");
  number.className = "catalogue-number";
  number.textContent = String(index + 1).padStart(2,"0");
  open.append(visual,meta,number);

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite-button" + (favoriteIds.has(item.id) ? " is-favorite" : "");
  favorite.dataset.favorite = item.id;
  favorite.setAttribute("aria-label", (favoriteIds.has(item.id) ? "Remove " : "Add ") + item.name + (favoriteIds.has(item.id) ? " from" : " to") + " favorites");
  favorite.setAttribute("aria-pressed", String(favoriteIds.has(item.id)));
  favorite.textContent = favoriteIds.has(item.id) ? "♥" : "♡";
  card.append(open,favorite);
  return card;
}
function render() {
  const visible = filterCelestials(celestials,query.value,kind.value,favoritesOnly ? favoriteIds : null);
  grid.replaceChildren(...visible.map(item => createWorldCard(item,celestials.indexOf(item))));
  grid.hidden = visible.length === 0;
  empty.hidden = visible.length !== 0;
  resultCount.textContent = visible.length + (favoritesOnly ? " saved objects" : " celestial objects");
}
function setMotionPaused(value) {
  motionPaused = value;
  document.documentElement.classList.toggle("is-paused",value);
  motionButton.setAttribute("aria-pressed",String(value));
  motionButton.textContent = value ? "▶ Resume" : "Ⅱ Pause";
  document.querySelectorAll("object.celestial-svg, object.sky-body, object#detail-art").forEach(syncSvg);
}
function setFavorite(id) {
  if (favoriteIds.has(id)) favoriteIds.delete(id);
  else favoriteIds.add(id);
  saveFavorites();
  render();
  if (currentId === id) updateDetailFavorite();
}
function updateDetailFavorite() {
  const active = favoriteIds.has(currentId);
  detailFavorite.textContent = active ? "♥ Saved" : "♡ Save to favorites";
  detailFavorite.setAttribute("aria-pressed",String(active));
}
function openDetails(id) {
  const item = celestials.find(entry => entry.id === id);
  if (!item) return;
  currentId = id;
  detailArt.data = item.src;
  detailArt.setAttribute("aria-label",item.name);
  detailKind.textContent = "FIELD NOTE / " + item.kind.toUpperCase();
  detailName.textContent = item.name;
  detailDescription.textContent = item.description;
  detailId.textContent = "CATALOGUE ID  " + item.id.toUpperCase();
  detailArt.addEventListener("load",() => syncSvg(detailArt),{once:true});
  updateDetailFavorite();
  if (!dialog.open) dialog.showModal();
}
function exportFavorites() {
  const chosen = celestials.filter(item => favoriteIds.has(item.id));
  const payload = { exportedAt: new Date().toISOString(), count: chosen.length, favorites: chosen };
  const blob = new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = "tiny-planetarium-favorites.json";
  anchor.click(); URL.revokeObjectURL(url);
}
grid.addEventListener("click",event => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.open) openDetails(target.dataset.open);
  if (target.dataset.favorite) setFavorite(target.dataset.favorite);
});
query.addEventListener("input",render);
kind.addEventListener("change",render);
favoritesButton.addEventListener("click",() => {
  favoritesOnly = !favoritesOnly;
  favoritesButton.setAttribute("aria-pressed",String(favoritesOnly));
  favoritesButton.textContent = favoritesOnly ? "♥ Showing favorites" : "♡ Favorites";
  render();
});
byId("surprise").addEventListener("click",() => {
  const visible = filterCelestials(celestials,query.value,kind.value,favoritesOnly ? favoriteIds : null);
  const next = randomCelestial(visible,currentId);
  if (next) openDetails(next.id);
});
motionButton.addEventListener("click",() => setMotionPaused(!motionPaused));
byId("export").addEventListener("click",exportFavorites);
detailFavorite.addEventListener("click",() => { if (currentId) setFavorite(currentId); });
document.addEventListener("keydown",event => {
  if (event.key === "/" && document.activeElement !== query && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault(); query.focus();
  }
  if (event.key === "Escape" && document.activeElement === query) { query.value = ""; query.blur(); render(); }
});
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",event => {
  if (event.matches) setMotionPaused(true);
});
setMotionPaused(motionPaused);
render();
