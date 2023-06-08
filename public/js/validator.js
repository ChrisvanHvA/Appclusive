import messageController from "./messageController.js";
const MessageController = new messageController();

const registerForm = document.querySelector('#registerForm');

// if(registerForm) {

//     registerForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         submitHandler(e.target)
//     });

//     // Invalid data
//     document.addEventListener('invalid', (function(){
//         return function(e) {

//             //prevent the browser from showing default error bubble / hint
//             e.preventDefault();

//             const inputElement = document.querySelector(`[data-input-type="${e.target.name}"]`);
//             console.log(inputElement);

//             // if (!inputWrapper.className.includes('hide')) {
//             //     inputHandler(e);
//             // } else {
//             //     submitHandler(registerForm);
//             // }

//         };
//     })(), true);

//     function submitHandler(formEl) {

//         const formData = new FormData(formEl);
//         const formProps = Object.fromEntries(formData);

//         console.log(formProps);

//         // TODO: check data and then through server!!
        

//         return;
//     }
// }


function checkPattern(pattern, value) {
    const term = value;
    const re = new RegExp(`${pattern}`);

    return re.test(term);
}

// From https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}