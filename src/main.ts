const buttons:NodeList = document.querySelectorAll('#motionbtn button'); //buttons
const modal = document.querySelector(".modal-wrapper");
const modal_close_btn = document.querySelector(".modal-header button");
const modal_add_btn = document.querySelector(".modal-footer button");
const modal_main = document.querySelector(".modal-inner .modal-main");
const main = document.querySelector(".main-wrapper .main-container");

/* -------------- variable -------------- */
class TodoList {
    private _todo:MotionType[];
    get todo(): MotionType[] {
       return this._todo; 
    }
    constructor() {
        this._todo = [];
    }
    push(val:MotionType){
        this._todo.push(val);
    }
    pop(){
        return this._todo.shift();
    }
    size(){
        return this._todo.length;
    }
}

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

let motionList = new TodoList();
const isType = <MotionType>(thing:any): thing is LinkType => true;
function makeItem () {
    let div = document.createElement('div');
    div.classList.add('typeItem');
    let h2 = document.createElement('h2');
    let btn = document.createElement('button');
    btn.innerText = "X";

    motionList.todo.forEach(item=>{
        h2.innerText = item.title;
        
        if( isType<MotionType>(item) ) {
            let img = document.createElement('img');
            img.src = item.url;
            div.appendChild(img);
        }else {
            let p = document.createElement('p');
            p.innerText = item.body;
            div.appendChild(p);
        }

        div.appendChild(h2);
        div.appendChild(btn);
        main?.appendChild(div);
    })
}

modal_close_btn?.addEventListener("click", closeModal);
modal_add_btn?.addEventListener("click", (e)=>{
    e.preventDefault();
    const result = getMotion(e);
    
    motionList.push(result);    // 추가한 모션 배열
    makeItem();
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
    
    // 각 input 값 value 초기화하기
    first.value = '';
    second.value = '';
    
    handleModalShow('close');
    return motion;
}




