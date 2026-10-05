function myFunction1(event) {
    event.preventDefault();

    // Get the text field
    var copyText = document.getElementById("BTC");
    
    navigator.clipboard.writeText(copyText.innerText);
  
    // Alert the copied text
   
 
}

function myFunction2(event) {
    event.preventDefault();
    // Get the text field
    var copyText = document.getElementById("USDT");
  


    navigator.clipboard.writeText(copyText.innerText);
  
    // Alert the copied text
   
    
}