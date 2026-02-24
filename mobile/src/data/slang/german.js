/**
 * German Slang & Casual Language
 * Jugendsprache (youth speak), regional dialects, internet slang
 */

export const germanSlang = [
  // Greetings
  { id: 'moin', term: 'Moin', phonetic: 'moyn', translation: 'Hi (Northern Germany)', formal: 'Guten Tag', category: 'greetings', formality: 'casual', region: 'North' },
  { id: 'servus', term: 'Servus', phonetic: 'ZER-voos', translation: 'Hi / Bye (Bavaria/Austria)', formal: 'Guten Tag', category: 'greetings', formality: 'casual', region: 'South' },
  { id: 'gruss-gott', term: 'Grüß Gott', phonetic: 'grüss got', translation: 'Hello (Bavaria/Austria)', formal: 'Guten Tag', category: 'greetings', formality: 'casual', region: 'South' },
  { id: 'na', term: 'Na?', phonetic: 'nah', translation: 'Hey / What\'s up?', formal: 'Wie geht\'s?', category: 'greetings', formality: 'casual' },
  { id: 'alter', term: 'Alter', phonetic: 'AHL-ter', translation: 'Dude / Bro', formal: 'Freund', category: 'greetings', formality: 'casual', example: { german: 'Alter, was geht?', english: 'Dude, what\'s up?' } },
  { id: 'digga', term: 'Digga / Diggah', phonetic: 'DEE-gah', translation: 'Dude / Bro', formal: 'Freund', category: 'greetings', formality: 'street', region: 'Hamburg' },
  { id: 'bruder', term: 'Bruder', phonetic: 'BROO-der', translation: 'Bro', formal: 'Freund', category: 'greetings', formality: 'casual' },

  // Reactions
  { id: 'geil', term: 'Geil', phonetic: 'gayl', translation: 'Awesome / Cool / Hot', formal: 'toll', category: 'reactions', formality: 'casual', usage: 'Originally vulgar, now mainstream' },
  { id: 'krass', term: 'Krass', phonetic: 'krahs', translation: 'Crazy / Intense / Sick', formal: 'unglaublich', category: 'reactions', formality: 'casual' },
  { id: 'hammer', term: 'Hammer', phonetic: 'HAH-mer', translation: 'Awesome / Crazy', formal: 'toll', category: 'reactions', formality: 'casual' },
  { id: 'mega', term: 'Mega', phonetic: 'MEH-gah', translation: 'Super / Really', formal: 'sehr', category: 'reactions', formality: 'casual' },
  { id: 'fett', term: 'Fett', phonetic: 'fet', translation: 'Cool / Sick', formal: 'toll', category: 'reactions', formality: 'casual' },
  { id: 'laessig', term: 'Lässig', phonetic: 'LESS-ig', translation: 'Cool / Chill', formal: 'entspannt', category: 'reactions', formality: 'casual' },
  { id: 'scheisse', term: 'Scheiße!', phonetic: 'SHY-seh', translation: 'Shit! / Damn!', formal: '-', category: 'reactions', formality: 'crude' },
  { id: 'mist', term: 'Mist!', phonetic: 'mist', translation: 'Crap! / Darn!', formal: '-', category: 'reactions', formality: 'casual', usage: 'Family-friendly version' },
  { id: 'ach-du-scheisse', term: 'Ach du Scheiße!', phonetic: 'ahkh doo SHY-seh', translation: 'Holy shit!', formal: '-', category: 'reactions', formality: 'crude' },
  { id: 'boah', term: 'Boah!', phonetic: 'boh-ah', translation: 'Wow! / Whoa!', formal: '-', category: 'reactions', formality: 'casual' },
  { id: 'assi', term: 'Assi', phonetic: 'AH-see', translation: 'Trashy / Low-class', formal: 'geschmacklos', category: 'reactions', formality: 'casual', usage: 'From "asozial"' },
  { id: 'peinlich', term: 'Peinlich', phonetic: 'PAYN-likh', translation: 'Cringe / Embarrassing', formal: 'peinlich', category: 'reactions', formality: 'casual' },

  // Compliments
  { id: 'suess', term: 'Süß', phonetic: 'züss', translation: 'Cute / Sweet', formal: 'niedlich', category: 'compliments', formality: 'casual' },
  { id: 'schnucki', term: 'Schnucki', phonetic: 'SHNOO-kee', translation: 'Cutie / Sweetie', formal: '-', category: 'compliments', formality: 'playful' },
  { id: 'scharf', term: 'Scharf', phonetic: 'shahrf', translation: 'Hot / Attractive', formal: 'attraktiv', category: 'compliments', formality: 'casual' },
  { id: 'heiss', term: 'Heiß', phonetic: 'hice', translation: 'Hot (attractive)', formal: 'attraktiv', category: 'compliments', formality: 'casual' },

  // Money
  { id: 'kohle', term: 'Kohle', phonetic: 'KOH-leh', translation: 'Money (lit. coal)', formal: 'Geld', category: 'money', formality: 'casual' },
  { id: 'knete', term: 'Knete', phonetic: 'KNEH-teh', translation: 'Money / Dough', formal: 'Geld', category: 'money', formality: 'casual' },
  { id: 'moos', term: 'Moos', phonetic: 'mohs', translation: 'Money (lit. moss)', formal: 'Geld', category: 'money', formality: 'casual' },
  { id: 'pleite', term: 'Pleite', phonetic: 'PLY-teh', translation: 'Broke', formal: 'kein Geld', category: 'money', formality: 'casual' },

  // Dating
  { id: 'freund-freundin', term: 'Freund/Freundin', phonetic: 'froynd', translation: 'Boyfriend/Girlfriend', formal: 'Partner', category: 'dating', formality: 'casual' },
  { id: 'anmachen', term: 'Anmachen', phonetic: 'AHN-mahkh-en', translation: 'To hit on', formal: 'flirten', category: 'dating', formality: 'casual' },
  { id: 'abschleppen', term: 'Abschleppen', phonetic: 'AHP-shlep-en', translation: 'To pick up (someone)', formal: '-', category: 'dating', formality: 'casual' },
  { id: 'knutschen', term: 'Knutschen', phonetic: 'KNOOT-shen', translation: 'To make out', formal: 'küssen', category: 'dating', formality: 'casual' },
  { id: 'schatz', term: 'Schatz', phonetic: 'shahts', translation: 'Babe / Honey (lit. treasure)', formal: 'Liebling', category: 'dating', formality: 'casual' },

  // Party & Drinking
  { id: 'saufen', term: 'Saufen', phonetic: 'ZOW-fen', translation: 'To drink heavily', formal: 'trinken', category: 'party', formality: 'casual' },
  { id: 'hacke', term: 'Hacke sein', phonetic: 'HAH-keh', translation: 'To be wasted', formal: 'betrunken', category: 'party', formality: 'casual' },
  { id: 'kater', term: 'Kater', phonetic: 'KAH-ter', translation: 'Hangover (lit. tomcat)', formal: '-', category: 'party', formality: 'casual' },
  { id: 'vorglühen', term: 'Vorglühen', phonetic: 'FOR-glü-en', translation: 'Pre-game / Pre-drink', formal: '-', category: 'party', formality: 'casual' },

  // Expressions
  { id: 'keine-ahnung', term: 'Keine Ahnung', phonetic: 'KY-neh AH-noong', translation: 'No idea / Dunno', formal: 'Ich weiß nicht', category: 'expressions', formality: 'casual' },
  { id: 'egal', term: 'Egal', phonetic: 'eh-GAHL', translation: 'Whatever / Doesn\'t matter', formal: 'Es ist mir gleich', category: 'expressions', formality: 'casual' },
  { id: 'keinen-bock', term: 'Keinen Bock', phonetic: 'KY-nen bohk', translation: 'Can\'t be bothered / Not in the mood', formal: 'Keine Lust', category: 'expressions', formality: 'casual' },
  { id: 'jein', term: 'Jein', phonetic: 'yayn', translation: 'Yes and no', formal: '-', category: 'expressions', formality: 'casual', usage: 'Combination of ja + nein' },
  { id: 'hau-rein', term: 'Hau rein!', phonetic: 'how rayn', translation: 'Go for it! / Dig in!', formal: '-', category: 'expressions', formality: 'casual' },
  { id: 'chill-mal', term: 'Chill mal', phonetic: 'chil mahl', translation: 'Chill out / Relax', formal: 'Beruhige dich', category: 'expressions', formality: 'casual' },
  { id: 'was-geht', term: 'Was geht?', phonetic: 'vahs gayt', translation: 'What\'s up?', formal: 'Wie geht es dir?', category: 'expressions', formality: 'casual' },
];

export default germanSlang;
