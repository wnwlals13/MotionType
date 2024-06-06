const buttons:NodeList = document.querySelectorAll('#motionbtn button'); //buttons
const modal = document.querySelector(".modal-wrapper");
const modal_close_btn = document.querySelector(".modal-header button");
const modal_add_btn = document.querySelector(".modal-footer button");
const modal_main = document.querySelector(".modal-inner .modal-main");

/* -------------- type -------------- */
type Image = {
    title: string;
    url : string;
}

type Video = {
    title: string;
    url : string;
}

type Note = {
    title: string;
    body : string;
}

type Task = {
    title: string;
    body : string;
}

type MotionType = Image | Video | Note | Task;

/* -------------- modal -------------- */
modal_close_btn?.addEventListener("click", closeModal);
modal_add_btn?.addEventListener("click", (e)=>{
    e.preventDefault();
    const result = getMotion(e);
    makeMotion(result);
});
buttons.forEach(item=>item.addEventListener("click", onShowModal));

function onShowModal(e:Event):void {
    const target = e.target as HTMLButtonElement;
    const buttonName = target.innerText;

    fillModal(buttonName);
    handleModalShow('show');    // 모달 보여주기
}

/* Function: 버튼 타입에 따라 모달 라벨 명 변경 */
function fillModal(btn: string):void {
    let label = modal_main?.lastElementChild?.firstElementChild as HTMLLabelElement;
    modal_main?.parentElement?.classList.add(btn);
    // console.log( modal_main?.parentElement?.lastElementChild?.children[0]);

    if(btn === "IMAGE") {
        label.innerText = 'url';
    } else if (btn === "VIDEO") {
        label.innerText = 'url';
    } else if (btn === "NOTE") {
        label.innerText = 'body';
    } else {
        label.innerText = 'body';
    }
}

/* Funcition: 모달창 닫기 */
function closeModal() {
    let btn = modal_main?.parentElement?.classList[1] as string;
    modal_main?.parentElement?.classList.remove(btn);
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

function getMotion<T>(arg : T): MotionType {
    let form = modal_main?.children as HTMLCollection;
    let first = form[0].children[1] as HTMLInputElement;
    let second = form[1].children[1] as HTMLInputElement;
    
    let motion:MotionType = {
        title :'',
        url :''
    };
    if(arg instanceof Event) {
        let e = arg.target as HTMLButtonElement;
        let modal = e.parentElement?.parentElement as HTMLDivElement;
        let type = modal.classList[1];  // 버튼 타입

        if(type === "IMAGE" ) {
            motion = {
                title : first.value,
                url : second.value,
            } 
        } else if (type === "VIDEO") {
            motion = {
                title : first.value,
                url : second.value,
            } 
        } else {
            motion = {
                title : first.value,
                body : second.value,
            } 
        }
    }
    // console.log(motion);
    handleModalShow('close');
    return motion;
}

function makeMotion(info:MotionType) {
    console.log(typeof info);
}