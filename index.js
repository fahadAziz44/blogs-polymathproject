const request = require('request');
var fs = require("fs");
let cheerio = require('cheerio')
let totalPages = 23
let pageAddress = 'http://thepolymathproject.com/blog/page/'
let pageRequests = []
for(let i = 0; i < totalPages; i++) {
    let url = pageAddress + i
    pageRequests.push(url)
}

const callbk = async(error, response, body) => {
    if(err) {
        console.log(`error occured: ${err}`)
        return err;
    }

    let $ = cheerio.load(body)
    var companiesList = [];
    
    // For each .item, we add all the structure of a company to the companiesList array
    // Don't try to understand what follows because we will do it differently.
    $('article').each(function(index, element){
        /*
            companiesList[index] = {};
            var header = $(element).find('.header');
            companiesList[index]['name'] = $(header).find('[itemprop=name]').text();
            companiesList[index]['description'] = $(header).find('[rel=description]').text();
            companiesList[index]['url'] = $(header).find('.header [itemprop=name] a').getAttribute('href');
            var contact = $(element).find('.contact');
            companiesList[index]['contact'] = {};
            companiesList[index]['contact']['telephone'] = $(contact).find('[itemprop=telephone]').text();
            companiesList[index]['contact']['employee'] = {};
            companiesList[index]['contact']['employee']['name'] = $(contact).find('[itemprop=employeeName]').text();
            companiesList[index]['contact']['employee']['jobTitle'] = $(contact).find('[itemprop=employeeJobTitle]').text();
            companiesList[index]['contact']['employee']['email'] = $(contact).find('[itemprop=email]').text();
        */

        console.log(`$(element).find('.entry-title') ${$(element).find('.entry-title')}`)

       fs.writeFile($(element).find('.entry-title') + '.html', $(element).html(), (err) => {
            if (err) {
                throw err;
            }
            console.log('Saved!')
        });
    });
        
}
/* pageRequests.forEach((val, ind) => {
    request(val, callbk);
}) */


request('http://thepolymathproject.com/blog/page/0', callbk);



