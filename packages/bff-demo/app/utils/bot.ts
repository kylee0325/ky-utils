const BOTS = [
    '\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/',
    'googlebot',
    'baiduspider',
    'gurujibot',
    'yandexbot',
    'slurp',
    'msnbot',
    'bingbot',
    'facebookexternalhit',
    'linkedinbot',
    'twitterbot',
    'slackbot',
    'telegrambot',
    'applebot',
    'pingdom',
    'tumblr ',
    '360spider',
    'sosospider',
    'yahoo',
    'sogou web spider',
    'sogou pic spider',
    'youdaobot',
    'yisouspider',
];

const isBot = (userAgent) => {
    const IS_BOT_REGEXP = new RegExp('^.*(' + BOTS.join('|') + ').*$');

    let source = userAgent || '';

    if (typeof source === 'undefined') {
        source = 'unknown';
    }

    const isBot = IS_BOT_REGEXP.exec(source.toLowerCase());

    return isBot ? isBot[1] : false;
};

export default {
    isBot,
};
