var vName = "";
var vEmail = "";
var vUsername ="";
var diceClickCount = 1;
var lastTryMode = false;
var diceSum = 0;
var diceArray = ['dice1.jpg','dice2.jpg','dice3.jpg','dice4.jpg','dice5.jpg','dice6.jpg'];

var image1 = document.getElementById("image1");
var image2 = document.getElementById("image2");
var image3 = document.getElementById("image3");
var image4 = document.getElementById("image4");

const origialImage3Path = image3.src;

function image1Function(){ ShowRegistrationForm("block");}
image1.addEventListener('click', image1Function);


function image2Function(){ 
    displayRegistrationInfo("block");    
    image2.removeEventListener('click', image2Function);
    image3.addEventListener('click', image3function);
}

function diceImageFunction(){
    var dicevalue = RollDice();
    if(diceClickCount <= 3)
    {
        diceSum += dicevalue;
        diceRollResultDiv.innerHTML = "Dice Roll Result: " + dicevalue + "<br> Dice Sum: " + diceSum + "<br> Dice Click Count: " + diceClickCount;
       
        if(diceSum > 10)
        {
            image4.addEventListener('click', image4GreatherThan10function);            
        }
        else
        {
            image4.addEventListener('click', image4LessThan10function);            
        }                   
    } 
    
    if( diceSum <= 10 & diceClickCount == 4 & lastTryMode == false)
    {
        lastTryMode = true;
        image4.removeEventListener('click', image4GreatherThan10function);
        image4.removeEventListener('click', image4LessThan10function);
        alert("Dice Sum is less than 10 - please try again!");
        diceSum = 0;
        diceClickCount = 1;
        diceRollResultDiv.innerHTML = "Dice Roll Result: " + dicevalue + "<br> Dice Sum: " + diceSum;
        image3.src = origialDiceImagePath;
    }

    if(lastTryMode==true & diceClickCount == 3)
    {   
        if(diceSum > 10)
        {
            image4.addEventListener('click', image4GreatherThan10function);            
        }
        else
        {
            alert("Bad Luck - you have exceeded your attempts!");          
            image4.removeEventListener('click', image4GreatherThan10function);
            image4.removeEventListener('click', image4LessThan10function);
        } 
    }

    diceClickCount++;
}


function image3function(){        
    diceImage= document.getElementById("diceImage"); 
    
    if(image3.src == origialImage3Path)
    {
        image3.src = diceImage.src;
    }
    else
    {
        diceImageFunction();
    }
 }

function image4GreatherThan10function(){
    document.getElementById("CouponGenerator").display = "block";
   
 }

 function image4LessThan10function(){
   alert("Dice Sum is less than 10 - please try again!");
 }

 function  GenerateCoupon()
 {
    var coupon = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
        coupon += possible.charAt(Math.floor(Math.random() * possible.length));

    document.getElementById("coupon").innerHTML = "Coupon: " + coupon;
 }


function ShowRegistrationForm(visibility)
{
    document.getElementById("formDiv").style.display = visibility;    
}

function SaveRegistration(){
    vName =  document.getElementById("name");
    vEmail =  document.getElementById("email");
    vUsername =  document.getElementById("username");

    alert("Name: " + vName.value + "\nEmail: " + vEmail.value + "\nUsername: " + vUsername.value);
    ShowRegistrationForm("none");

    image1.removeEventListener('click', image1Function);
    image2.addEventListener('click', image2Function);
}

function displayRegistrationInfo( visibility)
{
    //<spam id="namespan"></spam> &nbsp;&nbsp;<span id="usernameSpan"></span>
    document.getElementById("namespan").innerHTML = "Name: " + vName.value ;
    document.getElementById("usernameSpan").innerHTML = "Username: " + vUsername.value;
    registrationInfoDiv.style.display = visibility;
}


function RollDice()
{
  return  Math.floor(Math.random() * 6) + 1;
}