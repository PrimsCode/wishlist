// const puppeteer = require('puppeteer')

const axios = require("axios");
const {JSDOM} = require("jsdom").jsdom

async function scrapeItem(url) {

    //get html
    const {data: html} = await axios.get(url);
    const dom = new JSDOM(html);
    const $ = (selector) => dom.window.document.querySelector(selector);

    let item = {
        name:"",
        link:url,
        imageLink:"",
        price:"",
        description:""
    }

    item.imageLink = $('#landingImage').src;

    //price setup
    const price = $('.a-offscreen').textContent;
    item.price = parseFloat(price.replace('$', ''));

    //title setup
    const name = $('#productTitle').textContent;
    item.name = name.trim();

    //description setup
    const description = $('#productDescription>p').textContent;
    item.description = description.trim();

    console.log(item);
    
    return item;
}

export default scrapeItem;

// scrapeItem('https://www.amazon.com/HonestBaby-Toddler-Organic-Cotton-Pajamas/dp/B09582717C/pd_ci_mcx_mh_mcx_views_0?pd_rd_w=TQIjZ&content-id=amzn1.sym.1bcf206d-941a-4dd9-9560-bdaa3c824953&pf_rd_p=1bcf206d-941a-4dd9-9560-bdaa3c824953&pf_rd_r=ZSSMKXDCJ7K2KFHRYWEA&pd_rd_wg=IOCCS&pd_rd_r=b80b1600-c864-4a36-898e-4ce2dc158efa&pd_rd_i=B09582717C');

// scrapeItem('https://www.amazon.com/Mountain-Ocean-Moisturizer-Coconut-8-Ounces/dp/B001H54VI4?pd_rd_w=e3vGU&content-id=amzn1.sym.deffa092-2e99-4e9f-b814-0d71c40b24af&pf_rd_p=deffa092-2e99-4e9f-b814-0d71c40b24af&pf_rd_r=HN1V8FWTBAZF5GRQ1B4Z&pd_rd_wg=TJOES&pd_rd_r=2ef61982-5c4f-4a60-87af-1b1e94d11f27&pd_rd_i=B001H54VI4&ref_=pd_bap_d_grid_rp_0_1_t&th=1');