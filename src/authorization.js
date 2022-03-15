let buttonAuthorizeIn = document.querySelector(".signInBtn");
let buttonSignInUp = document.querySelector(".signInUp");
let butttonExit = document.querySelector(".exit");
let butttonImage = document.querySelector(".image");
let buttonCancel = document.querySelector(".cancel");
let buttonSignContainer = document.querySelector(".sign");
let buttonLogo = document.querySelector(".logo");

let containerRank = document.querySelector(".current-rank");
let containerLinks = document.querySelector(".links");
let userInfoList = Array.from(document.querySelectorAll(".userInfo"))
let navigation = document.querySelector(".navigation");
let password = "1";
let userMainObj;
let userHeroObj;
let serverHeroesObj;

// По нажатию проверяем пароль и вызываем функцию, которые отправляет запрос на получение данных по ID указанному в Input(email)

buttonAuthorizeIn.addEventListener("click", () => {
    let passwordInput = document.querySelector(".passInp").value;
    let emailInput = document.querySelector(".emailInp").value;
    
    if(passwordInput == password) {
        let userId = emailInput;
        getUserMainData(userId);
        closePopUp();
        // setTimeout( () => {
        //     showProfileIcon(userMainObj);
        // }, 2000)
        getUserHeroData(userId);
        getServerHeroesName()
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
function getServerHeroesName() {
    fetch("https://api.opendota.com/api/heroes")
    .then(response => {
    	return response.json()
    })
    .then(data => {
    	serverHeroesObj = data;
        console.log(serverHeroesObj);
    })
}
// Создание глобального объекта с данными пользователя

function createUserMainObj(userData) {
    userMainObj = userData;
}

// Закрытие окна авторизации 

function closePopUp() {
    buttonCancel.click()
}

// Показываем иконку с автаркой вместо кнопки "Вход/Регистрация"

function showProfileIcon(userInfo) {
    console.log(userInfo);
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
    showProfileMainInfo(userMainObj);
    showProfileHeroInfo(userHeroObj);
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

function showProfileMainInfo(userData) {
    createUserRankImage(userMainObj)

    userInfoList.forEach( (element) => {
        if (element.classList.contains("nickname")) {
            element.innerHTML = userData.profile.personaname;
        } else if ( element.classList.contains("medium-img") ) {
            element.src = userData.profile.avatarfull;
        }
    })

} 

// Функция получает номер ранга и создаёт соответствующую ему картинку

function createUserRankImage(userData) {
    let rankStars = userData.rank_tier % 10;
    let firstNumber = Number(String(userData.rank_tier)[0]);

    let imgRankStar = document.querySelector(".rank-star");
    imgRankStar.src = `https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_${rankStars}.png`;

	let imgRank = document.querySelector(".rank");
    imgRank.src = `https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${firstNumber}.png`;
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

function showProfileHeroInfo(userHeroData) {
    let popularHeroName = 'Drow Ranger';
    console.log(userHeroData);
    userInfoList.forEach( (paragraph) => {
        
        if ( paragraph.classList.contains("hero-wl") ) {

            paragraph.innerHTML = `<p>Games: ${userHeroData[0].games}</p>
            <p>Win: ${userHeroData[0].win}</p>
            <p>Lose: ${userHeroData[0].games - userHeroData[0].win}</p>`

        } else if ( paragraph.classList.contains("hero-name") ) {

            serverHeroesObj.forEach(element => {
                console.log(element.id, element.localized_name, userHeroData[0].hero_id);
                if(element.id == userHeroData[0].hero_id)
                {
                    // popularHeroName = element.localized_name;
                    // console.log(popularHeroName, element.localized_name);
                    paragraph.innerHTML = `<p>${element.localized_name}</p>`
                }
            });
            
        } 
        else if ( paragraph.classList.contains("hero-img") ) {
            // console.log(popularHeroName);
            let heroName = popularHeroName.replace(/\s/g, '_')
            console.log(heroName);
            paragraph.src = `https://api.opendota.com/apps/dota2/images/dota_react/heroes/${heroName}.png?`
        }
    })

    
}