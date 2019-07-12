/* global WebGLImageFilter */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  (function blurFn() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var btnSave = document.getElementById('save');
    // let btnUpload = document.getElementById('upload');
    var btnReset = document.getElementById('reset');
    var wrapImg = document.getElementById('box-img');
    var rect = {};
    var drag = false;
    var img = null;
    var imgData, filteredImage, rw, rh;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);

    try {
      img = new Image();
      var filter = new WebGLImageFilter();

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };

      img.src = '../img/чек-mini.jpg';

      canvas.ondragstart = function () {
        return false;
      };

      if ('ontouchstart' in window || navigator.msMaxTouchPoints) alert('It a touch screen device.');else
      alert('Others devices');


      var blurMove = function blurMove(e) {
        if (drag) {
          if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
            rect.w = e.changedTouches[0].pageX - this.offsetLeft - rect.startX;
            rect.h = e.changedTouches[0].pageY - this.offsetTop - rect.startY;
          } else {
            rect.w = e.pageX - this.offsetLeft - rect.startX;
            rect.h = e.pageY - this.offsetTop - rect.startY;
          }
          if (rect.w === 0 || rect.h === 0) return;
          filter.reset();
          filter.addFilter('blur', 20);
          filteredImage = filter.apply(img);
          ctx.drawImage(filteredImage, 0, 0);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0)';

          imgData = ctx.getImageData(rect.startX, rect.startY, rect.w, rect.h);
          filter.reset();
          ctx.drawImage(img, 0, 0);
          if (rect.w < 0) rw = rect.startX + rect.w;else
          rw = rect.startX;
          if (rect.h < 0) rh = rect.startY + rect.h;else
          rh = rect.startY;
          ctx.putImageData(imgData, rw, rh);
          ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
        }
      };

      var startBlur = function startBlur(e) {
        if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
          rect.startX = e.changedTouches[0].pageX - this.offsetLeft;
          rect.startY = e.changedTouches[0].pageY - this.offsetTop;
        } else {
          rect.startX = e.pageX - this.offsetLeft;
          rect.startY = e.pageY - this.offsetTop;
        }
        drag = true;
      };

      var endBlur = function endBlur() {
        img.src = canvas.toDataURL();
        drag = false;
      };

      var saveImg = function saveImg() {
        var newImg = new Image();
        var oldImg = wrapImg.getElementsByTagName('img')[0];

        if (oldImg != undefined) wrapImg.removeChild(oldImg);
        newImg.src = canvas.toDataURL();
        wrapImg.appendChild(newImg);
      };

      var startReset = function startReset() {
        img.src = '../img/чек-mini.jpg';
        ctx.drawImage(img, 0, 0);
      };

      canvas.addEventListener('mousedown', startBlur, false);
      canvas.addEventListener('touchstart', startBlur, false);
      canvas.addEventListener('mouseup', endBlur, false);
      canvas.addEventListener('mouseout', endBlur, false);
      canvas.addEventListener('mousemove', blurMove, false);
      canvas.addEventListener('touchmove', blurMove, false);
      btnReset.addEventListener('click', startReset, false);
      btnSave.addEventListener('click', saveImg, false);

    } catch (err) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.fillText('This browser doesn\'t support WebGL', canvas.width / 2, canvas.height / 2);
      console.log(err);
    }
  })();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJibHVyRm4iLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJidG5TYXZlIiwiYnRuUmVzZXQiLCJ3cmFwSW1nIiwicmVjdCIsImRyYWciLCJpbWciLCJpbWdEYXRhIiwiZmlsdGVyZWRJbWFnZSIsInJ3IiwicmgiLCJ0ZXh0QWxpZ24iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiZmlsbFRleHQiLCJJbWFnZSIsImZpbHRlciIsIldlYkdMSW1hZ2VGaWx0ZXIiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiLCJzcmMiLCJvbmRyYWdzdGFydCIsIndpbmRvdyIsIm5hdmlnYXRvciIsIm1zTWF4VG91Y2hQb2ludHMiLCJhbGVydCIsImJsdXJNb3ZlIiwiZSIsInciLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwib2Zmc2V0TGVmdCIsInN0YXJ0WCIsImgiLCJwYWdlWSIsIm9mZnNldFRvcCIsInN0YXJ0WSIsInJlc2V0IiwiYWRkRmlsdGVyIiwiYXBwbHkiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImdldEltYWdlRGF0YSIsInB1dEltYWdlRGF0YSIsInN0cm9rZVJlY3QiLCJzdGFydEJsdXIiLCJlbmRCbHVyIiwidG9EYXRhVVJMIiwic2F2ZUltZyIsIm5ld0ltZyIsIm9sZEltZyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidW5kZWZpbmVkIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsInN0YXJ0UmVzZXQiLCJlcnIiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN4RCxHQUFDLFNBQVNDLE1BQVQsR0FBa0I7QUFDbEIsUUFBSUMsTUFBTSxHQUFHSCxRQUFRLENBQUNJLGNBQVQs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LGdCQUFULENBQTBCLE9BQTFCLEVBQW1DOEQsVUFBbkMsRUFBK0MsS0FBL0M7QUFDQXhELE1BQUFBLE9BQU8sQ0FBQ04sZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0N1RCxPQUFsQyxFQUEyQyxLQUEzQzs7QUFFQSxLQXhGRCxDQXdGRSxPQUFNUSxHQUFOLEVBQVc7QUFDWjNELE1BQUFBLEdBQUcsQ0FBQ2EsU0FBSixHQUFnQixNQUFoQjtBQUNBYixNQUFBQSxHQUFHLENBQUNjLFFBQUosQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CaEIsTUFBTSxDQUFDaUIsS0FBMUIsRUFBaUNqQixNQUFNLENBQUNrQixNQUF4QztBQUNBaEIsTUFBQUEsR0FBRyxDQUFDYSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0FiLE1BQUFBLEdBQUcsQ0FBQ2lCLFFBQUosQ0FBYSxxQ0FBYixFQUFvRG5CLE1BQU0sQ0FBQ2lCLEtBQVAsR0FBZSxDQUFuRSxFQUFzRWpCLE1BQU0sQ0FBQ2tCLE1BQVAsR0FBZ0IsQ0FBdEY7QUFDQTRDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFaO0FBQ0E7QUFDRCxHQWpIRDtBQWtIQSxDQW5IRCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBXZWJHTEltYWdlRmlsdGVyICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblx0KGZ1bmN0aW9uIGJsdXJGbigpIHtcclxuXHRcdGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XHJcblx0XHRsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0XHRsZXQgYnRuU2F2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlJyk7XHJcblx0XHQvLyBsZXQgYnRuVXBsb2FkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwbG9hZCcpO1xyXG5cdFx0bGV0IGJ0blJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XHJcblx0XHRsZXQgd3JhcEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3gtaW1nJyk7XHJcblx0XHRjb25zdCByZWN0ID0ge307XHJcblx0XHRsZXQgZHJhZyA9IGZhbHNlO1xyXG5cdFx0bGV0IGltZyA9IG51bGw7XHJcblx0XHRsZXQgaW1nRGF0YSwgZmlsdGVyZWRJbWFnZSwgcncsIHJoO1xyXG5cclxuXHRcdGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuXHRcdGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XHJcblx0XHRjdHguZmlsbFRleHQoJ0xvYWRpbmcuLi4nLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdGxldCBmaWx0ZXIgPSBuZXcgV2ViR0xJbWFnZUZpbHRlcigpO1xyXG5cclxuXHRcdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcclxuXHRcdFx0XHRjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcclxuXHRcdFx0XHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpbWcuc3JjID0gJy4uL2ltZy/Rh9C10LotbWluaS5qcGcnO1xyXG5cclxuXHRcdFx0Y2FudmFzLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cykgYWxlcnQoJ0l0IGEgdG91Y2ggc2NyZWVuIGRldmljZS4nKTtcclxuXHRcdFx0ZWxzZSBhbGVydCgnT3RoZXJzIGRldmljZXMnKTtcclxuXHJcblx0XHRcdFxyXG5cdFx0XHRjb25zdCBibHVyTW92ZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRpZiAoZHJhZykge1xyXG5cdFx0XHRcdFx0aWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cykge1xyXG5cdFx0XHRcdFx0XHRyZWN0LncgPSAoZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIHRoaXMub2Zmc2V0TGVmdCkgLSByZWN0LnN0YXJ0WDtcclxuXHRcdFx0XHRcdFx0cmVjdC5oID0gKGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLm9mZnNldFRvcCkgLSByZWN0LnN0YXJ0WTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlY3QudyA9IChlLnBhZ2VYIC0gdGhpcy5vZmZzZXRMZWZ0KSAtIHJlY3Quc3RhcnRYO1xyXG5cdFx0XHRcdFx0XHRyZWN0LmggPSAoZS5wYWdlWSAtIHRoaXMub2Zmc2V0VG9wKSAtIHJlY3Quc3RhcnRZO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHJlY3QudyA9PT0gMCB8fCByZWN0LmggPT09IDApIHJldHVybjtcclxuXHRcdFx0XHRcdGZpbHRlci5yZXNldCgpO1xyXG5cdFx0XHRcdFx0ZmlsdGVyLmFkZEZpbHRlcignYmx1cicsIDIwKTtcclxuXHRcdFx0XHRcdGZpbHRlcmVkSW1hZ2UgPSBmaWx0ZXIuYXBwbHkoaW1nKTtcclxuXHRcdFx0XHRcdGN0eC5kcmF3SW1hZ2UoZmlsdGVyZWRJbWFnZSwgMCwgMCk7XHJcblx0XHRcdFx0XHRjdHgubGluZVdpZHRoID0gMTtcclxuXHRcdFx0XHRcdGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDApJztcclxuXHJcblx0XHRcdFx0XHRpbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YShyZWN0LnN0YXJ0WCwgcmVjdC5zdGFydFksIHJlY3QudywgcmVjdC5oKTtcclxuXHRcdFx0XHRcdGZpbHRlci5yZXNldCgpO1xyXG5cdFx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cdFx0XHRcdFx0aWYgKHJlY3QudyA8IDApIHJ3ID0gcmVjdC5zdGFydFggKyByZWN0Lnc7IFxyXG5cdFx0XHRcdFx0ZWxzZSBydyA9IHJlY3Quc3RhcnRYO1xyXG5cdFx0XHRcdFx0aWYgKHJlY3QuaCA8IDApIHJoID0gcmVjdC5zdGFydFkgKyByZWN0Lmg7XHJcblx0XHRcdFx0XHRlbHNlIHJoID0gcmVjdC5zdGFydFk7XHJcblx0XHRcdFx0XHRjdHgucHV0SW1hZ2VEYXRhKGltZ0RhdGEsIHJ3LCByaCk7XHJcblx0XHRcdFx0XHRjdHguc3Ryb2tlUmVjdChyZWN0LnN0YXJ0WCwgcmVjdC5zdGFydFksIHJlY3QudywgcmVjdC5oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRjb25zdCBzdGFydEJsdXIgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0aWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cykge1xyXG5cdFx0XHRcdFx0cmVjdC5zdGFydFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5vZmZzZXRMZWZ0O1xyXG5cdFx0XHRcdFx0cmVjdC5zdGFydFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5vZmZzZXRUb3A7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlY3Quc3RhcnRYID0gZS5wYWdlWCAtIHRoaXMub2Zmc2V0TGVmdDtcclxuXHRcdFx0XHRcdHJlY3Quc3RhcnRZID0gZS5wYWdlWSAtIHRoaXMub2Zmc2V0VG9wO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkcmFnID0gdHJ1ZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGNvbnN0IGVuZEJsdXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpbWcuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cdFx0XHRcdGRyYWcgPSBmYWxzZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGNvbnN0IHNhdmVJbWcgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRsZXQgbmV3SW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdFx0bGV0IG9sZEltZyA9IHdyYXBJbWcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xyXG5cclxuXHRcdFx0XHRpZiAob2xkSW1nICE9IHVuZGVmaW5lZCkgd3JhcEltZy5yZW1vdmVDaGlsZChvbGRJbWcpO1xyXG5cdFx0XHRcdG5ld0ltZy5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblx0XHRcdFx0d3JhcEltZy5hcHBlbmRDaGlsZChuZXdJbWcpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Y29uc3Qgc3RhcnRSZXNldCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGltZy5zcmMgPSAnLi4vaW1nL9GH0LXQui1taW5pLmpwZyc7XHJcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN0YXJ0Qmx1ciwgZmFsc2UpO1xyXG5cdFx0XHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHN0YXJ0Qmx1ciwgZmFsc2UpO1xyXG5cdFx0XHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVuZEJsdXIsIGZhbHNlKTtcclxuXHRcdFx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZW5kQmx1ciwgZmFsc2UpO1xyXG5cdFx0XHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgYmx1ck1vdmUsIGZhbHNlKTtcclxuXHRcdFx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGJsdXJNb3ZlLCBmYWxzZSk7XHJcblx0XHRcdGJ0blJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRSZXNldCwgZmFsc2UpO1xyXG5cdFx0XHRidG5TYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2F2ZUltZywgZmFsc2UpO1xyXG5cclxuXHRcdH0gY2F0Y2goZXJyKSB7XHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xyXG5cdFx0XHRjdHguZmlsbFRleHQoJ1RoaXMgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCBXZWJHTCcsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcclxuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdH1cclxuXHR9KSAoKTtcclxufSk7Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
