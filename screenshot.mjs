import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

// Make all fade-in elements visible immediately
await page.evaluate(() => {
  document.querySelectorAll('*').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
});

// Full page
await page.screenshot({ path: '/tmp/preview-full.png', fullPage: true });

await browser.close();
console.log('Done');
