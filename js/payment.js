//let bitcoin = document.getElementById('btc');
let select = document.getElementById('paymentSelect');
let btcAddress = document.getElementById('btcAddress');
let usdtAddress = document.getElementById('usdtAddress');
let bank = document.getElementById('bankAddress');

function checkPayment(){
    
    if (select.value == 'BITCOIN'){
        console.log('worked');
        btcAddress.style.display = 'block';
        usdtAddress.style.display = 'none';
        bankAddress.style.display = 'none';
    }else if(select.value == 'USDTTRC20'){
        usdtAddress.style.display = 'block';
        btcAddress.style.display = 'none';
        bankAddress.style.display = 'none';
    }else if(select.value == 'BANKTRANSFER') {
        bank.style.display = 'block';
        usdtAddress.style.display = 'none';
        btcAddress.style.display = 'none';
    } else if(select.value == ' ') {
        alert('Choose either BITCOIN, USDT TRC20 Or BANK WIRE TRANSFER')
    }else {
        console.log('select an option')
    }
}


    