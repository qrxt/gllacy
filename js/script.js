"use strict";

const overlay = document.querySelector(".overlay");

const feedbackPopup = document.querySelector(".feedback");
const feedbackForm = document.querySelector(".feedback-form");

const feedbackFormName = document.querySelector("[name=feedback-name]");
const feedbackFormEmail = document.querySelector("[name=feedback-email]");
const feedbackFormMessage = document.querySelector("[name=feedback-message]");

const feedbackViewButton = document.querySelector(".contacts-btn");
const feedbackCloseButton = document.querySelector(".feedback-form-close");

const closeFeedbackPopup = function () {
    overlay.classList.remove("show");
    feedbackPopup.classList.remove("modal-show");
    feedbackPopup.classList.remove("modal-error");
}

const dataFromStorage = (localStorage && localStorage.getItem("username") && localStorage.getItem("userEmail")) ?
    { name: localStorage.getItem("username"), email: localStorage.getItem("userEmail") }
    : null;

feedbackViewButton.addEventListener("click", function (event) {
    event.preventDefault();

    overlay.classList.add("show");
    feedbackPopup.classList.add("modal-show");
    feedbackPopup.classList.add("modal-bounce");
    setTimeout(function () {
        feedbackPopup.classList.remove("modal-bounce");
    }, 600);

    if (dataFromStorage) {
        feedbackFormName.value = dataFromStorage.name;
        feedbackFormEmail.value = dataFromStorage.email;
        feedbackFormMessage.focus();
    } else feedbackFormName.focus();
});

feedbackCloseButton.addEventListener("click", function (event) {
    event.preventDefault();

    closeFeedbackPopup();
});

feedbackForm.addEventListener("submit", function (event) {
    if (!feedbackFormName.value || !feedbackFormEmail.value || !feedbackFormMessage.value) {
        event.preventDefault();

        feedbackPopup.classList.add("modal-error");
        setTimeout(function () {
            feedbackPopup.classList.remove("modal-error");
        }, 600);
    } else if (localStorage) {
        localStorage.setItem("username", feedbackFormName.value);
        localStorage.setItem("userEmail", feedbackFormEmail.value);
    }
});

feedbackForm.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) closeFeedbackPopup();
});

overlay.addEventListener("click", closeFeedbackPopup);