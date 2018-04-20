 var config = {
        apiKey: "AIzaSyC80yUq1_n29oubnc_nisGuDUUzYKhuLO8",
        authDomain: "master-d1d42.firebaseapp.com",
        databaseURL: "https://master-d1d42.firebaseio.com",
        projectId: "master-d1d42",
        storageBucket: "master-d1d42.appspot.com",
        messagingSenderId: "1005294506678"
      };
  firebase.initializeApp(config);
  var database = firebase.database();
function checkEmail(emailStr){
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (filter.test(emailStr))
            testresults = true;
        else {
            alert("Please input a valid email address!");
            testresults = false;
        }
        return (testresults);
    }
   $(document).ready(function(){
    $("#showSignup").hide();
    firebase.auth().onAuthStateChanged(function(firebaseUser){
        console.log(JSON.stringify(firebaseUser));
        
        if(firebaseUser){
            console.log(firebaseUser.uid);
            firebase.database().ref('/Users/'+firebaseUser.uid).once("value").then(function(response){
                console.log("onAuthstate"+JSON.stringify(response));
                $("#showSignup").hide();
                $("#login").hide();
                $("#SignUp").hide();
                $("#showLogIn").hide();
                // var temp1=firebase.database().child("Users").child(firebaseUser.uid).getValue("email");
                //$("#userStatus").empty();
                // console.log(temp1);
                $("#userStatus").text("*****Sign in"+response.email.val());
                console.log("salam salam");
            });
        }
        else{
            console.log('not logged in');
            $("#userStatus").text("not sign in");
           // $("#showSignup").show();
                $("#login").show();
                $("#showLogIn").show();
                $("#SignUp").show();
            //    $("#userStatus").text("Not Logged in");
            // firebase.auth().ref('/Users/'+user.userid).set({
            //     username : username,
            //     email : email,
            //     password : password,
            //     phoneno : phoneno,
            //     address1 : address1,
            //     address2 : address2,
            //     zipcode : zipcode,
            //     city : city,
            //     displayname : displayname,
            // });
            // location.reload();
        }
    });
   });
  $("#login").on("click",function(){
    //$(this).disable = true;
    var email = $("#usernameLogin").val().trim(); 
    var pass1 = $("#passwordLogin").val().trim();
   // console.log(pass1);
    var pass = pass1.toString(); 
    
      firebase.auth().signInWithEmailAndPassword(email,pass).then(function(user){
          console.log(JSON.stringify(user));
      }).catch(function(error){
          if(error.code == "auth/invalid-email"){
            alert("wrong pass or username");
          }
          if(error.code == "auth/wrong-password"){
                alert("wrong pass or username");
          }
          
          console.log(error.code);
          console.log(error.message);
      });
  });
  $("#SignUp").on("click",function(){
  //  $(this).disable = true;
    $("#showSignup").show();
    $("#showLogIn").hide();
    $("#SignUp").hide();
    $("#LogOut").hide();
    $("#login").hide();
  });
  $("#submitSignUn").on("click",function(){
    //$(this).disable = true;
    var email =$("#username").val().trim();
    console.log(email+":"+ checkEmail(email)); 
    var password = $("#password").val().trim();
    var phoneno = $("#phoneno").val().trim();
    var address1 = $("#address1").val().trim();
    var address2 = $("#address2").val().trim();
    var zipcode = $("#zipcode").val().trim();
    var city= $("#city").val().trim();
    var displayname= $("#displayname").val().trim();
    var state = $("#inputState").val().trim();
    signUp(email,password,phoneno,address1,address2,zipcode,city,displayname,state);
    
    
    
  });
  $("#LogOut").on("click",function(){
    firebase.auth().signOut();
    $(this).disable = true;
    $("#showSignup").hide();
                $("#login").hide();
                $("#SignUp").hide();
  });
function signUp(email,password,phoneno,address1,address2,zipcode,city,displayname,state){
  firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
    useruid = user.uid;
    firebase.database().ref('/Users/'+useruid).push({
        username : username,
        email : email,
        password : password,
        phoneno : phoneno,
        address1 : address1,
        address2 : address2,
        zipcode : zipcode,
        city : city,
        state : state,
        displayname : displayname
    }).catch(function(error){
        if(error.code.toString() == "auth/weak-password"){
            alert("Your password is so weak. Please, select another password.");
        }
        if(error.code == "auth/email-already-in-use"){
            alert("this email is already in use by another user. Please, select another email.");
        }
        
        console.log("SALAM:" ,error.message);
        console.log(error.code);
    }).then(function(){
        location.reload();//window.location.href = "index.html";
    });
});
//location.reload();
}
// firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
//     console.log(firebase.database().ref('/Users/'+user.userid))
// }).catch(function(error){
//     console.log(error.code);
//     console.log(error.message);
// });
// $("#login").on("click",function(){
//     var username = $("username").val();
//     var password= $("password").val();
//     firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
//         console.log(user);
//     }).catch(function(){
//         console.log(error.code);
//         console.log(error.message);
//     });
// });
