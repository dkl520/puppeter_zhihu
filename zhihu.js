const puppeteer = require('puppeteer');
const fs = require("fs");
const request = require("request");
// const iconv = require('iconv-lite');
// const Model = require("./model/novel.js");
const cookies_str=`_zap=3bc6e8d6-eab3-44ac-8311-79a4b48251f6;
 __DAYU_PP=MnyeNeF2eNnU6VMZuYNF62c5785fba7d; 
__utmv=51854390.100-1|2=registration_date=20150926=1^3=entry_date=20150926=1;
 __utma=51854390.1209622882.1522310615.1523569800.1524145121.5; 
 _xsrf=7GBvLnD8UHcZU2VfthKJdAV4zO9k1fHK;
  d_c0="ADAn48qDJA6PTppAdp9hQ6i-pf5uJGMUYSA=|1535748636";
   z_c0="2|1:0|10:1539951956|4:z_c0|92:Mi4xdlcwaEFnQUFBQUFBTUNmanlv
   TWtEaVlBQUFCZ0FsVk5WQnUzWEFCeThIOEJUNDZFMHVCWVJZVGpPMUtERGpVbTFn|f
   1060e5daca3ba4e9de1796f8c6035edfa5cea9ead5ef8e6a3d9e7c5c055aa17"; 
   tst=r; q_c1=ca8f1c88abf34c7a801b1b923fa67aa2|1543061433000|1517926256000; 
   tgw_l7_route=4860b599c6644634a0abcd4d10d37251`;

async function login() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await addCookies(cookies_str,page,"www.zhihu.com");
     const request_url=`https://www.zhihu.com/people/cheng-shi-xi-ren-6/answers?page=1`;
    await page.goto(request_url, {waitUntil: 'networkidle2'}).catch(err => console.log(err));
    

    // await page.waitFor(1000);

    await page.waitForNavigation({waitUntil:'load'});
    await page.setViewport({width: 1920, height: 5000});
    await page.screenshot({path: 'data/screenshot.png'});
    const title=".ContentItem-title a"
    
    const content_question=".List-item .ContentItem-title a";
    const chapters = await page.$$(content_question);

        console.log(chapters.length)

    const pagenation=".Pagination  Button PaginationButton";
    const pageNum = await page.$$(pagenation);
     console.log(pageNum);


    // for (let i = 0, chapter_k = []; i < chapters.length; i++) {
    //     const chapter = chapters[i];
    //     const content_name = await chapter.getProperty("text");
    //     const url = await chapter.getProperty("href");
    //     console.log(url._remoteObject.value, content_name._remoteObject.value);
          

    //   }
    // console.log(chapters,chapters.length);

};




async function addCookies(cookies_str, page, domain){
    let cookies = cookies_str.split(';').map(pair=>{
        let name = pair.trim().slice(0,pair.trim().indexOf('='))
        let value = pair.trim().slice(pair.trim().indexOf('=')+1)
        return {name,value,domain}

    });
    // console.log(cookies,cookies.length);
    await Promise.all(cookies.map(pair=>{
        return page.setCookie(pair)
    }))
}
login();