var course = function(id, title, term, insructor){
var courseModel = {courseID:id, title:title, term:term, instructor:insructor};
return courseModel;
};

module.exports.course = course;
