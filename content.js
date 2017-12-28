var body = document.querySelector("body");
var div = document.createElement('div');
    div.id = "yt-txt-popup";
    div.onmouseover = function(){ this.style.opacity = "1"; }
    div.onmouseout = function(){ this.style.opacity = "0.5"; }
    body.appendChild(div);

var wrapper = document.createElement('div');
    wrapper.id = "yt-txt-button-wrapper";
    div.appendChild(wrapper);

var text = document.createElement('div');
    text.id = "txt";
    div.appendChild(text);

function fontSizeChanging(pixelValue){
  var style = window.getComputedStyle(text, null).getPropertyValue('font-size');
  var curr = parseInt(style);
  var newSize = pixelValue > 0 ? ++curr : --curr;
  text.style.fontSize = newSize+"px";
}

var biggerButton = createButton("bigger-txt", "A+");    
    biggerButton.onclick = function(){ fontSizeChanging(+2) }
    wrapper.appendChild(biggerButton);

var smallerButton = createButton("smaller-txt", "A-");    
    smallerButton.onclick = function(){ fontSizeChanging(-2)  }
    wrapper.appendChild(smallerButton);

var collapseButton = createButton("collapse-txt", "COLLAPSE");
    collapseButton.onclick = function(){ 
      if (!div.classList.contains ("collapse")) {
        div.classList.toggle ("collapse");
        text.style.display = "none";
      } else {
        div.classList.toggle ("collapse");
        text.style.display = "block";
      }
    }
    wrapper.appendChild(collapseButton);


var closeButton = createButton("close-txt", "CLOSE");    
    closeButton.onclick = function(){ div.style.display = "none"; }
    wrapper.appendChild(closeButton);


function createButton(buttonId, buttonText){
  var buttonElement = document.createElement('a');
      buttonElement.setAttribute('href', '#');
      buttonElement.id = buttonId;
      buttonElement.classList.add("yt-txt-buttons");
      t = document.createTextNode(buttonText);  
      buttonElement.appendChild(t);
  return buttonElement;
}

//iframe .embed-responsive-item src
function youtube_parser(url){
  var regExp = /^.*((youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

function convertSpecialChars(str) {
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&gt;/g, ">");
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&#039;/g, "'");
  return str;
}

function parseSubtitlesToPane(){
  div.style.display = "block"; //Make Div VISIBLE
  var youtubeIframe = document.getElementsByClassName("embed-responsive-item")[0];
  if(youtubeIframe == undefined) {
    text.innerHTML = 'It is not Udacity.com so it will not work with another site today';
    return;
  } else {
    var youtubeUrl = youtubeIframe.src;
  }
  var youtubeId = youtube_parser(youtubeUrl);

  fetch('https://www.youtube.com/api/timedtext?lang=en&v='+youtubeId) //+youtubeId)
  .then(function(response) {   
      return response.text();
    })
  .then(function(string) {
    string = string.replace(/<(?:.|\n)*?>/gm, '');
    string = string.replace(/\[(?:.|\n)*?\]/gm, '');
    string = convertSpecialChars(string);
    text.innerHTML = string;
  });
}




