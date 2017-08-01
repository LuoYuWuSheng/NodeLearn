/**
 * Computer user xd
 * Created by 张洋 on 2017/7/12.
 */
var QRCode = require('qrcode');
var QRTerminal = require('qrcode-terminal');

var opt ={
    version:1,
    type:'terminal',
    // errorCorrectionLevel:'H',
    // margin:1,
    scale:10
};

// QRTerminal.setErrorLevel('l');
QRTerminal.generate('This will be a QRCode, eh!',function (qrcode) {
    console.log(qrcode)
});