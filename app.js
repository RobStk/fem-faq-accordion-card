const screenLargeQuery = window.matchMedia("(min-width: 1440px)");

const faqComponent = document.querySelector(".faq-component");
const imgSection = faqComponent.querySelector(".img-section");

const imgMain = document.createElement("img");
imgMain.src = "images/illustration-woman-online-desktop.svg";
imgMain.alt = "illustration woman online";
imgMain.classList.add("img-main");

const imgMobile = document.createElement("img");
imgMobile.src = "images/illustration-woman-online-mobile.svg";
imgMobile.alt = "illustration woman online";

const imgCnt = document.createElement("div");
imgCnt.classList.add("img-cnt");
imgCnt.appendChild(imgMain);

setScreenMode();
screenLargeQuery.addEventListener("change", setScreenMode);
faqComponent.addEventListener("click", handleClick);

function setScreenMode() {
    const desktopMode = screenLargeQuery.matches;
    if (desktopMode) {
        if (faqComponent.classList.contains("mobile")) faqComponent.classList.remove("mobile");
        faqComponent.classList.add("desktop");
        imgSection.innerHTML = "";
        imgSection.appendChild(imgCnt);
    } else {
        if (faqComponent.classList.contains("desktop")) faqComponent.classList.remove("desktop");
        faqComponent.classList.add("mobile");
        imgSection.innerHTML = "";
        imgSection.appendChild(imgMobile);
    }
}

function handleClick(event) {
    if (event.target.classList?.contains("question-container")) {
        const extensibleComponent = event.target.closest(".extensible-component");
        if (extensibleComponent.classList.contains("active")) {
            deactivateComponent(extensibleComponent);
            return;
        }
        const extensibleComponents = document.querySelectorAll(".extensible-component");
        const extensibleComponentsArr = Array.from(extensibleComponents);
        extensibleComponentsArr.forEach(element => {
            deactivateComponent(element);
        });
        activateComponent(extensibleComponent);
    }
}

function activateComponent(component) {
    component.classList.add("active");
    const answerCnt = component.querySelector(".answer-container");
    const finalHeight = answerCnt.scrollHeight;
    answerCnt.style = ("height: 0");
    requestAnimationFrame(() => {
        answerCnt.style = ("height: " + finalHeight + "px");
    })
}

function deactivateComponent(component) {
    if (component.classList.contains("active")) {
        component.classList.remove("active");
        const answerCnt = component.querySelector(".answer-container");
        requestAnimationFrame(() => {
            answerCnt.style.height = "0px";
        })
    }
}