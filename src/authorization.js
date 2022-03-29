let buttonAuthorizeIn = document.querySelector(".signInBtn");
let butttonImage = document.querySelector(".image");
let buttonLogo = document.querySelector(".logo");
let navigation = document.querySelector(".navigation");
let containerLinks = document.querySelector(".links");

let userMainObj;
let userHeroObj;
let userMatchesObj;
let userMatchesInfo = [];
let serverHeroesObj;
let userFriendsObj;
let userID;
let userWLObj;

// По нажатию проверяем пароль и вызываем функцию, которые отправляет запрос на получение данных по ID указанному в Input(email)
buttonAuthorizeIn.addEventListener("click", () => {
    let password = "1";
    let passwordInput = document.querySelector(".passInp").value;
    let emailInput = document.querySelector(".emailInp").value;
    
    if(passwordInput == password) {
        userID = emailInput;
        getUserMainData(userID);
        closePopUp();
        getUserHeroData(userID);
        getUserMatchesData(userID)
        getServerHeroesName();
        getTopFriends(userID);
        getUserWinLose(userID)
    }
})

// Запрос на получение общих данных о пользователе по его Steam 32 ID
function getUserMainData(userId) {
    fetch(`https://api.opendota.com/api/players/${userId}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        createUserMainObj(data);
		showProfileIcon(data)
    })
}

// Создание глобального объекта с данными пользователя
function createUserMainObj(userData) {
    userMainObj = userData;
}

function getUserHeroData(userId) {
    fetch(`https://api.opendota.com/api/players/${userId}/heroes`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        createUserHeroObj(data);
    })
}

function createUserHeroObj(userHeroData) {
    userHeroObj = userHeroData;
}

function getServerHeroesName() {
    fetch("https://api.opendota.com/api/heroes")
    .then(response => {
    	return response.json()
    })
    .then(data => {
    	serverHeroesObj = data;
    })
}

function getUserMatchesData(userId) {
    fetch(`https://api.opendota.com/api/players/${userId}/matches?limit=10`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        createUserMatchesObj(data)
    })
}

function createUserMatchesObj(userMatchesData) {
    userMatchesObj = userMatchesData;
}

function getTopFriends(userId) {
    fetch(`https://api.opendota.com/api/players/${userId}/peers`)
    .then(response => {
        return response.json()
    })
    .then(data => {

        console.log(data);
        createUserFriendsObj(data);
    })
}

function createUserFriendsObj(userFriendsData) {
    userFriendsObj = userFriendsData;
}

function getUserWinLose(userId) {
    fetch(`https://api.opendota.com/api/players/${userId}/wl`)
    .then(response => {
    	return response.json()
    })
    .then(data => {
    	createUserWLObj(data);
    })
}

function createUserWLObj(userWLData) {
    userWLObj = userWLData;
}

// Закрытие окна авторизации 
function closePopUp() {
    let buttonCancel = document.querySelector(".cancel");
    buttonCancel.click()
}

// Показываем иконку с автаркой вместо кнопки "Вход/Регистрация"
function showProfileIcon(userInfo) {
    let buttonSignContainer = document.querySelector(".sign");
    let buttonSignInUp = document.querySelector(".signInUp");
    let butttonExit = document.querySelector(".exit");
    let profileSrc = userInfo.profile.avatarmedium;
    butttonExit.style.display = "flex";
    buttonSignInUp.style.display = "none";
    buttonSignContainer.lastElementChild.innerHTML = `<img src=${profileSrc} alt="">`;
}

// По нажатию меняем меню и меняем весь контент со страницы с общей информацией на профиль пользователя
butttonImage.addEventListener("click", () => {
    navigation.style = "display:flex; justify-content:space-between;";
    containerLinks.style.display = "none";
    headerContent.style.display = "none";
    header.style.height = "auto"
    main.style.display = "none";
    userProfile.style.display = "flex";
    showProfileMainInfo();
    showTopHero(userHeroObj);
})

buttonLogo.addEventListener("click", () => {
	navigation.style = "display:grid; align-items: center;";
	containerLinks.style = "display:flex; justify-content: space-around;";
	headerContent.style.display = "flex";
	header.style.height = "88vh"
	main.style.display = "block";
	userProfile.style.display = "none";
})

// 252812353

function showProfileMainInfo() {
    showMainInfo(userMainObj);
    showTopHero(userHeroObj);
    showCurRank(userMainObj);
    getAllMatches(userMatchesObj);
    showTopFriend(userFriendsObj);
    showWinLose(userWLObj);
} 

function showTopHero(userHeroData) {
    let popularHeroName;
    serverHeroesObj.forEach(element => {
        if (element.id == userHeroData[0].hero_id)
        {
            popularHeroName = element.localized_name;
        }
    });
    let containerTopHero = document.querySelector(".popular-hero");
    let heroName = popularHeroName.replace(/\s/g, '_').toLowerCase();
    containerTopHero.innerHTML = `
        <img class="hero-img userInfo" src="https://api.opendota.com/apps/dota2/images/dota_react/heroes/${heroName}.png?" alt="">
        <h4 class="hero-name userInfo">${popularHeroName}</h4>
        <div class="description medium hero-wl userInfo">
            <p>Games: ${userHeroData[0].games}</p>
            <p>Win: ${userHeroData[0].win}</p>
            <p>Lose: ${userHeroData[0].games - userHeroData[0].win}</p>
        </div>
    `;
}

