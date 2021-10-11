window.onload = function() {
    inactivityTime();
  }

//A function which keeps track of whether a user is inactive or not.
function inactivityTime() {
    //Only run the code if the user is logged in.
    if (window.localStorage.getItem("token") != null) {
        var time; //Timer
        //If the user does anything then reset the timer
        document.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onmousedown = resetTimer; 
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer;  
        document.onkeydown = resetTimer;   

        //If user does nothing for the whole timer's duration then user is logged out and local storage is cleared.
        function logout() {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('cookbookID');
            window.localStorage.removeItem('userID');
            window.location.href = "/";
        }

        //Function which resets the timer by calling clearTimeout() and setTimeout()
        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, 300000); //Timer set for 5mins, you should change this to a lower value for testing
        }
    }
};