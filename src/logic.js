export function filterCelestials(items, query="", family="all", favorites=null) {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(item => {
    const matchesTerm = !term || (item.name + " " + item.kind + " " + item.family + " " + item.description).toLocaleLowerCase().includes(term);
    const matchesFamily = family === "all" || item.family === family;
    const matchesFavorite = favorites === null || favorites.has(item.id);
    return matchesTerm && matchesFamily && matchesFavorite;
  });
}

export function randomCelestial(items, excludedId=null, random=Math.random) {
  const candidates = excludedId ? items.filter(item => item.id !== excludedId) : items;
  if (!candidates.length) return undefined;
  const index = Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
  return candidates[index];
}
