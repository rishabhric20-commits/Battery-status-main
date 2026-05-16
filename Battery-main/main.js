let batterylavel = document.getElementById("current_stauts");
let BatteryText = document.getElementById("batteryText");
let TimeLeft = document.getElementById("time");
let lowBattery = document.getElementById("batterylow");
let titleName = document.getElementById("title");
let icon = document.querySelector("span");

window.onload = () => {
    if (!navigator.getBattery) {
        alert("Your Brower is not support Battery API");
        return false;
    }
}
navigator.getBattery().then((battery) => {
    function AllBetteryUpdate() {
        setInterval(connectCharger,1000);
    }
    AllBetteryUpdate();
    battery.addEventListener("chargingchange", () => {
        AllBetteryUpdate();
    });
    battery.addEventListener("levelchange", () => {
        AllBetteryUpdate();
    });

    function connectCharger() {
        if (battery.charging) {
            batterylavel.classList.add('active');
            lowBattery.style.display = "none";
            let full = parseFloat((battery.level) * 100);
            if (full > 99) {
                batterylavel.classList.remove('active');
                lowBattery.style.display = "block";
                lowBattery.innerText = "Battery Fully Charged";
                lowBattery.style.color = "#17ea04";
                icon.style.display = "none";
                batterylavel.style.background = "rgb(0, 255, 21)";
            }
            let currentlevel = Math.floor((battery.level) * 100);
            batterylavel.style.height = `${currentlevel}%`;
            BatteryText.innerText = `${currentlevel}%`;
            titleName.innerText = `${currentlevel}% Battery Stauts`;
            TimeLeft.innerHTML = `Charger Connected`;
            icon.style.display = "block";

        }
        else {
            batterylavel.classList.remove('active');
            TimeLeft.innerText = `Scaning Battery...`;
             lowBattery.style.display = "none";
            if (parseInt(battery.dischargingTime)) {
                let batteryTime = (battery.dischargingTime);
                let hour = parseInt(batteryTime / 3600);
                let min = parseInt(batteryTime / 60 - hour * 60);
                TimeLeft.innerText = `${hour} Hr ${min} Min remaining`;
            }
            icon.style.display = "none";
            lowBattery.innerText = " ";
            let currentlevel = Math.floor((battery.level) * 100);
            batterylavel.style.height = `${currentlevel}%`;
            BatteryText.innerText = `${currentlevel}%`;
            titleName.innerText = `${currentlevel}% Battery Stauts`;
            if (currentlevel <= 20) {
                batterylavel.style.background = "red";
                 lowBattery.style.display = "block";
                lowBattery.innerText = `Your Battery is Low ${currentlevel}% Please Connect To Charger`;
                lowBattery.style.color = "red";
            }
            else if (currentlevel > 20 && currentlevel <= 50) {
                batterylavel.style.background = "rgb(251, 255, 0";
            }
            else if (currentlevel > 50 && currentlevel <= 80) {
                batterylavel.style.background = "rgb(128, 255, 0)";
            }
            else {
                batterylavel.style.background = "rgb(0, 255, 21)";
                
            }
        }
    };
});
