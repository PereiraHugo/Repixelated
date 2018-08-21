/*
* GET home page.
*/
 
exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var previous_name= post.previousName;
      var next_name= post.nextName;
      var downloadPath= "public/images/download_images";
      var UploadPath= "public/images/upload_images";

	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		var file = req.files.uploaded_image;
		var img_name=file.name;

	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)

	                return res.status(500).send(err);
      					var sql = "INSERT INTO `pictures`(`previousName`,`nextName`, `downloadPath`, `UploadPath`) VALUES ('" + previous_name + "','" + downloadPath + "','" + UploadPath + "')";

    						var query = db.query(sql, function(err, result) {
    							 res.redirect('profile/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};

exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `pictures` WHERE `idPictures`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
};