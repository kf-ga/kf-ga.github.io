import { Writer } from "./two.js";

function init(div, r_button, g_button, input) {
    let eDiv=document.getElementById(div);
    let eRButton=document.getElementById(r_button);
    let eGButton=document.getElementById(g_button);
    let eInput=document.getElementById(input);
    let writer=new Writer(eDiv);
    eRButton.addEventListener('click', (event) => {
        if (eInput.value.length > 0) {
            writer.red(eInput.value);
        }
    });
    eGButton.addEventListener('click', (event) => {
        if (eInput.value.length > 0) {
            writer.green(eInput.value);
        }
    });
}

export default init;