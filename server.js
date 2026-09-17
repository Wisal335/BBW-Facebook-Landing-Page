const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "dist");

const mimeTypes = {
    ".html": "text/html; charset=UTF-8",
    ".css": "text/css; charset=UTF-8",
    ".js": "application/javascript; charset=UTF-8",
    ".json": "application/json; charset=UTF-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
};

const server = http.createServer((req, res) => {

    try {

        let urlPath = decodeURIComponent(
            req.url.split("?")[0]
        );

        if (urlPath === "/") {
            urlPath = "/index.html";
        }

        let filePath = path.join(
            DIST_DIR,
            urlPath
        );

        /*
         * Security check:
         * Make sure the requested file stays
         * inside the dist folder.
         */
        if (!filePath.startsWith(DIST_DIR)) {
            res.writeHead(403);
            res.end("403 - Forbidden");
            return;
        }

        /*
         * If the requested path is a directory,
         * serve its index.html.
         */
        if (
            fs.existsSync(filePath) &&
            fs.statSync(filePath).isDirectory()
        ) {
            filePath = path.join(
                filePath,
                "index.html"
            );
        }

        /*
         * If the exact file doesn't exist,
         * try index.html.
         */
        if (!fs.existsSync(filePath)) {

            res.writeHead(404, {
                "Content-Type":
                    "text/plain; charset=UTF-8"
            });

            res.end(
                "404 - Page Not Found\n\n" +
                "Requested: " +
                urlPath
            );

            return;
        }

        const extension =
            path.extname(filePath).toLowerCase();

        const contentType =
            mimeTypes[extension] ||
            "application/octet-stream";

        const file =
            fs.readFileSync(filePath);

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(file);

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            "Content-Type":
                "text/plain; charset=UTF-8"
        });

        res.end(
            "500 - Internal Server Error"
        );

    }

});

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

        console.log(
            `Serving files from: ${DIST_DIR}`
        );

    }
);