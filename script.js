const calendar = document.getElementById("calendar");
const totalDaysEl = document.getElementById("totalDays");
const streakEl = document.getElementById("streak");

const DAYS = 365;

let habitData = JSON.parse(localStorage.getItem("habitData")) || {};

generateCalendar();
updateStats();

function generateCalendar() {
    calendar.innerHTML = "";

    for (let i = 0; i < DAYS; i++) {
        const date = getDateString(i);

        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        const level = habitData[date] || 0;
        if (level > 0) {
            dayDiv.classList.add(`level-${level}`);
        }

        dayDiv.addEventListener("click", () => {
            let newLevel = (habitData[date] || 0) + 1;
            if (newLevel > 4) newLevel = 0;

            habitData[date] = newLevel;
            localStorage.setItem("habitData", JSON.stringify(habitData));

            generateCalendar();
            updateStats();
        });

        calendar.appendChild(dayDiv);
    }
}

function getDateString(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - (DAYS - daysAgo));
    return date.toISOString().split("T")[0];
}

function updateStats() {
    const dates = Object.keys(habitData);
    const activeDays = dates.filter(date => habitData[date] > 0).length;

    totalDaysEl.textContent = activeDays;

    streakEl.textContent = calculateStreak();
}

function calculateStreak() {
    let streak = 0;
    let today = new Date();

    for (let i = 0; i < DAYS; i++) {
        const dateStr = today.toISOString().split("T")[0];
        if (habitData[dateStr] > 0) {
            streak++;
        } else {
            break;
        }
        today.setDate(today.getDate() - 1);
    }

    return streak;
}
