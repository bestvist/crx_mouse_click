const phantom = require('phantom');

async function spider(url) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', {
        width: 1400,
        height: 2000
    });

    await page.property('clipRect', {
        top: 0,
        left: 0,
        width: 1400,
        height: 2000
    })

    const status = await page.open(url);

    if (status === 'success') {
        const title = await page.evaluate(function () {
            return document.title;
        });
        console.log(title);

        const description = await page.evaluate(function (s) {
            return document.querySelector(s).getAttribute('content');
        }, 'meta[name="description"]');
        console.log(description);

        let name = url.split('://');
        name = name.length > 1 ? name[1] : name[0];
        name = name.split('.').splice(-2, 1);
        await page.render(`${name}.png`);
        console.log(`phantom success. save as ${name}.png`);
    } else {
        console.log(`phantom error`);
    }

    await instance.exit();
}

spider('http://www.razvangarofeanu.com')
spider('http://dotmick.com')
spider('https://resident.co.nz/')
// spider('https://www.lustonelabel.com')