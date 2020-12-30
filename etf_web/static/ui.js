function disableButtons(p) {
    Array.from(document.getElementsByClassName("but")).forEach(
        function (element, index, array) {
            element.disabled = p;
        }
    );
}