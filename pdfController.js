const puppeteer = require("puppeteer");
const db = require("../config/db");
const path = require("path");

// Generate PDF from HTML
exports.generatePDF = async (req, res) => {
  try {
    // Fetch data from database
    const [data] = await db.query("SELECT * FROM users");

    // Create HTML content
    let htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { margin: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>User Data</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
    `;

    // Add data rows
    data.forEach((record) => {
      htmlContent += `
        <tr>
          <td>${record.id}</td>
          <td>${record.name}</td>
          <td>${record.email}</td>
          <td>${record.phone}</td>
        </tr>
      `;
    });

    htmlContent += `
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Set response headers and send PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
