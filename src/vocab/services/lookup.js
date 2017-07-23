import detectLanguage from './detect-language.js';
import yandexDefine from './yandex-dictionary.js';
import yandexTranslate from './yandex-translate.js';
import wordsApiDefine from './words-api.js';


const load = (word, lang, targetLang) => {
  const request = (lang == 'en' && targetLang == 'en') ?
    wordsApiDefine(word).catch(() => yandexDefine(word, lang, targetLang)) :
    yandexDefine(word, lang, targetLang);

  return request.catch(() => yandexTranslate(word, lang, targetLang));
}

export function lookup(word, lang, targetLang='en') {
  return load(word, lang, targetLang);
}

export function detectLookup(word, context, targetLang='en') {
  return detectLanguage(context)
    .then(lang => load(word, lang, targetLang).then(data => ({ lang: lang, data })));
}
