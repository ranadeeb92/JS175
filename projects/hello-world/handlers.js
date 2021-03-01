const {LANGUAGE_CODES} = require('./data');

const helloWorld = (data) => {
  return (req, res, next) => {
    const language = req.params.language;
    const languageCode = LANGUAGE_CODES[language];
    if(!languageCode) {
      // res.status(404).send(`Language not supported: ${language}`);
      next(new Error(`Language not supported: ${language}`));
    }
    res.render(`hello-world-${language}`, {
      countries : data,
      currentPath : req.path,
      language : languageCode
    });
  }
}

module.exports = {
  helloWorld
}