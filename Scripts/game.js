const paperDiv = document.getElementById("paperChoice");
const rockDiv = document.getElementById("rockChoice");
const scissorDiv = document.getElementById("scissorsChoice");
const scoreDiv = document.getElementById("ScoreCounter");

const overlay = document.getElementById("overlay");
const rulesModal = document.getElementById("rulesModal");
const closeRulesBtn = document.getElementById("closeRulesBtn");
const RulesBtn = document.getElementById("rules");
const ChoiceView = document.getElementById("ChoicesContainer");
const WaitForAiView = document.getElementById("PickedView")
const WinLooseView = document.getElementById("winLooseView");
const myPicks = ['myPaper', 'myScissors', 'myRock'];
var score = 0;

var pickedElement;
const ShowRules = () => {
    rulesModal.style.display = "flex";
    overlay.style.display = "flex";
}
const ShowMyPick = (elementID) => {
    array.forEach(element => {
        if (element == elementID) {
            document.getElementById(element).style.display = "flex";
        } else {
            document.getElementById(element).style.display = "none";
        }
    });


}
const HideRules = () => {
    rulesModal.style.display = "none";
    overlay.style.display = "none";
}
const SetPickedChoice = () => {
    pickedElement = e
}
const SetScore = () => {
    score++;
    scoreDiv.textContent = score;
}
paperDiv.addEventListener('click', SetScore);
rockDiv.addEventListener('click', SetScore);
scissorDiv.addEventListener('click', SetScore);
closeRulesBtn.addEventListener('click', HideRules);
overlay.addEventListener('click', HideRules);
RulesBtn.addEventListener('click', ShowRules);