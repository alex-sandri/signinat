const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PUBLIC_PATH = path.join(__dirname, "..", "public");
const VIEWS_PATH = path.join(__dirname, "..", "src", "views");

[
    "account",
    path.join("account", "settings"),
    "signup",
    "signin",
].forEach(folder =>
{
    const folderPath = path.join(PUBLIC_PATH, folder);

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
});

handlebars.registerPartial("header", handlebars.compile(fs.readFileSync(path.join(VIEWS_PATH, "components", "header.hbs")).toString("utf-8"))({}));

fs.writeFileSync(path.join(PUBLIC_PATH, "index.html"), handlebars.compile(fs.readFileSync(path.join(VIEWS_PATH, "index.hbs"), "utf8"))({}));

fs.writeFileSync(path.join(PUBLIC_PATH, "account", "index.html"), handlebars.compile(fs.readFileSync(path.join(VIEWS_PATH, "account", "index.hbs"), "utf8"))({}));

fs.writeFileSync(path.join(PUBLIC_PATH, "account", "settings", "index.html"), handlebars.compile(fs.readFileSync(path.join(VIEWS_PATH, "account", "settings", "index.hbs"), "utf8"))({}));

fs.writeFileSync(path.join(PUBLIC_PATH, "signup", "index.html"), handlebars.compile(fs.readFileSync(path.join(VIEWS_PATH, "signup", "index.hbs"), "utf8"))({}));

fs.writeFileSync(path.join(PUBLIC_PATH, "signin", "index.html"), handlebars.compile(fs.readFileSync(path.join(VIEWS_PATH, "signin", "index.hbs"), "utf8"))({}));