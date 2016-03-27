## chihsuan.github.io

### File structure

Develop in `src` folder and run `gulp`, will produce the production code to `dist` folder.

The `resume.json` is where we can edit our resume information. It's helpful go to [http://jsonlint.com/](http://jsonlint.com/) to validte the json format is correct.

```
  cvwebsite
  │   README.md
  │   contributors.txt
  |   ....
  │
  └───src
  │   │   index.html
  |   |   resume.json
  │   │
  │   ├───js
  │   │   │   index.js
  │   │   │   ...
  │   │
  │   └───css
  │       |   style.css
  │
  └───dist
  │   │   index.html
  │   │
  │   ├───js
  │   │   │   ...
  │   │
  │   └───css
  │       |   style.css
```

### Setting up

Download or Clone this repository, and install `node.js` (version >= v0.10.35)
and `npm` if need.

**Install Web Tooling for Automation**

```
$> cd /path/to/your-project-folder/
$> npm install
```

### Develop

1\. Run `gulp` to automatically minimize the assests for website performance.
```
$> cd /path/to/your-project-folder/
$> gulp
```

2\.  Start a local server.

```
$> cd /path/to/your-project-folder/
$> python -m SimpleHTTPServer 8080
```

3\. Open a browser and visit `localhost:8080/dist/`

### Production

1\. Download or Clone this repository and setting up your production server.

2\. Update meta tags in `src/index.html`, your website title, description, preview image...etc

```
<meta property="og:title" content="">
<meta property="og:site_name" content="">
<meta property="og:description" content="">
<meta property="og:url" content=""/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="">
<meta property="og:image:type" content="image/png">
<title></title>
```

3\. Add a favicon.ico to src and dist folder.

4\. Run `gulp`

5\. Set up nginx or apache points to `dist` folder.
