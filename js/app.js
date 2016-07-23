



var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var inputs;
var obj = {id: "unchanged", submitted: false, first: true, current: "#region"};

var newapp = true;

var fieldsets = ["#region", "#login", "#existingfs1", "#startfs1", "#parentfs1", "#sanchalakfs1", "#academicfs1", "#satsangfs1", "#essayfs1", "#niyamfs1", "#finish1"]

Parse.initialize("0Fb9B6wZHGmpjRTJUoRvyFSGQl2lTOhbYNnvazTv", "gHDjSNQtKWNaFlquz6QCvBWiIJHVQ3CqEezuS22r");
Parse.serverURL = 'https://parseapi.back4app.com';
var DB = "BST2016";         // need for accessing the DB in parse
var region;  // for region



$('.forgot').on('click', function(e){
    
    e.preventDefault();
    
    /* Popup an alert with the form */
    $.jAlert({
        'title': 'Forgot Password',
        'content': '<label>Enter your email and birthday to get your password.</label><br><form>Email:<br><input type="email" name="email"><br>Birthday: (MM/DD/YYYY) <br><input type="date" name="birthday">',
        'theme': 'blue',
        'onOpen': function(alert){
            alert.find('form').on('submit', function(e){
                e.preventDefault();
            })
    },
        'autofocus': 'input[name="email"]',
        'btns': [
            /* Add a save button */
            { 'text': 'Submit', 'theme': 'green', 'closeAlert': false,         

            'onClick': function(e){
                
            e.preventDefault();

            var btn = $('#'+this.id),
              alert = btn.parents('.jAlert'),
              form = alert.find('form'),
              email = form.find('input[name="email"]').val(),
              birth = form.find('input[name="birthday"]').val();

            /* Verify required fields, validate data */
                var searcher = Parse.Object.extend(DB);
                var query = new Parse.Query(searcher);
                query.equalTo("email", email);
                query.equalTo("birthday", birth);
                // event.preventDefault();

                query.find({
                    success: function(results) {
                    // alert("Successfully retrieved " + results.length + " scores.");
                        // Do something with the returned Parse.Object values
                        for (var i = 0; i < results.length; i++) {
                          var object = results[i];
                          var returnEmail = object.get('email');
                          var returnPass = object.get('password');


                        }

                        if(returnEmail === undefined) {
                            returnEmail = "Incorrect email or birthday."
                            returnPass = "Incorrect email or birthday."
                        }
                        infoAlert('Email : ' + returnEmail + "<br>Password : " + returnPass);
                    },
                    error: function(error) {
                        errorAlert("Error: " + error.code + " " + error.message);
                    }
                });


            /* If it was successful, redirect user */
            // window.location.href = '';


            return false;
          }
       },
      {
        'text': 'close'
      }
        ]
    });
});
  





function headerClick(id){   

    console.log(("#"+ id+"1"));
    console.log($("#"+ id+"1").index());

    // current_fs = $(this).prev();
    // var test= $(this).next();
    // var test2= $(this).siblings();
    // var test3= $(this).parent().parent().children();
    // console.log(test);
    // console.log(test2);
    // console.log(test3);


        console.log(current_fs);
        console.log(current_fs.index());
        console.log($("fieldset").index(current_fs));

    console.log($("fieldset").index(current_fs));
    console.log(current_fs);
    console.log($(obj.current));

    current_fs = obj.current;
    next_fs = $("#"+ id+"1");

    // $("#progressbar li").eq($("fieldset").index(current_fs).addClass("active"));

    $("#msform").validate({
            errorPlacement: $.noop,
            ignore: ".ignore, :hidden"
        }); 

    console.log($("#msform").valid());
        // GET VALUES FROM ARRAY OF INPUTS
        var test = current_fs.serializeArray();
        console.log(test);

        var check = checkifValid(test);

    if(check != false) {
        shiftPage(current_fs, next_fs);
        if(obj.submitted) {
            getInfo(obj.id,next_fs);
        }
    } else {
        errorAlert("Please fill out all the required information.");
    }

};

