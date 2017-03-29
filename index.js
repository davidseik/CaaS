const express = require('express');
const app = express();
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const componentsFolder = path.join(__dirname, 'components');

const sha1Resources = {
  marketing: {
    js: null,
    css: 'https://s3-us-west-1.amazonaws.com/caas-project/7e9f47e7943ca2b6f21df51e48b1580fbe005a9f.css',
  },
  consumer: {
    js: null,
    css: 'https://s3-us-west-1.amazonaws.com/caas-project/95db8e889d18249a21ea2e7a690c31f8e1823b93.css',
  },
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/:component/:type', function(req, res) {
  const component = req.params.component;
  const type = req.params.type;
  const templatePath = path.join(
    __dirname,
    'components',
    component,
    type,
    'template.hbs'
  );
  fs.readFile(templatePath, 'utf8', (err, templateData) => {
    if (err) {
      console.log(err);
    }
    const locale = req.query.locale || 'en';
    const localePath = path.join(
      __dirname,
      'locales',
      locale,
      component,
      type,
      'content.json'
    );
    const content = require(localePath);
    const template = Handlebars.compile(templateData);
    const html = template(content);
    res.send({
      html: html,
      js: null,
      css: sha1Resources[type].css,
    });
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port http://localhost:3000');
});
