//const chatbotDocument = document.getElementById("SimplifyBot");

const getAnswer = (questionString) => {
  // WARNING: For POST requests, body is set to null by browsers.
  var data = JSON.stringify({
    question: "Học hàm của bà Trang",
    answerSpanRequest: {
      enable: true,
      confidenceScoreThreshold: 0.2,
      topAnswersWithSpan: 1,
    },
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  const subscriptionKey = "97c7a090fae04e00b0e7fb2e6916ca8b";

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);

      addMessagebyBot(JSON.stringify(this.responseText));
    }
  });

  xhr.open(
    "POST",
    `https://simplifyailanguageservice01.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=SampleSimplifyAIBot&api-version=2021-10-01&deploymentName=production&Subscription-Key=${"a4108118-6339-4d7e-ac8e-c71f4efa3a17"}`
  );
  
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
   xhr.send(data);
};

const addMessagebyBot = ({ answer }) => {
  console.log(answer);
};
const init = () => {
  const btnSend = document.getElementById("btnSend");
  const txtChat = document.getElementById("txtChat");
  console.log("SimplifyBot init");

  btnSend.onclick = () => {
    debugger;
    getAnswer.call(txtChat.textContent);
  };
};

init.call();

console.log("SimplifyBot");

const ChatbotCustomLogic = () => {
  return <></>;
};

export default ChatbotCustomLogic;
