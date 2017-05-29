function getPos(e){
    		x=e.clientX;
    		y=e.clientY;

            console.log("[ " + x + ", " + y + "]");

    		// cursor="Your Mouse Position Is : " + x + " and " + y ;
    		// document.getElementById("displayArea").innerHTML=cursor
    	}

	function showHint(e) 
	{
		$('#' + e).fadeIn();
	}
	function hideHint(e)
	{
		$('#' + e).fadeOut();
	}