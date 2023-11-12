CREATE TABLE tutorialText (
    uid SERIAL PRIMARY KEY,
    name TEXT,
    subheading_one TEXT,
    subheading_two TEXT,
    paragraph_one TEXT,
    paragraph_two TEXT,
    conclusion TEXT,
    bulletpoint_one TEXT[],
    bulletpoint_two TEXT[]
);
