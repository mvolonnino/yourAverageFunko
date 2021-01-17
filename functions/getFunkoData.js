const puppeteer = require("puppeteer");
const firebase = require("./db");
const firestore = firebase.firestore();

async function getFunkoData(url, page, i) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
  console.log({ url, i });

  if (
    url ===
    "https://www.cardboardconnection.com/2019-funko-san-diego-comic-con-exclusives-guide"
  ) {
    console.log("first else if hit");
    const data = await page
      .evaluate(() => {
        const genre = document.querySelector("h1").innerText;

        const titles = Array.from(
          document.querySelectorAll(".entry .gallery h3")
        ).filter((title) => title.innerText !== "");

        const newData = titles.map((title) => {
          console.log("titles: ", title.innerText);
          let splitTitle = title.innerText.trim();
          console.log({ splitTitle });
          // .split(/(?<=^\S+)\s/)
          // .filter(Boolean);

          // function isNumeric(value) {
          //   return /^-?\d+$/.test(value);
          // }
          // isNumeric(title.innerText);

          //finding where the image is located for the title
          if (title.nextSibling.querySelector("img") !== null) {
            console.log("img is nextSibling");
            splitTitle = {
              splitTitle,
              image: title.nextSibling.querySelector("img").dataset.src,
            };
          } else if (
            title.nextSibling.nextSibling.querySelector("img") !== null
          ) {
            console.log("img is next next sibling");
            splitTitle = {
              splitTitle,
              image: title.nextSibling.nextSibling.querySelector("img").dataset
                .src,
            };
          } else if (
            title.nextSibling.nextSibling.nextSibling.querySelector("img") !==
            null
          ) {
            splitTitle = {
              splitTitle,
              image: title.nextSibling.nextSibling.nextSibling.querySelector(
                "img"
              ).dataset.src,
            };
          } else {
            splitTitle = {
              splitTitle,
              image: null,
            };
          }

          return splitTitle;
        });
        console.log("newData: ", newData);
        let funkoData = newData.map((title, i) => {
          console.log("newData title: ", title);

          if (title.splitTitle) {
            const numbers = /\b\d{1,3}\b(?!:)/gm;
            const matchNumber = title.splitTitle.match(numbers);
            // console.log("matchNumber: ", matchNumber);
            const name = title.splitTitle
              .split(numbers)
              .filter(Boolean)
              .toString()
              .trim();
            // console.log("name: ", name);

            return {
              number: matchNumber && matchNumber[0],
              name: name,
              image: title.image,
            };
          }
        });

        // if funkoData comes back empty because site has only check list, no names & images togther or names not in h3
        if (funkoData.length < 1) {
          funkoData = null;
        }

        return (data = {
          genre,
          funkoData,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return data;
  } else if (
    url ===
    "https://www.cardboardconnection.com/2019-funko-new-york-comic-con-exclusives-guide"
  ) {
    console.log("2nd else if hit");
    const data = await page
      .evaluate(() => {
        const genre = document.querySelector("h1").innerText;

        const titles = Array.from(
          document.querySelectorAll(".entry .gallery h3")
        ).filter((title) => title.innerText !== "");

        const newData = titles.map((title) => {
          console.log("titles: ", title.innerText);
          let splitTitle = title.innerText.trim();
          console.log({ splitTitle });
          // .split(/(?<=^\S+)\s/)
          // .filter(Boolean);

          // function isNumeric(value) {
          //   return /^-?\d+$/.test(value);
          // }
          // isNumeric(title.innerText);

          //finding where the image is located for the title
          if (title.nextSibling.querySelector("img") !== null) {
            console.log("img is nextSibling");
            splitTitle = {
              splitTitle,
              image: title.nextSibling.querySelector("img").dataset.src,
            };
          } else if (
            title.nextSibling.nextSibling.querySelector("img") !== null
          ) {
            console.log("img is next next sibling");
            splitTitle = {
              splitTitle,
              image: title.nextSibling.nextSibling.querySelector("img").dataset
                .src,
            };
          } else if (
            title.nextSibling.nextSibling.nextSibling.querySelector("img") !==
            null
          ) {
            splitTitle = {
              splitTitle,
              image: title.nextSibling.nextSibling.nextSibling.querySelector(
                "img"
              ).dataset.src,
            };
          } else {
            splitTitle = {
              splitTitle,
              image: null,
            };
          }

          return splitTitle;
        });
        console.log("newData: ", newData);
        let funkoData = newData.map((title, i) => {
          console.log("newData title: ", title);

          if (title.splitTitle) {
            const numbers = /\b\d{1,3}\b(?!:)/gm;
            const matchNumber = title.splitTitle.match(numbers);
            // console.log("matchNumber: ", matchNumber);
            const name = title.splitTitle
              .split(numbers)
              .filter(Boolean)
              .toString()
              .trim();
            // console.log("name: ", name);

            return {
              number: matchNumber && matchNumber[0],
              name: name,
              image: title.image,
            };
          }
        });

        // if funkoData comes back empty because site has only check list, no names & images togther or names not in h3
        if (funkoData.length < 1) {
          funkoData = null;
        }

        return (data = {
          genre,
          funkoData,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return data;
  } else {
    console.log("else hit");
    const data = await page
      .evaluate(() => {
        const genre = document.querySelector("h1").innerText;

        const titles = Array.from(
          document.querySelectorAll(".entry h3")
        ).filter((title) => title.innerText !== "");

        const newData = titles.map((title) => {
          // console.log("titles: ", title.innerText);
          let splitTitle = title.innerText.trim();
          // console.log({ splitTitle });
          // .split(/(?<=^\S+)\s/)
          // .filter(Boolean);

          // function isNumeric(value) {
          //   return /^-?\d+$/.test(value);
          // }
          // isNumeric(title.innerText);

          //finding where the image is located for the title
          if (title.nextSibling.querySelector("img") !== null) {
            console.log("img is nextSibling");
            splitTitle = {
              splitTitle,
              image: title.nextSibling.querySelector("img").dataset.src,
            };
          } else if (
            title.nextSibling.nextSibling.querySelector("img") !== null
          ) {
            console.log("img is next next sibling");
            splitTitle = {
              splitTitle,
              image: title.nextSibling.nextSibling.querySelector("img").dataset
                .src,
            };
          } else if (
            title.nextSibling.nextSibling.nextSibling.querySelector("img") !==
            null
          ) {
            splitTitle = {
              splitTitle,
              image: title.nextSibling.nextSibling.nextSibling.querySelector(
                "img"
              ).dataset.src,
            };
          } else {
            splitTitle = {
              splitTitle,
              image: null,
            };
          }

          return splitTitle;
        });
        console.log("newData: ", newData);
        let funkoData = newData.map((title, i) => {
          // console.log("newData title: ", title);

          if (title.splitTitle) {
            const numbers = /\b\d{1,3}\b(?!:)/gm;
            const matchNumber = title.splitTitle.match(numbers);
            // console.log("matchNumber: ", matchNumber);
            const name = title.splitTitle
              .split(numbers)
              .filter(Boolean)
              .toString()
              .trim();
            // console.log("name: ", name);

            return {
              number: matchNumber && matchNumber[0],
              name: name,
              image: title.image,
            };
          }
        });

        // if funkoData comes back empty because site has only check list, no names & images togther OR names not in h3 tag
        if (funkoData.length < 1) {
          funkoData = null;
        }

        return (data = {
          genre,
          funkoData,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return data;
  }
}

async function getLinks() {
  let funkoUrl = "https://www.cardboardconnection.com/brand/funko/funko-pop";
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  let page = await browser.newPage();

  await page.goto(funkoUrl), { waitUntil: "domcontentloaded" };

  const links = await page.$$eval(
    "#productListing div.brandproductDescription > h2 > a",
    (allLinks) => allLinks.map((link) => link.href)
  );

  return links;
}

async function main() {
  const allLinks = await getLinks();
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // const scrapedData = [];
  for (let [i, link] of allLinks.entries()) {
    const data = await getFunkoData(link, page, i);
    await firestore.collection("funkoPops").doc(data.genre).set(data);

    // const data = await getFunkoData(link, page, i);
    // scrapedData.push(data);
  }

  // const data = await getFunkoData(
  //   "https://www.cardboardconnection.com/2014-funko-pop-universal-monsters-vinyl-figures",
  //   page
  // );
  // console.log("data: ", data);
  // scrapedData.push(data);
  // console.log("main data: ", JSON.stringify(scrapedData, null, 2));
}

main();

module.exports.main = main;

// GENRE GIVING NULL DATA
// 2014 Funko Pop MLB Mascots Vinyl Figures
// 2014 Funko Pop NFL Vinyl Figures
// 2016 Funko Alice Through the Looking Glass Mystery Minis
// 2018 Funko Pop San Diego Comic-Con Figures
// Funko Pop A League of Their Own Vinyl Figures
// Funko Pop Bewitched Vinyl Figures
// Funko Pop Beverly Hills Cop Vinyl Figures
// Funko Pop Big Movie Vinyl Figures
// Funko Pop Billions Vinyl Figures
// Funko Pop Black Mirror Vinyl Figures
// Funko Pop Cheers Vinyl Figures
// Funko Pop Castlevania Vinyl Figures
// Funko Pop Cast Away Vinyl Figures
// Funko Pop Dawson’s Creek Vinyl Figures
// Funko Pop Guild Wars Vinyl Figures
// Funko Pop Major League Movie Figures
// Funko Pop Mad Men Vinyl Figures
// Funko Pop NHL Mascots Vinyl Figures
// Funko Pop Sanford and Son Vinyl Figures
// Funko Pop The Good Place Figures
// Funko Pop The Greatest Showman Figures
// Funko Pop The Santa Clause Vinyl Figures
// Funko Pop The Purge Vinyl Figures
// Funko Pop Thunderbirds Vinyl Figures
// Funko Pop Warhammer 40,000 Vinyl Figures
// Ultimate Funko Pop Disney Vinyl Figure Guide
