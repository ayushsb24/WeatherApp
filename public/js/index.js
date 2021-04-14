const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const citynameTxt = document.getElementById('city_name');
const tempText = document.getElementById('temp');
const dateText = document.getElementById('date');
const dayText = document.getElementById('day');
const tempStatusText = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer')

// api.openweathermap.org/data/2.5/weather?q=pune&appid=fd44e4df0a1e135d4fbd2d4820fc90c4
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
]
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thusday',
    'Friday',
    'Saturday'
]

let today = new Date();
let data = ""
let dd = today.getDate();
let mm = months[today.getMonth()];


if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
const dayIndex = today.getDay()
const dayName = days[dayIndex]

dateText.innerText = dd + " " + mm
dayText.innerText = dayName

async function fetchWeather(url) {
    let response = await fetch(url);
    console.log(response);
    data = await response.json();


}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    let cityVal = cityName.value;
    if (cityVal == "") {
        alert("Please enter Name Before Search");
        datahide.classList.add("data-hide");
    } else {
        try {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=fd44e4df0a1e135d4fbd2d4820fc90c4`;
            fetchWeather(url);
            console.log(data)

            citynameTxt.innerText = cityVal;
            const arrData = [data];
            console.log(arrData);

            tempText.innerText = arrData[0].main.temp;
            tempStatusText.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;
            if (tempMood == "Clear") {
                tempStatusText.innerHTML = `<i class="fas fa-sun" style="font - size: 48px;color:#FDB813; "></i>`;
            } else if (tempMood == "Rain") {
                tempStatusText.innerHTML = `<i class="fas fa-cloud-rain" style="font - size: 48px;color:#BBBBBB; "></i>`;

            } else if (tempMood == "Clouds") {
                tempStatusText.innerHTML = `<i class="fas fa-cloud-sun" style="font - size: 48px; "></i>`;
            }
            else if (tempMood == "Snow") {
                tempStatusText.innerHTML = `<i class="fas fa-cloud-rain" style="font - size: 48px; "></i>`;

            }
            else if (tempMood == "Haze") {
                tempStatusText.innerHTML = `<i class="fas fa-wind" style="font - size: 48px;color:#fdfdfd"></i>`;

            }
            datahide.classList.remove("data-hide");
        } catch {
            citynameTxt.innerText = `Please check city name`;
        }
    }
    console.log(submitBtn + cityName + citynameTxt);
    console.log("City" + cityVal);
});
