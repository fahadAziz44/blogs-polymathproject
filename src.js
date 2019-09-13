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

pageRequests.forEach((val, ind) => {
    request(val, (err, response, body) => {
        if(err) {
            console.log(`error occured: ${err}`)
            return err;
        }
    
        let $ = cheerio.load(body)
        $('article').each(function(index, element) {
            
            /* fs.writeFile($(element).find('.entry-title').text() + '.html', $(element).html(), (err) => {
                if (err) {
                    throw err;
                }
                console.log('Saved!')
            }); */
            let title = $(element).find('.entry-title').text();
            title = title.replace(/[^a-z0-9]/gi, '_');
            console.log(`page: ${ind} blog no: ${index} blog title:  ${title}`);
            try {
                fs.writeFileSync(`blogs/${ind}_${index}_${title}.html`, buildHtml(title, $(element).html()));
              } catch(err) {
                // An error occurred
                console.error(err);
              }
        });
            
    });
})


const buildHtml = (header, body) =>  {
  return '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};



