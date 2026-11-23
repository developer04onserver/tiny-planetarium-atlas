export function filterCelestials(items, query="", kind="all", favorites=null) {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(item => {
    const matchesTerm = !term || (item.name + " " + item.kind + " " + item.description).toLocaleLowerCase().includes(term);
    const matchesKind = kind === "all" || item.kind === kind;
    const matchesFavorite = favorites === null || favorites.has(item.id);
    return matchesTerm && matchesKind && matchesFavorite;
  });
}

export function randomCelestial(items, excludedId=null, random=Math.random) {
  const candidates = excludedId ? items.filter(item => item.id !== excludedId) : items;
  if (!candidates.length) return undefined;
  const index = Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
  return candidates[index];
}
