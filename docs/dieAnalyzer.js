String.prototype.lpad = function( padString, length ) 
{
	var str = this;
    while ( str.length < length )
        str = padString + str
    return str
}

function getLatestRollSanitized( )
{
	var input = document.getElementById( "latestRoll" ).value
	if( isNaN( input ) )
	{
		alert( input + " is not a number" )
		return null
	}
	else if( input < 1 || input > 20 )
	{
		alert( input + " is out of range" )
		return null
	}
	else
	{
		return input
	}
}

function incrementDivWithNumber( divName )
{
	var result = document.getElementById( divName )
	result.innerHTML = ( parseInt( result.innerHTML, 10 ) + 1 ).toString( )
}

function getDivWithNumberValue( divName )
{
	return parseInt( document.getElementById( divName ).innerHTML, 10 )
}

function setDivWithPercent( divName, percent )
{
	var pct = percent * 100
	document.getElementById( divName ).innerHTML = pct.toFixed( 1 ) + "%"
}

function setDiv( divName, number )
{
	document.getElementById( divName ).innerHTML = number
}

function updateResults( newValue )
{
	incrementDivWithNumber( "totalRolls" )
	incrementDivWithNumber( "results" + newValue.toString( ).lpad( "0", 2 ) )
	
	var totalRolls = getDivWithNumberValue( "totalRolls" )
	var expected = totalRolls / 20
	var chiSquared = 0
	for( face = 1; face <= 20; face++ )
	{
		var faceCount = getDivWithNumberValue( "results" + face.toString( ).lpad( "0", 2 ) )
		setDivWithPercent( "resultPct" + face.toString( ).lpad( "0", 2 ), faceCount / totalRolls )
		
		chiSquared += Math.pow( faceCount - expected, 2 ) / expected
	}
	
	setDiv( "chiSquared", chiSquared.toFixed( 2 ) )
	if( totalRolls < 400 )
	{
		setDiv( "status", "Not enough samples" )
	}
	else if( chiSquared < 27.204 )
	{
		setDiv( "status", "No bias" )
	}
	else if( chiSquared < 30.144 )
	{
		setDiv( "status", "Small bias" )
	}
	else if( chiSquared < 36.191 )
	{
		setDiv( "status", "Moderate bias" )
	}
	else if( chiSquared < 43.820)
	{
		setDiv( "status", "Strong bias" )
	}
	else
	{
		setDiv( "status", "Extreme bias" )
	}
}

function addNewRoll( )
{
	var input = getLatestRollSanitized( )
	if( input == null )
	{
		return;
	}
	
	updateResults( input )
}

function addRandomRoll( count )
{
	for( i = 0; i < count; i++ )
	{
		updateResults( Math.floor( ( Math.random( ) * 20 ) + 1 ) )
	}
}