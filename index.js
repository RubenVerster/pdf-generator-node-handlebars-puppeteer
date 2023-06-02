const Fs = require('fs')
const Path = require('path')
const Util = require('util')
const Puppeteer = require('puppeteer')
const Handlebars = require('handlebars')
const ReadFile = Util.promisify(Fs.readFile)

const pdfType = process.argv[2];
const headless = process.argv[3]

let showPDF = headless ? true : false ?? false
let data = null;
let templatePath = null;

switch (pdfType) {
    case 'biotang':
        break;
    case 'software':
    case 'invention':
    case 'copyright':
    default:
        break;
}

class Invoice {

    async html() {
        if (!data || !templatePath) {
            throw new Error('No data provided')

        }
        try {
            const stylePath = Path.resolve('./templates/styles.html')
            const content = await ReadFile(templatePath, 'utf8')
            const styleContent = await ReadFile(stylePath, 'utf8')
            //replace <style></style> tag with the content of the styles.html file
            let aggregatedContent = content.replace('<style></style>', styleContent)

            const template = Handlebars.compile(aggregatedContent)
            return template(data)
        } catch (error) {
            console.log(error)
            throw new Error('Cannot create invoice HTML template.')
        }
    }

    async pdf() {
        const html = await this.html()

        const browser = await Puppeteer.launch(
            {
                args: ['--no-sandbox'],
                headless: showPDF
            }
        )
        const page = await browser.newPage()
        await page.setContent(html)


        const pdf = await page.pdf({
            format: 'A4',
        })

        Fs.writeFileSync(`./pdfs/${pdfType}.pdf`, pdf)
    }
}

let newInvoice = new Invoice()

newInvoice.pdf()