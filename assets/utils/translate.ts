const default_locale = 'fr';

export default (key: string, parameters: any = {}, domain: string = 'messages', locale = default_locale) => {
  return key;
//   const message = catalogs?.[locale.toLowerCase()]?.[domain.toLowerCase()]?.[key];
//   if (!message) return key;
//   return new IntlMessageFormat(message, locale).format(parameters);
};