function regionClick(id){

    // console.log($(this).parent());
    // console.log($("#start"));

    // newapp = true;

    animating = true;

    current_fs = $(this).parent();
    console.log(obj.current);

    console.log(id);

    if(id == "southeast") {
        region = "Southeast";
        var cent = document.getElementById("SEcenter");
        cent.classList.remove('hide');
    } else if (id == "northeast") {
        region = "Northeast";
        var cent = document.getElementById("NEcenter");
        cent.classList.remove('hide');
    } else if (id == "midwest") {
        region = "Midwest";
        var cent = document.getElementById("MWcenter");
        cent.classList.remove('hide');
    } else if (id == "southwest") {
        region = "Southwest";
        var cent = document.getElementById("SWcenter");
        cent.classList.remove('hide');
    } else if (id == "west") {
        region = "West";
        var cent = document.getElementById("Wcenter");
        cent.classList.remove('hide');
    } else if (id == "canada") {
        region = "Canada";
        var cent = document.getElementById("Canadacenter");
        cent.classList.remove('hide');
    }
 


    // next_fs = $("#login");
    // // next_fs.show(); 
    // obj.current = next_fs;
    // console.log(obj.current);

    // shiftPage(current_fs, next_fs);

    // var region = document.getElementById("region");
    // region.classList.add('hide');



    animating = true;

    current_fs = $("#region");
    // console.log(obj.current);
 
    next_fs = $("#login");
    next_fs.show(); 
    obj.current = next_fs;
    // console.log(obj.current);


    // $("#progressbar li").eq($("fieldset").index(next_fs)-1).addClass("active");

    current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                current_fs.hide();
                animating = false;
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });


};



$(".new").click(function(){

    // console.log($(this).parent());
    // console.log($("#start"));

    newapp = true;

    animating = true;

    current_fs = $(this).parent();
    console.log(obj.current);
 


    next_fs = $("#startfs1");
    next_fs.show(); 
    obj.current = next_fs;
    console.log(obj.current);


    $("#progressbar li").eq($("fieldset").index(next_fs)-1).addClass("active");

    current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                current_fs.hide();
                animating = false;
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });

});



$(".existing").click(function(){

    // console.log($(this).parent());
    // console.log($("#start"));

    newapp = false;

    animating = true;

    current_fs = $(this).parent();
    

    next_fs = $("#existingfs1");
    next_fs.show(); 
    obj.current = next_fs;
    console.log(obj.current);
    // $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                current_fs.hide();
                animating = false;
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });

});

$(".search").click(function(){
    

    var input = $(this).parent().serializeArray();
    var email = input[0].value;
    console.log(email);

    // var div = document.createElement("P");
    // div.style.width = "50vw";
    // div.style.height = "60vh";
    // div.style.background = "red";
    // div.style.margin = "50px auto";

    // document.body.appendChild(div);v 

    var div = document.getElementById("searchResults");
    div.innerHTML = "";

    var searcher = Parse.Object.extend(DB);
    var query = new Parse.Query(searcher);
    query.startsWith("email", email);
    // event.preventDefault();
    query.find({
        success: function(results) {
        // alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

              // div.appendChild(document.
                var t = document.createTextNode("Email : " + object.get('email') + " || " + "Name : " + 
                    object.get('firstname') +' '+  object.get('middlename') +' ' + object.get('lastname') +"\n");

              var btn = document.createElement("button");

              btn.setAttribute("id", object.id);
              btn.setAttribute('onclick','check(id);');
                btn.setAttribute('class', 'btn btn-default');
                btn.setAttribute("style","text-align: center", "margin = '50px auto'");
                
                btn.appendChild(t);

                div.appendChild(btn);
            }
        },
        error: function(error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
    });


});


function check(ObjectID) {  

    obj.id = ObjectID;

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);
    var pass = prompt("Please enter your password.");


    event.preventDefault();
    query.get(ObjectID, {
        success: function(details) {
                console.log(details)
            if(pass === details.get("password")) {
                console.log(ObjectID);
                obj.submitted = true;
                gotoStart();
                loadDetails(details.id);
                
            } else {
                errorAlert("Your password is incorrect!")
            }
        },
        error: function(object, error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
        
    });

    console.log(obj.id);
};


function gotoStart(){
    animating = true;

    current_fs =  $("#existingfs1");

    console.log(current_fs);
    next_fs = $("#startfs1");
    next_fs.show(); 
    obj.current = next_fs;
        console.log(obj.current);

    $("#progressbar li").eq($("fieldset").index(next_fs)-1).addClass("active");


    current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                current_fs.hide();
                animating = false;
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });

}

