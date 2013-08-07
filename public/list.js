/*
  NSIP: List
*/

$.fn.nsip_list = function (userValues, userOptions) {
  return this.each(function () {
    var me = $(this);
    $.ajax({
      url: 'api/students/',
      success: function(data) {
        if (data && data.student) {
          $.each( data.student, function(i, student) {
            me.append(''
              + '<li>' 
              + '<a href="api/students/' + student.refId + '">'
              + student.name.nameOfRecord.fullName 
              + '<a></li>'
            );
          });
        }
      }
    });
  });
};

$('.nsip_list').nsip_list();
