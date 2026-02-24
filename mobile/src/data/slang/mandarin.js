/**
 * Mandarin Chinese Slang & Casual Language
 * Internet slang, youth speak, regional expressions
 */

export const mandarinSlang = [
  // Greetings
  { id: 'ni-hao', term: '你好', phonetic: 'nǐ hǎo', translation: 'Hello', formal: '您好', category: 'greetings', formality: 'casual' },
  { id: 'hai', term: '嗨', phonetic: 'hāi', translation: 'Hi', formal: '你好', category: 'greetings', formality: 'casual', usage: 'From English "hi"' },
  { id: 'zui-jin-zen-me-yang', term: '最近怎么样', phonetic: 'zuìjìn zěnme yàng', translation: 'How\'ve you been?', formal: '您近来如何', category: 'greetings', formality: 'casual' },
  { id: 'ge-men', term: '哥们', phonetic: 'gē men', translation: 'Bro / Buddy (male)', formal: '朋友', category: 'greetings', formality: 'casual' },
  { id: 'xiao-jie-jie', term: '小姐姐', phonetic: 'xiǎo jiějiě', translation: 'Miss / Cutie (to young woman)', formal: '女士', category: 'greetings', formality: 'casual' },
  { id: 'xiao-ge-ge', term: '小哥哥', phonetic: 'xiǎo gēgē', translation: 'Handsome guy', formal: '先生', category: 'greetings', formality: 'casual' },
  { id: 'lao-tie', term: '老铁', phonetic: 'lǎo tiě', translation: 'Bro / Close friend (lit. old iron)', formal: '好朋友', category: 'greetings', formality: 'casual', usage: 'Internet/gaming slang' },

  // Reactions
  { id: 'niu', term: '牛', phonetic: 'niú', translation: 'Awesome (lit. cow/bull)', formal: '厉害', category: 'reactions', formality: 'casual', example: { mandarin: '太牛了！', english: 'So awesome!' } },
  { id: 'niubi', term: '牛逼', phonetic: 'niú bī', translation: 'Fucking awesome', formal: '非常厉害', category: 'reactions', formality: 'crude', usage: 'Very common despite vulgarity' },
  { id: 'shuai', term: '帅', phonetic: 'shuài', translation: 'Cool / Handsome', formal: '帅气', category: 'reactions', formality: 'casual' },
  { id: 'ku', term: '酷', phonetic: 'kù', translation: 'Cool', formal: '很棒', category: 'reactions', formality: 'casual' },
  { id: 'diao', term: '屌', phonetic: 'diǎo', translation: 'Sick / Badass', formal: '厉害', category: 'reactions', formality: 'crude' },
  { id: 'kao', term: '靠', phonetic: 'kào', translation: 'Damn / WTF', formal: '-', category: 'reactions', formality: 'crude', usage: 'Milder than actual swear' },
  { id: 'wo-qu', term: '我去', phonetic: 'wǒ qù', translation: 'WTF / Holy shit', formal: '-', category: 'reactions', formality: 'casual', usage: 'Euphemism for vulgar expression' },
  { id: 'wo-cao', term: '我操', phonetic: 'wǒ cào', translation: 'Fuck / Holy shit', formal: '-', category: 'reactions', formality: 'crude' },
  { id: 'ai-ya', term: '哎呀', phonetic: 'āi yā', translation: 'Oh my / Geez', formal: '-', category: 'reactions', formality: 'casual' },
  { id: 'bu-cuo', term: '不错', phonetic: 'bù cuò', translation: 'Not bad / Pretty good', formal: '很好', category: 'reactions', formality: 'casual' },
  { id: 'qi-si', term: '气死', phonetic: 'qì sǐ', translation: 'So angry / Pissed off', formal: '非常生气', category: 'reactions', formality: 'casual' },

  // Internet Slang (网络用语)
  { id: '666', term: '666', phonetic: 'liù liù liù', translation: 'Awesome / Smooth (gaming)', formal: '厉害', category: 'internet', formality: 'casual', usage: 'Like "nice" in gaming' },
  { id: '233', term: '233', phonetic: 'èr sān sān', translation: 'LOL (from Mop forum emoji)', formal: '哈哈', category: 'internet', formality: 'casual' },
  { id: 'haha', term: '哈哈哈', phonetic: 'hā hā hā', translation: 'Hahaha', formal: '-', category: 'internet', formality: 'casual' },
  { id: 'yyds', term: 'YYDS/永远的神', phonetic: 'yǒng yuǎn de shén', translation: 'GOAT / The GOAT', formal: '最棒的', category: 'internet', formality: 'casual', usage: 'Eternal God - highest praise' },
  { id: 'emo', term: 'EMO', phonetic: 'emo', translation: 'Sad / Depressed', formal: '情绪低落', category: 'internet', formality: 'casual' },
  { id: 'jiayou', term: '加油', phonetic: 'jiā yóu', translation: 'Keep going / You got this', formal: '加油', category: 'internet', formality: 'casual' },
  { id: 'awsl', term: 'AWSL/啊我死了', phonetic: 'a wǒ sǐ le', translation: 'OMG so cute I\'m dying', formal: '-', category: 'internet', formality: 'casual' },
  { id: 'xswl', term: 'XSWL/笑死我了', phonetic: 'xiào sǐ wǒ le', translation: 'LMAO / Dying of laughter', formal: '-', category: 'internet', formality: 'casual' },
  { id: 'zqsg', term: 'ZQSG/真情实感', phonetic: 'zhēn qíng shí gǎn', translation: 'Genuine feelings', formal: '真诚', category: 'internet', formality: 'casual' },
  { id: 'dbq', term: 'DBQ/对不起', phonetic: 'duì bu qǐ', translation: 'Sorry', formal: '抱歉', category: 'internet', formality: 'casual' },

  // Compliments
  { id: 'piao-liang', term: '漂亮', phonetic: 'piào liang', translation: 'Beautiful / Pretty', formal: '美丽', category: 'compliments', formality: 'casual' },
  { id: 'ke-ai', term: '可爱', phonetic: 'kě ài', translation: 'Cute', formal: '可爱', category: 'compliments', formality: 'casual' },
  { id: 'meng', term: '萌', phonetic: 'méng', translation: 'Cute / Adorable', formal: '可爱', category: 'compliments', formality: 'casual', usage: 'From Japanese "moe"' },
  { id: 'sao', term: '骚', phonetic: 'sāo', translation: 'Flashy / Show-off (can be positive)', formal: '-', category: 'compliments', formality: 'casual' },
  { id: 'gao-fu-shuai', term: '高富帅', phonetic: 'gāo fù shuài', translation: 'Tall, rich, handsome', formal: '-', category: 'compliments', formality: 'casual' },
  { id: 'bai-fu-mei', term: '白富美', phonetic: 'bái fù měi', translation: 'Fair, rich, beautiful', formal: '-', category: 'compliments', formality: 'casual' },

  // Money
  { id: 'qian', term: '钱', phonetic: 'qián', translation: 'Money', formal: '金钱', category: 'money', formality: 'casual' },
  { id: 'kuai', term: '块', phonetic: 'kuài', translation: 'Yuan (colloquial)', formal: '元', category: 'money', formality: 'casual' },
  { id: 'mei-qian', term: '没钱', phonetic: 'méi qián', translation: 'No money / Broke', formal: '没有钱', category: 'money', formality: 'casual' },
  { id: 'tu-hao', term: '土豪', phonetic: 'tǔ háo', translation: 'Rich person / Nouveau riche', formal: '富人', category: 'money', formality: 'casual' },

  // Dating
  { id: 'nan-peng-you', term: '男朋友', phonetic: 'nán péng yǒu', translation: 'Boyfriend', formal: '男朋友', category: 'dating', formality: 'casual' },
  { id: 'nv-peng-you', term: '女朋友', phonetic: 'nǚ péng yǒu', translation: 'Girlfriend', formal: '女朋友', category: 'dating', formality: 'casual' },
  { id: 'dan-shen-gou', term: '单身狗', phonetic: 'dān shēn gǒu', translation: 'Single person (self-deprecating)', formal: '单身', category: 'dating', formality: 'casual', usage: 'Single dog - humorous' },
  { id: 'sa-gou-liang', term: '撒狗粮', phonetic: 'sā gǒu liáng', translation: 'PDA / Show off relationship', formal: '-', category: 'dating', formality: 'casual' },
  { id: 'chi-cu', term: '吃醋', phonetic: 'chī cù', translation: 'Jealous (in relationships)', formal: '嫉妒', category: 'dating', formality: 'casual' },

  // Expressions
  { id: 'mei-guan-xi', term: '没关系', phonetic: 'méi guān xi', translation: 'No problem / It\'s okay', formal: '没关系', category: 'expressions', formality: 'casual' },
  { id: 'sui-bian', term: '随便', phonetic: 'suí biàn', translation: 'Whatever / Up to you', formal: '随意', category: 'expressions', formality: 'casual' },
  { id: 'wu-liao', term: '无聊', phonetic: 'wú liáo', translation: 'Boring / Bored', formal: '无聊', category: 'expressions', formality: 'casual' },
  { id: 'ma-fan', term: '麻烦', phonetic: 'má fan', translation: 'Troublesome / Annoying', formal: '麻烦', category: 'expressions', formality: 'casual' },
  { id: 'suan-le', term: '算了', phonetic: 'suàn le', translation: 'Forget it / Never mind', formal: '不用了', category: 'expressions', formality: 'casual' },
  { id: 'xing', term: '行', phonetic: 'xíng', translation: 'Okay / Sure', formal: '好的', category: 'expressions', formality: 'casual' },
];

export default mandarinSlang;
