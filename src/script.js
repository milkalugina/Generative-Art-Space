
var apodContain = document.getElementById('apod');
var API_KEY = 'SiecJPnwCtVpotFeFqrT767GG3GzfAdgro3pCufg';

var datePick = document.getElementById('date');
datePick.max = todaysDate();
datePick.value = todaysDate();
var date = datePick.value;

var url = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&date=' + date;


async function makeApiRequest(url) {
    var myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === XMLHttpRequest.DONE) {
            if (myRequest.status === 200) {
                var responseText = myRequest.responseText;
                myRequest.onload = function () {
                    var responseJson = JSON.parse(responseText);
                    console.log(responseJson);
                    renderHTML(responseJson);
                }
            } else {
                var errorMessage = document.getElementById('error');
                errorMessage.innerHTML = "This date this not work";
            }
        }
    }

    myRequest.open('GET', url, true);
    myRequest.send();
};

makeApiRequest(url);

datePick.addEventListener('change', function(e){

        date = datePick.value;
        url = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&date=' + date;
        makeApiRequest(url);

})

function todaysDate() {
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    return year + '-' + month + '-' + day;
    datePick.setAttribute("max", datePick.max);
}

function renderHTML(data) {
    var htmlString = "";

    htmlString = "<div class = 'image' >" + "<img src = " + data.url + "></img>" + "</div>" + "<div class = 'text' >" + "<h1>" + data.title + "</h1>" + "<p>" + data.explanation + "</p>" + "</div>";
    apodContain.innerHTML = htmlString;
}

