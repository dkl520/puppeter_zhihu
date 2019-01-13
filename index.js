const mongoose=require("mongoose");
mongoose.Promise=require("bluebird");
const puppeteer = require('puppeteer');
const fs = require("fs");
const request = require("request");
const iconv = require('iconv-lite');
const Model = require("./model/novel.js");

mongoose.connect("mongodb://127.0.0.1:27017/novel");

async function login() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const kw="很纯很暧昧";
  const kw = "%BA%DC%B4%BF%BA%DC%EA%D3%C3%C1";
  await page.goto(`http://www.biquge5200.com/7_7763/`);
  const chapter_text = "#list a";
  try {
    const chapters = await page.$$(chapter_text);
    for (let i = 0, chapter_k = []; i < 10; i++) {
      const chapter = chapters[i];
      const content_name = await chapter.getProperty("text");
      const url = await chapter.getProperty("href");
      console.log(url._remoteObject.value, content_name._remoteObject.value);
      await content_page(url._remoteObject.value, content_name._remoteObject.value);
    }
  } catch (error) {
    console.log(error)
  }
};

let index = 0;
async function content_page(urls, content_name) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urls);
  console.log(page.url());
  try {
    const content = await page.$eval("#content", el => el.innerText);
    console.log(content);
    // await download(content, content_name);
    await addDatabase(content, content_name);

  } catch (error) {
    console.log(error);
  }
  browser.close();
}
async function addDatabase(content, content_name) {

  var instance = new Model({
    novelName: "逆鳞",
    chapter: content_name,
    content: content
  })
 await  instance.save(function(err,doc){
    // console.log(doc);
    console.log(err);
  })
}
async function download(content, content_name) {
  await fs.appendFile(`data/逆鳞.txt`, content, (err) => {
    if (err) {
      console.log(err);
    }
  })
  await fs.writeFile(`data/${content_name}.txt`, content, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
login();
