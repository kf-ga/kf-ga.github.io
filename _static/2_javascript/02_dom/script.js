let colors=["blue","green","yellow","pink","salmon"];

function remove(element) {
    element.parentNode.removeChild(element);
}

function move(element, direction) {
    let parent=element.parentNode;
    let index=Array.from(parent.children).indexOf(element);
    console.log(index+", "+direction);
    parent.insertBefore(element, parent.children[index+direction]);
}

function color(element) {
    element.dataset.colorid=(parseInt(element.dataset.colorid)+1)%colors.length;
    element.style.backgroundColor="light"+colors[element.dataset.colorid];
    element.style.border="1px solid "+colors[element.dataset.colorid];
}

function edit(element) {
    let inp=document.createElement("input");
    inp.value=element.innerHTML;
    element.innerHTML="";
    element.appendChild(inp);
    inp.focus();
    inp.select();

    inp.addEventListener("blur", (event)=>{
        element.innerHTML=inp.value;
    });
}   

function add(before) {
    let inp=document.getElementById("input");
    let div=document.createElement("div");

    // text node
    let text=document.createElement("div");
    text.classList.add("text");
    text.innerHTML=((inp.value!="") ? inp.value : "Nová položka");
    div.appendChild(text);

    // edit
    text.addEventListener("dblclick", (event)=>{
        edit(text);
    });

    // div style
    let child=document.getElementById("container").children.length;
    div.style.backgroundColor="light"+colors[child%colors.length];
    div.style.border="1px solid "+colors[child%colors.length];

    // color button
    let colorDiv=document.createElement("div");
    div.dataset.colorid=child%colors.length;
    colorDiv.classList.add("color");
    colorDiv.innerHTML="🎨";
    colorDiv.addEventListener("click",(event)=>{
        color(div);
    });
    div.appendChild(colorDiv);

    // add button
    let addDiv=document.createElement("div");
    addDiv.innerHTML="➕";
    addDiv.classList.add("add");
    addDiv.addEventListener("click",(event)=>{
        add(div);
    });
    div.appendChild(addDiv);

    // close buttun
    let closeDiv=document.createElement("div");
    closeDiv.innerHTML="❌";
    closeDiv.addEventListener("click",(event)=>{
        remove(div);
    });
    closeDiv.classList.add("close");
    div.appendChild(closeDiv);

    // move buttons
    for (direction of [-1,2]) {
        let moveDiv=document.createElement("div");
        moveDiv.innerHTML=direction==-1 ? "⬆" : "⬇";
        moveDiv.classList.add("move");
        const dd=direction;
        moveDiv.addEventListener("click",(event)=>{
            move(div, dd);
        });
        div.appendChild(moveDiv);
    }

    if (!before) {
        document.getElementById("container").appendChild(div);
    }
    else {
        document.getElementById("container").insertBefore(div, before);
    }
}

window.addEventListener("load", (event) => {
    document.getElementById("addbutton").addEventListener("click", (event) => {
        add();
    });
});