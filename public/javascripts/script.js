// function foo() {
//   // your function code here

//   setTimeout(foo, 5000);
// }

// foo();
function anotherTRY() {
  $("#generalMsgBox").reload();
  setTimeout(anotherTRY, 3000);
}
function try2() {
  $("#generalMsgBox").load(window.location.href + " #generalMsgBox");
  setTimeout(try2, 2000);
}
try2();
anotherTRY();
// function loadMsg() {
//   console.log("chatting");
//   // don't cache ajax or content won't be fresh
//   $.ajaxSetup({
//     cache: false,
//   });
//   var ajax_load =
//     "<img src='http://automobiles.honda.com/images/current-offers/small-loading.gif' alt='loading...' />";

//   // load() functions
//   var loadUrl = "http://localhost:3000/lobby/Bar/62c705612efe0dd23e5e3bd2";
//   this.refresh();
//   $(".generalMsgBox").click(function () {});
//   setTimeout(loadMsg, 2000);
//   // end
// }
// loadMsg();
