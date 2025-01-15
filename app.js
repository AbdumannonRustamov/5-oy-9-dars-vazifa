const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const btn = document.getElementById("btn");
const container = document.getElementById("container");

function validate() {
  return true;
}

function createCard(phone) {
  return `      <div class="card">
        <h3>${phone.name}</h3>
        <h3>${phone.price}</h3>
        <p>${phone.description}</p>
      </div>`;
}
form &&
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }
    btn.setAttribute("disabled", true);
    name.setAttribute("readonly", true);
    description.setAttribute("readonly", true);
    price.setAttribute("readonly", true);
    const product = {
      name: name.value,
      description: description.value,
      status: "active",
      category_id: 2,
      price: price.value,
    };

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        let card = createCard(data);
        container.innerHTML += card;
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        btn.removeAttribute("disabled");
        name.removeAttribute("readonly");
        description.removeAttribute("readonly");
        price.removeAttribute("readonly");
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all")
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error("Xatolik yuz berdi!");
      }
    })
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((phone) => {
          let card = createCard(phone);
          container.innerHTML += card;
        });
      }
    })
    .catch((error) => {
      console.log("Xatolik:", error);
    });
});



let timerElement = document.getElementById('timer');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');

let intervalId = null;
let seconds = 0;

    startButton.addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      seconds++;
      timerElement.textContent = seconds;
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;

  startButton.disabled = false;
  stopButton.disabled = true;
});

resetButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  seconds = 0;
  timerElement.textContent = seconds;

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
});



const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

const colorContainer = document.getElementById('color-container');
const textElement = document.getElementById('text');
const currentColorElement = document.getElementById('current-color');

colors.forEach(color => {
  const div = document.createElement('div');
  div.className = 'color-block';
  div.style.backgroundColor = color;

  div.addEventListener('click', () => {
    textElement.style.color = color;
    currentColorElement.textContent = `Hozirgi rang: ${color}`;
  });

  colorContainer.appendChild(div);
});






const qidiruvInput = document.getElementById('kategoriya-qidiruv');
const filtrlaTugma = document.getElementById('filtrla');
const qaytaTugma = document.getElementById('qayta');
const rasmlar = document.querySelectorAll('.rasm-konteyner');
filtrlaTugma.onclick = function () {
    const qidiruvMatni = qidiruvInput.value.trim().toLowerCase();

    rasmlar.forEach(rasm => {
        const kategoriya = rasm.dataset.kategoriya.toLowerCase();

        if (kategoriya.includes(qidiruvMatni)) {
            rasm.style.display = 'block';
        } else {
            rasm.style.display = 'none';
        }
    });
};


qaytaTugma.onclick = function () {
    qidiruvInput.value = '';
    rasmlar.forEach(rasm => {
        rasm.style.display = 'block';
    });
};