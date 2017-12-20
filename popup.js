document.addEventListener('DOMContentLoaded', function() {
  function renderDiv() { 
    chrome.tabs.executeScript({
       code: 'parseSubtitlesToPane();'
    }); 
  }

  document.getElementById('checkPage').addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      renderDiv();
      setTimeout(function(){ window.close(); }, 500);
    });
  }, false);
}, false);