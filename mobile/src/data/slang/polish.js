/**
 * Polish Slang & Casual Language
 * Youth slang, internet speak, regional expressions
 */

export const polishSlang = [
  // Greetings
  { id: 'czesc', term: 'Cześć', phonetic: 'cheshch', translation: 'Hi / Bye', formal: 'Dzień dobry', category: 'greetings', formality: 'casual' },
  { id: 'siema', term: 'Siema', phonetic: 'SHEH-mah', translation: 'Hey / What\'s up', formal: 'Cześć', category: 'greetings', formality: 'casual' },
  { id: 'elo', term: 'Elo', phonetic: 'EH-loh', translation: 'Hey', formal: 'Cześć', category: 'greetings', formality: 'casual' },
  { id: 'co-tam', term: 'Co tam?', phonetic: 'tso tahm', translation: 'What\'s up?', formal: 'Jak się masz?', category: 'greetings', formality: 'casual' },
  { id: 'nara', term: 'Nara', phonetic: 'NAH-rah', translation: 'Bye / Later', formal: 'Do widzenia', category: 'greetings', formality: 'casual' },
  { id: 'ziom', term: 'Ziom / Ziomek', phonetic: 'zhom', translation: 'Dude / Bro', formal: 'kolega', category: 'greetings', formality: 'casual' },
  { id: 'stary', term: 'Stary', phonetic: 'STAH-ry', translation: 'Dude / Mate (lit. old one)', formal: 'przyjaciel', category: 'greetings', formality: 'casual' },
  { id: 'mordo', term: 'Mordo', phonetic: 'MOR-doh', translation: 'Dude (lit. face)', formal: 'kolega', category: 'greetings', formality: 'casual' },

  // Reactions
  { id: 'super', term: 'Super', phonetic: 'SOO-per', translation: 'Great / Awesome', formal: 'wspaniale', category: 'reactions', formality: 'casual' },
  { id: 'zajebiście', term: 'Zajebiste', phonetic: 'zah-yeh-BEES-teh', translation: 'Fucking awesome', formal: 'świetne', category: 'reactions', formality: 'crude', warning: 'Very vulgar but common' },
  { id: 'spoko', term: 'Spoko', phonetic: 'SPOH-koh', translation: 'Cool / Okay', formal: 'dobrze', category: 'reactions', formality: 'casual', usage: 'Short for "spokojnie"' },
  { id: 'git', term: 'Git', phonetic: 'geet', translation: 'Good / Nice', formal: 'dobrze', category: 'reactions', formality: 'casual' },
  { id: 'kozak', term: 'Kozak', phonetic: 'KOH-zak', translation: 'Badass / Cool', formal: 'świetny', category: 'reactions', formality: 'casual' },
  { id: 'odjazd', term: 'Odjazdowy', phonetic: 'od-YAZD-oh-vy', translation: 'Awesome / Far out', formal: 'świetny', category: 'reactions', formality: 'casual' },
  { id: 'kurwa', term: 'Kurwa!', phonetic: 'KOOR-vah', translation: 'Fuck! / Shit!', formal: '-', category: 'reactions', formality: 'crude', usage: 'Extremely common, used as intensifier' },
  { id: 'cholera', term: 'Cholera!', phonetic: 'ho-LEH-rah', translation: 'Damn! / Crap!', formal: '-', category: 'reactions', formality: 'casual' },
  { id: 'kurde', term: 'Kurde', phonetic: 'KOOR-deh', translation: 'Darn / Dang', formal: '-', category: 'reactions', formality: 'casual', usage: 'Family-friendly version of kurwa' },
  { id: 'no-nie', term: 'No nie?', phonetic: 'noh nyeh', translation: 'Right? / Isn\'t it?', formal: 'prawda?', category: 'reactions', formality: 'casual' },
  { id: 'masakra', term: 'Masakra', phonetic: 'mah-SAH-krah', translation: 'Crazy / Insane', formal: 'niesamowite', category: 'reactions', formality: 'casual' },
  { id: 'szok', term: 'Szok', phonetic: 'shok', translation: 'OMG / Shocking', formal: 'niesamowite', category: 'reactions', formality: 'casual' },
  { id: 'zaje', term: 'Żal', phonetic: 'zhahl', translation: 'That sucks / Bummer', formal: 'szkoda', category: 'reactions', formality: 'casual' },
  { id: 'lipa', term: 'Lipa', phonetic: 'LEE-pah', translation: 'Sucks / Lame', formal: 'kiepskie', category: 'reactions', formality: 'casual' },
  { id: 'kicha', term: 'Kicha', phonetic: 'KEE-hah', translation: 'Crap / Garbage', formal: 'słabe', category: 'reactions', formality: 'casual' },

  // Compliments
  { id: 'laska', term: 'Laska', phonetic: 'LAHS-kah', translation: 'Hot girl / Chick', formal: 'dziewczyna', category: 'compliments', formality: 'casual' },
  { id: 'ciacho', term: 'Ciacho', phonetic: 'CHAH-ho', translation: 'Hot guy / Hunk', formal: 'przystojny', category: 'compliments', formality: 'casual' },
  { id: 'milka', term: 'Milka', phonetic: 'MEEL-kah', translation: 'Hottie (female)', formal: 'ładna', category: 'compliments', formality: 'casual' },
  { id: 'sliczny', term: 'Śliczny', phonetic: 'SHLEECH-ny', translation: 'Gorgeous', formal: 'piękny', category: 'compliments', formality: 'casual' },
  { id: 'madry', term: 'Mądry', phonetic: 'MOHN-dry', translation: 'Smart / Clever', formal: 'inteligentny', category: 'compliments', formality: 'casual' },

  // Money
  { id: 'kasa', term: 'Kasa', phonetic: 'KAH-sah', translation: 'Money / Cash', formal: 'pieniądze', category: 'money', formality: 'casual' },
  { id: 'hajz', term: 'Hajs', phonetic: 'hice', translation: 'Money / Dough', formal: 'pieniądze', category: 'money', formality: 'casual' },
  { id: 'szmal', term: 'Szmal', phonetic: 'shmahl', translation: 'Money', formal: 'pieniądze', category: 'money', formality: 'casual' },
  { id: 'zloty', term: 'Złoty', phonetic: 'ZWOH-ty', translation: 'Zloty (currency)', formal: 'złoty', category: 'money', formality: 'casual' },
  { id: 'bez-grosza', term: 'Bez grosza', phonetic: 'bez GROH-shah', translation: 'Broke', formal: 'bez pieniędzy', category: 'money', formality: 'casual' },

  // Dating
  { id: 'chlopak', term: 'Chłopak', phonetic: 'HWOH-pak', translation: 'Boyfriend', formal: 'partner', category: 'dating', formality: 'casual' },
  { id: 'dziewczyna', term: 'Dziewczyna', phonetic: 'jef-CHY-nah', translation: 'Girlfriend', formal: 'partnerka', category: 'dating', formality: 'casual' },
  { id: 'podryw', term: 'Podryw', phonetic: 'POD-ryv', translation: 'Pickup / Flirting', formal: 'flirt', category: 'dating', formality: 'casual' },
  { id: 'podrywac', term: 'Podrywać', phonetic: 'pod-RY-vach', translation: 'To hit on', formal: 'flirtować', category: 'dating', formality: 'casual' },
  { id: 'przystawic-sie', term: 'Przystawiać się', phonetic: 'pshy-STAHV-yach', translation: 'To make a move', formal: '-', category: 'dating', formality: 'casual' },
  { id: 'zwiazek', term: 'Związek', phonetic: 'ZVYON-zek', translation: 'Relationship', formal: 'związek', category: 'dating', formality: 'casual' },

  // Party & Drinking
  { id: 'impra', term: 'Impra', phonetic: 'EEM-prah', translation: 'Party', formal: 'impreza', category: 'party', formality: 'casual' },
  { id: 'melanż', term: 'Melanż', phonetic: 'MEH-lahnzh', translation: 'Party', formal: 'impreza', category: 'party', formality: 'casual' },
  { id: 'balanga', term: 'Balanga', phonetic: 'bah-LAHN-gah', translation: 'Wild party', formal: 'impreza', category: 'party', formality: 'casual' },
  { id: 'pijany', term: 'Pijany', phonetic: 'pee-YAH-ny', translation: 'Drunk', formal: 'nietrzeźwy', category: 'party', formality: 'casual' },
  { id: 'nawalony', term: 'Nawalony', phonetic: 'nah-vah-LOH-ny', translation: 'Wasted / Hammered', formal: 'bardzo pijany', category: 'party', formality: 'casual' },
  { id: 'kac', term: 'Kac', phonetic: 'kahts', translation: 'Hangover', formal: 'kac', category: 'party', formality: 'casual' },
  { id: 'browary', term: 'Browary', phonetic: 'broh-VAH-ry', translation: 'Beers', formal: 'piwa', category: 'party', formality: 'casual' },

  // Expressions
  { id: 'luz', term: 'Luz', phonetic: 'looz', translation: 'Chill / Relax / No worries', formal: 'spokojnie', category: 'expressions', formality: 'casual' },
  { id: 'luzik', term: 'Luzik', phonetic: 'LOO-zhik', translation: 'Take it easy / Chillax', formal: 'spokojnie', category: 'expressions', formality: 'casual' },
  { id: 'nie-ma-sprawy', term: 'Nie ma sprawy', phonetic: 'nyeh mah SPRAH-vy', translation: 'No problem', formal: 'nie ma problemu', category: 'expressions', formality: 'casual' },
  { id: 'daj-spokoj', term: 'Daj spokój', phonetic: 'dye spoh-KOOY', translation: 'Give it a rest / Come on', formal: 'przestań', category: 'expressions', formality: 'casual' },
  { id: 'wesoło', term: 'Wesoło', phonetic: 'veh-SOH-woh', translation: 'Fun / Good times', formal: 'zabawnie', category: 'expressions', formality: 'casual' },
  { id: 'ogarnij-sie', term: 'Ogarnij się', phonetic: 'oh-GAR-nyee sheh', translation: 'Get it together', formal: 'opanuj się', category: 'expressions', formality: 'casual' },
  { id: 'jasne', term: 'Jasne', phonetic: 'YAHS-neh', translation: 'Sure / Obviously', formal: 'oczywiście', category: 'expressions', formality: 'casual' },
  { id: 'bez-kitu', term: 'Bez kitu', phonetic: 'bez KEE-too', translation: 'No kidding / For real', formal: 'serio', category: 'expressions', formality: 'casual' },
];

export default polishSlang;
