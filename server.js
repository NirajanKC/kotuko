const express = require("express");
const axios = require("axios");
const app = express();

if (process.env.NOD_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
}
let key = process.env.key;

app.get("/:sectionName", async (req, res) => {
  try {
    const data = await axios.get(
      `https://content.guardianapis.com/search?api-key=${key}&q=${
        req.params.sectionName
      }&page=${
        req.query.page || 1
      }&show-fields=headline,standfirst,lang,publication,lastModified`
    );

    const results = formatter(data.data.response.results);
    res.json({ ...data.data.response, results });
  } catch (error) {
    res.json(error);
  }
});

// w3c standard formatter
function formatter(result) {
  return result.map((doc) => ({
    title: doc.fields.headline,
    link: doc.webUrl,
    description: doc.fields.standfirst,
    language: doc.fields.lang,
    pubDate: doc.webPublicationDate,
    lastBuildDate: doc.fields.lastModified,
    item: [],
  }));
}

const port = process.env.port || 8000;
app.listen(port, () => console.log("Server running successfully"));
