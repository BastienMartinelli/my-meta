import mtg from "mtgsdk";

/**
 * Searchs legendary creatures based on their name
 * @param {*} name the commander name
 * @return {Promise} the promise
 */
export async function getCommanderByName(name) {
  // querying mtg web service
  const cards = await mtg.card.where({
    supertypes: "legendary",
    types: "Creature",
    name: name
  });

  // filtering cards duplicates
  const results = [...new Set(cards.map(c => c.name))]
    // mapping to full card
    .map(name => cards.find(c => c.name === name))
    // changing colors to lower case
    .map(card => ({
      ...card,
      colorIdentity: card.colorIdentity.map(c => c.toLowerCase())
    }));

  return results;
}

export default {
  getCommanderByName
};
