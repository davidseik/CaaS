// fetch('http://localhost:3000/api/header/consumer')
//   .then(response => response.json())
//   .then(response => console.log(response));
var module = (function() {
  var api = 'http://localhost:3000/api/header/marketing?locale=es';

  function addCss(url) {
    var head = document.head;
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
  }

  function appendTemplate(html) {
    var mountPoint = document.getElementById('app');
    mountPoint.innerHTML = html;
  }

  function init() {
    fetch(api).then(response => response.json()).then(response => {
      addCss(response.css);
      appendTemplate(response.html);
    });
  }
  return {
    init: init,
  };
})();

module.init();
