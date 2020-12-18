const teens = {
	0: "ten",
	1: "eleven",
	2: "twelve",
	3: "thirteen",
	4: "fourteen",
	5: "fifteen",
	6: "sixteen",
	7: "seventeen",
	8: "eighteen",
	9: "nineteen",
};

const tens = {
	2: "twenty",
	3: "thirty",
	4: "forty",
	5: "fifty",
};

const hourOnes = {
	0: "twelve",
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine",
};

const minuteOnes = {
	0: "",
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine",
};

const finalTime = {
	hour: "",
	minute: "",
	period: "",
};

function timeWord(timeString) {
	const hour = timeString.substring(0, 2);
	const minute = timeString.substring(3, 5);
	return determineTime(hour, minute);
}

function determineTime(hour, minute) {
	if (hour === "00" && minute === "00") {
		return "midnight";
	}
	if (hour === "12" && minute === "00") {
		return "noon";
	}
	hourWord(hour);
	minuteWord(minute);
	return `${finalTime.hour} ${finalTime.minute} ${finalTime.period}`;
}

function hourWord(hour) {
	if (parseInt(hour) < 12) {
		determineHour(hour, "am");
	} else {
		hour = `${parseInt(hour) - 12}`;
		if (hour.length === 1) {
			hour = `0${hour}`;
		}
		determineHour(hour, "pm");
	}
}

function minuteWord(minute) {
	if (minute[0] === "0") {
		finalTime.minute = `oh ${minuteOnes[minute[1]]}`;
	} else if (minute[0] === "1") {
		finalTime.minute = teens[minute[1]];
	} else {
		finalTime.minute = `${tens[minute[0]]} ${minuteOnes[minute[1]]}`;
	}
}

function determineHour(hour, period) {
	finalTime.period = period;
	const key = parseInt(hour[1]);
	if (hour[0] === "0") {
		finalTime.hour = hourOnes[key];
	} else if (hour[0] === "1") {
		finalTime.hour = teens[key];
	}
}

module.exports = timeWord;
