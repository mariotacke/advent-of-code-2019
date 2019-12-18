module.exports = (input) => {
  const reactions = input
    .split('\n')
    .reduce((mixtures, line) => {
      const chemicals = line.split('=>');
      const outputChemical = chemicals[1].match(/(\d+) (\w+)/g)[0];

      mixtures[outputChemical.split(' ')[1]] = {
        amount: Number(outputChemical.split(' ')[0]),
        ingredients: chemicals[0].split(',').map((ingredient) => {
          const inputChemical = ingredient.match(/(\d+) (\w+)/g)[0];

          return {
            amount: Number(inputChemical.split(' ')[0]),
            chemical: inputChemical.split(' ')[1],
          };
        }),
      };

      return mixtures;
    }, {});

  const isBaseMaterial = (chemical) =>
    reactions[chemical].ingredients[0].chemical === 'ORE';

  const materials = Object
    .keys(reactions)
    .reduce((all, key) => {
      all[key] = 0;

      return all;
    }, {});

  let totalOreRequired = 0;

  const buyBasics = (chemical, amount) => {
    if (materials[chemical] > 0) {
      const existing = materials[chemical];
      const leftOver = Math.max(0, existing - amount);

      amount -= existing - leftOver;
      materials[chemical] = leftOver;
    }

    const reaction = reactions[chemical];
    const multiplier = Math.ceil(amount / reaction.amount);

    materials[chemical] += multiplier * reaction.amount;

    if (isBaseMaterial(chemical)) {
      const oreRequiredForReaction = reactions[chemical].ingredients[0].amount;

      totalOreRequired += multiplier * oreRequiredForReaction;
    } else {
      reactions[chemical].ingredients.forEach((ingredient) => {
        buyBasics(ingredient.chemical, ingredient.amount * multiplier);
      });
    }

    materials[chemical] -= amount;
  };

  buyBasics('FUEL', 1);

  return totalOreRequired;
};
