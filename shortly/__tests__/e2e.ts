import puppeteer from "puppeteer";
import { getDocument, queries, waitFor } from "pptr-testing-library";

const { getByLabelText, getByText } = queries

const timeout = 120000
jest.setTimeout(timeout)

describe("Verify that ", () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false, //can be changed to false to see the test in action
            defaultViewport: null,
        });
        // const context = await browser.defaultBrowserContext();
        // await context.overridePermissions("http://localhost:3000", ['clipboard-read', 'clipboard-write'])
        const pages = await browser.pages();
        page = pages[0];
        await page.goto("http://localhost:3000");
    })

    // afterAll(async () => await browser.close());

    test("Generate a link for `https://finn.auto", async () => {
        // getDocument is added to prototype of Page
        const $document = await getDocument(page)
        const url = "https://finn.auto"
        const shrtcoUrl = "https://shrtco.de/"

        const input = await getByLabelText($document, /URL to shorten/i)
        const button = await getByText($document, /Shorten It!/i)
        await input.type(url, { delay: 50 })

        await button.click()

        await waitFor(() => getByLabelText($document, /Fetching short link/i))

        await waitFor(async () => {
            await getByText($document, url, { selector: "div" });
            await getByText($document, shrtcoUrl, { selector: "div", exact: false })
            const copyBtn = await getByText($document, "Copy", { selector: "button" })
            await copyBtn.click()
            const copiedText = await page.evaluate(`(async () => await navigator.clipboard.readText())()`)
            expect(copiedText).toMatch(new RegExp(`^${shrtcoUrl}`))
        }, { timeout })


    })
})
