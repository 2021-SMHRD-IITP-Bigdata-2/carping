// console.log(grid);

document.querySelector('.register-button').addEventListener('click', () => {
	document.getElementById('close-w').click();
});

const putPost = () => {
	const itemContainer = document.createElement('div');
	const grid = document.querySelector('.mainback .grid');
	itemContainer.className = 'item';
	itemContainer.innerHTML =
		'<img src="https://d2uh4olaxaj5eq.cloudfront.net/fit-in/0x1080/c433a51d-5055-48d8-8496-f28d4f24538f.jpg" alt="">' +
		'<div class="overlay">' +
		'<p class="text">zikke<br>🤍5892 💬27</p>' +
		'</div>';
	grid.appendChild(itemContainer);
};

const btn = document.querySelector('.register-button');

btn.addEventListener('click', () => {
	putPost();
});

document.querySelector('.btn-reply-save').addEventListener('click', () => {
	document.querySelector('.reply-content input').value = ' ';
});