// Функция получает номер ранга и создаёт соответствующую ему картинку
function showCurRank(userData) {
    let rankStars = userData.rank_tier % 10;
    let firstNumber = Number(String(userData.rank_tier)[0]);
    let containerRank = document.querySelector(".current-rank");
    containerRank.innerHTML = `
    <img class="user-info rank-star" src="https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${rankStars}.png" alt="">
    <img class="user-info rank" src="https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${firstNumber}.png" alt="">
    `;
}

function showMainInfo(userData) {
    let containerGeneralInfo = document.querySelector(".name-and-country");
    containerGeneralInfo.innerHTML = `<h3 class="nickname userInfo">${userData.profile.personaname}</h3>
    <img class="medium-img userInfo" src="${userData.profile.avatarfull}" alt="">`
}

function showWinLose(winLoseData) {
    let games = document.querySelector(".all-games");
    let wins = document.querySelector(".all-wins");
    let loses = document.querySelector(".all-loses");

    games.innerHTML = `${winLoseData.win + winLoseData.lose}`;
    wins.innerHTML = `${winLoseData.win}`;
    loses.innerHTML = `${winLoseData.lose}`;
}

function showMatches(matchesData) {
    let matchesContainer = document.querySelector(".previous-matches");
    matchesContainer.innerHTML = "";
    for (let index = 0; index < matchesData.length; index++) {
        let matchHeroName = "";
        serverHeroesObj.forEach(item => {
            if (item.id == matchesData[index].hero_id)
            {
                matchHeroName = item.localized_name;
            }
        });

        let radiantWin;
        let matchHeroNameImg = matchHeroName.replace(/\s/g, '_').toLowerCase();
        let matchScore;
        let dateStart;
        userMatchesInfo.forEach( (element) => {
            if (matchesData[index].match_id == element.match_id) {
                dateStart = new Date(element.start_time * 1000)
                element.players.forEach( (player) => {
                    console.log(player.win, player.personaname, userMainObj.profile.personaname);
                    if (player.personaname == userMainObj.profile.personaname) {
                        if (player.win == 1) {
                            radiantWin = '<p class="description small green">Победа</p>';
                        } else {
                            radiantWin = '<p class="description small red">Поражение</p>';
                        }

                        if (player.win == 1) {
                            if (player.isRadiant) {
                                matchScore = `<p class="description small red">${element.dire_score}</p> - <p class="description small green">${element.radiant_score}</p>`
                            } else {
                                matchScore = `<p class="description small green">${element.dire_score}</p> - <p class="description small red">${element.radiant_score}</p>`
                            }
                        } else {
                            if (player.isRadiant) {
                                matchScore = `<p class="description small green">${element.dire_score}</p> - <p class="description small red">${element.radiant_score}</p>`
                            } else {
                                matchScore = `<p class="description small red">${element.dire_score}</p> - <p class="description small green">${element.radiant_score}</p>`
                            }
                        }
                        // console.log("Нашёлся!");
                    }
                })
            }

        });
        matchesContainer.innerHTML += `
            <div class="matсh">
                <div class="match-hero">
                    <img class="hero-img" src="https://api.opendota.com/apps/dota2/images/dota_react/heroes/${matchHeroNameImg}.png?" alt="">
                    <h5 class="hero-name">${matchHeroName}</h5>
                </div>
                <div class="hero-kda">    
                    <p class="description small">K D A</p>
                    <p class="description small">${matchesData[index].kills} ${matchesData[index].deaths} ${matchesData[index].assists}</p>
                </div>
                <div class="radiant-win">
                    ${radiantWin}
                </div>
                <div class="match-duration">
                    <p class="description small">${Math.round(matchesData[index].duration/60)} min</p>
                </div>
                <div class="match-score">
                    <p class="description small">${matchScore}</p>
                </div>
                <div class="match-time-start">
                    <p class="description small">Начало: ${dateStart.getHours()}:${dateStart.getMinutes()} ${dateStart.getDate()}.${dateStart.getMonth()}.${dateStart.getFullYear()}</p>
                </div>
            </div>
        `;
    }
    let match = Array.from(document.querySelectorAll(".matсh"));
    match.forEach( (elem,indexForTime) => {
        setTimeout( () => {
            elem.classList.add("matсh-show")
        }, indexForTime*300)
    });

}

function getAllMatches(matchesData) {    
    matchesData.forEach( (element) => {
        getMatchById(element.match_id);
    });
}

function getMatchById(matchId) {
    fetch(`https://api.opendota.com/api/matches/${matchId}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        userMatchesInfo.push(data)
        console.log(data);
        if (userMatchesInfo.length == 10) {
            
            showMatches(userMatchesObj);
        }
    })
}

function showTopFriend(userFriendsData) {
    let friendsContainer = document.querySelector(".top-friends");
    for (let index = 0; index < 5; index++) {
        friendsContainer.innerHTML += `
        <div class="friend">
            <div class="friend-title">
                <img src="${userFriendsData[index].avatarfull}" alt="">
                <p class="friend-name description large">${userFriendsData[index].personaname}</p>
            </div>
            <div class="friend-main">
                <div class="friend-games">
                    <p class="description small">Всего</p>
                    <p class="description small">${userFriendsData[index].with_games}</p>
                </div>
                <div class="friend-win">
                    <p class="description small">Побед</p>
                    <p class="description small green">${userFriendsData[index].with_win}</p>
                </div>
            </div>
		</div>
        `;
    }
}
