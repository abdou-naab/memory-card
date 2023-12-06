import heros from "./heros";
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function setClickedValue(id, boolValue) {
  for (let hero of heros) {
    if (hero.id == id) hero.clicked = boolValue;
    break;
  }
}
export function getNewHero(ids = null) {
  let herosShuffled = shuffle(heros);
  for (let hero of herosShuffled) {
    if (!hero.clicked && ((ids && !ids.includes(hero.id)) || !ids)) return hero;
  }
  return null;
}
export function getViewedHero(ids = null) {
  let herosShuffled = shuffle(heros);
  for (let hero of herosShuffled) {
    if (hero.clicked && ((ids && !ids.includes(hero.id)) || !ids)) return hero;
  }
  return null;
}
export function getHerosIds(heros) {
  let ids = [];
  for (let hero of heros) {
    ids.push(hero.id);
  }
  return ids;
}
export function getRandomHero(heroList) {
  let i = Math.floor(Math.random() * heroList.length);
  return heroList[i];
}

// export function getRoundHeros (clickedHeros, displayedHeros) {
//     // let n = parseInt(displayed / 3)

// }
