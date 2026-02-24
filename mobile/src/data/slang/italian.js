/**
 * Italian Slang & Casual Language
 * Regional variations, youth slang, common expressions
 */

export const italianSlang = [
  // Greetings
  { id: 'ciao', term: 'Ciao', phonetic: 'CHOW', translation: 'Hi / Bye', formal: 'Buongiorno', category: 'greetings', formality: 'casual' },
  { id: 'bella', term: 'Bella!', phonetic: 'BEL-la', translation: 'Hey! / What\'s up!', formal: 'Ciao', category: 'greetings', formality: 'casual', usage: 'Very common Roman greeting' },
  { id: 'che-si-dice', term: 'Che si dice?', phonetic: 'keh see DEE-cheh', translation: 'What\'s up?', formal: 'Come stai?', category: 'greetings', formality: 'casual' },
  { id: 'fra', term: 'Fra / Fratello', phonetic: 'frah', translation: 'Bro', formal: 'amico', category: 'greetings', formality: 'casual' },
  { id: 'zio', term: 'Zio', phonetic: 'DZEE-oh', translation: 'Dude (lit. uncle)', formal: 'amico', category: 'greetings', formality: 'casual', region: 'Northern Italy' },

  // Reactions
  { id: 'figo', term: 'Figo / Fico', phonetic: 'FEE-goh', translation: 'Cool / Awesome', formal: 'fantastico', category: 'reactions', formality: 'casual' },
  { id: 'ganzo', term: 'Ganzo', phonetic: 'GAHN-dzoh', translation: 'Cool (Tuscany)', formal: 'bello', category: 'reactions', formality: 'casual', region: 'Tuscany' },
  { id: 'da-paura', term: 'Da paura', phonetic: 'dah pow-OO-rah', translation: 'Awesome (lit. scary)', formal: 'incredibile', category: 'reactions', formality: 'casual' },
  { id: 'che-figata', term: 'Che figata!', phonetic: 'keh fee-GAH-tah', translation: 'How cool!', formal: 'Fantastico!', category: 'reactions', formality: 'casual' },
  { id: 'boh', term: 'Boh', phonetic: 'boh', translation: 'Dunno / Whatever', formal: 'Non lo so', category: 'reactions', formality: 'casual', usage: 'Accompanied by shoulder shrug' },
  { id: 'cazzo', term: 'Cazzo!', phonetic: 'KAHT-tsoh', translation: 'Shit! / Damn! / Fuck!', formal: '-', category: 'reactions', formality: 'crude', warning: 'Very vulgar but extremely common' },
  { id: 'cavolo', term: 'Cavolo!', phonetic: 'kah-VOH-loh', translation: 'Damn! (lit. cabbage)', formal: '-', category: 'reactions', formality: 'casual', usage: 'Family-friendly version of cazzo' },
  { id: 'madonna', term: 'Madonna!', phonetic: 'mah-DON-nah', translation: 'OMG! / Jesus!', formal: '-', category: 'reactions', formality: 'casual' },
  { id: 'minchia', term: 'Minchia!', phonetic: 'MEEN-kyah', translation: 'Damn! / Wow!', formal: '-', category: 'reactions', formality: 'crude', region: 'Sicily' },

  // Compliments
  { id: 'bello', term: 'Bello/Bella', phonetic: 'BEL-loh', translation: 'Beautiful / Handsome', formal: 'bello', category: 'compliments', formality: 'casual' },
  { id: 'gnocca', term: 'Gnocca', phonetic: 'NYOK-kah', translation: 'Hot girl', formal: 'bella ragazza', category: 'compliments', formality: 'street', warning: 'Can be objectifying' },
  { id: 'fusto', term: 'Fusto', phonetic: 'FOO-stoh', translation: 'Hunk', formal: 'bell\'uomo', category: 'compliments', formality: 'casual' },
  { id: 'sei-uno-schianto', term: 'Sei uno schianto', phonetic: 'say OO-noh SKYAN-toh', translation: 'You\'re stunning', formal: 'Sei bellissimo/a', category: 'compliments', formality: 'casual' },

  // Money
  { id: 'grana', term: 'Grana', phonetic: 'GRAH-nah', translation: 'Money / Cash', formal: 'soldi', category: 'money', formality: 'casual' },
  { id: 'palanche', term: 'Palanche', phonetic: 'pah-LAHN-keh', translation: 'Money', formal: 'soldi', category: 'money', formality: 'casual' },
  { id: 'piotte', term: 'Piotte', phonetic: 'PYOT-teh', translation: 'Money', formal: 'soldi', category: 'money', formality: 'casual', region: 'Rome' },
  { id: 'senza-una-lira', term: 'Senza una lira', phonetic: 'SEHN-tsah OO-nah LEE-rah', translation: 'Broke', formal: 'senza soldi', category: 'money', formality: 'casual' },

  // Dating
  { id: 'moroso', term: 'Moroso/Morosa', phonetic: 'moh-ROH-zoh', translation: 'Boyfriend/Girlfriend', formal: 'fidanzato', category: 'dating', formality: 'casual', region: 'Northern Italy' },
  { id: 'ragazzo', term: 'Ragazzo/Ragazza', phonetic: 'rah-GAHT-tsoh', translation: 'Boyfriend/Girlfriend', formal: 'fidanzato', category: 'dating', formality: 'casual' },
  { id: 'pomiciare', term: 'Pomiciare', phonetic: 'poh-mee-CHAH-reh', translation: 'To make out', formal: 'baciare', category: 'dating', formality: 'casual' },
  { id: 'limonare', term: 'Limonare', phonetic: 'lee-moh-NAH-reh', translation: 'To make out', formal: 'baciare', category: 'dating', formality: 'casual' },
  { id: 'rimorchiare', term: 'Rimorchiare', phonetic: 'ree-mohr-KYAH-reh', translation: 'To pick up / Hit on', formal: 'corteggiare', category: 'dating', formality: 'casual' },

  // Food & Drink
  { id: 'mangiare', term: 'Magna!', phonetic: 'MAHN-yah', translation: 'Eat! (Roman)', formal: 'Mangia', category: 'food', formality: 'casual', region: 'Rome' },
  { id: 'sbronza', term: 'Sbronza', phonetic: 'ZBRON-dzah', translation: 'Getting drunk', formal: 'ubriacatura', category: 'party', formality: 'casual' },
  { id: 'sbornia', term: 'Sbornia', phonetic: 'ZBOR-nyah', translation: 'Drunk / Wasted', formal: 'ubriaco', category: 'party', formality: 'casual' },

  // Expressions
  { id: 'magari', term: 'Magari!', phonetic: 'mah-GAH-ree', translation: 'I wish! / If only!', formal: '-', category: 'expressions', formality: 'casual' },
  { id: 'dai', term: 'Dai!', phonetic: 'DAH-ee', translation: 'Come on! / Please!', formal: 'Per favore', category: 'expressions', formality: 'casual' },
  { id: 'figurati', term: 'Figurati', phonetic: 'fee-GOO-rah-tee', translation: 'Don\'t mention it / No worries', formal: 'Prego', category: 'expressions', formality: 'casual' },
  { id: 'che-palle', term: 'Che palle!', phonetic: 'keh PAH-leh', translation: 'What a pain! (vulgar)', formal: 'Che noia', category: 'expressions', formality: 'crude' },
  { id: 'che-schifo', term: 'Che schifo!', phonetic: 'keh SKEE-foh', translation: 'How disgusting!', formal: '-', category: 'expressions', formality: 'casual' },
  { id: 'basta', term: 'Basta!', phonetic: 'BAH-stah', translation: 'Enough! / Stop it!', formal: '-', category: 'expressions', formality: 'casual' },
  { id: 'in-bocca-al-lupo', term: 'In bocca al lupo', phonetic: 'een BOK-kah ahl LOO-poh', translation: 'Good luck (lit. in the wolf\'s mouth)', formal: 'Buona fortuna', category: 'expressions', formality: 'casual', usage: 'Reply: Crepi! (May it die!)' },
];

export default italianSlang;
