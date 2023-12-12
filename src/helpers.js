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
export function resetClickedValue() {
  for (let hero of heros) {
    hero.clicked = false;
  }
}
export function getNewHeroNotInSet(viewedCardsIds) {
  let herosFiltered = shuffle(
    heros.filter((hero) => !viewedCardsIds.has(hero.id))
  );
  if (herosFiltered.length === 0) {
    return null; // No new heroes
  }
  let randomIndex = Math.floor(Math.random() * herosFiltered.length);
  return herosFiltered[randomIndex];
}

export function getHerosIds(heros) {
  let ids = [];
  for (let hero of heros) {
    ids.push(hero.id);
  }
  return ids;
}
export function getHerosFromIds(ids) {
  return heros.filter((hero) => {
    ids.includes(hero.id);
  });
}
export function getNRandomElement(array, n) {
  array = shuffle(Array.from(array));
  let indexes = [];
  while (indexes.length < n) {
    let i = Math.floor(Math.random() * array.length);
    if (!indexes.includes(i)) indexes.push(i);
  }
  return indexes.map((i) => array[i]);
}

export function calculateCardDistribution(totalShown) {
  let clickedCards = Math.floor(
    totalShown * parseFloat(Math.random().toFixed(2))
  );
  let viewedCards = Math.floor(
    totalShown * parseFloat(Math.random().toFixed(2))
  );
  let newCards = Math.floor(totalShown * parseFloat(Math.random().toFixed(2)));

  if (newCards === 0) newCards++;

  let totalCalculated = clickedCards + viewedCards + newCards;

  while (totalCalculated > totalShown) {
    let rand = Math.floor(Math.random() * 10);
    if (rand > 4 && viewedCards > 1) viewedCards--;
    else if (clickedCards > 1) clickedCards--;
    else newCards--;
    totalCalculated--;
  }
  while (totalCalculated < totalShown) {
    let rand = Math.floor(Math.random() * 10);
    if (rand > 7) clickedCards++;
    else if (rand > 3) viewedCards++;
    else newCards++;
    totalCalculated++;
  }
  if (totalShown * 0.66 < newCards) {
    let rand = Math.floor(Math.random() * 10);
    if (rand > 2 && rand < 8) clickedCards++;
    else viewedCards++;
    newCards--;
  }
  return {
    clicked: clickedCards,
    viewed: viewedCards,
    new: newCards,
  };
}

export function getChooosedHerosList(n, clickedCardsIds, viewedCardsIds) {
  let cardsNumber = calculateCardDistribution(n);

  let clickedCards = getHerosFromIds(
    getNRandomElement(clickedCardsIds, cardsNumber.clicked)
  );
  let newCards = [];
  for (let i = 0; i < cardsNumber.new; i++) {
    newCards.push(getNewHeroNotInSet(viewedCardsIds));
  }
  let viewedCards = getHerosFromIds(
    getNRandomElement(viewedCardsIds, cardsNumber.viewed)
  );
  let herosChosen = [...clickedCards, ...newCards, ...viewedCards];

  return shuffle(herosChosen);
}
