/**
 * Arabic Slang & Casual Language
 * Levantine (Lebanese/Syrian), Egyptian, Gulf variations
 */

export const arabicSlang = [
  // Greetings - General
  { id: 'marhaba', term: 'مرحبا', phonetic: 'mar-HA-ba', translation: 'Hi', formal: 'السلام عليكم', category: 'greetings', formality: 'casual' },
  { id: 'kifak', term: 'كيفك', phonetic: 'KEE-fak', translation: 'How are you?', formal: 'كيف حالك', category: 'greetings', formality: 'casual', region: 'Levantine' },
  { id: 'shlonak', term: 'شلونك', phonetic: 'shlo-NAK', translation: 'How are you?', formal: 'كيف حالك', category: 'greetings', formality: 'casual', region: 'Gulf' },
  { id: 'ezayak', term: 'ازيك', phonetic: 'ez-ZAY-yak', translation: 'How are you?', formal: 'كيف حالك', category: 'greetings', formality: 'casual', region: 'Egyptian' },
  { id: 'habibi', term: 'حبيبي', phonetic: 'ha-BEE-bee', translation: 'My love / Bro / Dude', formal: 'صديقي', category: 'greetings', formality: 'casual', usage: 'Very versatile term of endearment' },
  { id: 'habibti', term: 'حبيبتي', phonetic: 'ha-BEEB-tee', translation: 'My love (to female)', formal: 'صديقتي', category: 'greetings', formality: 'casual' },
  { id: 'ya-zalame', term: 'يا زلمة', phonetic: 'ya ZAH-la-meh', translation: 'Dude / Man', formal: 'يا رجل', category: 'greetings', formality: 'casual', region: 'Levantine' },
  { id: 'ya-rayal', term: 'يا ريال', phonetic: 'ya re-YAAL', translation: 'Dude (Gulf)', formal: 'يا رجل', category: 'greetings', formality: 'casual', region: 'Gulf' },
  { id: 'ya-basha', term: 'يا باشا', phonetic: 'ya BA-sha', translation: 'Boss / Dude', formal: 'سيدي', category: 'greetings', formality: 'casual', region: 'Egyptian' },

  // Reactions
  { id: 'wallah', term: 'والله', phonetic: 'WAL-lah', translation: 'I swear / Really / Seriously', formal: 'حقاً', category: 'reactions', formality: 'casual', usage: 'Extremely common intensifier' },
  { id: 'yalla', term: 'يلا', phonetic: 'YAL-la', translation: 'Let\'s go / Come on / Hurry', formal: 'هيا', category: 'reactions', formality: 'casual' },
  { id: 'inshallah', term: 'إن شاء الله', phonetic: 'in-SHA-allah', translation: 'God willing / Hopefully', formal: 'إن شاء الله', category: 'reactions', formality: 'casual', usage: 'Also used to deflect requests' },
  { id: 'mashallah', term: 'ما شاء الله', phonetic: 'ma-SHA-allah', translation: 'Amazing / Wow (God has willed)', formal: 'رائع', category: 'reactions', formality: 'casual' },
  { id: 'ya-salam', term: 'يا سلام', phonetic: 'ya sa-LAAM', translation: 'Wow / Oh my!', formal: 'رائع', category: 'reactions', formality: 'casual' },
  { id: 'aywah', term: 'أيوه', phonetic: 'AY-wa', translation: 'Yeah / Yes', formal: 'نعم', category: 'reactions', formality: 'casual', region: 'Egyptian' },
  { id: 'eh', term: 'ايه', phonetic: 'eh', translation: 'Yes (Levantine)', formal: 'نعم', category: 'reactions', formality: 'casual', region: 'Levantine' },
  { id: 'khara', term: 'خرا', phonetic: 'KHA-ra', translation: 'Shit / Crap', formal: '-', category: 'reactions', formality: 'crude' },
  { id: 'ya-khsara', term: 'يا خسارة', phonetic: 'ya kha-SA-ra', translation: 'What a shame / Bummer', formal: 'يا للأسف', category: 'reactions', formality: 'casual' },
  { id: 'ahbal', term: 'أحبل', phonetic: 'AH-bal', translation: 'Idiot / Stupid', formal: 'غبي', category: 'insults', formality: 'casual', region: 'Levantine' },

  // Compliments
  { id: 'helwe', term: 'حلوة', phonetic: 'HIL-weh', translation: 'Sweet / Beautiful (f)', formal: 'جميلة', category: 'compliments', formality: 'casual' },
  { id: 'helou', term: 'حلو', phonetic: 'HI-lou', translation: 'Sweet / Handsome (m)', formal: 'وسيم', category: 'compliments', formality: 'casual' },
  { id: 'zay-el-asal', term: 'زي العسل', phonetic: 'zay el A-sal', translation: 'Sweet as honey', formal: 'لطيف', category: 'compliments', formality: 'casual', region: 'Egyptian' },
  { id: 'inta-amar', term: 'إنت قمر', phonetic: 'in-ta A-mar', translation: 'You\'re gorgeous (lit. you\'re the moon)', formal: 'أنت جميل', category: 'compliments', formality: 'casual' },
  { id: 'mish-tabi3i', term: 'مش طبيعي', phonetic: 'mish ta-BEE-ee', translation: 'Unreal / Incredible', formal: 'رائع', category: 'compliments', formality: 'casual', region: 'Levantine' },

  // Money
  { id: 'masari', term: 'مصاري', phonetic: 'ma-SA-ree', translation: 'Money', formal: 'مال', category: 'money', formality: 'casual', region: 'Levantine' },
  { id: 'fulus', term: 'فلوس', phonetic: 'fu-LOOS', translation: 'Money', formal: 'مال', category: 'money', formality: 'casual', region: 'Egyptian/Gulf' },
  { id: 'mafloosh', term: 'مفلوش', phonetic: 'maf-LOOSH', translation: 'Broke', formal: 'بدون مال', category: 'money', formality: 'casual' },

  // Dating
  { id: 'saheb', term: 'صاحب/صاحبة', phonetic: 'SA-heb', translation: 'Boyfriend/Girlfriend', formal: 'حبيب', category: 'dating', formality: 'casual' },
  { id: 'bihebak', term: 'بحبك', phonetic: 'b-HIB-bak', translation: 'I love you', formal: 'أحبك', category: 'dating', formality: 'casual' },
  { id: 'aam-yeghazel', term: 'عم يغازل', phonetic: 'aam yi-GHA-zel', translation: 'Flirting', formal: 'يتودد', category: 'dating', formality: 'casual', region: 'Levantine' },
  { id: 'biyitmayyal', term: 'بيتميل', phonetic: 'bi-yit-MAY-yal', translation: 'Hitting on', formal: '-', category: 'dating', formality: 'casual', region: 'Egyptian' },

  // Party & Food
  { id: 'hafle', term: 'حفلة', phonetic: 'HAF-leh', translation: 'Party', formal: 'حفلة', category: 'party', formality: 'casual' },
  { id: 'sakran', term: 'سكران', phonetic: 'sak-RAAN', translation: 'Drunk', formal: 'ثمل', category: 'party', formality: 'casual' },
  { id: 'jou3an', term: 'جوعان', phonetic: 'joo-AAN', translation: 'Hungry', formal: 'جائع', category: 'food', formality: 'casual' },
  { id: 'akalet', term: 'أكلت', phonetic: 'a-KAL-et', translation: 'I ate', formal: 'تناولت', category: 'food', formality: 'casual' },
  { id: 'tawel-balak', term: 'طول بالك', phonetic: 'TAW-wel BA-lak', translation: 'Relax / Take it easy', formal: 'اهدأ', category: 'expressions', formality: 'casual' },

  // Expressions
  { id: 'bass', term: 'بس', phonetic: 'bass', translation: 'But / Just / Enough', formal: 'لكن', category: 'expressions', formality: 'casual' },
  { id: 'khalas', term: 'خلاص', phonetic: 'kha-LAAS', translation: 'Done / Enough / That\'s it', formal: 'انتهى', category: 'expressions', formality: 'casual' },
  { id: 'mish-mushkele', term: 'مش مشكلة', phonetic: 'mish mush-KI-leh', translation: 'No problem', formal: 'لا مشكلة', category: 'expressions', formality: 'casual' },
  { id: 'akeed', term: 'أكيد', phonetic: 'a-KEED', translation: 'Sure / Of course', formal: 'بالتأكيد', category: 'expressions', formality: 'casual' },
  { id: 'mashi', term: 'ماشي', phonetic: 'MA-shee', translation: 'Okay / Fine', formal: 'حسناً', category: 'expressions', formality: 'casual', region: 'Egyptian' },
  { id: 'tamam', term: 'تمام', phonetic: 'ta-MAAM', translation: 'Perfect / Okay', formal: 'ممتاز', category: 'expressions', formality: 'casual' },
  { id: 'mabrook', term: 'مبروك', phonetic: 'mab-ROOK', translation: 'Congratulations', formal: 'تهانينا', category: 'expressions', formality: 'casual' },
  { id: 'ya-reit', term: 'يا ريت', phonetic: 'ya REIT', translation: 'I wish / If only', formal: 'أتمنى', category: 'expressions', formality: 'casual' },
];

export default arabicSlang;
