'use strict';

var request = require('request');
var fs = require("fs");
var cheerio = require('cheerio');
var totalPages = 23;
var pageAddress = 'http://thepolymathproject.com/blog/page/';
var pageRequests = [];
for (var i = 0; i < totalPages; i++) {
    var url = pageAddress + i;
    pageRequests.push(url);
}

pageRequests.forEach(function (val, ind) {
    request(val, function (err, response, body) {
        if (err) {
            console.log('error occured: ' + err);
            return err;
        }

        var $ = cheerio.load(body);
        $('article').each(function (index, element) {

            /* fs.writeFile($(element).find('.entry-title').text() + '.html', $(element).html(), (err) => {
                if (err) {
                    throw err;
                }
                console.log('Saved!')
            }); */
            var title = $(element).find('.entry-title').text();
            title = title.replace('/', ' ');
            console.log('page: ' + ind + ' blog no: ' + index + ' blog title:  ' + title);
            try {
                fs.writeFileSync('blogs/' + title + ' ' + ind + '_' + index + '_.html', buildHtml(title, $(element).html()));
            } catch (err) {
                // An error occurred
                console.error(err);
            }
        });
    });
});

var buildHtml = function buildHtml(header, body) {
    return '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};