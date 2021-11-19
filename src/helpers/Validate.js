const Validate = (evt) => {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        theEvent.preventDefault();
        // key = theEvent.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
};

export default Validate;
