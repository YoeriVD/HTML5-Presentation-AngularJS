window.onload = function () {
    var boxes = document.querySelectorAll(".box");
    [].forEach.call(boxes, function (box) {
        box.addEventListener('dragstart', handleDragStart, false);
        box.addEventListener('dragend', handleDragEnd, false);
    });

    var dropzone = document.getElementById("dropzone");
    dropzone.addEventListener('dragenter', handleDragEnter, false);
    dropzone.addEventListener('dragover', handleDragOver, false);
    dropzone.addEventListener('dragleave', handleDragLeave, false);
    dropzone.addEventListener('drop', handleDrop, false);
    var draggedBox;

    //event wanneer men begint met slepen
    function handleDragStart(e) {
        //transparant maken als indicatie dat het element gesleept wordt
        this.style.opacity = '0.4';
        draggedBox = this;
    }
    //event dat het element triggered waarin degropped wordt
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // de browser doet meestal een redirect, dit houdt dat tegen
        }
        this.innerHTML = draggedBox.firstElementChild.innerHTML;
        draggedBox = null;
        return false;
    }

    //event dat het gesleepte element gooit bij het stoppen met draggen
    function handleDragEnd(e) {
        this.style.opacity = '1';
        dropzone.classList.remove('over');
    }

    //event dat getriggered wordt wanneer er iets op de dropzone wordt gesleept
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); //dit zorgt ervoor dat wij het event opvangen en niet een default actie
        }
        e.dataTransfer.dropEffect = 'move';  // geeft ons een bepaalde cursor (muis met blokje), andere varianent: link, copy, none
        return false; //dit event mag niet verder bubblen
    }
    //een er wordt iets over de dropzone gesleept, zonder los te laten
    function handleDragEnter(e) {
        this.classList.add('over');
    }
    //een element dat boven de dropzone is gehouden wordt terug uit de dropzone gesleept zonder los te laten
    function handleDragLeave(e) {
        this.classList.remove('over');
    }
}