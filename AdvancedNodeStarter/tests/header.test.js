// jest.setTimeout(60000); does not work
const Page = require('./helpers/page');

// test('We can launch a browser', async () => {
//   const puppeteer = require('puppeteer');

//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ['--no-sandbox'],
//   });
//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000');

//   const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

//   expect(text).toEqual('Blogster');

// });

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('the header has the correct text', async () => {
  // const text = await page.getContentsOf('a.brand-logo');
  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
  await page.login();

  //   // mongoDB collection id
  // const id = '63e2153535a461b0857d9d50';

  // const sessionObject = {
  //   passport: {
  //     user: id,
  //   },
  // };
  // const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
  //   'base64'
  // );
  // const Keygrip = require('keygrip');
  // const keys = require('../config/keys');
  // const keygrip = new Keygrip([keys.cookieKey]);
  // const sig = keygrip.sign('session=' + sessionString);
  // console.log(sessionString, sig);

  // await page.setCookie({ name: 'session', value: sessionString });
  // await page.setCookie({ name: 'session.sig', value: sig });

  // await page.goto('http://localhost:3000/blogs');

  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
  expect(text).toEqual('Logout');
});
