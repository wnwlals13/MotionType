"use strict";
const buttons = document.querySelectorAll('#motionbtn button'); //buttons
const modal = document.querySelector(".modal-wrapper");
const modal_close_btn = document.querySelector(".modal-header button");
const modal_add_btn = document.querySelector(".modal-footer button");
const modal_main = document.querySelector(".modal-inner .modal-main");
const main = document.querySelector(".main-wrapper .main-container");
/* -------------- variable -------------- */
class TodoList {
    get todo() {
        return this._todo;
    }
    constructor() {
        this._todo = [];
    }
    push(val) {
        this._todo.push(val);
    }
    pop() {
        return this._todo.shift();
    }
    size() {
        return this._todo.length;
    }
}
/* -------------- modal -------------- */
let motionList = new TodoList();
const isType = (thing) => true;
function makeItem() {
    let div = document.createElement('div');
    div.classList.add('typeItem');
    let h2 = document.createElement('h2');
    let btn = document.createElement('button');
    btn.innerText = "X";
    motionList.todo.forEach(item => {
        h2.innerText = item.title;
        if (isType(item)) {
            let img = document.createElement('img');
            img.src = item.url;
            div.appendChild(img);
        }
        else {
            let p = document.createElement('p');
            p.innerText = item.body;
            div.appendChild(p);
        }
        div.appendChild(h2);
        div.appendChild(btn);
        main === null || main === void 0 ? void 0 : main.appendChild(div);
    });
}
modal_close_btn === null || modal_close_btn === void 0 ? void 0 : modal_close_btn.addEventListener("click", closeModal);
modal_add_btn === null || modal_add_btn === void 0 ? void 0 : modal_add_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const result = getMotion(e);
    motionList.push(result); // 추가한 모션 배열
    makeItem();
});
buttons.forEach(item => item.addEventListener("click", onShowModal));
function onShowModal(e) {
    const target = e.target;
    const buttonName = target.innerText;
    fillModal(buttonName);
    handleModalShow('show'); // 모달 보여주기
}
/* Function: 버튼 타입에 따라 모달 라벨 명 변경 */
function fillModal(btn) {
    var _a, _b;
    let label = (_a = modal_main === null || modal_main === void 0 ? void 0 : modal_main.lastElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    (_b = modal_main === null || modal_main === void 0 ? void 0 : modal_main.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add(btn);
    // console.log( modal_main?.parentElement?.lastElementChild?.children[0]);
    if (btn === "IMAGE") {
        label.innerText = 'url';
    }
    else if (btn === "VIDEO") {
        label.innerText = 'url';
    }
    else if (btn === "NOTE") {
        label.innerText = 'body';
    }
    else {
        label.innerText = 'body';
    }
}
/* Funcition: 모달창 닫기 */
function closeModal() {
    var _a, _b;
    let btn = (_a = modal_main === null || modal_main === void 0 ? void 0 : modal_main.parentElement) === null || _a === void 0 ? void 0 : _a.classList[1];
    (_b = modal_main === null || modal_main === void 0 ? void 0 : modal_main.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove(btn);
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
function getMotion(arg) {
    var _a;
    let form = modal_main === null || modal_main === void 0 ? void 0 : modal_main.children;
    let first = form[0].children[1];
    let second = form[1].children[1];
    let motion = {
        title: '',
        url: ''
    };
    if (arg instanceof Event) {
        let e = arg.target;
        let modal = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        let type = modal.classList[1]; // 버튼 타입
        if (type === "IMAGE") {
            motion = {
                title: first.value,
                url: second.value,
            };
        }
        else if (type === "VIDEO") {
            motion = {
                title: first.value,
                url: second.value,
            };
        }
        else {
            motion = {
                title: first.value,
                body: second.value,
            };
        }
    }
    // 각 input 값 value 초기화하기
    first.value = '';
    second.value = '';
    handleModalShow('close');
    return motion;
}
