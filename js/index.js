const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  //로직들

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left: 45vw; background-color:white; width:200px; height:100px; ";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };

  const nextline = () => {
    attempts += 1;
    if (attempts === 6) return gameover();
    index = 0;
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };

  const handleEnterKey = () => {
    //정답확인
    let 맞은_개수 = 0;

    for (let i = 0; i < 5; i++) {
      const block2 = document.querySelector(
        `.block[data-index='${attempts}${i}']`
      );

      const letter2 = block2.innerText;
      const rightAnswer = answer[i];

      if (letter2 === rightAnswer) {
        맞은_개수 += 1;
        block2.style.background = "#6AAA64";
      } else if (answer.includes(letter2)) block2.style.background = "#C9B458";
      else block2.style.background = "#787C7E";
      block2.style.color = "white";
      console.log(letter2, rightAnswer);
    }

    if (맞은_개수 === 5) gameover();
    else nextline();
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    // console.log(event.key, event.keyCode);
    const thisblock = document.querySelector(
      `.block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisblock.innerText = key;
      //   index = index +1
      // index +=1
      index++;
    }
  };

  const startTimer = () => {
    const startTime = new Date();
    function setTime() {
      const now_time = new Date();
      const flow_time = new Date(now_time - startTime);
      const minute = flow_time.getMinutes().toString().padStart(2, "0");
      const second = flow_time.getSeconds().toString().padStart(2, "0");

      const timeH1 = document.querySelector(".timer");

      timeH1.innerText = `${minute}:${second}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
