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

// export function resetValues(setScore, score) {
//   setScore({ ...score, current: 0 });
// }
export function getNewHerosNotInSet(n, viewedCardsIds) {
  let newHeros = [];
  let herosFiltered = shuffle(
    heros.filter((hero) => !viewedCardsIds.has(hero.id))
  );
  for (let i = 0; i < n; i++) {
    let temp = herosFiltered.pop();
    if (!temp) break;
    newHeros.push(temp);
  }

  return newHeros;
}

export function getHerosIds(heros) {
  let ids = [];
  for (let hero of heros) {
    ids.push(hero.id);
  }
  return ids;
}
export function getHerosFromIds(ids) {
  let val = heros.filter((hero) => ids.includes(hero.id));
  return val;
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

  let newCards = getNewHerosNotInSet(cardsNumber.new, viewedCardsIds);

  let clickedCardsMissing = cardsNumber.clicked - clickedCardsIds.length;
  let roundClickedCardsIds;
  if (clickedCardsMissing > 0) {
    roundClickedCardsIds = clickedCardsIds;
    roundClickedCardsIds = roundClickedCardsIds.concat(
      getNRandomElement(Array.from(viewedCardsIds), clickedCardsMissing)
    );
  } else if (clickedCardsMissing == 0) {
    roundClickedCardsIds = clickedCardsIds;
  } else {
    roundClickedCardsIds = getNRandomElement(
      clickedCardsIds,
      cardsNumber.clicked
    );
  }
  let clickedCards = getHerosFromIds(roundClickedCardsIds);

  let roundViewedCardsIds = getNRandomElement(
    Array.from(viewedCardsIds).filter((i) => !roundClickedCardsIds.includes(i)),
    cardsNumber.viewed
  );
  let viewedCards = getHerosFromIds(roundViewedCardsIds);

  let newCardsMissing = cardsNumber.new - newCards.length;
  if (newCardsMissing > 0) {
    newCards = newCards.concat(
      getNRandomElement(
        Array.from(viewedCardsIds).filter(
          (i) =>
            !roundClickedCardsIds.includes(i) &&
            !roundViewedCardsIds.includes(i)
        ),
        newCardsMissing
      )
    );
  }

  let herosChosen = [...clickedCards, ...newCards, ...viewedCards];

  return shuffle(herosChosen);
}