function loadDetails(ObjectID) {
   
    //add parse
    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    var values = $("#msform").serializeArray();
    console.log(values);

    console.log(obj.id);

    event.preventDefault();

    query.get(ObjectID, {
        success: function(details) {
            for (var prop in values) {
                  var lookup = values[prop].name;
                  console.log(obj[lookup]);
                  console.log(obj);
                  console.log(details.get(lookup));
                  obj[lookup] = details.get(lookup);
                  console.log(obj[lookup]);
                  console.log(obj);

                  // $("#"+lookup).val(details.get(lookup));

                  // console.log(name);
                  // console.log(details.get(lookup));
                  // console.log("#"+lookup);
                  // console.log();

                  // var value = values[prop].value;
                  // console.log(value);
                  // console.log(ObjectID);
              };


            getInfo(obj.id,next_fs);

            
            // if(pass === details.get("password")) {
            //     loadDetails(details.get("id"));
            // } else {
            //     alert("Your Password is Incorrect!")
            // }
        },
        error: function(object, error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
        
    });


// console.log($('input[name="name"]').val('jay'));
};

function getInfo(ObjectID,field) {


    var values = field.serializeArray();
    console.log(values);

    console.log(obj.id);

    for (var prop in values) {
          var lookup = values[prop].name;


          console.log(obj[lookup]);
        var value = values[prop].value;
          console.log(value);

          $("#"+lookup).val(obj[lookup]);


          console.log(obj);
          console.log("#"+lookup);

          console.log(obj[lookup]);
          console.log(obj);

          // $("#"+lookup).val(details.get(lookup));

          // console.log(name);
          // console.log(details.get(lookup));
          // console.log("#"+lookup);
          // console.log();

          // var value = values[prop].value;
          // console.log(value);
          // console.log(ObjectID);
      };
};


$(".save").click(function(){

    $("#msform").validate({
            errorPlacement: $.noop,
            ignore: ".ignore, :hidden"
        });

    console.log($("#msform").valid());
        // GET VALUES FROM ARRAY OF INPUTS
        var test = $(this).parent().serializeArray();
        console.log(test);

        var check = checkifValid(test);

    if(check != false){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        obj.current = next_fs;
            console.log(obj.current);

        var test2 = next_fs.serializeArray();
        console.log(test2);

        // get values for next page
        var values = $(this).parent().serializeArray();

        // var submitted = true;
        if(obj.submitted) {
            console.log(obj.id);

            var tester = Parse.Object.extend(DB);
            var query = new Parse.Query(tester);
            event.preventDefault();
            query.get(obj.id, {
                success: function(details) {
                    for (var prop in values) {
                      var name = values[prop].name;
                      console.log(name);
                      var value = values[prop].value;
                      console.log(value);

                        // add to PARSE
                        details.set(name, value);

                             details.save(null, {
                              success: function(details) {
                                console.log("success");
                              },
                              error: function(details, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                errorAlert('Failed to create new object, with error code: ' + error.message);
                              }
                            });
                    };


                },
                error: function(object, error) {
                    errorAlert("Error: " + error.code + " " + error.message);
                }

            });

            //shiftPage(current_fs,next_fs);
            getInfo(obj.id,next_fs);

        } else {
            //add parse

            if(obj.first === true) {
                var User = Parse.Object.extend(DB);
                var trial = new User();
                trial.set("submitted",true);
                trial.save(null, {
                  success: function(trial) {
                    // Execute any logic that should take place after the object is saved.
                    var test = trial.id;
                    obj.id = test;
                  },
                  error: function(trial, error) {
                    // Execute any logic that should take place if the save fails.
                    errorAlert('Failed to create new object, with error code: ' + error.message);
                  }
                });

                    var saved = false;
                        // for all the values in form
                    for (var prop in values) {
                      var name = values[prop].name;
                      console.log(name);
                      var value = values[prop].value;
                      console.log(value);

                        // add to PARSE
                        trial.set(name, value);


                             trial.save(null, {
                              success: function(trial) {
                                console.log("success");
                              },
                              error: function(trial, error) {
                                // Execute any logic that should take place if the save fails.
                                errorAlert('Failed to create new object, with error code: ' + error.message);
                              }
                        });


                    }

                    // Add Region Data
                    trial.set("region", region);
                    trial.save(null, {
                      success: function(trial) {
                        console.log("success");
                      },
                      error: function(trial, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        errorAlert('Failed to create new object, with error code: ' + error.message);
                      }
                    });

                console.log(test);
            } else {


                var trial = Parse.Object.extend(DB);
                var query = new Parse.Query(trial);
                query.get(obj.id, {
                  success: function(trial) {
                        // for all the values in form
                    for (var prop in values) {
                      var name = values[prop].name;
                      console.log(name);
                      var value = values[prop].value;
                      console.log(value);

                        // add to PARSE
                        trial.set(name, value);


                             trial.save(null, {
                              success: function(trial) {
                                console.log("success");
                              },
                              error: function(trial, error) {
                                // Execute any logic that should take place if the save fails.
                                errorAlert('Failed to create new object, with error code: ' + error.message);
                              }
                        });


                    }
                  },
                  error: function(User, error) {
                    // The object was not retrieved successfully.
                    errorAlert('Failed to get old object, with error code: ' + error.message);
                  }
                });

            }

            obj.first = false;
            //shiftPage(current_fs,next_fs);

        }


        infoAlert("Your Application has been saved!");
    } else {
        errorAlert("Please fill out all the required information.");
    }



});


function shiftPage(current_fs, next_fs) {
    //activate next step on progressbar using the index of next_fs
        // $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        $("#progressbar li").eq(next_fs.index()-2).addClass("active");
   
        //show the next fieldset
        next_fs.show(); 
        obj.current = next_fs;
            console.log(obj.current);

        // current_fs.hide();
        // hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                // scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                // current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                current_fs.hide();
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });



}

