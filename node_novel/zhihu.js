const puppeteer = require('puppeteer');
const fs = require("fs");
const request = require("request");
const cookie_str="_zap=3bc6e8d6-eab3-44ac-8311-79a4b48251f6; __DAYU_PP=MnyeNeF2eNnU6VMZuYNF62c5785fba7d; __utmv=51854390.100-1|2=registration_date=20150926=1^3=entry_date=20150926=1; __utma=51854390.1209622882.1522310615.1523569800.1524145121.5; _xsrf=7GBvLnD8UHcZU2VfthKJdAV4zO9k1fHK; d_c0="ADAn48qDJA6PTppAdp9hQ6i-pf5uJGMUYSA=|1535748636"; z_c0="2|1:0|10:1539951956|4:z_c0|92:Mi4xdlcwaEFnQUFBQUFBTUNmanlvTWtEaVlBQUFCZ0FsVk5WQnUzWEFCeThIOEJUNDZFMHVCWVJZVGpPMUtERGpVbTFn|f1060e5daca3ba4e9de1796f8c6035edfa5cea9ead5ef8e6a3d9e7c5c055aa17"; tst=r; q_c1=ca8f1c88abf34c7a801b1b923fa67aa2|1543061433000|1517926256000; tgw_l7_route=4860b599c6644634a0abcd4d10d37251";
async function  login() {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
    await addCookies(cookie_str);
    await page.goto(`https://www.zhihu.com`);
}


async function addCookies(cookies_str, page, domain){
    let cookies = cookies_str.split(';').map(pair=>{
        let name = pair.trim().slice(0,pair.trim().indexOf('='))
        let value = pair.trim().slice(pair.trim().indexOf('=')+1)
        return {name,value,domain}
    });
    await Promise.all(cookies.map(pair=>{
        return page.setCookie(pair)
    }))
}
await login()


