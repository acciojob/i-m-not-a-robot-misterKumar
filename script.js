const container = document.querySelector("main");

//creating first 5 images
for (let i = 0; i < 5; i++) {
  let img = document.createElement("img");
  img.classList.add(`img${i + 1}`);
  img.setAttribute("data-clicked", false);
  container.appendChild(img);
}

//creating clone image
let oneCloneImage = document.createElement("img");
let imgclass = `img${1 + Math.floor((6 - 1) * Math.random())}`;
oneCloneImage.classList.add(imgclass);
oneCloneImage.setAttribute("data-clicked", false);

container.appendChild(oneCloneImage);

//suffling images
const images = Array.from(document.querySelectorAll("img"));

images.sort(() => Math.random() - 0.5);

images.forEach((img) => {
  container.appendChild(img);
});

//appending other stuff
let h = document.createElement("h3");
h.id = "h";
h.innerHTML =
  "Please click on the identical tiles to verify that you are not a robot.";

let resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.innerHTML = "Reset";
resetBtn.classList.add("hide");

let verifyBtn = document.createElement("button");
verifyBtn.innerHTML = "Verify";
verifyBtn.id = "verify";
verifyBtn.classList.add("hide");

container.append(h, resetBtn, verifyBtn);

let clickCount = 0;
let imagesArray = [];

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    if (e.target.getAttribute("data-clicked") == "false") {
      e.target.setAttribute("data-clicked", "true");
      e.target.classList.add("selected");
      imagesArray.push(e.target);
      clickCount++;
    }

    checkCount();
  });
});

function checkCount() {
  if (clickCount > 2) {
    verifyBtn.classList.add("hide");
  } else if (clickCount == 2) {
    verifyBtn.classList.remove("hide");
    console.log(2);
  } else if (clickCount >= 1) {
    resetBtn.classList.remove("hide");
	// h.classList.add('hide')
  }
}

verifyBtn.addEventListener("click", () => {
  if (clickCount >= 2) {
    let p = document.createElement("p");
    p.id = "para";

    if (imagesArray[0].classList[0] == imagesArray[1].classList[0]) {
      p.innerText = "You are a human. Congratulations!";
    } else {
      p.innerText =
        "We can't verify you as a human. You selected the non-identical tiles";
    }

    container.append(p);
  }

  verifyBtn.classList.add("hide");
});

resetBtn.addEventListener("click", () => {
  verifyBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  imagesArray = [];
  clickCount = 0;

  images.forEach((image) => {
    image.setAttribute("data-clicked", "false");
    image.classList.remove("selected");
  });

	// h.classList.remove('hide');	
  document.querySelector("#para")?.remove();
});