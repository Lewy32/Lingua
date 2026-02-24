/**
 * French Slang & Casual Language
 * Verlan, argot, youth slang, francophone variations
 */

export const frenchSlang = [
  // Greetings
  { id: 'salut', term: 'Salut', phonetic: 'sah-LÜ', translation: 'Hi / Hey', formal: 'Bonjour', category: 'greetings', formality: 'casual' },
  { id: 'coucou', term: 'Coucou', phonetic: 'koo-KOO', translation: 'Hey / Hi there', formal: 'Bonjour', category: 'greetings', formality: 'casual', usage: 'Friendly, often female' },
  { id: 'wesh', term: 'Wesh', phonetic: 'wesh', translation: 'Yo / What\'s up', formal: 'Salut', category: 'greetings', formality: 'street', usage: 'From Arabic, banlieue slang' },
  { id: 'ca-va', term: 'Ça va?', phonetic: 'sah VAH', translation: 'How\'s it going?', formal: 'Comment allez-vous?', category: 'greetings', formality: 'casual' },
  { id: 'quoi-de-neuf', term: 'Quoi de neuf?', phonetic: 'kwah duh NUHF', translation: 'What\'s new?', formal: 'Quelles sont les nouvelles?', category: 'greetings', formality: 'casual' },
  { id: 'mec', term: 'Mec', phonetic: 'mek', translation: 'Dude / Guy', formal: 'homme', category: 'greetings', formality: 'casual' },
  { id: 'meuf', term: 'Meuf', phonetic: 'muhf', translation: 'Girl / Chick (verlan for femme)', formal: 'femme', category: 'greetings', formality: 'casual' },
  { id: 'pote', term: 'Pote', phonetic: 'poht', translation: 'Buddy / Pal', formal: 'ami', category: 'greetings', formality: 'casual' },

  // Reactions
  { id: 'cool', term: 'Cool', phonetic: 'kool', translation: 'Cool', formal: 'super', category: 'reactions', formality: 'casual' },
  { id: 'genial', term: 'Génial', phonetic: 'zhay-NYAL', translation: 'Great / Awesome', formal: 'excellent', category: 'reactions', formality: 'casual' },
  { id: 'trop-bien', term: 'Trop bien', phonetic: 'troh BYEN', translation: 'So good / Awesome', formal: 'Très bien', category: 'reactions', formality: 'casual' },
  { id: 'grave', term: 'Grave', phonetic: 'grahv', translation: 'Totally / Seriously', formal: 'vraiment', category: 'reactions', formality: 'casual', example: { french: 'C\'est grave cool', english: 'It\'s seriously cool' } },
  { id: 'ouf', term: 'Ouf', phonetic: 'oof', translation: 'Crazy / Insane (verlan for fou)', formal: 'fou', category: 'reactions', formality: 'casual' },
  { id: 'chelou', term: 'Chelou', phonetic: 'shuh-LOO', translation: 'Weird / Sketchy (verlan for louche)', formal: 'bizarre', category: 'reactions', formality: 'casual' },
  { id: 'relou', term: 'Relou', phonetic: 'ruh-LOO', translation: 'Annoying (verlan for lourd)', formal: 'ennuyeux', category: 'reactions', formality: 'casual' },
  { id: 'merde', term: 'Merde!', phonetic: 'mehrd', translation: 'Shit! / Damn!', formal: '-', category: 'reactions', formality: 'crude' },
  { id: 'putain', term: 'Putain!', phonetic: 'pü-TAN', translation: 'Fuck! / Damn!', formal: '-', category: 'reactions', formality: 'crude', usage: 'Extremely common, like English F-word' },
  { id: 'nul', term: 'Nul/Nulle', phonetic: 'nül', translation: 'Lame / Sucks', formal: 'mauvais', category: 'reactions', formality: 'casual' },
  { id: 'la-vache', term: 'La vache!', phonetic: 'lah VAHSH', translation: 'Holy cow! / Wow!', formal: '-', category: 'reactions', formality: 'casual' },
  { id: 'bordel', term: 'Bordel!', phonetic: 'bor-DEL', translation: 'Damn! / WTF!', formal: '-', category: 'reactions', formality: 'crude' },

  // Compliments
  { id: 'beau-gosse', term: 'Beau gosse', phonetic: 'boh GOSS', translation: 'Hot guy', formal: 'bel homme', category: 'compliments', formality: 'casual' },
  { id: 'belle-gosse', term: 'Belle gosse', phonetic: 'bel GOSS', translation: 'Hot girl', formal: 'belle femme', category: 'compliments', formality: 'casual' },
  { id: 'canon', term: 'Canon', phonetic: 'kah-NON', translation: 'Hot / Gorgeous', formal: 'très beau/belle', category: 'compliments', formality: 'casual' },
  { id: 'bg', term: 'BG', phonetic: 'bay-ZHAY', translation: 'Hottie (beau gosse)', formal: '-', category: 'compliments', formality: 'casual' },

  // Money
  { id: 'fric', term: 'Fric', phonetic: 'freek', translation: 'Money / Cash', formal: 'argent', category: 'money', formality: 'casual' },
  { id: 'tune', term: 'Tune / Thune', phonetic: 'tün', translation: 'Money', formal: 'argent', category: 'money', formality: 'casual' },
  { id: 'ble', term: 'Blé', phonetic: 'blay', translation: 'Money (lit. wheat)', formal: 'argent', category: 'money', formality: 'casual' },
  { id: 'balle', term: 'Balle', phonetic: 'bahl', translation: 'Euro / Buck', formal: 'euro', category: 'money', formality: 'casual' },
  { id: 'fauche', term: 'Fauché', phonetic: 'foh-SHAY', translation: 'Broke', formal: 'sans argent', category: 'money', formality: 'casual' },

  // Dating
  { id: 'copain', term: 'Copain/Copine', phonetic: 'koh-PAN', translation: 'Boyfriend/Girlfriend', formal: 'petit ami', category: 'dating', formality: 'casual' },
  { id: 'kiffe', term: 'Kiffer', phonetic: 'kee-FAY', translation: 'To love / Be into', formal: 'aimer', category: 'dating', formality: 'casual', usage: 'From Arabic' },
  { id: 'draguer', term: 'Draguer', phonetic: 'drah-GAY', translation: 'To hit on / Flirt', formal: 'séduire', category: 'dating', formality: 'casual' },
  { id: 'choper', term: 'Choper', phonetic: 'shoh-PAY', translation: 'To hook up with / Get', formal: 'obtenir', category: 'dating', formality: 'casual' },
  { id: 'pecho', term: 'Pécho', phonetic: 'pay-SHOH', translation: 'To hook up (verlan for choper)', formal: '-', category: 'dating', formality: 'street' },

  // Party & Drinking
  { id: 'teuf', term: 'Teuf', phonetic: 'tuhf', translation: 'Party (verlan for fête)', formal: 'fête', category: 'party', formality: 'casual' },
  { id: 'bourre', term: 'Bourré', phonetic: 'boo-RAY', translation: 'Drunk / Wasted', formal: 'ivre', category: 'party', formality: 'casual' },
  { id: 'gueule-de-bois', term: 'Gueule de bois', phonetic: 'guhl duh BWAH', translation: 'Hangover (lit. wooden face)', formal: '-', category: 'party', formality: 'casual' },
  { id: 'picole', term: 'Picoler', phonetic: 'pee-koh-LAY', translation: 'To drink (alcohol)', formal: 'boire', category: 'party', formality: 'casual' },

  // Expressions
  { id: 'bof', term: 'Bof', phonetic: 'bof', translation: 'Meh / Whatever', formal: '-', category: 'expressions', formality: 'casual' },
  { id: 'nickel', term: 'Nickel', phonetic: 'nee-KEL', translation: 'Perfect / Great', formal: 'parfait', category: 'expressions', formality: 'casual' },
  { id: 'flemme', term: 'J\'ai la flemme', phonetic: 'zhay lah FLEM', translation: 'I can\'t be bothered', formal: 'Je n\'ai pas envie', category: 'expressions', formality: 'casual' },
  { id: 'laisse-tomber', term: 'Laisse tomber', phonetic: 'less tom-BAY', translation: 'Forget it / Drop it', formal: 'N\'y pense plus', category: 'expressions', formality: 'casual' },
  { id: 'jai-le-seum', term: 'J\'ai le seum', phonetic: 'zhay luh SUHM', translation: 'I\'m pissed / Annoyed', formal: 'Je suis énervé', category: 'expressions', formality: 'casual', usage: 'From Arabic "poison"' },
  { id: 'cest-ouf', term: 'C\'est ouf!', phonetic: 'say OOF', translation: 'That\'s crazy!', formal: 'C\'est fou', category: 'expressions', formality: 'casual' },
  { id: 'tranquille', term: 'Tranquille', phonetic: 'tran-KEEL', translation: 'Chill / No worries / Easy', formal: 'D\'accord', category: 'expressions', formality: 'casual' },
];

export default frenchSlang;
