// NSIP - List students TODO
$.fn.nsip_list = function (userValues, userOptions) {
	return this.each(function () {
		var me = $(this);
		$.ajax({
			url: 'api/students',		// StudentPersonals for SIF AU 1.3
			dataType: 'xml',
			success: function(xml) {
				me.html('');
				$(xml).find('StudentPersonal').each(function(){
					// SIF AU 1.3 spec
					me.append(''
						+ '<li>' 
						+ '<a href="view.html?id=' + $(this).find('Id').text() + '">'
						+ $(this).find('FamilyName').text()
						+ ', '
						+ $(this).find('GivenName').text()
						+ '</a>'
						+ '</li>'
					);
				});

				$(xml).find('student').each(function(){
					// SIF US 3.0 spec
					me.append(''
						+ '<li>' 
						+ '<a href="view.html?id=' + $(this).find('Id').text() + '">'
						+ $(this).find('familyName').text()
						+ ', '
						+ $(this).find('givenName').text()
						+ '</a>'
						+ '</li>'
					);

				});
			}
		});
	});
};

$('.nsip_list').nsip_list();
