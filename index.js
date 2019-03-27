window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector("i.fa.fa-microphone");
let paragraph = document.createElement("p");
let container = document.querySelector(".text-box");
container.appendChild(paragraph);

icon.addEventListener("click", () => {
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = event => {
    const speechToText = event.results[0][0].transcript;

    paragraph.textContent = speechToText;

    if (event.results[0].isFinal) {
      if (speechToText.includes("what is the time")) {
        speak(getTime);
      }

      if (speechToText.includes("what is today's date")) {
        speak(getDate);
      }

      if (speechToText.includes("what is the weather in")) {
        getTheWeather(speechToText);
      }

      if (speechToText.includes("who is my mummy")) {
        speak(getmomdetails);
      }

      if (speechToText.includes("who is my father")) {
        speak(getdaddetails);
      }

      if (speechToText.includes("who is my sister")) {
        speak(getsisdetails);
      }

      if (speechToText.includes("who is Sameer")) {
        speak(getsameerdetails);
      }
    }
  };
};

const speak = action => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  })}`;
};

const getDate = () => {
  const time = new Date(Date.now());
  return `today is ${time.toLocaleDateString()}`;
};

const getmomdetails = () => {
  return `Your mom is sonu sharma and she is very pretty and talented`;
};

const getdaddetails = () => {
  return `Your dad is tarun sharma and he is sanki and taklu`;
};

const getsisdetails = () => {
  return `Your sister is aakriti sharma and she is beautiful and an aspiring Chartered Accountant `;
};

const getsameerdetails = () => {
  return "Sameer is a talented boy and an Artificial Intelligence enthusiast";
};

const getTheWeather = speech => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      speech.split(" ")[5]
    }&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(weather) {
      if (weather.cod === "404") {
        utterThis = new SpeechSynthesisUtterance(
          `I cannot find the weather for ${speech.split(" ")[5]}`
        );
        synth.speak(utterThis);
        return;
      }
      utterThis = new SpeechSynthesisUtterance(
        `the weather condition in ${weather.name} is mostly full of ${
          weather.weather[0].description
        } at a temperature of ${weather.main.temp} degrees Celcius`
      );
      synth.speak(utterThis);
    });
};
