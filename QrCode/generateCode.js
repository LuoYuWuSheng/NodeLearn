/**
 * Computer user xd
 * Created by 张洋 on 2017/7/12.
 */
// var QRCode = require('qrcode');
// var QRTerminal = require('qrcode-terminal');
//
// var opt ={
//     version:1,
//     type:'terminal',
//     // errorCorrectionLevel:'H',
//     // margin:1,
//     scale:10
// };
//
// // QRTerminal.setErrorLevel('l');
// QRTerminal.generate('This will be a QRCode, eh!',function (qrcode) {
//     console.log(qrcode)
// });
/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * */
var oddEvenList = function (head) {
    if(head == null) return null;
    var even = head.next;
    var oddHead = head;
    var evenHead = even;
    while (even!=null && even.next!=null){
        head.next = even.next;
        head = head.next;

        even.next = head.next;
        even = even.next;
    }
    if(head!=null)head.next = evenHead;
    return oddHead;
};

{
    var head = new ListNode(1);
    var index = head;
    for (var i =2;i<5;i++){
        index.next = new ListNode(i);
        index = index.next;
    }
    head = null;
    var res = oddEvenList(head);
    while (res!=null){
        console.log(res.val);
        res = res.next;
    }
}