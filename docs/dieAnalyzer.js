String.prototype.lpad = function( padString, length ) 
{
	var str = this;
    while ( str.length < length )
        str = padString + str;
    return str;
}

function getLatestRollSanitized( )
{
	var input = document.getElementById( "latestRoll" ).value;
	if( isNaN( input ) )
	{
		alert( input + " is not a number" );
		return null;
	}
	else if( input < 1 || input > 20 )
	{
		alert( input + " is out of range" );
		return null;
	}
	else
	{
		return input;
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
	document.getElementById( divName ).innerHTML = pct.toFixed( 0 ) + "%"
}

function updateResults( newValue )
{
	incrementDivWithNumber( "totalRolls" )
	incrementDivWithNumber( "results" + newValue.toString( ).lpad( "0", 2 ) )
	
	var totalRolls = getDivWithNumberValue( "totalRolls" )
	for( face = 1; face <= 20; face++ )
	{
		var faceValue = getDivWithNumberValue( "results" + face.toString( ).lpad( "0", 2 ) )
		setDivWithPercent( "resultPct" + face.toString( ).lpad( "0", 2 ), faceValue / totalRolls )
	}
}

function addNewRoll( )
{
	var input = getLatestRollSanitized( );	
	if( input == null )
	{
		return;
	}
	
	updateResults( input )
}

function addRandomRoll( )
{
	updateResults( Math.floor( ( Math.random( ) * 20 ) + 1 ) )
}