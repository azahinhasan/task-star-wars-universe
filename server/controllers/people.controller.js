const config = require("../config/config");
const fetch = require("node-fetch");
const fs = require("fs");
let peopleData = require("../extra_character.json");


const getPeople = async (req, res) => {
  try {
    //sorting data my name
    let jsonData = peopleData.sort((a, b) => a.name.localeCompare(b.name));

    //searching by name
    if (req.query.name !== "undefined") {
      const regex = new RegExp(
        req.query.name?.replaceAll(" ", "").replaceAll("%20", "").toLowerCase(),
        "g"
      );
      jsonData = jsonData.filter((el) =>
        el.name.replaceAll(" ", "").toLowerCase().match(regex)
      );
    }
    if (jsonData.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    //calculating total page numbers
    const totalPage = Math.ceil(jsonData.length / 9);
    const totalDataFound = jsonData.length;

    //handling pagination
    jsonData =
      req.query.page && req.query.page !== "undefined" &&totalPage>1
        ? jsonData.slice(
            9 *
              (parseInt(req.query.page) > 0 ? parseInt(req.query.page) - 1 : 0),
            9 *
              (parseInt(req.query.page) > 0
                ? parseInt(req.query.page) - 1
                : 0) +
              9
          )
        : (jsonData = jsonData.slice(0, 9));

    res.status(200).json({
      success: true,
      totalPage,
      totalDataFound,
      data: jsonData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Something wrong!" });
  }
};

const createFileWithData = async (req, res) => {
  try {
    let resultByPage = [];

    //fetching data by page. because api don't return all data in single call
    for (let i = 1; i <= 9; i++) {
      await fetch(`${config.SWAPI}/people?page=${i}`, {
        method: "GET",
      })
        .then((response) => response?.json())
        .then((json) => {
          resultByPage.push(...json?.results);
          console.log("checking page "+i)
        });
    }

    console.log("--populating with films data--");
    jsonData = resultByPage;
    for (let i = 0; i < jsonData.length; i++) {
      let tempFilms = [];
      console.log(jsonData[i].films, "films of data-" + i);
      let flag = false;
      for (let j = 0; j < jsonData[i].films?.length; j++) {
        typeof jsonData[i].films[j] === "string" &&
          (await fetch(jsonData[i].films[j], {
            method: "GET",
          })
            .then((response) => response.json())
            .then((json) => {
              tempFilms.push(json);
              flag = true;
            }));
      }
      if (flag) jsonData[i].films = tempFilms;
    }

    //creating and saving data in json file
    await fs.writeFile(
      "extra_character.json",
      JSON.stringify(jsonData, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Error creating file:", writeErr);
        } else {
          console.log("File created successfully.");
        }
      }
    );

    return res.status(200).json({ success: true, count: jsonData.length, data: jsonData});
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Something wrong!" });
  }
};

module.exports = { getPeople, createFileWithData };