function checkifValid(values) {
    console.log(newapp);
    var pass;
    var sum = 0;
    for (var prop in values) {
        var value = values[prop].value;
        var name = values[prop].name;

        // For the Niyam Validate and Grade
        if(value === "" || value === "-- --" || value === "Select Your Grade") {
           return false;
        }

        // For the Niyam Add.
        if(name.indexOf("NA") >= 0) {
            sum = +sum + +value;
        }
        // console.log(sum);


        // For the Center Validate
        if(region === "Southeast" && values[prop].name === "SEcenter" && value === "Select an Option") {
            return false;
        } else if (region === "Northeast" && values[prop].name === "NEcenter" && value === "Select an Option") {
            return false;
        } else if (region === "Midwest" && values[prop].name === "MWcenter" && value === "Select an Option") {
            return false;
        } else if (region === "Southwest" && values[prop].name === "SWcenter" && value === "Select an Option") {
            return false;
        } else if (region === "West" && values[prop].name === "Wcenter" && value === "Select an Option") {
            return false;
        } else if (region === "Canada" && values[prop].name === "Canadacenter" && value === "Select an Option") {
            return false;
        }
        

        if(values[prop].name === "password") {
            pass = values[prop].value;
        }
        if(values[prop].name === "confirm") {
            if(pass !== values[prop].value){
                errorAlert("The passwords do NOT match!");
                return false;
            }
        }
        if(values[prop].name == "email" && newapp)
        {
            var email = values[prop].value;
            var searcher = Parse.Object.extend(DB);
            var query = new Parse.Query(searcher);
            query.equalTo("email", email);
            event.preventDefault();
            query.first({
                success: function(results) {
                    if (results != null)
                    {
                        alert("An application with same email already exists. Please login from the existing user button.");
                        console.log("Email exists!");
                        window.history.go(0);
                        return false;
                    }
                },
                error: function(error) {
                    errorAlert("Error: " + error.code + " " + error.message);
                }
            });

        }
    }


    if(values[0].name.indexOf("NA") >= 0) {
        // ADD sum Parse
            var tester = Parse.Object.extend(DB);
            var query = new Parse.Query(tester);
            event.preventDefault();
            query.get(obj.id, {
                success: function(details) {
                    //add to parse
                    details.set("NAsum", sum);

                        details.save(null, {
                            success: function(details) {
                                console.log("success");
                            },
                            error: function(details, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                errorAlert('Failed to create new object, with error code: ' + error.message);
                            }
                        });
                },
                error: function(object, error) {
                    errorAlert("Error: " + error.code + " " + error.message);
                }

            });
    }

}


