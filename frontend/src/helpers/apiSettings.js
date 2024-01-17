// apiSettings.js

// function apiSettings(params) {

    
//     // console.log("API settings params:",params);
//     // easier to set a default type to save a few seconds through rapid live testing
//     const defaultType = "selected";
//     // in case the api endpoint changes to a different url.
// 	const baseUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday`;

//     return { baseUrl, defaultType}
    
// }

export default function apiSettings() {
    return {
      wikiBaseUrl: "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday",
      defaultType: "selected",
    };
  }
  