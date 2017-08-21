var express = require('express');
var router = express.Router();
const http = require('http');


router.get('/:index/:query', function(req, res, next) {
  result = fastAPIQuery(req.params.query, req.params.index, (err, data) => {
    if (err || !data) {
      console.log(err)
      return next(err)
    }

    const values = [] 
    data.forEach(element => {
      if (!values.includes(element.auth)){
          values.push(element.auth)
        }
    })
    res.json({'names': values})
  })
});

function fastAPIQuery (query, queryIndex, callback) {
  query = query.replace(/[^a-zA-Z\d\s]/g, '')
  console.log(query)
  const suggestReturn = queryIndex + "%2Cidroot%2Cauth";
  let qres = "&query=" + query + "&queryIndex=" + queryIndex + "&queryReturn=" + suggestReturn;
  qres += "&suggest=autoSubject&rows=20";
  const url = 'http://fast.oclc.org/searchfast/fastsuggest?' + qres;
  
  let buffer = "";
  const req = http.get(url, (res) => {
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      buffer += chunk
    });

    res.on('end', () => {
      const data = JSON.parse(buffer);
      callback(null, data.response.docs)
    })
  })
  req.on('error', (err) => {
    callback(err);
  })
}

module.exports = router;