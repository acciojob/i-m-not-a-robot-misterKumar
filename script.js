const main = document.querySelector('main');
const img = document.getElementsByTagName('img');
const flex = document.querySelector('.flex');
const dynamic = document.createElement('div');
dynamic.style.display = 'flex';
dynamic.style.flexDirection = 'column';
dynamic.style.alignItems = 'centre';
dynamic.style.justifyContent = 'centre';
main.appendChild(dynamic);
let div = document.createElement('div');
	div.style.display = 'flex';
	
let count = 0;

function addImg(){
	let index = Math.floor(Math.random()*img.length);
	let newImg = img[index].cloneNode();
	flex.append(newImg);
}

addImg();




flex.addEventListener('click', (event) => {
	
	if(event.target.tagName == 'IMG'){
		// console.log(event.target);
		event.target.classList.toggle('selected');
		
		if(count == 0){
		let reset = document.createElement('button');
			reset.id = 'reset';
		reset.innerText = 'RESET';
		reset.addEventListener('click', resetAll);
		div.appendChild(reset);
		main.appendChild(div);
		count = 1;
		}
		else if(count == 1){
			let verify = document.createElement('button');
			verify.id = 'verify';
			verify.innerText = 'VERIFY';
			verify.addEventListener('click', verifyImage);
			div.appendChild(verify);
			dynamic.appendChild(div);
			count = 2;
		}
		else{
			event.target.classList.toggle('selected');
		}
		
	}
})

function resetAll(){
		dynamic.innerHTML = '';
		div.innerHTML = '';
		for(let i = 0; i < img.length; i++){
			let elem = img[i].classList;
			elem.forEach((e) => {
				if(e == 'selected'){
					img[i].classList.toggle('selected');
				}
			})
		}
		 count = 0;
}

function verifyImage(event){
	let btn = event.target;
	let selected = document.querySelectorAll('.selected');
	let arr = [];
	for(let i = 0; i < selected.length; i++){
		if(selected[i].classList[1] == 'selected'){
			arr.push(selected[i]);
		}
	}
	if(arr[0].classList[0] == arr[1].classList[0]){
		btn.remove();
		let p = document.createElement('p');
		p.id = 'para';
		p.textContent = "You are a human. Congratulations!.";
		p.style.textAlign = 'centre';
		dynamic.appendChild(p);
	}
	else{
		btn.remove();
		let p = document.createElement('p');
		p.id = 'para';
		p.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
		p.style.textAlign = 'centre';
		dynamic.appendChild(p);
	}
}