$(".previous").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    // $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show(); 
    obj.current = previous_fs;
        console.log(obj.current);


    // current_fs.hide();
    // hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            // scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'opacity': opacity});
        }, 
        duration: 800, 
        complete: function(){
            current_fs.hide();
        }, 
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$(".next").click(function(){
    $("#msform").validate({
        errorPlacement: $.noop,
        ignore: ".ignore, :hidden"
    });


    // console.log($(this).parent());
    // console.log($(this).parent().valid());
    // console.log($(this).valid());

    console.log($("#msform").valid());
    // GET VALUES FROM ARRAY OF INPUTS
    var test = $(this).parent().serializeArray();
    console.log(test);

    // var niyam = $('#niyamfs1').serializeArray();
    // console.log(niyam);

    var check = checkifValid(test);

    if(check != false){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        obj.current = next_fs;
        console.log(obj.current);

        var test2 = next_fs.serializeArray();
        console.log(test2);

        // get values for next page
        var values = $(this).parent().serializeArray();


        // GET VALUES FROM ARRAY OF INPUTS
        // var values = $(this).parent().serializeArray();
        // console.log(values);


        // var submitted = true;
        if(obj.submitted) {
            console.log(obj.id);
            // var email = loadDetails(ObjectID);
            // console.log(email);
            // var id = getObjectID(values);
            // console.log(id);
            //add parse
            var tester = Parse.Object.extend(DB);
            var query = new Parse.Query(tester);
            event.preventDefault();
            query.get(obj.id, {
                success: function(details) {
                    for (var prop in values) {
                        var name = values[prop].name;
                        console.log(name);
                        var value = values[prop].value;
                        console.log(value);

                        // add to PARSE
                        details.set(name, value);

                        details.save(null, {
                            success: function(details) {
                                console.log("success");
                            },
                            error: function(details, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                errorAlert('Failed to create new object, with error code: ' + error.message);
                            }
                        });
                    };
                },
                error: function(object, error) {
                    errorAlert("Error: " + error.code + " " + error.message);
                }

            });

            shiftPage(current_fs,next_fs);
            getInfo(obj.id,next_fs);

        } else {
            //add parse

            if(obj.first === true) {
                var User = Parse.Object.extend(DB);
                var trial = new User();
                trial.set("submitted",true);
                trial.save(null, {
                    success: function(trial) {
                        // Execute any logic that should take place after the object is saved.
                        // alert('New object created with objectId: ' + trial.id);
                        var test = trial.id;
                        obj.id = test;
                    },
                    error: function(trial, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        errorAlert('Failed to create new object, with error code: ' + error.message);
                    }
                });

                var saved = false;
                // for all the values in form
                for (var prop in values) {
                    var name = values[prop].name;
                    console.log(name);
                    var value = values[prop].value;
                    console.log(value);

                    // add to PARSE
                    trial.set(name, value);


                    trial.save(null, {
                        success: function(trial) {
                            console.log("success");
                        },
                        error: function(trial, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            errorAlert('Failed to create new object, with error code: ' + error.message);
                        }
                    });


                }

                // Add Region Data
                    trial.set("region", region);
                    trial.save(null, {
                      success: function(trial) {
                        console.log("success");
                      },
                      error: function(trial, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        errorAlert('Failed to create new object, with error code: ' + error.message);
                      }
                    });


                console.log(test);
            } else {


                var trial = Parse.Object.extend(DB);
                var query = new Parse.Query(trial);
                query.get(obj.id, {
                    success: function(trial) {
                        // for all the values in form
                        for (var prop in values) {
                            var name = values[prop].name;
                            console.log(name);
                            var value = values[prop].value;
                            console.log(value);

                            // add to PARSE
                            trial.set(name, value);


                            trial.save(null, {
                                success: function(trial) {
                                    console.log("success");
                                },
                                error: function(trial, error) {
                                    // Execute any logic that should take place if the save fails.
                                    // error is a Parse.Error with an error code and message.
                                    errorAlert('Failed to create new object, with error code: ' + error.message);
                                }
                            });


                        }
                    },
                    error: function(User, error) {
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and message.
                        errorAlert('Failed to get old object, with error code: ' + error.message);
                    }
                });

            }

            obj.first = false;
            shiftPage(current_fs,next_fs);

        }



    } else {
        errorAlert("Please fill out all the required information.");
    }

})





$("#finalSubmit").click(function(){
    
    confirm(function(e,finalSubmit){ //event + button clicked
        e.preventDefault();
        submitFinal();
    }, function(e, finalSubmit){
        e.preventDefault();
    });


})


$(".logout").click(function(){
    
    location.reload();
})



function submitFinal() {
    var id = obj.id;

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    query.get(id, {
        success: function(details) {
            details.set("FINALSUBMIT", true);
            console.log(details);
            details.save(null, {
              success: function(details) {
                console.log("success");
              },
              error: function(details, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                errorAlert('Failed to create new object, with error code: ' + error.message);
              }
            });

        },
        error: function(object, error) {
            errorAlert("Error: " + error.code + " " + error.message);
        }
        
    });

    console.log(obj.id);

    successAlert('Thank you for completing and submitting your BST Application!');
    
    // location.reload();


}


