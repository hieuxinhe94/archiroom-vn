//const chatbotDocument = document.getElementById("SimplifyBot");

const getAnswer = (questionString) => {
  console.log("getAnswer");
  // WARNING: For POST requests, body is set to null by browsers.
  var data = JSON.stringify({
    top: 3,
    question: "xin chao",
    includeUnstructuredSources: true,
    answerSpanRequest: {
      enable: true,
      topAnswersWithSpan: 1,
    },
  });

  
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
    getAnswer.call();
  };
};

init.call();

const ChatbotCustomLogic = () => {
  return <></>;
};

export default ChatbotCustomLogic;
