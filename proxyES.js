var express = require('express');
var http = require('http');
var apiProxy = require('http-proxy').createProxyServer();
var serverES = 'http://localhost:9200';

var app = express();

app.get('/*',function(req, res){
  apiProxy.web(req, res, {target: serverES});

})


var match = function(){
  if (data.search('"match_all":{}') >= 0) {
    data = data.replace('"match_all":{}', '"term":{"user.keyword": "Raksha"}');
  } else if ((data.search('"query":\'[a-zA-Z*0-9]\'') >= 0) || (data.search('"query":"[a-zA-Z*]"') >= 0)) {
    data = data.replace('"query":\'[a-zA-Z*0-9]\'', '"query":\'userInformation.username: Raksha\'}');
    data = data.replace('"query":"[a-zA-Z*]"', '"query":"userInformation.username:Raksha"');
  }else if((data.search('{"simple_query_string":{"query":"') >= 0) && (data.search('],') >= 0)){
    data = data.replace('{"simple_query_string":{"query":"', '{"simple_query_string":{"query":"Raksha+');
    data = data.replace('],',',"user.keyword"],');
  }
  return data;
}
var path='';
var data = "";
app.post('/*', function (req, res) {
  path = req.url;

    req.on('data', function (chunk) {

      data += chunk.toString();

      /*if(req.originalUrl.search('_msearch') >= 0){
        match();
      }
      if (req.url.search('.kibana') >= 0 && (req.originalUrl.search('visualization/_search') >= 0 ) && req.originalUrl.search('config') < 0) {

        match();
      }

      if (req.url.search('.kibana') >= 0 && (req.originalUrl.search('op_type=create') >= 0) && req.originalUrl.search('config') < 0) {

        if (data.search('"{') >= 0) {
          data = data.replace('{', '{"user": "Raksha",');

        }
      }
*/

      req.body = data;
      if(req.originalUrl.search('config') < 0){
        console.log(req.url);
        console.log(data);
      }


      //console.log(body);
    }).on('end', function () {
         call();
         //data="";

    })


var call = function() {
      var headers = {
        'content-type': 'application/json; charset=utf-8'

      };
      headers.host = 'localhost:9200';

      //if()
 /* var options = {
    host: 'localhost',
    port: 9200,
    path: req.url,
    method: 'POST',
    headers: headers,
    'content-type': 'application/json',
    host: 'localhost:9200',
    'content-length': '77',
    connection: 'keep-alive'

  };*/
  var options = {
    host: 'localhost',
    port: 9200,
    path: req.url,
    method: 'POST',
    headers: headers,
    connection: 'keep-alive'

  };
  //console.log(req.headers);

  var httpreq = http.request(options, function (response) {
    var resData = '';
    response.setEncoding('utf8');
    response.on('data', function (chunk) {

       resData += chunk;
      //res.send(JSON.parse(chunk));
      if(req.originalUrl.search('config') < 0)
      console.log("body: " + chunk);

    });
    response.on('end', function () {
      if(response){
        res.send(response);
      }else{
        res.send("Hello");
      }
      
    })
  });
  httpreq.write(data);
  httpreq.end();
  data = "";

  //return response;
}

});

app.listen(process.env.PORT||3000);
console.log('Server running at port :3000');
