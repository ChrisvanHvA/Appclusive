const form = document.querySelector(".validator__form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const html = document.querySelector(".validator__text").value;
    validateHTML(html);
})

function validateHTML(html) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://validator.w3.org/nu/?out=json', true);
    xhr.setRequestHeader('Content-type', 'text/html; charset=UTF-8');
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = JSON.parse(xhr.responseText);
        console.log(result);

        const textDiv = document.querySelector(".validator__results");
        textDiv.innerHTML = "";

        if (result.messages.length > 0) {
            result.messages.forEach(element => {
                const p = document.createElement("p");
                p.innerHTML = element.message;
                textDiv.appendChild(p);
            });
        }
      }
    }

    xhr.send(html);
}