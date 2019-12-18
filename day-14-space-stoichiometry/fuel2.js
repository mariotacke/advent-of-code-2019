const calculateOreUsage = (reactions, fuel) => {
  let totalOreRequired = 0;

  const baseMaterials = new Set(
    Object
      .keys(reactions)
      .filter((key) => reactions[key].ingredients[0].chemical === 'ORE')
  );

  const materials = Object
    .keys(reactions)
    .reduce((all, key) => {
      all[key] = 0;

      return all;
    }, {});

  const buyBasics = (chemical, amount) => {
    if (materials[chemical] > 0) {
      const existing = materials[chemical];
      const leftOver = Math.max(0, existing - amount);

      amount -= existing - leftOver;
      materials[chemical] = leftOver;
    }

    const reaction = reactions[chemical];
    const multiplier = Math.ceil(amount / reaction.amount);

    materials[chemical] += multiplier * reaction.amount - amount;

    if (baseMaterials.has(chemical)) {
      const oreRequiredForReaction = reactions[chemical].ingredients[0].amount;

      totalOreRequired += multiplier * oreRequiredForReaction;
    } else {
      for (let i = 0; i < reactions[chemical].ingredients.length; i++) {
        const ingredient = reactions[chemical].ingredients[i];

        buyBasics(ingredient.chemical, ingredient.amount * multiplier);
      }
    }
  };

  buyBasics('FUEL', fuel);

  return totalOreRequired;
};

module.exports = (input) => {
  const cargo = 1000000000000;
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

  let fuel = cargo / 2;
  let low = 0;
  let high = cargo;

  const estimations = new Set();

  do {
    const totalOreRequired = calculateOreUsage(reactions, fuel);

    if (totalOreRequired < cargo && estimations.has(fuel)) {
      return fuel;
    }

    estimations.add(fuel);

    if (totalOreRequired < cargo) {
      low = fuel;
      fuel += Math.ceil((high - low) / 2);
    } else {
      high = fuel;
      fuel -= Math.ceil((high - low) / 2);
    }
  } while (true); // eslint-disable-line no-constant-condition
};
