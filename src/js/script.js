/* global WebGLImageFilter */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
	(function blurFn() {
		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');
		let parentCanvas = canvas.parentElement;
		let btnSave = document.getElementById('save');
		// let btnUpload = document.getElementById('upload');
		let btnReset = document.getElementById('reset');
		let wrapImg = document.getElementById('box-img');
		let wrapArrows = document.querySelector('.list-arrow');
		const rect = {};
		let drag = false;
		let img = null;
		let src = '../img/чек-mini.jpg';
		let imgData, filteredImage, rw, rh;

		ctx.textAlign = 'center';
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#fff';
		ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);

		try {
			img = new Image();
			let filter = new WebGLImageFilter();

			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
			};

			img.src = src;

			canvas.ondragstart = function() {
				return false;
			};

			if ('ontouchstart' in window || navigator.msMaxTouchPoints) alert('It a touch screen device.');
			else alert('Others devices');

			
			const blurMove = function(e) {
				if (drag) {
					if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
						e.preventDefault();
						rect.w = (e.changedTouches[0].pageX - this.offsetLeft + this.parentNode.scrollLeft) - rect.startX;
						rect.h = (e.changedTouches[0].pageY - this.offsetTop + this.parentNode.scrollTop) - rect.startY;
					} else {
						rect.w = (e.pageX  - this.offsetLeft + this.parentNode.scrollLeft) - rect.startX;
						rect.h = (e.pageY  - this.offsetTop + this.parentNode.scrollTop) - rect.startY;
					}
					if (rect.w === 0 || rect.h === 0) return;
					filter.reset();
					filter.addFilter('blur', 50);
					filteredImage = filter.apply(img);
					ctx.drawImage(filteredImage, 0, 0);
					ctx.lineWidth = 1;
					ctx.strokeStyle = 'rgba(0, 0, 0, 0)';

					imgData = ctx.getImageData(rect.startX, rect.startY, rect.w, rect.h);
					filter.reset();
					ctx.drawImage(img, 0, 0);
					if (rect.w < 0) rw = rect.startX + rect.w; 
					else rw = rect.startX;
					if (rect.h < 0) rh = rect.startY + rect.h;
					else rh = rect.startY;
					ctx.putImageData(imgData, rw, rh);
					ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
				}
			};

			const startBlur = function(e) {
				if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
					e.preventDefault();
					rect.startX = e.changedTouches[0].pageX - this.offsetLeft + this.parentNode.scrollLeft;
					rect.startY = e.changedTouches[0].pageY - this.offsetTop + this.parentNode.scrollTop;
				} else {
					rect.startX = e.pageX  - this.offsetLeft + this.parentNode.scrollLeft;
					rect.startY = e.pageY  - this.offsetTop + this.parentNode.scrollTop;
				}
				drag = true;
			};

			const endBlur = function() {
				img.src = canvas.toDataURL();
				drag = false;
			};

			const saveImg = function() {
				let newImg = new Image();
				let oldImg = wrapImg.getElementsByTagName('img')[0];

				if (oldImg != undefined) wrapImg.removeChild(oldImg);
				newImg.src = canvas.toDataURL();
				wrapImg.appendChild(newImg);
			};

			const startReset = function() {
				img.src = src;
				ctx.drawImage(img, 0, 0);
			};

			const scrollTo = function(e) {
				e.preventDefault();
				let target = e.target;

				while(target != wrapArrows) {

					switch (target.id) {
					case 'left':
						parentCanvas.scrollLeft += 50;
						return;
					case 'right':
						parentCanvas.scrollLeft -= 50;
						return;
					case 'bottom':
						parentCanvas.scrollTop += 50;
						return;
					case 'top':
						parentCanvas.scrollTop -= 50;
						return;
					}
				}

				target = target.parentNode;
			};

			canvas.addEventListener('mousedown', startBlur, false);
			canvas.addEventListener('touchstart', startBlur, false);
			canvas.addEventListener('mouseup', endBlur, false);
			canvas.addEventListener('touchend', endBlur, false);
			canvas.addEventListener('mouseout', endBlur, false);
			canvas.addEventListener('mousemove', blurMove, false);
			canvas.addEventListener('touchmove', blurMove, false);
			btnReset.addEventListener('click', startReset, false);
			btnSave.addEventListener('click', saveImg, false);
			wrapArrows.addEventListener('click', scrollTo, false);

		} catch(err) {
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#fff';
			ctx.fillText('This browser doesn\'t support WebGL', canvas.width / 2, canvas.height / 2);
			console.log(err);
		}
	}) ();
});