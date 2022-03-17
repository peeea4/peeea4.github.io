let buttonAuthorizeIn = document.querySelector(".signInBtn");
let buttonSignInUp = document.querySelector(".signInUp");
let butttonExit = document.querySelector(".exit");
let butttonImage = document.querySelector(".image");
let buttonCancel = document.querySelector(".cancel");
let buttonSignContainer = document.querySelector(".sign");
let buttonLogo = document.querySelector(".logo");

let containerLinks = document.querySelector(".links");
let navigation = document.querySelector(".navigation");

let userMainObj;
let userHeroObj;
let userMatchesObj;
let serverHeroesObj;

// По нажатию проверяем пароль и вызываем функцию, которые отправляет запрос на получение данных по ID указанному в Input(email)
buttonAuthorizeIn.addEventListener("click", () => {
    let password = "1";
    let passwordInput = document.querySelector(".passInp").value;
    let emailInput = document.querySelector(".emailInp").value;
    
    if(passwordInput == password) {
        let userId = emailInput;
        getUserMainData(userId);
        closePopUp();
        getUserHeroData(userId);
        getUserMatchesData(userId)
        getServerHeroesName();
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

// Закрытие окна авторизации 
function closePopUp() {
    buttonCancel.click()
}

// Показываем иконку с автаркой вместо кнопки "Вход/Регистрация"
function showProfileIcon(userInfo) {
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
    showMatches(userMatchesObj)
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
    console.log(popularHeroName, heroName);
}

// Функция получает номер ранга и создаёт соответствующую ему картинку
function showCurRank(userData) {
    let rankStars = userData.rank_tier % 10;
    let firstNumber = Number(String(userData.rank_tier)[0]);
    let containerRank = document.querySelector(".current-rank");
    containerRank.innerHTML = `<img class="user-info rank-star" src="https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${rankStars}.png" alt="">
    <img class="user-info rank" src="https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${firstNumber}.png" alt="">`
}

function showMainInfo(userData) {
    let containerGeneralInfo = document.querySelector(".name-and-country");
    containerGeneralInfo.innerHTML = `<h3 class="nickname userInfo">${userData.profile.personaname}</h3>
    <img class="medium-img userInfo" src="${userData.profile.avatarfull}" alt="">`
}

function showMatches(matchesData) {
    let matchesContainer = document.querySelector(".previous-matches");
    matchesContainer.innerHTML = "";
    matchesData.forEach( (element) => {
        let matchHeroName = "";
        serverHeroesObj.forEach(item => {
            if (item.id == element.hero_id)
            {
                matchHeroName = item.localized_name;
            }
        });
        let radiantWin;
        if (element.radiant_win) {
            radiantWin = '<p class="description small green">Победа Сил Света</p>';
        } else {
            radiantWin = '<p class="description small red">Победа Сил Тьмы</p>';
        }
        let matchHeroNameImg = matchHeroName.replace(/\s/g, '_').toLowerCase();
        matchesContainer.innerHTML += `
            <div class="matсh">
                <div class="match-hero">
                    <img class="hero-img" src="https://api.opendota.com/apps/dota2/images/dota_react/heroes/${matchHeroNameImg}.png?" alt="">
                    <h5 class="hero-name">${matchHeroName}</h5>
                </div>
                <div class="match-stat">    
                    <p class="description small">K D A</p>
                    <p class="description small">${element.kills} ${element.deaths} ${element.assists}</p>
                    ${radiantWin}
                </div>
            </div>
        `;
    })
}
