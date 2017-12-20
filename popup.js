


document.addEventListener('DOMContentLoaded', function() {

  function sendTextToDiv() { //text
    chrome.tabs.executeScript({
       code: 'ready(); var main = document.getElementById("txt-popup"); main.style.display = "block"; ' //document.getElementById("txt").innerHTML = "'+text+'"; 
    }); 
  }
 
  

  var body = document.getElementById('content');
  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
       
      
       sendTextToDiv();
    setTimeout(function(){ window.close(); }, 500);
    });
  }, false);
}, false);