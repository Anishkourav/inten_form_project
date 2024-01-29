var empDataArray = [];
var empHtmlString;
$("#submit").click(a => {
  a.preventDefault()
 var fname = $("#fname").val();
 var lname = $("#lname").val();
 var email = $("#email").val();
 var password = $("#password").val();
 var empData = {
    fname: fname,
    lname: lname,
    email: email,
    password: password
 } 
 fname==""||lname==""||email==""||password==""?oops():success(empData); 
 renderTable();
});
$('body').on('click','.btn-danger',function(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      var id=$(this).attr("id")
      empDataArray=empDataArray.filter((a)=>a.email !==id);
      renderTable();
      if(result.isConfirmed){

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
    }
  });
});
function clearField()   {
$("#fname").val("");
$("#lname").val("");
$("#email").val("");
$("#password").val("");
}
function renderTable(){
var empHtmlString="";
empDataArray.forEach(a => {
  var password = "anish";
  secret = "kourav";
  var enc = CryptoJS.AES.encrypt(password, secret).toString();
  empHtmlString  += "<tr>"
  empHtmlString  += "<td>"+ a.fname+"</td>"+"<td>"+ a.lname+"</td>"+"<td>"+ a.email+"</td>"+"<td>"+ a.password+"</td>"+`<td><button class="fa fa-trash-o btn btn-danger" id="${a.email}"></button></td>`;
  empHtmlString  += "</tr>"
})
$("#storedata").html(empHtmlString);
}
function oops(){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}
function success(empData){
  var pattern= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if(pattern.test(empData.email))
  {
    empDataArray.push(empData);
    console.log(empDataArray); 
    clearField();
    Swal.fire({
       title: "Employee Data has been store",
       text: "You clicked the button!",
       icon: "success"
      });
      renderTable();  
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
}