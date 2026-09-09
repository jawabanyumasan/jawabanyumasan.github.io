```javascript
const fs = require("fs");
const path = require("path");

const config = require("./sitemap-config");

const SITE_URL = config.siteUrl.replace(/\/$/, "");

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeUrl(url) {

  if (!url.startsWith("/")) {
    url = "/" + url;
  }

  if (url !== "/" && url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
}

function loadListings() {

  const file = path.resolve(
    __dirname,
    config.listingsFile
  );

  if (!fs.existsSync(file)) {
    console.log("Listing file tidak ditemukan.");

    return [];
  }

  try {

    const data = JSON.parse(
      fs.readFileSync(file, "utf8")
    );

    if (!Array.isArray(data)) {
      console.log("Format listings.json harus berupa array.");

      return [];
    }

    return data;

  } catch (error) {

    console.error(
      "Gagal membaca listings.json:",
      error.message
    );

    process.exit(1);
  }
}

function generateListingUrls(listings) {

  return listings
    .filter(item => item.slug)
    .map(item => {

      const url = config.listingUrl.replace(
        "{slug}",
        encodeURIComponent(item.slug)
      );

      return {
        url: normalizeUrl(url),
        lastmod: item.updated || null
      };

    });
}

const pages = [];

// ===============================
// STATIC URL
// ===============================

for (const url of config.staticUrls) {

  pages.push({
    url: normalizeUrl(url),
    lastmod: null
  });

}

// ===============================
// LISTING URL
// ===============================

const listings = loadListings();

const listingPages =
  generateListingUrls(listings);

pages.push(...listingPages);

// ===============================
// REMOVE DUPLICATES
// ===============================

const unique = new Map();

for (const page of pages) {

  if (!unique.has(page.url)) {
    unique.set(page.url, page);
  }

}

const finalPages =
  Array.from(unique.values())
    .sort((a, b) =>
      a.url.localeCompare(b.url)
    );

// ===============================
// GENERATE XML
// ===============================

const today =
  new Date()
    .toISOString()
    .split("T")[0];

const entries = finalPages.map(page => {

  const lastmod =
    page.lastmod || today;

  return `  <url>
    <loc>${escapeXml(SITE_URL + page.url)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </url>`;

}).join("\n\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries}

</urlset>
`;

// ===============================
// WRITE SITEMAP
// ===============================

fs.writeFileSync(
  path.join(__dirname, "sitemap.xml"),
  sitemap,
  "utf8"
);

// ===============================
// GENERATE ROBOTS
// ===============================

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(
  path.join(__dirname, "robots.txt"),
  robots,
  "utf8"
);

// ===============================
// REPORT
// ===============================

console.log("");
console.log("======================================");
console.log(" JAWABANYUMASAN SITEMAP GENERATOR V3");
console.log("======================================");

console.log("");
console.log("Website:");
console.log(SITE_URL);

console.log("");
console.log("Static pages:");
console.log(config.staticUrls.length);

console.log("");
console.log("Listings:");
console.log(listings.length);

console.log("");
console.log("Total sitemap URLs:");
console.log(finalPages.length);

console.log("");
console.log("Generated:");
console.log("✓ sitemap.xml");
console.log("✓ robots.txt");

console.log("");
```
