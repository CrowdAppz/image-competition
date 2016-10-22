const fetch = require("node-fetch");

const getSimilarWords = (words, limit) => {
  var resourcePath = "";
  if(words.indexOf(",") > -1){
    resourcePath = "/words/similar/"+limit+"?words="+words;
  }else{
    resourcePath = "/words/similar/"+words+"/"+limit;
  }
  console.log(resourcePath);
  const URL = "http://localhost:8002"+resourcePath;

  return fetch(URL, {
        method: "GET"
      });
}

module.exports = {getSimilarWords};
