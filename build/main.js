"use strict";
const buttons = document.querySelectorAll('#motionbtn button'); //buttons
const modal = document.querySelector(".modal-wrapper");
const modal_close_btn = document.querySelector(".modal-header button");
const modal_add_btn = document.querySelector(".modal-footer button");
const modal_main = document.querySelector(".modal-inner .modal-main");
/* -------------- modal -------------- */
modal_close_btn === null || modal_close_btn === void 0 ? void 0 : modal_close_btn.addEventListener("click", closeModal);
modal_add_btn === null || modal_add_btn === void 0 ? void 0 : modal_add_btn.addEventListener("click", makeMotion);
buttons.forEach(item => item.addEventListener("click", onShowModal));
function onShowModal(e) {
    const target = e.target;
    const buttonName = target.innerText;
    if (buttonName === "IMAGE" || buttonName === "VIDEO") {
        fillModal("url");
    }
    else if (buttonName === "NOTE" || buttonName === "TASK") {
        fillModal("body");
    }
    handleModalShow('show'); // 모달 보여주기
}
/* Function: 버튼 타입에 따라 모달 라벨 명 변경 */
function fillModal(param1) {
    var _a;
    let label = (_a = modal_main === null || modal_main === void 0 ? void 0 : modal_main.lastElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    label.innerText = param1;
}
/* Funcition: 모달창 닫기 */
function closeModal() {
    handleModalShow('close');
}
/* Funcition: 모달창 열고닫기 */
function handleModalShow(str) {
    if (str === "show") {
        modal === null || modal === void 0 ? void 0 : modal.classList.add("active");
    }
    else {
        modal === null || modal === void 0 ? void 0 : modal.classList.remove("active");
    }
}
function makeMotion(arg) {
    var _a;
    // let arr = [];
    let form = modal_main === null || modal_main === void 0 ? void 0 : modal_main.children;
    let label = (_a = modal_main === null || modal_main === void 0 ? void 0 : modal_main.lastElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    let labelTxt = label.innerText;
    // HTMLCOllection convert to Array
    let len = (form === null || form === void 0 ? void 0 : form.length) || 0;
    for (let i = 0; i < len; i++) {
        let input = form[i].children[1];
    }
    return arg;
}
