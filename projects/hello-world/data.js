const LANGUAGE_CODES = {
  english: 'en-US',
  french: 'fr-FR',
  serbian: "sy-Cryl-rs",
  arabic: 'ar-SY'
}

class CountryData {
  constructor(path, flag, alt, title) {
    this.path = path;
    this.flag = flag;
    this.alt = alt;
    this.title = title;
  }
}

module.exports = {
  CountryData,
  LANGUAGE_CODES
}