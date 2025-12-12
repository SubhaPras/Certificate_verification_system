import puppeteer from "puppeteer";

export const generatePDF = async (htmlContent, filename) => {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
};
