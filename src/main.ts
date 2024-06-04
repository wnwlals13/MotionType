const buttons:NodeList = document.querySelectorAll('#motionbtn button'); //buttons
const modal = document.querySelector(".modal-wrapper");
const modal_close_btn = document.querySelector(".modal-header button");
const modal_add_btn = document.querySelector(".modal-footer button");
const modal_main = document.querySelector(".modal-inner .modal-main");

/* -------------- type -------------- */
type LinkType = {
    title: string;
    url : string;
}

type BodyType = {
    title: string;
    body : string;
}

type MotionType = LinkType | BodyType;

/* -------------- modal -------------- */
modal_close_btn?.addEventListener("click", closeModal);
modal_add_btn?.addEventListener("click", makeMotion);

buttons.forEach(item=>item.addEventListener("click", onShowModal));
function onShowModal(e:Event):void {
    const target = e.target as HTMLButtonElement;
    const buttonName = target.innerText;

    if(buttonName ===  "IMAGE" || buttonName === "VIDEO" ) {
        fillModal("url");
    }
    else if(buttonName === "NOTE" || buttonName === "TASK" ) {
        fillModal("body");
    }
    
    handleModalShow('show');    // 모달 보여주기
}

/* Function: 버튼 타입에 따라 모달 라벨 명 변경 */
function fillModal(param1: string):void {
    let label = modal_main?.lastElementChild?.firstElementChild as HTMLLabelElement;
    label.innerText = param1;
}

/* Funcition: 모달창 닫기 */
function closeModal() {
    handleModalShow('close');
}

/* Funcition: 모달창 열고닫기 */
function handleModalShow(str: string):void {
    if(str === "show") {
        modal?.classList.add("active");
    } else {
        modal?.classList.remove("active");
    }
}

function makeMotion<T>(arg : T): T {
    // let arr = [];
    let form = modal_main?.children as HTMLCollection;
    let label = modal_main?.lastElementChild?.firstElementChild as HTMLLabelElement;
    let labelTxt: string = label.innerText;
    
    // HTMLCOllection convert to Array
    let len: number = form?.length || 0;
    for (let i=0; i< len; i++) {
        let input = form[i].children[1] as HTMLInputElement;
        
        // 여기서 각 input value를 어떻게 넣어야 할까..?고민..
    }
    return arg;
}