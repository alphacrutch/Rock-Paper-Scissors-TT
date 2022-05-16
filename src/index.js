// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore, doc, collection, query, where, onSnapshot, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const createButton = document.getElementById("SignUpbtn");
const LogIntBtn = document.getElementById("Loginbtn");
const SignUpView = document.getElementById("SignUpView");
const LoggedInView = document.getElementById("LoggedInView");
const userName = document.getElementById("pvpMenuName");
const email = document.getElementById("emailInput");
const pass = document.getElementById("passwordInput")
const LogoutBtn = document.getElementById("LogoutBtn");
const multiplayerMenu = document.getElementById("multiplayerMenu");
const pvpCloseBtn = document.getElementById("pvpCloseBtn");
const multiplayerMenuBtn = document.getElementById("pvpMenuBtn");
const setNameBtn = document.getElementById("setNameBtn");
const editNameInput = document.getElementById("editNameInput");
const editNameInputHolder = document.getElementById("editNameInputHolder");
var Rooms = document.getElementsByClassName("RoomItem");
const GameListView = document.getElementById("GamesListView");
var buttons = document.getElementsByClassName("joinButton");
const GameRoomView = document.getElementById("GameRoomView");
const GameTitleView = document.getElementById("GameTitleView");
const hostName = document.getElementById("hostName");
const readyHostButton = document.getElementById("readyHostButton");
const hostReadyText = document.getElementById("hostReadyText");
const enemyName = document.getElementById("enemyName");
const readyEnemyButton = document.getElementById("readyEnemyButton");
const enemyReadyText = document.getElementById("enemyReadyText");
const GameRoomTitle = document.getElementById("GameRoomTitle");
const WarningLoggerText = document.getElementById("WarningLoggerText");
const WarningLogger = document.getElementById("WarningLogger");
const CreateGameView = document.getElementById("CreateGameView");
/////////////////////////////////////////////////////
//                 Initialization                  //
////////////////////////////////////////////////////
const firebaseConfig = {
    apiKey: "AIzaSyCT--VHTW-kjoTIYG0SBeSTxbFGdB0a0ZE",
    authDomain: "rockpaperscissorstt.firebaseapp.com",
    projectId: "rockpaperscissorstt",
    storageBucket: "rockpaperscissorstt.appspot.com",
    messagingSenderId: "445378532067",
    appId: "1:445378532067:web:a2a6a8895b5fdac6066bd6",
    measurementId: "G-GBHZNZS27X"
};
var ActiveGame = {
    GameId: "",
    GameName: "",
    InProgress: false,
    RoundCount: 0,
    ScoreToWin: 0,
    Host: {
        displayName: "",
        RoundPick: "",
        Ready: false,
        id: "",
        score: 0
    },
    Challenger: {
        displayName: "",
        RoundPick: "",
        Ready: false,
        id: "",
        score: 0
    }
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const user = auth.currentUser;
/////////////////////////////////////////////////////
//                 Authentication                  //
////////////////////////////////////////////////////

const SignUp = () => {
    signInWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            ShowEditNameInput();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + "\n" + errorMessage);
        });
}
const LogIn = () => {

    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
const LogOut = () => {
    signOut(auth);
}
const EditDisplayName = () => {
    var name = editNameInput.value;
    if (name == null || name == " ") {
        alert("Name Can't be empty!");
        return;
    }
    if (name.length < 4) {
        alert("Name must be 4 or more letters!");
        return;
    }
    updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: " "
    }).then(() => {
        HideEditNameInput();
        ShowNameDisplays(auth.currentUser.displayName);
    }).catch((error) => {
        ClearNameDisplays();
        alert(error.code + "/n" + error.message);
    });
}

/////////////////////////////////////////////////////
//                 DataBase Management             //
////////////////////////////////////////////////////


const JoinById = async(id) => {

    if (user == null) {
        return;
    }
    const Gameref = doc(db, "Games", id);
    updateDoc(Gameref, {
        InProgress: true,
        Challenger: {
            displayName: user.displayName,
            RoundPick: "",
            Ready: false,
            id: user.uid,
            score: 0
        }
    }).then((doc) => {
        UpdateActiveGame(doc.data());
        ShowGameRoom();
        UpdateGameRoomUI();
    }).catch(e => alert(e.message));

}
const CreateRooms = (data) => {

    var html = `<div class="RoomItem" >
    <div class="RoomName">${data.GameName}</div>
    <div class="roomPoints">pts ${data.ScoreToWin}</div>
    <div class="joinButton button" id="${data.GameId}" >
        <div>Join</div>
    </div>
</div>`;
    GameListView.innerHTML += html;
}

const CreateGame = async() => {
    var user = auth.currentUser;
    var pointGoal = GetSelectedPointGoal();
    ActiveGame = {
        GameId: user.uid,
        GameName: user.displayName,
        InProgress: false,
        RoundCount: 0,
        ScoreToWin: Number(pointGoal),
        Host: {
            displayName: user.displayName,
            RoundPick: "",
            Ready: false,
            id: user.uid,
            score: 0
        },
        Challenger: {
            displayName: "",
            RoundPick: "",
            Ready: false,
            id: "",
            score: 0
        }
    }
    setDoc(doc(db, "Games", user.uid), ActiveGame).then(
        () => {
            ShowGameRoom();
            UpdateHostName(ActiveGame.Host.displayName);
            UpdateGameRoomTitle(ActiveGame.GameName + "'s Room");
        }
    ).catch(e => console.log(e));
}
const GetGameList = async() => {
    ClearRooms();
    const q = query(collection(db, "Games"), where("InProgress", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        CreateRooms(doc.data());
    });
    setTimeout(SetJoinButtonListeners, 1500);
}
const CheckForGameInProgress = () => {

    }
    /////////////////////////////////////////////////////
    //                Plumbing                        //
    ////////////////////////////////////////////////////
