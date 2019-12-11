$(".editButt").click(function(){
  $("#editOfficerModal").modal("show");
  });

$(".deleteButt").click(function(){
  $("#deleteOfficerModal").modal("show");
  });


$(".blacklistWhitelistButt").click(function(){
  $("#blacklistWhitelistOfficerModal").modal("show");
  });

$("#addOrgButt").click(function(){
  $("#addOrgModal").modal("show");
  });

$("#addOfficerButt").click(function(){
  $("#addOrgOfficerModal").modal("show");
  });

$("#deleteOrgButt").click(function(){
   $("#deleteOrgModal").modal("show"); 
});
$("#blacklistOrgButt").click(function(){
  $("#blacklistOrgPromptModal").modal("show"); 
});
$("#blacklistOrgConfButt").click(function(){
  $("#blacklistOrgModal").modal("show"); 
});
$("#deleteOrgPromptButt").click(function(){
   $("#deleteOrgPromptModal").modal("show"); 
});