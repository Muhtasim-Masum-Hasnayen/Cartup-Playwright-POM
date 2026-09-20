require('dotenv').config();

module.exports = {
  baseURL: 'https://cartup.com',

  searchTerms: {
    shoes: 'Shoes for men',
    shirts: 'Formal shirt for men'
  },

  credentials: {
    email: process.env.CARTUP_EMAIL || '',
    phone: process.env.CARTUP_PHONE || '',
    password: process.env.CARTUP_PASSWORD || 'Cartup@12345'
  },

  useExistingAccount: process.env.USE_EXISTING_ACCOUNT === 'true',

  actionDelay: Number(process.env.ACTION_DELAY_MS || 700),

  // We intentionally use products that are currently visible on Cartup.
  // The test still searches first and selects products from the result page.
  expectedMinimumShirtResults: 2
};
