
export const config = {
  clientId: process.env.REACT_APP_CLIENT_ID || '',
  stripeKey: process.env.REACT_APP_STRIPE_KEY || '',
  categoryPageSize: 8,
  maxCompareProducts: 4,
  algoliaAppId: process.env.REACT_APP_ALGOLIA_APP_ID || '',
  algoliaApiKey: process.env.REACT_APP_ALGOLIA_API_KEY || '',
  algoliaPlacesAppId: process.env.REACT_APP_ALGOLIA_PLACES_APP_ID || '',
  algoliaPlacesApiKey: process.env.REACT_APP_ALGOLIA_PLACES_API_KEY || '',
  algoliaIndexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME || '',
  compareKeys: process.env.REACT_APP_COMPARE_KEYS?.split(',') || [],
  endpointURL: process.env.REACT_APP_ENDPOINT_URL || 'api.moltin.com',
  b2b: process.env.REACT_APP_B2B_ENABLE || false,
  supportedLocales: process.env.REACT_APP_SUPPORTED_LOCALES?.split(',').map(el => JSON.parse(el)) || [
    {
      "key": "en",
      "name": "english"
    },
    {
      "key": "fr",
      "name": "french"
    }
  ],
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || "en",
  defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY || "GBP",
};
