$("#addOrgOfficerButt").click(function(){
   $("#addOrgOfficerModal").modal("show"); 
});
$("#addOrgButt").click(function(){
   $("#addOrgModal").modal("show"); 
});
$("#selectOrgButt").click(function(){
   $("#selectOrgModal").modal("show"); 
});

$("#viewOpen").click(function(){
    if($("#viewLinks").hasClass("visible")){
     $("#viewLinks").addClass("hidden");  
     $("#viewLinks").removeClass("visible");  
    }
    else{
     $("#viewLinks").addClass("visible");  
     $("#viewLinks").removeClass("hidden");  
    }
});
$("#encodeOpen").click(function(){
    if($("#encodeLinks").hasClass("visible")){
     $("#encodeLinks").addClass("hidden");  
     $("#encodeLinks").removeClass("visible");  
    }
    else{
     $("#encodeLinks").addClass("visible");  
     $("#encodeLinks").removeClass("hidden");  
    }
});
$("#addOpen").click(function(){
    if($("#addLinks").hasClass("visible")){
     $("#addLinks").addClass("hidden");  
     $("#addLinks").removeClass("visible");  
    }
    else{
     $("#addLinks").addClass("visible");  
     $("#addLinks").removeClass("hidden");  
    }
});
$("#manageOpen").click(function(){
    if($("#manageLinks").hasClass("visible")){
     $("#manageLinks").addClass("hidden");  
     $("#manageLinks").removeClass("visible");  
    }
    else{
     $("#manageLinks").addClass("visible");  
     $("#manageLinks").removeClass("hidden");  
    }
});
$("#preactsButton").click(function(){
    $("#preactsButton").addClass("selected");  
    $("#preactsButton").removeClass("unselected");
    $("#postactsButton").addClass("unselected");  
    $("#preactsPreview").addClass("visibleBody");
    $("#preactsPreview").removeClass("hiddenBody");
    $("#postactsPreview").addClass("hiddenBody");
    $("#postactsPreview").removeClass("visibleBody");
});
// $("#postactsButton").click(function(){
//      $("#postactsButton").addClass("selected");  
//      $("#postactsButton").removeClass("unselected");
//       $("#preactsButton").addClass("unselected");  
//     $("#postactsPreview").addClass("visibleBody");
//     $("#postactsPreview").removeClass("hiddenBody");
//     $("#preactsPreview").addClass("hiddenBody");
//      $("#preactsPreview").removeClass("visibleBody");
// });