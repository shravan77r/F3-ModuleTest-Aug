
const api_key="ZaCI2W62TLfthpY7XXcF2o5sKVkZyfD9mRaU38pe";
const currentDate = new Date().toISOString().split("T")[0];
const API_Url=`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${api_key}`; 


function getCurrentImageOfTheDay() {
    fetch(API_Url)
        .then(response => response.json())
        .then(data => {
            fnDisplayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data');
        });
}
getCurrentImageOfTheDay();

function fnDisplayData(data){
    let divcontainer = document.getElementById("current-image-container");
    let generatedhtml = '';

    generatedhtml +=`<h2 id="heading">Picture on ${data.date}</h2>
    <img src="${data.url}" alt="img">
    <h4 id="title">${data.title}</h4>
    <p id="explanation">${data.explanation}</p>`;
    
    divcontainer.innerHTML = generatedhtml;
}

function getImageOfTheDay(date) {
    let apiUrl=`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`; 
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            fnDisplayData(data);
            saveSearch(date);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data');
        });
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
    addSearchToHistory(date);
}

function addSearchToHistory(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchHistoryList = document.getElementById('search-history');
    searchHistoryList.innerHTML = '';
    searches.forEach(item => {
        const listitem = document.createElement('li');
        listitem.textContent = item;
        listitem.addEventListener('click', () => {
            getImageOfTheDay(item);
        });
        searchHistoryList.appendChild(listitem);
    });
}
addSearchToHistory(currentDate);

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    if(!searchInput){
        alert("Please Select Date");
        return false;
    }
    getImageOfTheDay(searchInput);
});


