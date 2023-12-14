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
  if (!array.length || array.length <= n) return array;
  else {
    array = shuffle(Array.from(array));
    let indexes = [];
    while (indexes.length < n) {
      let i = Math.floor(Math.random() * array.length);
      if (!indexes.includes(i)) indexes.push(i);
    }
    return indexes.map((i) => array[i]);
  }
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

export function addOrRemoveUnnecessaryCardsClicked(
  heros, //['dshkxrxn1is', 'iq8lxh5veqn', 'rrbb70s953b']
  clickedCards2Keep, // 2
  clickedHeros // ['rrbb70s953b]
) {
  let clickedFound = [];

  heros = heros.filter((hero) => {
    if (hero.clicked) {
      clickedFound.push(hero.id);
      if (clickedFound.length > clickedCards2Keep) return false;
      else true;
    }
  });
  let numberToCompleteTheClickedHeros = clickedFound.length;
  clickedHeros = shuffle(clickedHeros);
  while (
    numberToCompleteTheClickedHeros < clickedCards2Keep &&
    clickedHeros.length
  ) {
    let temp = clickedHeros.pop();
    if (!clickedFound.includes(temp.id)) heros.push(temp);
  }
  return heros;
}
export function addOrUpdateWithNewHeros(herosChosen, newHeros, total) {
  while (herosChosen.length < total && newHeros.length) {
    herosChosen.push(newHeros.pop());
  }
  if (herosChosen.length == total && newHeros.length == 0) return herosChosen;
  else if (herosChosen.length == total && newHeros.length) {
    herosChosen = shuffle(herosChosen);
    while (newHeros.length) {
      herosChosen = herosChosen.map((hero) => {
        if (hero.clicked) return hero;
        else return newHeros.pop();
      });
    }
  } else return herosChosen;
}
export function getChooosedHerosList(n, clickedCardsIds, viewedCardsIds) {
  let cardsNumber = calculateCardDistribution(n);

  // the beginning the returning heros to random viewedCards
  let herosChosen = getHerosFromIds(
    getNRandomElement(Array.from(viewedCardsIds), n)
  );
  let newHeros = getNewHerosNotInSet(cardsNumber.new, viewedCardsIds);
  let clickedHeros = getHerosFromIds(
    getNRandomElement(clickedCardsIds, cardsNumber.clicked)
  );
  herosChosen = addOrRemoveUnnecessaryCardsClicked(
    herosChosen,
    cardsNumber.clicked,
    clickedHeros
  );
  herosChosen = addOrUpdateWithNewHeros(herosChosen, newHeros, n);
  if (herosChosen.length < n) {
    let temp = getNewHerosNotInSet(
      n - herosChosen.length,
      new Set(getHerosIds(herosChosen))
    );
    herosChosen = herosChosen.concat(temp);
  }

  return shuffle(herosChosen);
}
