var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

var totalResult = 0;
var corpos = {};
var resultDownloaded = 0;

function callback(){
    resultDownloaded++;
    if(resultDownloaded != totalResult){
        return ;
    }

    var word = [];
    for(prop in corpos){
        word.push({
            word:prop,
            count:corpos[prop]
        });
    }
    word.sort(function(a,b){
        return b.count - a.count;
    });

    console.log(word.slice(0,20));
}

app.get('/getScrape',function(req,res){
var url = "https://www.google.com/search?q=data+mining";
request(url,function(err,response,body){
    if(err){
        console.log('Couldnt get the content');
        return ;
    }

    var $ = cheerio.load(body);
    var links = $('.r a');

    links.each(function(i,link){
        var url = $(link).attr('href');
        url = url.replace("/url?q=","").split("&")[0];
        if(url.charAt(0)==="/"){
            return ;
        }
        totalResult++;
        request(url,function(error,response,body){
            if(error){
                console.log("Couldn’t get page because of error: " + error);
                return;
            }

            var $page = cheerio.load(body);
            text = $page("body").text();

            text = text.replace(/\s+/g," ").replace(/[^a-zA-Z ]/g,"").toLowerCase();
            console.log(text);
            text.split(" ").forEach(function(word){
                if(word.length<4 || word.length>20){
                    return;
                }

                if(corpos[word]){
                    corpos[word]++;
                }else{
                    corpos[word] = 1;
                }
            }); 
            callback();
        });
    });
});
});
app.listen(3008,function(){
    console.log('server running on 3008');
});
