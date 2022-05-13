const paperDiv = document.getElementById("paper");
const rockDiv = document.getElementById("rock");
const scissorDiv = document.getElementById("scissors");
const scoreDiv = document.getElementById("ScoreCounter");

const overlay = document.getElementById("overlay");
const rulesModal = document.getElementById("rulesModal");
const closeRulesBtn = document.getElementById("closeRulesBtn");
const RulesBtn = document.getElementById("rules");
const ChoiceView = document.getElementById("ChoicesContainer");
const WaitForAiView = document.getElementById("PickedChoiceContainer");
const WinLooseView = document.getElementById("winLoseView");
const WinLooseText = document.getElementById("winLoseText");
const PlayAgainButton = document.getElementById("PlayAgainButton");
var myChoice;
var aiChoice;
var score = 12;
const winPoints = 2;
const losePoints = 1;

var myPicks = ["myPaper", "myRock", "myScissors"];
var AiPicks = ["AiPaper", "AiRock", "AiScissors", "AiBlank"];
const ShowRules = () => {
    rulesModal.style.display = "flex";
    overlay.style.display = "flex";
}
const ShowMyPick = (elementID) => {
    myPicks.forEach(element => {
        if (element == elementID) {
            document.getElementById(element).style.display = "flex";
        } else {
            document.getElementById(element).style.display = "none";
        }
    });
}
const ShowAiPick = (elementID) => {
    AiPicks.forEach(element => {
        if (element == elementID) {
            document.getElementById(element).style.display = "flex";
        } else {
            document.getElementById(element).style.display = "none";
        }
    });
    CheckWinner();
}
const ShowHouseChoice = () => {
    HouseChoose();
    setTimeout(function() { ShowAiPick(aiChoice); }, 1500);
}
const HouseChoose = () => {
    var randomIndex = Math.floor(Math.random() * 2);
    aiChoice = AiPicks[randomIndex];
}
const PlayAgain = () => {
    WinLooseView.style.display = "none";
    WaitForAiView.style.display = "none";
    ChoiceView.style.display = "flex";
    myChoice = "";
    aiChoice = "";
    ResetView();
}
const ResetView = () => {
    AiPicks.forEach(element => {
        document.getElementById(element).style.display = "none";
    });
    myPicks.forEach(element => {
        document.getElementById(element).style.display = "none";
    });
    document.getElementById("AiBlank").style.display = "flex";
}
const SaveScore = () => {
    localStorage.setItem("Score", score.toString());
}
const LoadSave = () => {

    if (localStorage.getItem("Score") != null) {
        score = localStorage.getItem("Score");
    }
}
const CheckWinner = () => {
    if (aiChoice.includes("Paper") && myChoice == "paper") {
        ShowResult("Draw");
        ShowScore();
    }
    if (aiChoice.includes("Paper") && myChoice == "rock") {
        ShowResult("You Lose");
        MinusFromScore();
        ShowScore();
    }
    if (aiChoice.includes("Paper") && myChoice == "scissors") {
        ShowResult("You Win");
        AddToScore();
        ShowScore();
    }
    if (aiChoice.includes("Rock") && myChoice == "rock") {
        ShowResult("Draw");
        ShowScore();
    }
    if (aiChoice.includes("Rock") && myChoice == "paper") {
        ShowResult("You Win");
        AddToScore();
        ShowScore();
    }
    if (aiChoice.includes("Rock") && myChoice == "scissors") {
        ShowResult("You Lose");
        MinusFromScore();
        ShowScore();
    }
    if (aiChoice.includes("Scissors") && myChoice == "rock") {
        ShowResult("You Win");
        AddToScore();
        ShowScore();
    }
    if (aiChoice.includes("Scissors") && myChoice == "scissors") {
        ShowResult("Draw");
        ShowScore();
    }
    if (aiChoice.includes("Scissors") && myChoice == "paper") {
        ShowResult("You Lose");
        MinusFromScore();
        ShowScore();
    }
}
const ShowResult = (string) => {

    WinLooseView.style.display = "flex"
    WinLooseText.textContent = string;
}
const ShowPickedView = () => {
    ChoiceView.style.display = "none";
    WaitForAiView.style.display = "flex";
}
const HideRules = () => {
    rulesModal.style.display = "none";
    overlay.style.display = "none";
}
const AddToScore = () => {
    score += winPoints;

}
const ShowScore = () => {
    scoreDiv.textContent = score;
}
const MinusFromScore = () => {
    score -= losePoints;
}
const SetChoice = (string) => {
    myChoice = string;
    switch (string) {
        case "paper":
            ShowPickedView();
            ShowMyPick("myPaper");
            ShowHouseChoice();

            break;
        case "rock":
            ShowPickedView();
            ShowMyPick("myRock");
            ShowHouseChoice();
            break;
        case "scissors":
            ShowPickedView();
            ShowMyPick("myScissors");
            ShowHouseChoice();

            break;
        default:
            break;
    }
}
paperDiv.addEventListener('click', function(e) {
    SetChoice(this.id);

});
rockDiv.addEventListener('click', function(e) {
    SetChoice(this.id);
});
scissorDiv.addEventListener('click', function(e) {
    SetChoice(this.id);

});
closeRulesBtn.addEventListener('click', HideRules);
overlay.addEventListener('click', HideRules);
RulesBtn.addEventListener('click', ShowRules);
PlayAgainButton.addEventListener('click', PlayAgain);