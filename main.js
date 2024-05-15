const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const millisecondsInADay = 1000 * 60 * 60 * 24;
const patternWeekCount = 6;
const firstDayOfWeek = 1;
const referenceDate = new Date("2024-01-01");

function calculatePattern() {
    let dateSelected = document.getElementById("date").value;
    let resultBox = document.getElementById("result");

    if (!dateSelected) {
        resultBox.innerHTML = "Please select this employee's first day of work on this pattern.";
        return;
    }
    
    let effectiveDate = new Date(dateSelected);
    
    let effectiveWeek = getPatternWeek(referenceDate, effectiveDate);
    
    resultBox.innerHTML = `For an employee starting on <b>${weekday[effectiveDate.getDay()]} - ${effectiveDate.toLocaleDateString()}</b>, the week to select is <b>Week ${effectiveWeek}</b>.`;
}

function getPatternWeek(referenceDate, effectiveDate)
{
    let referenceDayOfWeek = getDayOfWeek(referenceDate);
    let effectiveDayOfWeek = getDayOfWeek(effectiveDate);

    let referenceFirstDayOfWeek = new Date();
    let effectiveFirstDayOfWeek = new Date();
    referenceFirstDayOfWeek = addDays(referenceDate, -referenceDayOfWeek);
    effectiveFirstDayOfWeek = addDays(effectiveDate, -effectiveDayOfWeek);
    let differenceInDays = Math.round((effectiveFirstDayOfWeek - referenceFirstDayOfWeek) / millisecondsInADay);
    
    let deltaWeeks = Math.floor(differenceInDays / 7);
    let effectiveWeek = deltaWeeks % patternWeekCount;

    // Make sure the effective week is always positive
    effectiveWeek = effectiveWeek < 0 ? effectiveWeek + patternWeekCount : effectiveWeek;
    
    // For display purposes this needs to be a value between 1 and 6
    return effectiveWeek + 1;
}

function addDays(date, days)
{
    return new Date(date.getTime() + (days * millisecondsInADay));
}

// Convert day of week value to Mon = [0] - Sun = [6]
function getDayOfWeek(date)
{
    let dayOfWeek = date.getDay() - firstDayOfWeek + 7;
    dayOfWeek %= 7;
    return dayOfWeek;
}