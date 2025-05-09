const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { resolve } = require("path");

// Replace this with your site's URL
const BASE_URL = "https://www.moviemads.com/";

// List all your URLs here
const pages = [
  "/",
  "/movieTrailer",
  //'/shortFilms',
  "/blogs",
  "/model",
  "/gallery",
  "/awards",
  "/reviews",
  "/details/:id",
  "/details/movieTrailer/:id",
  "/details/review/:id",
  "/review/:id",
  "/terms-and-conditions",
  "/contact",
  "/model/:id",
  "/keywords",
  // Add all other routes here
];

(async () => {
  const sitemapStream = new SitemapStream({ hostname: BASE_URL });

  pages.forEach((page) => {
    sitemapStream.write({ url: page, changefreq: "daily", priority: 0.7 });
  });

  sitemapStream.end();

  const sitemapOutput = await streamToPromise(sitemapStream).then((sm) =>
    sm.toString()
  );

  fs.writeFileSync(resolve(__dirname, "public", "sitemap.xml"), sitemapOutput);
})();