const CheckForGameAndUpdateUI = () => {
    if (ActiveGame)
}
const ShowCreateGameView = () => {
    CreateGameView.style.display = "flex";
}
const HideCreateGameView = () => {
    CreateGameView.style.display = "none";
}
const ShowWarning = (errorCode, errorMessage) => {
    alert(`Error: ${errorCode}. \n Message: ${errorMessage}`);
}
const UpdateHostName = (string) => hostName.textContent = string;
const UpdateChallengerName = (string) => enemyName.textContent = string;
const UpdateGameRoomTitle = (string) => GameRoomTitle.textContent = string;
const UpdateHostReady = () => {
    if (user.uid == ActiveGame.Host.id) {
        hostReadyText.textContent = "Host Ready !";
        hostReadyText.style.color = "greenyellow";
    } else {
        ShowWarning("You Are Not The Host!", "Try clicking the Challenger's 'Ready' button instead. ");
    }

}
const UpdateChallengerReady = () => {
    if (user.uid == ActiveGame.Challenger.id) {
        enemyReadyText.textContent = "Host Ready !";
        enemyReadyText.style.color = "greenyellow";
    } else {
        ShowWarning("Wait For Challenger!", "Try clicking the Host's 'Ready' button instead. ");
    }
}
const UpdateGameRoomUI = () => {
    UpdateHostName(ActiveGame.Host.displayName);
    UpdateChallengerName(ActiveGame.Challenger.displayName);
    UpdateGameRoomTitle(ActiveGame.GameName + "'s Room");
}
const ShowGameRoom = () => {
    LoggedInView.style.display = "none";
    GameListView.style.display = "none";
    GameRoomView.style.display = "flex";
    GameTitleView.style.display = "flex";
}
const ShowGameListView = () => {
    GameRoomView.style.display = "none";
    GameTitleView.style.display = "none";
    LoggedInView.style.display = "flex";
    GameListView.style.display = "flex";
}
const UpdateActiveGame = (data) => {
    ActiveGame.Challenger.id = data.Challenger.id;
    ActiveGame.Challenger.Ready = data.Challenger.Ready;
    ActiveGame.Challenger.RoundPick = data.Challenger.RoundPick;
    ActiveGame.Challenger.displayName = data.Challenger.displayName;
    ActiveGame.Challenger.score = data.Challenger.score;
    ActiveGame.Host.id = data.Challenger.id;
    ActiveGame.Host.Ready = data.Challenger.Ready;
    ActiveGame.Host.RoundPick = data.Challenger.RoundPick;
    ActiveGame.Host.displayName = data.Challenger.displayName;
    ActiveGame.Host.score = data.Challenger.score;
    ActiveGame.GameId = data.GameId;
    ActiveGame.GameName
    ActiveGame.InProgress
    ActiveGame.RoundCount
    ActiveGame.ScoreToWin

}
const GetSelectedPointGoal = () => {
    var radios = document.getElementsByName("scoreLimit");
    radios.forEach(radio => {
        if (radio.checked) {
            console.log(radio.value);
            return radio.value;
        }
    });

}
const RefreshGamesList = () => {
    GetGameList()
        .catch(e => console.log(e.message));
}
const ClearRooms = async() => {
    GameListView.innerHTML = "";

}
const SetJoinButtonListeners = () => {
    for (var button of buttons) {
        button.addEventListener('click', function(e) {
            console.log(this.id);
            JoinById(this.id).catch(error => console.log(error));
        }, false);
    }
}
const ShowUserStatsView = () => {
    SignUpView.style.display = "none";
    LoggedInView.style.display = "flex";
}
const HideUserStatsView = () => {
    LoggedInView.style.display = "none";
    SignUpView.style.display = "flex";

}
const RefreshGameRoomUI = () => {
    if (ActiveGame.GameName == "") {
        ShowGameListView();
    }
    if (ActiveGame.GameName != "") {
        ShowGameRoom();
        UpdateGameRoomUI();
    }
}
const ShowEditNameInput = () => editNameInputHolder.style.display = "flex";
const HideEditNameInput = () => editNameInputHolder.style.display = "none";
const ShowMultiplayerMenu = () => multiplayerMenu.style.display = "grid";
const HideMultiplayerMenu = () => multiplayerMenu.style.display = "none";
const ShowNameDisplays = (name) => userName.textContent = name;
const ClearNameDisplays = () => userName.textContent = "";
//                                  //
//        Event Listeners           //
//                                  //
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log(" user signed in");
        ShowUserStatsView();
        ShowCreateGameView();
        ShowNameDisplays(user.displayName);
        if (user.displayName != null) {
            HideEditNameInput();
        }
    } else {
        console.log("no user");
        HideUserStatsView();

    }
});
const createGameButton = document.getElementById("createGameButton");

createGameButton.addEventListener('click', function() {
    CreateGame().then().catch(error => console.log(error));
});
pvpCloseBtn.addEventListener('click', HideMultiplayerMenu);
multiplayerMenuBtn.addEventListener('click', ShowMultiplayerMenu);
LogIntBtn.addEventListener('click', LogIn);
createButton.addEventListener('click', SignUp);
LogoutBtn.addEventListener('click', LogOut);
setNameBtn.addEventListener('click', EditDisplayName);
readyHostButton.addEventListener('click', UpdateHostReady);
readyEnemyButton.addEventListener('click', UpdateChallengerReady);
setTimeout(RefreshGamesList, 2000);
setTimeout(RefreshGameRoomUI, 2200);