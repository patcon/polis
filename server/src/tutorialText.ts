import pg from "./db/pg-query";

// Function to get a specific tutorial text by its unique name
function getTutorialTextByName(name: string) {
  return new Promise((resolve, reject) => {
    pg.query_readOnly(
      "SELECT * FROM tutorialText WHERE name = $1",
      [name],
      function (err: any, results: { rows: any[] }) {
        if (err) {
          reject(err);
        } else if (!results.rows || !results.rows.length) {
          resolve(null);
        } else {
          resolve(results.rows[0]);
        }
      }
    );
  });
}

function getAllTutorialTexts() {
    return new Promise((resolve, reject) => {
      pg.query_readOnly(
        "SELECT * FROM tutorialText",
        [],
        (err: any, results: { rows: any[] }) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.rows);
          }
        }
      );
    });
  }

// Function to add a new tutorial text entry
function addTutorialText(tutorialTextData: {
  name: string;
  subheading_one: string;
  subheading_two: string;
  paragraph_one: string;
  paragraph_two: string;
  conclusion: string;
  bulletpoint_one: string[];
  bulletpoint_two: string[];
}) {
  return new Promise((resolve, reject) => {
    pg.query(
      "INSERT INTO tutorialText (name, subheading_one, subheading_two, paragraph_one, paragraph_two, conclusion, bulletpoint_one, bulletpoint_two) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [tutorialTextData.name, tutorialTextData.subheading_one, tutorialTextData.subheading_two, tutorialTextData.paragraph_one, tutorialTextData.paragraph_two, tutorialTextData.conclusion, tutorialTextData.bulletpoint_one, tutorialTextData.bulletpoint_two],
      function (err: any, results: any) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Other potential functions for updating or deleting tutorial texts...

export { getTutorialTextByName, addTutorialText };
