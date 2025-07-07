const trainInput = document.getElementById("train_no");
const sourceInput = document.getElementById("source");
const destinationInput = document.getElementById("destination");

let currentRouteStations = [];

trainInput.addEventListener("change", () => {
    const trainNo = trainInput.value.trim();
    if (trainNo.length) {
        fetch(`/get_stations/${trainNo}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    currentRouteStations = data;
                } else {
                    currentRouteStations = [];
                }
                sourceInput.value = "";
                destinationInput.value = "";
                document.getElementById("result-Box1").innerHTML = "";
                document.getElementById("result-Box2").innerHTML = "";
            });
    }
});

sourceInput.addEventListener("keyup", () => {
    showSuggestions(sourceInput, "result-Box1", currentRouteStations);
});

destinationInput.addEventListener("keyup", () => {
    const sourceVal = sourceInput.value.trim().toUpperCase();
    let filteredRoute = currentRouteStations;

    if (currentRouteStations.includes(sourceVal)) {
        const sourceIndex = currentRouteStations.indexOf(sourceVal);
        filteredRoute = currentRouteStations.slice(sourceIndex + 1);
    }

    showSuggestions(destinationInput, "result-Box2", filteredRoute);
});

function showSuggestions(inputElem, resultBoxId, stationList) {
    const input = inputElem.value.toUpperCase().trim();
    const box = document.getElementById(resultBoxId);
    box.innerHTML = "";

    if (!input || stationList.length === 0) return;

    const filtered = stationList.filter(st => st.includes(input));
    const ul = document.createElement("ul");

    filtered.forEach(station => {
        const li = document.createElement("li");
        li.textContent = station;
        li.onclick = () => {
            inputElem.value = station;
            box.innerHTML = "";
        };
        ul.appendChild(li);
    });

    box.appendChild(ul);
}