/**
 * Portuguese Slang & Casual Language
 * Brazilian Portuguese (BR) and European Portuguese (PT) variations
 */

export const portugueseSlang = [
  // Greetings - Brazilian
  { id: 'oi', term: 'Oi', phonetic: 'oy', translation: 'Hi', formal: 'Olá', category: 'greetings', formality: 'casual', region: 'BR' },
  { id: 'e-ai', term: 'E aí?', phonetic: 'ee ah-EE', translation: 'What\'s up?', formal: 'Tudo bem?', category: 'greetings', formality: 'casual', region: 'BR' },
  { id: 'beleza', term: 'Beleza?', phonetic: 'beh-LEH-zah', translation: 'What\'s up? / All good?', formal: 'Tudo bem?', category: 'greetings', formality: 'casual', region: 'BR' },
  { id: 'fala', term: 'Fala!', phonetic: 'FAH-lah', translation: 'Hey! / Speak!', formal: 'Olá', category: 'greetings', formality: 'casual', region: 'BR' },
  { id: 'cara', term: 'Cara', phonetic: 'KAH-rah', translation: 'Dude (lit. face)', formal: 'amigo', category: 'greetings', formality: 'casual', region: 'BR' },
  { id: 'mano', term: 'Mano', phonetic: 'MAH-noo', translation: 'Bro', formal: 'irmão', category: 'greetings', formality: 'casual', region: 'BR' },
  { id: 'parceiro', term: 'Parceiro', phonetic: 'par-SAY-roo', translation: 'Partner / Buddy', formal: 'amigo', category: 'greetings', formality: 'casual', region: 'BR' },
  // Greetings - Portugal
  { id: 'ola-pt', term: 'Olá', phonetic: 'oh-LAH', translation: 'Hello', formal: 'Bom dia', category: 'greetings', formality: 'casual', region: 'PT' },
  { id: 'tudo-bem', term: 'Tudo bem?', phonetic: 'TOO-doo beng', translation: 'How are you?', formal: 'Como está?', category: 'greetings', formality: 'casual', region: 'PT' },
  { id: 'puto', term: 'Puto', phonetic: 'POO-too', translation: 'Dude (PT)', formal: 'rapaz', category: 'greetings', formality: 'casual', region: 'PT', warning: 'Offensive in Brazil!' },
  { id: 'gajo', term: 'Gajo', phonetic: 'GAH-zhoo', translation: 'Guy / Dude (PT)', formal: 'homem', category: 'greetings', formality: 'casual', region: 'PT' },

  // Reactions - Brazilian
  { id: 'legal', term: 'Legal', phonetic: 'leh-GOW', translation: 'Cool / Nice', formal: 'bom', category: 'reactions', formality: 'casual', region: 'BR' },
  { id: 'massa', term: 'Massa', phonetic: 'MAH-sah', translation: 'Awesome / Cool', formal: 'muito bom', category: 'reactions', formality: 'casual', region: 'BR/Northeast' },
  { id: 'daora', term: 'Da hora', phonetic: 'dah OH-rah', translation: 'Cool / Awesome', formal: 'muito bom', category: 'reactions', formality: 'casual', region: 'BR/São Paulo' },
  { id: 'irado', term: 'Irado', phonetic: 'ee-RAH-doo', translation: 'Sick / Awesome', formal: 'incrível', category: 'reactions', formality: 'casual', region: 'BR' },
  { id: 'sinistro', term: 'Sinistro', phonetic: 'see-NEES-troo', translation: 'Sick / Crazy good', formal: 'incrível', category: 'reactions', formality: 'casual', region: 'BR' },
  { id: 'caramba', term: 'Caramba!', phonetic: 'kah-RAHM-bah', translation: 'Wow! / Damn!', formal: '-', category: 'reactions', formality: 'casual', region: 'BR' },
  { id: 'caraca', term: 'Caraca!', phonetic: 'kah-RAH-kah', translation: 'Damn! / Wow!', formal: '-', category: 'reactions', formality: 'casual', region: 'BR' },
  { id: 'nossa', term: 'Nossa!', phonetic: 'NOH-sah', translation: 'OMG! / Wow!', formal: '-', category: 'reactions', formality: 'casual', region: 'BR' },
  { id: 'que-merda', term: 'Que merda!', phonetic: 'kee MEHR-dah', translation: 'What crap! / Shit!', formal: '-', category: 'reactions', formality: 'crude' },
  // Reactions - Portugal  
  { id: 'fixe', term: 'Fixe', phonetic: 'FEESH', translation: 'Cool (PT)', formal: 'bom', category: 'reactions', formality: 'casual', region: 'PT' },
  { id: 'brutal', term: 'Brutal', phonetic: 'broo-TAHL', translation: 'Awesome (PT)', formal: 'excelente', category: 'reactions', formality: 'casual', region: 'PT' },
  { id: 'fogo', term: 'Fogo!', phonetic: 'FOH-goo', translation: 'Damn! (PT)', formal: '-', category: 'reactions', formality: 'casual', region: 'PT' },
  { id: 'ca-brincadeira', term: 'Cá brincadeira!', phonetic: 'kah breen-kah-DAY-rah', translation: 'No way! (PT)', formal: '-', category: 'reactions', formality: 'casual', region: 'PT' },

  // Compliments
  { id: 'gata', term: 'Gata/Gato', phonetic: 'GAH-tah', translation: 'Hot girl/guy (lit. cat)', formal: 'bonita/o', category: 'compliments', formality: 'casual', region: 'BR' },
  { id: 'gatinha', term: 'Gatinha', phonetic: 'gah-CHEEN-yah', translation: 'Cutie / Babe', formal: 'querida', category: 'compliments', formality: 'casual', region: 'BR' },
  { id: 'gostosa', term: 'Gostosa/Gostoso', phonetic: 'gos-TOH-zah', translation: 'Hot / Sexy', formal: 'atraente', category: 'compliments', formality: 'street', region: 'BR' },
  { id: 'bonitona', term: 'Bonitona', phonetic: 'boh-nee-TOH-nah', translation: 'Beautiful woman', formal: 'muito bonita', category: 'compliments', formality: 'casual', region: 'BR' },

  // Money
  { id: 'grana', term: 'Grana', phonetic: 'GRAH-nah', translation: 'Money / Cash', formal: 'dinheiro', category: 'money', formality: 'casual', region: 'BR' },
  { id: 'bufunfa', term: 'Bufunfa', phonetic: 'boo-FOON-fah', translation: 'Money', formal: 'dinheiro', category: 'money', formality: 'casual', region: 'BR' },
  { id: 'tutu', term: 'Tutu', phonetic: 'too-TOO', translation: 'Money', formal: 'dinheiro', category: 'money', formality: 'casual', region: 'BR' },
  { id: 'duro', term: 'Duro', phonetic: 'DOO-roo', translation: 'Broke', formal: 'sem dinheiro', category: 'money', formality: 'casual' },
  { id: 'liso', term: 'Liso', phonetic: 'LEE-zoo', translation: 'Broke (BR)', formal: 'sem dinheiro', category: 'money', formality: 'casual', region: 'BR' },

  // Dating
  { id: 'namorado', term: 'Namorado/a', phonetic: 'nah-moh-RAH-doo', translation: 'Boyfriend/Girlfriend', formal: 'parceiro', category: 'dating', formality: 'casual' },
  { id: 'ficante', term: 'Ficante', phonetic: 'fee-KAHN-chee', translation: 'Hookup / FWB', formal: '-', category: 'dating', formality: 'casual', region: 'BR' },
  { id: 'ficar', term: 'Ficar', phonetic: 'fee-KAR', translation: 'To hook up / Make out', formal: '-', category: 'dating', formality: 'casual', region: 'BR' },
  { id: 'pegar', term: 'Pegar', phonetic: 'peh-GAR', translation: 'To hook up with', formal: '-', category: 'dating', formality: 'casual', region: 'BR' },
  { id: 'chegar', term: 'Chegar em', phonetic: 'sheh-GAR', translation: 'To hit on', formal: 'flertar', category: 'dating', formality: 'casual', region: 'BR' },
  { id: 'curte', term: 'Curtir', phonetic: 'koor-CHEER', translation: 'To like / Be into', formal: 'gostar', category: 'dating', formality: 'casual', region: 'BR' },

  // Party & Drinking
  { id: 'balada', term: 'Balada', phonetic: 'bah-LAH-dah', translation: 'Nightclub / Party', formal: 'festa', category: 'party', formality: 'casual', region: 'BR' },
  { id: 'role', term: 'Rolê', phonetic: 'hoh-LEH', translation: 'Hangout / Night out', formal: 'passeio', category: 'party', formality: 'casual', region: 'BR' },
  { id: 'bebado', term: 'Bêbado', phonetic: 'BEH-bah-doo', translation: 'Drunk', formal: 'embriagado', category: 'party', formality: 'casual' },
  { id: 'chapado', term: 'Chapado', phonetic: 'shah-PAH-doo', translation: 'Wasted / High', formal: '-', category: 'party', formality: 'casual', region: 'BR' },
  { id: 'ressaca', term: 'Ressaca', phonetic: 'heh-SAH-kah', translation: 'Hangover', formal: '-', category: 'party', formality: 'casual' },

  // Expressions
  { id: 'falou', term: 'Falou', phonetic: 'fah-LOH', translation: 'Deal / See ya / Okay', formal: 'Combinado', category: 'expressions', formality: 'casual', region: 'BR' },
  { id: 'valeu', term: 'Valeu', phonetic: 'vah-LEH-oo', translation: 'Thanks / Cheers', formal: 'Obrigado', category: 'expressions', formality: 'casual', region: 'BR' },
  { id: 'deixa-disso', term: 'Deixa disso', phonetic: 'DAY-shah DEE-soo', translation: 'Forget about it', formal: 'Não se preocupe', category: 'expressions', formality: 'casual', region: 'BR' },
  { id: 'to-nem-ai', term: 'Tô nem aí', phonetic: 'toh neng ah-EE', translation: 'I don\'t care', formal: 'Não me importo', category: 'expressions', formality: 'casual', region: 'BR' },
  { id: 'pois-e', term: 'Pois é', phonetic: 'poyz EH', translation: 'Yeah / I know right', formal: '-', category: 'expressions', formality: 'casual' },
  { id: 'ta-ligado', term: 'Tá ligado?', phonetic: 'tah lee-GAH-doo', translation: 'You know? / Get it?', formal: 'Entende?', category: 'expressions', formality: 'casual', region: 'BR' },
];

export default portugueseSlang;
