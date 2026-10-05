var btcValue = document.getElementById('BTC');
var btcPhoto = document.getElementById('btc-photo');

var usdtValue = document.getElementById('USDT');
var usdtPhoto = document.getElementById('usdt-photo');

var bankName = document.getElementById('bankName');
var accountName = document.getElementById('acctName');
var accountNumber = document.getElementById('acctNum');
var routingNumber = document.getElementById('routing');
var Address = document.getElementById('address');

var btcDetails = firebase.database().ref('bitcoin');
btcDetails.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  btcValue.innerHTML = data.bitcoinAddress;
  btcPhoto.src = data.imageUrl;
});

var usdtDetails = firebase.database().ref('usdt');
usdtDetails.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  usdtValue.innerHTML = data.usdtAddress;
  usdtPhoto.src = data.imageUrl;
});

var bankDetails = firebase.database().ref('bank');
bankDetails.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  bankName.innerHTML = '<b>Bank name:</b>' + ' ' + data.bankName;
  accountName.innerHTML = '<b>Account name:</b>' + ' ' + data.accountName;
  accountNumber.innerHTML = '<b>Account number:</b>' + ' ' + data.accountNumber;
  routingNumber.innerHTML = '<b>Routing number:</b>' + ' ' + data.routingNumber;
  Address.innerHTML = '<b>Address:</b>' + ' ' + data.bankAddress;
});