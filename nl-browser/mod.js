"use strict";

const {
  App,
  Bootstrap,
  RegisterApp,
  RegisterModPackage
} = require("@hotbunny/hackhub-content-sdk");

// --- CATEGORIZED DEFAULT LINKS ---
const defaultLinks = [
  // --- LORE & WORLD ---
  { 
    title: "NULL_LINK", 
    url: "https://nl-nulllogic.github.io/null-link/", 
    snippet: "We are the active architects of the virtual frontier.",
    category: "Lore" 
  },
  
  // --- TOOLS & DEV ---
  
  {
    title: "Wikipedia",
    url: "https://www.wikipedia.org/",
    snippet: "The Free Encyclopedia",
	category: "Tools & Dev" 
  },
  
  {
    title: "JSLinux (Fabrice Bellard)",
    url: "https://bellard.org/jslinux/",
    snippet: "a real lightweight Linux kernel compiling right inside the browser JS engine",
	category: "Tools & Dev" 
  },
  
  {
    title: "Keycode Info",
    url: "https://www.toptal.com/developers/keycode",
    snippet: "Press any key to get its JavaScript event code. Extremely useful for debugging game inputs and mechanics.",
	category: "Tools & Dev" 
  },
  
  { 
    title: "Photopea", 
    url: "https://www.photopea.com/", 
    snippet: "A full advanced image editor in the browser. Perfect for quick texture tweaks, UI mockups, or upscaled asset edits.",
    category: "Tools & Dev" 
  },
  
  {
    title: "JS Paint",
    url: "https://jspaint.app/",
    snippet: "A pixel-perfect web-based remake of MS Paint from Windows 95.",
    category: "Tools & Dev"
  },
  
  { 
    title: "Dillinger Markdown Editor", 
    url: "https://dillinger.io", 
    snippet: "An online cloud-enabled markdown editor.",
    category: "Tools & Dev" 
  },
  
  { 
    title: "JSONPlaceholder", 
    url: "https://jsonplaceholder.typicode.com", 
    snippet: "A free fake online REST API for testing client requests.",
    category: "Tools & Dev" 
  },
  
  { 
    title: "CyberChef", 
    url: "https://gchq.github.io/CyberChef/", 
    snippet: "The Cyber Swiss Army Knife for decoding and data manipulation.",
    category: "Tools & Dev" 
  },
  {
    title: "sfxr",
    url: "https://sfxr.me/",
    snippet: "A web-based retro sound effect generator. Perfect for rapid game audio prototyping.",
    category: "Tools & Dev"
  },
  {
    title: "Easing Functions",
    url: "https://easings.net/",
    snippet: "A cheat sheet for animation easing curves (crucial for game UI and movement).",
    category: "Tools & Dev"
  },
  {
    title: "Keycode Info",
    url: "https://www.toptal.com/developers/keycode",
    snippet: "Press any key to get its JavaScript event code.",
    category: "Tools & Dev"
  },

  // --- FUN & RETRO ---
  { 
    title: "Windows 93", 
    url: "https://www.windows93.net/", 
    snippet: "A fully functional, glitch-art inspired retro OS in your browser.",
    category: "Fun & Retro" 
  },
  { 
    title: "Hacker Typer", 
    url: "https://hackertyper.net/", 
    snippet: "Mash your keyboard to generate authentic-looking code.",
    category: "Fun & Retro" 
  },
  {
    title: "JDOS Games",
    url: "https://js-dos.com/games/",
    snippet: "An amazing old dos collection playable through your browser.",
    category: "Fun & Retro"
  }
];
// ---------------------------------

const browserHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>NULL_LINK Browser</title>
  <style>
    body {
      margin: 0;
      background: #0d1117;
      color: #c9d1d9;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    .toolbar {
      display: flex;
      padding: 8px;
      background: #161b22;
      border-bottom: 1px solid #30363d;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    button {
      background: #238636;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover { background: #2ea043; }
    .refresh-btn { background: #30363d; }
    .refresh-btn:hover { background: #484f58; }
    .toggle-add-btn { background: #1f6feb; }
    .toggle-add-btn:hover { background: #388bfd; }
    .reset-btn { background: #9e6a03; }
    .reset-btn:hover { background: #bb8009; }
    .dev-reload-btn { background: #8957e5; }
    .dev-reload-btn:hover { background: #a371f7; }
    
    .main-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .content-area {
      flex: 1;
      background: #0d1117;
      padding: 20px;
      overflow-y: auto;
    }
    iframe {
      flex: 1;
      width: 100%;
      height: 100%;
      border: none;
      background: #ffffff;
      display: none;
    }
    
    h2 { color: #58a6ff; margin-top: 0; }
    
    .category-header {
      color: #8957e5;
      border-bottom: 1px solid #30363d;
      padding-bottom: 4px;
      margin-top: 25px;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 1px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }
    .category-header:hover {
      color: #a371f7;
    }
    .toggle-icon {
      font-size: 12px;
      color: #8b949e;
    }
    .category-content {
      display: block;
    }
    .category-content.collapsed {
      display: none;
    }
    
    .result-item {
      background: #161b22;
      border: 1px solid #30363d;
      padding: 12px;
      margin-bottom: 10px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .result-info a {
      color: #58a6ff;
      text-decoration: none;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }
    .result-info a:hover { text-decoration: underline; }
    .result-snippet {
      color: #8b949e;
      font-size: 13px;
      margin-top: 4px;
    }
    .delete-btn {
      background: #da3633;
      padding: 4px 8px;
      font-size: 12px;
    }
    .delete-btn:hover { background: #f85149; }
    
    .add-form {
      background: #161b22;
      border: 1px solid #30363d;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
      display: none;
    }
    .add-form.active { display: block; }
    .add-form input {
      width: 100%;
      background: #0d1117;
      border: 1px solid #30363d;
      color: #c9d1d9;
      padding: 8px 10px;
      border-radius: 4px;
      margin-bottom: 10px;
      box-sizing: border-box;
      outline: none;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button id="homeButton">Home Index</button>
    <button id="toggleAddButton" class="toggle-add-btn">+ Add Custom Link</button>
    <button id="resetDefaultsButton" class="reset-btn">Reset Defaults</button>
    <button id="devReloadButton" class="dev-reload-btn">Reload UI App</button>
    <button id="refreshButton" class="refresh-btn">Refresh Frame</button>
  </div>
  
  <div class="main-container">
    <div id="searchHome" class="content-area">
      <h2>NULL_LINK Index</h2>
      
      <div id="addFormContainer" class="add-form">
        <h3 style="margin-top:0; color:#58a6ff; font-size:14px;">Add New Custom Link</h3>
        <input type="text" id="inputTitle" placeholder="Site Title..." />
        <input type="text" id="inputUrl" placeholder="URL (https://...)" />
        <input type="text" id="inputSnippet" placeholder="Short description..." />
        
        <input type="text" id="inputCategory" list="categoryOptions" placeholder="Category (Select or type a new one)..." />
        <datalist id="categoryOptions"></datalist>

        <button id="addLinkButton">Save to Index</button>
      </div>

      <div id="resultsList"></div>
    </div>
    <iframe id="browserFrame"></iframe>
  </div>

  <script>
    const homeButton = document.getElementById("homeButton");
    const toggleAddButton = document.getElementById("toggleAddButton");
    const resetDefaultsButton = document.getElementById("resetDefaultsButton");
    const devReloadButton = document.getElementById("devReloadButton");
    const refreshButton = document.getElementById("refreshButton");
    const resultsList = document.getElementById("resultsList");
    const searchHome = document.getElementById("searchHome");
    const browserFrame = document.getElementById("browserFrame");
    const addFormContainer = document.getElementById("addFormContainer");
    const addLinkButton = document.getElementById("addLinkButton");
    
    const inputTitle = document.getElementById("inputTitle");
    const inputUrl = document.getElementById("inputUrl");
    const inputSnippet = document.getElementById("inputSnippet");
    const inputCategory = document.getElementById("inputCategory");
    const categoryOptions = document.getElementById("categoryOptions");

    const STORAGE_KEY = "nulllink_custom_links_v5";
    const defaultDatabase = ${JSON.stringify(defaultLinks)};

    function getDatabase() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to read local storage database:", e);
      }
      return defaultDatabase;
    }

    function saveDatabase(db) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      } catch (e) {
        console.error("Failed to save local storage database:", e);
      }
    }

    function showHomeIndex() {
      searchHome.style.display = "block";
      browserFrame.style.display = "none";
      browserFrame.src = "about:blank";
      renderList();
    }

    function renderList() {
      const database = getDatabase();
      resultsList.innerHTML = "";
      categoryOptions.innerHTML = ""; 
      
      if (!database || database.length === 0) {
        resultsList.innerHTML = '<div class="result-item"><div class="result-snippet">No links available. Use "Reset Defaults" to load.</div></div>';
        return;
      }

      // Group links by their category
      const groupedLinks = database.reduce((groups, item) => {
        const cat = item.category || "Misc"; 
        if (!groups[cat]) {
          groups[cat] = [];
        }
        groups[cat].push(item);
        return groups;
      }, {});

      // Define custom sort order: Lore first, Fun & Retro last (others fall in between alphabetically)
      const customOrder = ["Lore", "Tools & Dev", "Fun & Retro"];
      
      const sortedCategoryNames = Object.keys(groupedLinks).sort((a, b) => {
        let indexA = customOrder.indexOf(a);
        let indexB = customOrder.indexOf(b);
        
        // If both are in the custom order list, sort by their index positions
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // If only A is in the custom order, give it priority
        if (indexA !== -1) return -1;
        // If only B is in the custom order, give it priority
        if (indexB !== -1) return 1;
        // Otherwise, sort custom categories alphabetically
        return a.localeCompare(b);
      });

      // Populate datalist options sorted correctly
      sortedCategoryNames.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        categoryOptions.appendChild(option);
      });

      // Render categories and their links in the new sorted order
      sortedCategoryNames.forEach(categoryName => {
        const items = groupedLinks[categoryName];
        
        const header = document.createElement("h3");
        header.className = "category-header";
        header.innerHTML = \`<span>\${categoryName}</span> <span class="toggle-icon">▼</span>\`;
        
        const contentContainer = document.createElement("div");
        contentContainer.className = "category-content";

        header.addEventListener("click", () => {
          contentContainer.classList.toggle("collapsed");
          const icon = header.querySelector(".toggle-icon");
          icon.textContent = contentContainer.classList.contains("collapsed") ? "▶" : "▼";
        });

        items.forEach((item) => {
          const actualIndex = database.findIndex(dbItem => dbItem.url === item.url && dbItem.title === item.title);
          
          const div = document.createElement("div");
          div.className = "result-item";
          
          div.innerHTML = \`
            <div class="result-info">
              <a data-url="\${item.url}">\${item.title}</a>
              <div class="result-snippet">\${item.snippet || item.url}</div>
            </div>
            <button class="delete-btn" data-index="\${actualIndex}">Remove</button>
          \`;
          
          div.querySelector("a").addEventListener("click", (e) => {
            const targetUrl = e.target.getAttribute("data-url");
            searchHome.style.display = "none";
            browserFrame.style.display = "block";
            browserFrame.src = targetUrl;
          });

          div.querySelector(".delete-btn").addEventListener("click", (e) => {
            const idx = parseInt(e.target.getAttribute("data-index"));
            const db = getDatabase();
            db.splice(idx, 1);
            saveDatabase(db);
            renderList();
          });

          contentContainer.appendChild(div);
        });

        resultsList.appendChild(header);
        resultsList.appendChild(contentContainer);
      });
    }

    function toggleAddForm() {
      addFormContainer.classList.toggle("active");
      toggleAddButton.textContent = addFormContainer.classList.contains("active") ? "- Close Form" : "+ Add Custom Link";
    }

    function resetDefaults() {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDatabase));
      showHomeIndex();
    }

    function addNewLink() {
      const title = inputTitle.value.trim();
      let url = inputUrl.value.trim();
      const snippet = inputSnippet.value.trim();
      let category = inputCategory.value.trim();
      if (!category) category = "Misc"; 

      if (!title || !url) {
        console.warn("Please provide at least a Title and a URL.");
        return;
      }

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const db = getDatabase();
      db.push({ title, url, snippet, category });
      saveDatabase(db);

      inputTitle.value = "";
      inputUrl.value = "";
      inputSnippet.value = "";
      inputCategory.value = "";

      toggleAddForm();
      renderList();
    }

    function refreshBrowser() {
      if (browserFrame.style.display === "block" && browserFrame.src && browserFrame.src !== "about:blank") {
        const currentUrl = browserFrame.src;
        browserFrame.src = "about:blank";
        setTimeout(() => { browserFrame.src = currentUrl; }, 50);
      } else {
        showHomeIndex();
      }
    }

    function devReloadUI() { window.location.reload(); }

    homeButton.addEventListener("click", showHomeIndex);
    toggleAddButton.addEventListener("click", toggleAddForm);
    resetDefaultsButton.addEventListener("click", resetDefaults);
    devReloadButton.addEventListener("click", devReloadUI);
    refreshButton.addEventListener("click", refreshBrowser);
    addLinkButton.addEventListener("click", addNewLink);

    showHomeIndex();
  </script>
</body>
</html>`;

let CustomBrowserApp = class extends App {
  constructor() {
    super();
    this.AppName = "nulllinkbrowser";
    this.Title = "NULL_LINK Browser";
    this.Icon = "./icon.png"; 
    this.HTML = browserHtml;
    this.DefaultSize = { width: 900, height: 600 };
    this.MinSize = { width: 500, height: 400 };
    this.Unlocked = true;
    
    this.Store = {
      title: "NULL_LINK Browser",
      ratings: 4.0,
      description: "A custom web browser with ordered and collapsible custom categories."
    };
  }
};

CustomBrowserApp = RegisterApp(CustomBrowserApp) || CustomBrowserApp;

let CustomBrowserMod = class extends Bootstrap {
  OnModPackageLoaded() {
    console.log("Custom Browser mod loaded with ordered categories!");
  }
};

CustomBrowserMod = RegisterModPackage(CustomBrowserMod) || CustomBrowserMod;

module.exports = CustomBrowserMod;
module.exports.default = CustomBrowserMod;
module.exports.CustomBrowserApp = CustomBrowserApp;