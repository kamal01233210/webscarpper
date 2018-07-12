/*var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var app = express();


app.get('/getscrape',function(req,res){
    url = 'https://www.imdb.com/title/tt1229340/';
    request(url,function(error,response,html){
    	if(!error){
    		var $ = cheerio.load(html);
    		var title,release,rating;
    		var json = {time:"",title:"",rating:"",release:""};
    		var today = new Date();
    		$('.title_wrapper').filter(function(){
    			var data = $(this);
    			title = data.children().first().text();
    			release = data.children().find("#titleYear").text();

    			json.title = title;
    			json.release = release;
    		});
    		$('.ratingValue').filter(function(){
                var data = $(this);               

                rating = data.children().first().text();
                json.rating = rating;
            });
            json.time=today;
    	}

    	fs.appendFile('output.json',JSON.stringify(json,null,4),function(err){
    		console.log('Successfull');
    	});
    	res.send('check your console');
    });

});


app.listen("3008",function(){
	console.log("server running on port 3008");
});*/
