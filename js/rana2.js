// JavaScript Document
var format_tanggal = 'YYYY-MM-DD HH:mm:ss';
var simple_format_tanggal = "YYYY-MM-DD";
var format_tanggal_pendek = "YYYY-MM-DD";
// matauang
// android javascript intevace
function shareLinkAndroid(e,l) {
  e.preventDefault();
  if (typeof Android !== 'undefined') {
    Android.ShareContent(l);
  }
}
var getElement	= {
	'textarea'	: function(namatextarea,idelement='',realvalue='') {
		var textdata = `<textarea class="form-control" name="${namatextarea}" id="${idelement}">${realvalue}</textarea>`;
		return textdata;
	},
	'upload' : function(namafile,idelement,realvalue) {
		// randomstring
		var randomstring = Math.random().toString(36).slice(-8);
		var datavalue = '';
		if(realvalue) {
			datavalue = `<div class="hasil_upload_data hasil_upload_forum${idelement}" data-files="${realvalue.id}">
							<i class="fa fa-minus-circle remove-list" data-id="${realvalue.id}" data-target="data-files"></i>
							<span id="data-files${realvalue.id}">${realvalue.nama}</span>
							<input name="${namafile}[src]" type="hidden" value="${realvalue.src}">
							<input name="${namafile}[id]" type="hidden" value="${realvalue.id}">
							<input name="${namafile}[nama]" type="hidden" value="${realvalue.nama}">
							</div>`;
		}
		var textdata = `<div id="target-${idelement}">
							${datavalue}
						</div>
						<div>
							<button type="button" id="${idelement}" class="btn btn-default"><i class="fa fa-plus-circle"></i> Select File</button>
						</div>
						<script>
						var uploader${randomstring} = new plupload.Uploader({
							runtimes : 'html5,flash,silverlight,html4',
							browse_button : '${idelement}', // you can pass an id...
							url : docs.link_web+'index.php?rute=file&term=upload',
							
							filters : {
								max_file_size: '20mb',
							},
							init: {
								PostInit: function() {
									
								},
								FilesAdded: function(up, files) {
									var html = '';
									plupload.each(files, function(file) {
										html += '<span id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></span>';
									});
									document.getElementById('target-${idelement}').innerHTML = html;
									uploader${randomstring}.start();
								},
								UploadProgress: function(up, file) {
									document.getElementById('target-${idelement}').innerHTML = '<div class="hasil_upload_forum${idelement}"><i class="fa fa-spinner fa-pulse"></i> '+file.percent+'% Uploading...</div>';
								},
								FileUploaded: function(up, file, info) {
									var resultupload = jQuery.parseJSON(info.response); 
									if(resultupload.status == true) {
										var resultdata = resultupload.file.src;
										var themplatedata = '<div class="hasil_upload_data hasil_upload_forum${idelement}" data-files="'+resultupload.file.id_file+'">'+
															'<i class="fa fa-minus-circle remove-list" data-id="'+resultupload.file.id_file+'" data-target="data-files"></i>'+
															'<span id="data-files'+resultupload.file.id_file+'">'+resultupload.file.nama+'</span>'+
															'<input name="${namafile}[src]" type="hidden" value="'+resultupload.file.src+'">'+
															'<input name="${namafile}[id]" type="hidden" value="'+resultupload.file.id_file+'">'+
															'<input name="${namafile}[nama]" type="hidden" value="'+resultupload.file.nama+'">'+
															'</div>';
										document.getElementById('target-${idelement}').innerHTML = themplatedata;
										$('.remove-list').click(function(e) {
											var iddata  = $(this).attr('data-id');
											var target  = $(this).attr('data-target');
											$('div['+target+'='+iddata+']').remove();
										});  
									} else {
										document.getElementById('target-${idelement}').innerHTML = '<div class="hasil_upload_forum${idelement}">'+resultupload.notif+'</div>';
									}
								},
								Error: function(up, err) {
									document.getElementById('target-${idelement}').innerHTML = '<div class="hasil_upload_forum${idelement} text-danger">Error #'+err.code+':'+err.message+'</div>';
								}
							},
							preserve_headers: false,
							multi_selection : false,
						});;
						uploader${randomstring}.init();
						$(".remove-list").click(function(e) {
											var iddata	= $(this).attr('data-id');
											var target	= $(this).attr('data-target');
											$("div["+target+"=\'"+iddata+"\']").remove();
						});
						</script>
						`;
		return textdata;
	}
}
var set_number	= {
	'angka'	: function(selector) {
		var nilai = $(selector).text();
		$(selector).number( true, 0, ',', '.');
		var nilaiawal = $(selector).text();
	    $(selector).blur(function(e) {
	      var nilai = $(this).text();
	      var min   = $(this).attr('min');
	      var max   = $(this).attr('max');
	      if(max && Number(nilai) > Number(max)) {
	        $(this).text(nilaiawal);
	      } else if(min && Number(nilai) < Number(min)) {
	        $(this).text(nilaiawal);
	      }
	    })
	}
}
function getTextArea(namatextarea,idelement='') {
	var textdata = `<texatarea class="form-control" name="${namatextarea}" id="${idelement}"></texatarea>`;
	return textdata;
}
function randompass(passwordLength) {
	var chars = "23456789abcdefghijkmnopqrstuvwxyz!@#$%&*()ABCDEFGHJKLMNPQRSTUVWXYZ";
	var password = "";
	for (var i = 0; i < passwordLength; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber +1);
	}
	$("#newpassword").val(password);
}
function ReplaceUrl(link,title) {
    if (window.history.pushState) {
       $("title").html(title);
      	window.history.pushState({"html":link,"pageTitle":title},title,link);
    }
}
function rating(rate) {
    var html = `<div class="rating-wrap-start">
                    <p class="rating" style="text-align:center;">`;
            for(var b=5;b>0;b--) {
                html +=      `<span class="fa fa-stack">`;
                if(b <= rate) {
                    html +=      `<i class="fa fa-star fa-stack-1x"></i>`; // ini yang buat terisi
                }
                html +=      `<i class="fa fa-star-o fa-stack-1x"></i>`;
                html +=      `</span>`;
            }
        html +=      `</p>
                </div>`;
    return html;
}
function modalGeneral(loaddata,title='Open Detail',event) {
	event.preventDefault();
	$('#modal-general').modal({
		"show"	: true,
		"backdrop" : false,
	})
	var modal = $("#modal-general");
	var size 	= 'modal-lg';
	var idtarget = '';
	var zindex = '';
	var classbody = '';	
	modal.find('.modal-dialog').removeClass('modal-lg');
	modal.find('.modal-dialog').removeClass('modal-sm');
	modal.find('.modal-dialog').removeClass('modal-md');
	if(size) {
		modal.find('.modal-dialog').addClass(size);
	} else {
		modal.find('.modal-dialog').addClass('modal-lg');
	}
				
	$('#modal-general').on('hidden.bs.modal', function (e) {
		$("#modal-general").attr("data-classbody",classbody);
	});

	if(zindex) {
		$("#modal-general").css("z-index",zindex);
	} else {
		$("#modal-general").css("z-index","1050");
	}

	if(idtarget) {
		modal.attr("data-target",idtarget);
	}
	$('#modal-general .modal-header').remove();
	if(title) {
		modal.find('.modal-content').prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h3 class="modal-title text-center">Modal Title</h3></div>');
	}
	modal.find('.modal-title').text(title)
		modal.find('.modal-body').load(loaddata, function(response, status, xhr) {
		if (status == "error") {
			var msg = "Load Data Error!";
			$(this).modal('hide');
			swal("Error!", msg + xhr.status + " " + xhr.statusText );
		}
	});
	// buat reload setelah submit entry
	modal.find('.modal-body').attr('reload','true');
}
function GetToken() {
	var Result = false;
	if ("Android" in window) {
		Result = Android.GetToken();
	}
	return Result;
} 
function renameKolom(btn,target) {
	var textdata = $(btn).val();
	$(target).html(textdata);
}
function removeElem(target) {
	$(target).remove();
}
function removeParents(btn,classTarget) {
	$(btn).parents(classTarget).remove();
}
function nl2br (str, is_xhtml) {
	if (typeof str === 'undefined' || str === null) {
			return '';
	}
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function addOptionData(target,nama) {
	var themplate = `<div class="form-group item-options">
	<div class="col-xs-9">
		<input class="form-control" type="text" value="" name="${nama}"/>
	</div>
	<div class="col-xs-3">
		<button onclick="removeParents(this,'.item-options')" type="button" class="btn btn-danger btn-block">Hapus</button>
	</div>
</div>`;
	$(target).prepend(themplate);
}
function addKoloms(target,btn,nama) {
	if($(target+' .list-group').length < 1) {
		var areadata = `<ul id="targetkolomsarea" class="list-group"></ul>`;
		$(target).html(areadata);
	}
	var no = $(btn).attr("data-no");
	var nom = parseInt(no) + 1;
	var themplate = `<li id="areadata${nom}" class="list-group-item">
		<div class="row">
			<div class="col-md-9 col-xs-10"><b id="modallabel-${nom}" class="renametype-${nom}">Kode</b></div>
			<div class="col-md-3 col-xs-2">
			<div id="modal-options-${nom}" class="modal fade">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Pengaturan <span id="juduloptions_${nom}" class="renametype-${nom}"></span></h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label class="col-md-3 control-label">Label</label>
							<div class="col-md-9">
								<input onkeyup="renameKolom(this,'.renametype-${nom}')" class="form-control" type="text" value="" name="${nama}[${nom}][Label]"/>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label">Type</label>
							<div class="col-md-9">
								<select class="form-control" name="${nama}[${nom}][Type]">
									<option value="text">Text Input</option>
									<option value="textarea">Text Area</option>
									<option value="select">Option</option>
									<option value="checkbox">CheckBox</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-3 control-label">Options</label>
							<div class="col-md-9">
								<div id="optionsData${nom}"></div>
								<div class="form-group">
									<div class="col-xs-9">
										<input class="form-control" type="text" value="" name="${nama}[${nom}][Options][]"/>
									</div>
									<div class="col-xs-3">
										<button onclick="addOptionData('#optionsData${nom}','${nama}[${nom}][Options][]')" type="button" class="btn btn-default btn-block">Tambah</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-danger" onclick="removeElem('#areadata${nom}')">Delete</button>
					</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			<a href="#modal-options-${nom}" data-toggle="modal" class="btn btn-info btn-block">Setting</a></div>
		</div>
	</li>`;
	$("#targetkolomsarea").prepend(themplate);
	$(btn).attr("data-no",nom);
}
function action_image(btn) {
	event.preventDefault();
	var modaldata = `<div id="modal-img-editor" class="modal fade" style="z-index:11000;">
	<div class="modal-dialog modal-lg">
	  <div class="modal-content">
		<div class="modal-header">
		  <h4 class="modal-title">Image Editor</h4>
		</div>
		<div class="modal-body">
		  <p>Loading Data</p>
		</div>
	  </div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
  </div>
  `;
	var classbody = $("body").attr("class");
	$("#modal-img-editor").attr("data-classbody",classbody);
	$("body").append(modaldata);
	$('#modal-img-editor').modal({
		show: true,
		backdrop: false,
	});
	var parameter = '';
	var src = $(btn).attr("href");
	var targetElem = $(btn).attr("data-target");
	var resize = $(btn).attr("data-resize");
	if(resize) {
		parameter += '&resize=true'+resize;
	}
	if(src) {
		parameter += '&src='+src;
	}
	if(targetElem) {
		parameter += '&targetElem='+ encodeURIComponent(targetElem);
	}
	if($(btn).attr("data-width")) {
		parameter += '&width='+$(btn).attr("data-width");
	}
	if($(btn).attr("data-height")) {
		parameter += '&height='+$(btn).attr("data-height");
	}
	if($(btn).attr("data-cachewidth")) {
		parameter += '&cachewidth='+$(btn).attr("data-cachewidth");
	}
	if($(btn).attr("data-cacheheight")) {
		parameter += '&cacheheight='+$(btn).attr("data-cacheheight");
	}
	// idpfolder
	if($(btn).attr("data-id")) {
		parameter += '&idfolder='+$(btn).attr("data-id");
	}
	$("#modal-img-editor .modal-body").load("index.php?rute=common/imageaction"+parameter);
	$('#modal-img-editor').on('hidden.bs.modal', function (e) {
		$('#modal-img-editor').remove();
	});
}
function mataUang(nilai) {
	return new Intl.NumberFormat(
		'id-ID', 
		{ 
			style: 'currency', 
			currency: 'IDR' 
		}
		).format(nilai);
}
function openNotes() {
	event.preventDefault();
	$("body").append("<div id='stickynotes'></div>");
	$("#content-kanan").hide();
	$("#stickynotes").load("index.php?rute=common/stickynote")
}
function closeNotes() {
	event.preventDefault();
	$("#content-kanan").show();
	$("#stickynotes").remove();
}
function isMobile() {
	var check = false;
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	  check = true;
	}
	return check;
};
function GetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) {
			result = decodeURIComponent(tmp[1]);
			result = result.replaceAll("+", " ");
		}
    }
    return result;
}
function pasteImage() {
	var items = (event.clipboardData || event.originalEvent.clipboardData).items;
	if(items) {
		for (index in items) {
			var item = items[index];
			if (item.kind === 'file') {
			var blob = item.getAsFile();
			var reader = new FileReader();
			reader.onload = function(event){
				$("#lampiranfile_in").html('loading....');
				var imgsrc = event.target.result;
				$.ajax({
					type: 'POST',
					url: "index.php?rute=file&term=uploadbystring",
					data: {
						data : imgsrc,
					}
				}).done(function(response) {
					var result = jQuery.parseJSON(response);
					return result;
				});
			}; // data url!
			reader.readAsDataURL(blob);
			}
		}
	}
}
function convertDate(str) {
	var date = new Date(str),
	  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
	  day = ("0" + date.getDate()).slice(-2);
	return [date.getFullYear(), mnth, day].join("-");
}
function getDatesInRange(startDate, endDate) {
	var NewStartDate = new Date(startDate);
	var NewendDate = new Date(endDate);
	const date = new Date(NewStartDate.getTime());
	const dates = [];
	while (date <= NewendDate) {
	  dates.push(convertDate(new Date(date)));
	  date.setDate(date.getDate() + 1);
	}
	return dates;
}
async function getJsonAPI(options={},resultData) {
	if(options.base_url) {
	  var base_url = options.base_url;
	} else {
	  console.log("Option 'base_url' belum ditentukan");
	  return false;
	}
	if(options.page) {
	  var page = '&page='+options.page;
	} else {
	  var page = '&page='+1;
	} 
	var result_url = base_url+page;
	var request = new XMLHttpRequest()
	request.open('GET', result_url, true);
	request.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		resultData(JSON.parse(this.responseText),options);
	  }
	};
	request.send();
}
function FormatNomer(nomer,local='id-ID') {
	var result = parseInt(nomer).toLocaleString(local, {style: 'decimal', maximumFractionDigits: 2});
	return result;
}
var input_spec	= {
	'angka'	: function(selector) {
		$(selector).keypress(function(myfield, e, dec) {
			var key;
			var keychar;
			if (window.event)
			key = window.event.keyCode;
			else if (e)
			key = e.which;
			else
			return true;
			keychar = String.fromCharCode(key);

			// control keys
			if ((key==null) || (key==0) || (key==8) ||
			(key==9) || (key==13) || (key==27) )
			return true;

			// numbers
			else if ((("0123456789.,").indexOf(keychar) > -1))
			return true;

			// decimal point jump
			else if (dec && (keychar == "."))
			{
			myfield.form.elements[dec].focus();
			return false;
			}
			else
			return false;
		});
	},
	'matauang'	: function(selector) {
		var nilai = $(selector).val();
		$(selector).number( true, 0, ',', '.');
		var nilaiawal = $(selector).val();
	    $(selector).blur(function(e) {
	      var nilai = $(this).val();
	      var min   = $(this).attr('min');
	      var max   = $(this).attr('max');
	      if(max && Number(nilai) > Number(max)) {
	        swal('Batas minimal '+ min +' Batas maksimal '+max);
	        $(this).val(nilaiawal);
	      } else if(min && Number(nilai) < Number(min)) {
	        swal('Batas minimal '+ min +' Batas maksimal '+max);
	        $(this).val(nilaiawal);
	      }
	    })
	}
}
// scrrenshoot
function Screenshoot(target,namafile='') {
	event.preventDefault();
	var inputnama =  docs.title + "-" + Date.now();
	if(namafile != '') {
		inputnama = namafile+ "-" + Date.now();
	}
	html2canvas(document.querySelector(target)).then((canvas) => {
	  const image = canvas
		.toDataURL("image/jpeg")
		.replace("image/jpeg", "image/octet-stream");
	  const a = document.createElement("a");
	  a.setAttribute("download", inputnama  + ".jpeg");
	  a.setAttribute("href", image);
	  a.click();
	  canvas.remove();
	});
  }
$(document).ready(function(e) {
	$('.number-format').number(true, 0,',','.');
	if (typeof Android !== 'undefined') {
		$("body").addClass("iam_android");
		$(".android-only").show();
		$(".web-only").hide();
	} else {
		$("body").addClass("iam_web");
		$(".android-only").hide();
		$(".web-only").show();
	}
	// enter
	$("input.form-control").bind("keypress", function (e) {  
		if (e.keyCode == 13) {  
			return false;  
		}  
	});  

	// tombol
	$('button[type=submit]').click(function(e) {
		var btn 	= $(this);
		var disabelbtn = true;
		if($(this).data('disbaled') == true) {
			disabelbtn = true;
		} else {
			disabelbtn = false;
		}
		$('form').submit(function(event) {
			if(disabelbtn == true) {
				$(btn).addClass('disabled');
			}
		});
	});
	$('.per-page').addClass('form-control');
	// $('[data-toggle=tooltip]').tooltip();
    //============================================================== panggil editor
	$('.FullEditor').summernote({
	  height: 300,                 // set editor height
	  disableDragAndDrop: true,
	  emptyPara: '',
	  toolbar: [				  // basic toolbar
	  			['style', ['style','fontname','fontsize','paragraph']],
			    ['height', ['height']],
			    ['table', ['table']],
			    ['font', ['bold', 'italic', 'underline', 'clear','color']],
			    ['para', ['ul', 'ol']],
			    ['insert', ['link', 'picture','video', 'hr']],
			    ['help', ['help', 'undo', 'redo']],
			    ['view', ['fullscreen', 'codeview']],
			    ['font', ['strikethrough', 'superscript', 'subscript']],
			  ],
	  fontNames: ['Calibri', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvatica Neue', 'Helvatica', 'Impact', 'Tahoma', 'Times New Rowman', 'Verdana','Merriweather'],
	  fontNamesIgnoreCheck: ['Merriweather'],
	  minHeight: null,             // set minimum height of editor
	  maxHeight: null,             // set maximum height of editor
	  focus: false,                 // set focus to editable area after initializing summernote
	  codemirror: { // codemirror options
	    theme: 'monokai'
	  },
	  callbacks: {
		onPaste: function (e) {
			var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('text/html');
			e.preventDefault();
			if(bufferText) {
				var div = $('<div />'); 
				div.append(bufferText);
				div.find('*').removeAttr('style');
				div.find('*').remove('footer');
				div.find('*').remove('header');
				div.find('*').remove('meta');
				div.toString().replace(/<\!--.*?-->/g, "");
				setTimeout(function () {
					document.execCommand('insertHtml', false, div.html());
				}, 10); 
			} else {
				var textdata = (e.originalEvent || e).clipboardData.getData('text/plain');
				textdata = textdata.replace(/\\n{2}/g, '&nbsp;</p><p>');
				textdata = textdata.replace(/\\n/g, '&nbsp;<br />');
				document.execCommand('insertHtml', false,textdata);
			}
		}
	  },
	  popover: {
            image: [
                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['custom', ['imageAttributes', 'imageShape']],
                ['remove', ['removeMedia']]
            ],
            link: [
			    			['link', ['linkDialogShow', 'unlink']]
						],
						table: [
			                  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight', 'toggle']],
			                  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
			                  ['custom', ['tableHeaders']]
			            ],
      },
	});
	$('.MiniEditor').summernote({
			 height: 150,
			 disableDragAndDrop: true,
	  		 emptyPara: '',
			 toolbar: [
				//[groupname, [button list]]
			    ['fontsize', ['style','fontsize', 'height', 'paragraph']],
				['style', ['bold', 'italic', 'underline', 'clear', 'ul', 'ol']],
			    ['font', ['strikethrough', 'superscript', 'subscript']],
			    ['color', ['color']],
			    ['insert', ['link', 'hr']],
			  ],
			  callbacks: {
					onPaste: function (e) {
						var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('text/html');
						e.preventDefault();
						if(bufferText) {
							var div = $('<div />'); 
							div.append(bufferText);
							div.find('*').removeAttr('style');
							div.find('*').remove('footer');
							div.find('*').remove('header');
							div.find('*').remove('meta');
							div.toString().replace(/<\!--.*?-->/g, "");
							setTimeout(function () {
								document.execCommand('insertHtml', false, div.html());
							}, 10); 
						} else {
							var textdata = (e.originalEvent || e).clipboardData.getData('text/plain');
							textdata = textdata.replace(/\\n{2}/g, '&nbsp;</p><p>');
							textdata = textdata.replace(/\\n/g, '&nbsp;<br />');
							document.execCommand('insertHtml', false,textdata);
						}
					}
			  },

	});

	$('.LiteEditor').summernote({
		height: 150,
		disableDragAndDrop: true,
			emptyPara: '',
		toolbar: [
			 ['fontsize', ['style','paragraph']],
		   ['style', ['bold', 'italic', 'underline', 'clear']],
			 ['view', ['codeview']],
			 ['font', ['strikethrough', 'superscript', 'subscript']],
		 ],
		 callbacks: {
			 onPaste: function (e) {
				 var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('text/html');
				 e.preventDefault();
				 if(bufferText) {
					 var div = $('<div />'); 
					 div.append(bufferText);
					 div.find('*').removeAttr('style');
					 div.find('*').remove('footer');
					 div.find('*').remove('header');
					 div.find('*').remove('meta');
					 div.toString().replace(/<\!--.*?-->/g, "");
					 setTimeout(function () {
						 document.execCommand('insertHtml', false, div.html());
					 }, 10); 
				 } else {
					 var textdata = (e.originalEvent || e).clipboardData.getData('text/plain');
					 textdata = textdata.replace(/\\n{2}/g, '&nbsp;</p><p>');
					 textdata = textdata.replace(/\\n/g, '&nbsp;<br />');
					 document.execCommand('insertHtml', false,textdata);
				 }
			 }
		 },

});
	//============================================================== tabel
	$('.table').each(function(index, element) {
		var parenttable = $(this).parent();
		var classtable	= $(this).attr('class');
		var idtable		= $(this).attr('id');
		var datatable = $(this).html();
		if(!$(this).closest( ".table-responsive")) {
			var table		= '<div class="table-responsive"><table id="'+idtable+'" class="'+classtable+'">'+datatable+"</table></div>";
	        $(this).before(table);
			$(this).remove();
		}
	});
	// ===== view password

	$('[data-toggle=view-password]').click(function(e) {
		var target = $(this).attr("data-target");
		var nilai_password = $(target).attr("type");
		if(nilai_password == "password") {
			$(target).attr("type","text");
			$(this).html('<i class="fa fa-eye-slash"></i>');
		} else {
			$(target).attr("type","password");
			$(this).html('<i class="fa fa-eye"></i>');
		}
	});

	// ============================================================= sweet alert
	$('[data-toggle=btn-delete]').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('data-action');
		var targetdelete = $(this).attr('href');
		if(targetdelete != '') {
			target = targetdelete;
		}

		var remove_elm = $(this).attr('data-remove');
		var linkgo = $(this).attr('data-linkgo');
		var closeconfirm = true;
		var showLoaderOnConfirm = false;
		if(linkgo) {
			closeconfirm = false;
			showLoaderOnConfirm = true;
		}
		swal({
		  title: "Apakah Anda Yakin Menghapus Data?",
		  text: "Data akan terhapus permanent.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Ya, Hapus Data!",
		  closeOnConfirm: closeconfirm,
		  showLoaderOnConfirm: true,
		},
		function(){
			$.post(target,
			  {
				clearLog	: true,
			  },function(data,status){
				var result = jQuery.parseJSON(data);
				if(result.sukses) {
					$(remove_elm).remove();
					if(linkgo) {
						swal({
							title: result.status,
							text: result.notif ? result.notif : "Halaman akan di refresh dalam 2 detik",
							showConfirmButton: false,
						});
						window.location.replace(linkgo);
					} else {

						swal({
							title: result.status,
							text: result.notif ? result.notif : "Hapus Data Berhasil",
							showConfirmButton: true,
						});
					}
				} else {
					swal({
						title: result.status,
						text: result.notif,
						showConfirmButton: true,
						type: "error",
					});
				}
				if(result.link_reload) {
					window.location.replace(result.link_reload);
				}
			  })
			.fail(function() {
                   swal( "Error!","Server Disconnected.");
                })
		});
    });
	$('[data-toggle=delete-api]').click(function(e) {
		e.preventDefault();
		var target = $(this).attr('data-action');
		var targetdelete = $(this).attr('href');
		if(targetdelete != '') {
			target = targetdelete;
		}
		var remove_elm = $(this).attr('data-remove');
		var linkgo = $(this).attr('data-linkgo');
		swal({
		  title: 'Confirm Deletion',
		  text: 'Are you sure you delete the data?',
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, Delete!",
		  closeOnConfirm: false,
		  showLoaderOnConfirm: true,
		},
		function(){
			$.post(target,
			  {
				clearLog	: true,
			  },function(result,status){
				if(result['status'] == true) {
					$(remove_elm).remove();
					swal('Status : Berhasil',result['notif'],"success");
					if(linkgo) {
						window.location.replace(linkgo);
					} 
				} else {
					swal('Status : Gagal',result['notif'],"error");
				}
			  })
			.fail(function() {
                   swal( "Error!","Server Disconnected.");
                })
		});
    });
	/// ================================================================= foto palsu
	// clas (.gbr)
	$('.gbr').each(function(){
			var lebar	= $(this).data('lebar');
			var tinggi	= $(this).data('tinggi');
			var margin	= $(this).data('margin');
			if(margin) {
				$(this).css('margin',margin);
			}
			if(lebar) {
				$(this).css('width',lebar+'px');
				$(this).css('max-width','100%');
			} else {
				$(this).css('width','100%');
			}
			if(tinggi) {
				$(this).css('height',tinggi+'px');
				$(this).css('line-height',tinggi+'px');
			} else {
				$(this).css('min-height','50px');
				$(this).css('line-height','50px');
			}
			$(this).addClass('text-center');
	});
	// ================================================================================= dismis alert
	$('[data-dismiss=alert]').click(function(e) {
		$.post(docs.link_web+"index.php?clearnotif=true",
		{
			notif	: 0,
		})
		.fail(function() {
            swal( "Error!","Server Disconnected.");
        })
	});
	// ================================================================================= checkbox
	if ($(".cek-style")[0]) { 
			$('.cek-style').iCheck({
				checkboxClass: 'icheckbox_flat-blue',
				radioClass: 'icheckbox_flat-blue'
			});
	}
	// ================================================================================= checkbox
	$('[data-toggle=\'check-all\']').on('ifChecked', function () {
		var target = $(this).attr('data-target');
		check_state = 'check_all';
		countChecked(target);
	});
	$('[data-toggle=\'check-all\']').on('ifUnchecked', function () {
		var target = $(this).attr('data-target');
		check_state = 'uncheck_all';
		countChecked(target);
	});
	function countChecked(target) {
        if (check_state == 'check_all') {
            $(target).iCheck('check');
        }
        if (check_state == 'uncheck_all') {
            $(target).iCheck('uncheck');
        }
  	}
	$('[data-toggle=\'check-show\']').on('ifChecked', function () {
		var target = $(this).attr('data-target');
		$(target).show();
	});
	$('[data-toggle=\'check-show\']').on('ifUnchecked', function () {
		var target = $(this).attr('data-target');
		$(target).hide();
	});
	// ================================================================================= angka
	$(".angka").keypress(function(myfield, e, dec) {
	  	var key;
		var keychar;
		if (window.event)
		key = window.event.keyCode;
		else if (e)
		key = e.which;
		else
		return true;
		keychar = String.fromCharCode(key);

		// control keys
		if ((key==null) || (key==0) || (key==8) ||
		(key==9) || (key==13) || (key==27) )
		return true;

		// numbers
		else if ((("0123456789").indexOf(keychar) > -1))
		return true;

		// decimal point jump
		else if (dec && (keychar == "."))
		{
		myfield.form.elements[dec].focus();
		return false;
		}
		else
		return false;
	});
	// ================================================================================= Capital Font
	$(".capital").bind('keyup', function (e) {
		if (e.which >= 97 && e.which <= 122) {
			var newKey = e.which - 32;
			// I have tried setting those
			e.keyCode = newKey;
			e.charCode = newKey;
		}

		$(".capital").val(($(".capital").val()).toUpperCase());
	});
	// ================================================================================= File Manager Ajax
	var counter = 100;
	$('.tambah-file').click(function(e){
		e.preventDefault();
		counter++;
		counterNext = counter + 1;
		var idfile = $(this).attr('data-id');
		var linkfile = 'index.php?rute=file&term=ajax';
		if(idfile) {
			linkfile += '&id_file='+idfile;
		}

		var label	= $(this).attr('aria-label');
		$('#modal-general .modal-header').remove();
		$('#modal-general .modal-body').html('<div class="row-fluid"><div id="load-galeri"><div class="text-center"><i class="fa fa-spinner fa-pulse fa-4x"></i></div></div></div>');

		var Nama	= $(this).attr('name');
		$('#modal-general').attr('nama-target', Nama);
		
			
		var classbody = $("body").attr("class");	
		$('#modal-general').on('hidden.bs.modal', function (e) {
			$("#modal-general").attr("data-classbody",classbody);
		});
		
		var filtertype = $(this).data('type');
		if($(this).hasClass('tambah-foto')) {
			var foto = "&foto=1";
			var classfoto	= 'class="inline-block lampiranfiles"';
			//buat div before
			$('#modal-general').attr('data-type','foto');
		} else if($(this).hasClass('tambah-video')) {
			var foto = "&video=1";
			var classfoto	= 'class="inline-block lampiranfiles"';
			//buat div before
			$('#modal-general').attr('data-type','video');
		} else {
			if(filtertype) {
				var foto = "&typefile="+filtertype;
				var classfoto	= 'class="inline-block lampiranfiles"';
				//buat div before
				$('#modal-general').attr('data-type',filtertype);
			} else {
				var foto = "";
				var classfoto	= 'class="lampiranfiles lampirankosong"';
				//buat div before
				$('#modal-general').attr('data-type','all');
			}
		}

		if($(this).hasClass('editor')) {
			$('#modal-general').addClass('editor');
		} else {
			$(this).before('<div id="tmp-tbh-file-'+counterNext+'" '+classfoto+' style="position:relative;"></div>');
		}

		if($(this).attr('data-target')) {
			// msinggle sellect
			$('#tmp-tbh-file-'+counterNext).remove();
			var Target = $(this).attr('data-target');
			var multiple = "";
		} else {
			// multiple select
			$('#modal-general').attr('data-multiple',"true");
			var Target = '#tmp-tbh-file-'+counterNext;
			var multiple = "&multiple=1";
		}

		if($(this).data("multiple") == true) {
			$('#modal-general').attr('data-multiple',"true");
			var multiple = "&multiple=1";
		}

		$('#modal-general').modal({
			show: true,
			keboard: false,
			backdrop: false,
		});

		if($(this).hasClass('insert-url')) {
			$('#modal-general').addClass('insert-url');
		}
		if($(this).hasClass('forminputgroup')) {
			$('#modal-general').addClass('forminputgroup');
		}			
		$('#load-galeri').load(linkfile+foto+multiple, function(response, status, xhr) {
		  if(status == "error") {
		    var msg = "Load Data Error!";
		    $('#modal-general').modal('hide');
		    swal("Error!", msg + xhr.status + " " + xhr.statusText );
		}
		});
		$('#modal-general').attr('aria-label', label);
		$('#modal-general').attr('data-target', Target);
	});

	// ================================================================================= Remove List
	$(".remove-list").click(function(e) {
		var iddata	= $(this).attr('data-id');
		var target	= $(this).attr('data-target');
		$("div["+target+"=\'"+iddata+"\']").remove();
	});
	// ================================================================================= Dropdown Ajax
	var Controller_Ajax = ".getajax";
	$(Controller_Ajax+' .rana-input-ajax').keyup(function(e) {
		var Target		= $(this).attr('data-target');
		var Nama		= $(this).attr('name');
		var DataVoid	= $(this).attr('data-void');
		if(DataVoid) {
			idvoid	= '&idvoid='+DataVoid;
		} else {
			idvoid	= '';
		}
		if(!Nama) {
			var Nama		= $(this).attr('data-name');
		}
		var rute 		= $(this).attr('data-load');
		var carinama	= $(this).val();


		if($(this).hasClass('single')) {

			var multi	=  '&multi=false';

		} else {

			var multi	=  '';

		}
		var urltarget = "index.php?rute="+rute+"&term=ajax"+multi+idvoid;
		$(Target).addClass('open');
		$(Target+' .dropdown-menu').html('<li><a href="#"><i class="fa fa-spinner fa-pulse"></i> Loading...</a></li>');
		$.post(urltarget,
			  {
				nama: carinama,
				target: Target,
				id_post: '',
				multi: '',
			  },
			  function(data,status){
				  if(multi) {
					  // bila single
					  $(Target+' .dropdown-menu').html(data);
					  $(Target+' .dropdown-menu li a[data-id]').click(function(e) {
						  var judul		= $(this).text();
						  var iddata	= $(this).attr('data-id');
						  var insert 	= '<input type="hidden" value="'+iddata+'" name="'+Nama+'">';

						  $(Target+' input[type=\'hidden\']').remove();
						  $(Target+' input[type=\'text\']').val(judul);
						  $(Target).append(insert);
					  });

				  } else {
					  // bila multi

						$(Target+' .dropdown-menu').html(data);
						$(Target+' .dropdown-menu li a[data-id]').click(function(e) {
							var judul		= $(this).text();
							var iddata		= $(this).attr('data-id');
							var listdata	= '<div data-id'+rute+'="'+iddata+'" class="data-entry-ajax">'+
												  '<input type="hidden" name="'+Nama+'" value="'+iddata+'" />'+
												  '<i class="fa fa-minus-circle remove-list" data-target="data-id'+rute+'" data-id="'+iddata+'"></i> '+judul+
											  '</div>';

							var cekada		= $("div[data-id"+rute+"=\'"+iddata+"\']");

							if(cekada) {

								$("div[data-id"+rute+"=\'"+iddata+"\']").remove();

							}
							$('.rana-input-ajax').val('');
							$('.well-ajax' + '[data-control='+Target+']').append(listdata);

							$(".remove-list").click(function(e) {
								var iddata	= $(this).attr('data-id');
								var target	= $(this).attr('data-target');
								$("div["+target+"=\'"+iddata+"\']").remove();
							});
						});
				  }
		})
		.fail(function() {
            swal( "Error!","Server Disconnected.");
        })
		$(this).blur(function(e) {
			$(this).val('');
			setTimeout(function(object) {
				$(Controller_Ajax).removeClass('open');
				$(Target+' .dropdown-menu li').remove();
			}, 500, this);
		});
	});



	// =========================================================================== modal general
	$('#modal-general').on('show.bs.modal', function (event) {
		var button 		= $(event.relatedTarget);
		var modal = $(this)
		var loaddata	= button.data('link');
		var title	= button.data('title');
		var size 	= button.data('size');
		var idtarget = button.data("tujuan");
		var zindex = button.data('zindex');
		var classbody = $("body").attr("class");	
		
		modal.find('.modal-dialog').removeClass('modal-lg');
		modal.find('.modal-dialog').removeClass('modal-sm');
		modal.find('.modal-dialog').removeClass('modal-md');
		if(size) {
			modal.find('.modal-dialog').addClass(size);
		} else {
			modal.find('.modal-dialog').addClass('modal-lg');
		}
					
		$('#modal-general').on('hidden.bs.modal', function (e) {
			$("#modal-general").attr("data-classbody",classbody);
		});

		if(zindex) {
			$("#modal-general").css("z-index",zindex);
		} else {
			$("#modal-general").css("z-index","1050");
		}
		
		if(idtarget) {
			modal.attr("data-target",idtarget);
		}

		$('#modal-general .modal-header').remove();
		if(title) {
		modal.find('.modal-content').prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h3 class="modal-title text-center">Modal Title</h3></div>');
		}
		modal.find('.modal-title').text(title)
	  	modal.find('.modal-body').load(loaddata, function(response, status, xhr) {
		  if(status == "success") {
			var tinggiconten = modal.find('.modal-body').height() + 210;
			$('.modal-backdrop').css('height',tinggiconten+'px');
			// min-height 1 tampilan layar
			$('.modal-backdrop').css('min-height',$(window).height());
		  }
		  if (status == "error") {
		    var msg = "Load Data Error!";
		    $(this).modal('hide');
		    swal("Error!", msg + xhr.status + " " + xhr.statusText );
		  }
		  // jika status success
		});
		// buat reload setelah submit entry
		modal.find('.modal-body').attr('reload','true');
	});
	$('#modal-general').on('hidden.bs.modal', function (event) {
		var modal = $(this);
		var classbody = $("#modal-general").attr("daya-classbody");	
		modal.removeClass('insert-url');
		modal.removeClass('forminputgroup');
		modal.removeClass('editor');
		modal.removeAttr("data-type");
		modal.removeAttr("data-target");
		modal.removeAttr("aria-label");
		modal.removeAttr("nama-target");
		modal.removeAttr('data-multiple');
		modal.find('.modal-dialog').removeClass('modal-lg');
		modal.find('.modal-dialog').removeClass('modal-sm');
		modal.find('.modal-dialog').removeClass('modal-md');
		modal.find('.modal-header').remove();
		modal.find('.modal-body').removeAttr('reload');
		modal.find('.modal-body').html('<div class="text-center"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>');
		$("#modal-general").attr("data-classbody",classbody);
	});
	$('#modal-popup-file').on('hidden.bs.modal', function (event) {
		var modal = $(this);
		modal.removeClass('insert-url');
		modal.removeClass('forminputgroup');
		modal.removeClass('editor');
		modal.removeAttr("data-type");
		modal.removeAttr("data-target");
		modal.removeAttr("aria-label");
		modal.removeAttr("nama-target");
		modal.removeAttr('data-multiple');
		modal.find('.modal-dialog').removeClass('modal-lg');
		modal.find('.modal-dialog').removeClass('modal-sm');
		modal.find('.modal-dialog').removeClass('modal-md');
		modal.find('.modal-header').remove();
		modal.find('.modal-body').removeAttr('reload');
	  	modal.find('.modal-body').html('<div class="text-center"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>');
	});
	$('[data-toggle=btn-toggle]').click(function(e) {
		e.preventDefault();
		var target  = $(this).attr('href');
		var textnow	= $(this).data('text');
		$(target).toggle();
	});
});

var counter = 0;
function add_file(btn,modalname,e=event) {
		e.preventDefault();
        counter++;
        counterNext = counter + 1;
        $('#'+modalname+' .modal-dialog').addClass('modal-lg');

        var label   = $(btn).attr('aria-label');
        $('#'+modalname+' .modal-header').remove();
        $('#'+modalname+' .modal-body').html('<div class="row-fluid"><div id="load-galeri"><div class="text-center"><i class="fa fa-spinner fa-pulse fa-4x"></i></div></div></div>');

        var Nama    = $(btn).attr('name');
		$('#'+modalname).attr('nama-target', Nama);

		var idfile = $(this).attr('data-id');
		var linkfile = 'index.php?rute=file&term=ajax';
		if(idfile) {
				linkfile += '&id_file='+idfile;
		}
		
		
		var classbody = $('body').attr('class');		
		$('#'+modalname).on('hidden.bs.modal', function (e) {
			$('body').addClass(classbody);
		});

        var filtertype = $(btn).data('type');

        if($(btn).hasClass('tambah-foto')) {
            var foto = "&foto=1";
            var classfoto   = 'class="inline-block lampiranfiles"';
            //buat div before
            $('#'+modalname+'').attr('data-type','foto');
        } else if($(btn).hasClass('tambah-video')) {
            var foto = "&video=1";
            var classfoto   = 'class="inline-block lampiranfiles"';
            //buat div before
            $('#'+modalname+'').attr('data-type','video');
        } else {

            if(filtertype) {
                var foto = "&typefile="+filtertype;
                var classfoto   = 'class="inline-block lampiranfiles"';
                //buat div before
                $('#'+modalname+'').attr('data-type',filtertype);
            } else {
                var foto = "";
                var classfoto   = 'class="lampiranfiles lampirankosong"';
                //buat div before
                $('#'+modalname+'').attr('data-type','all');
            }
        }

        if($(btn).hasClass('editor')) {
            $('#'+modalname+'').addClass('editor');
        } else {
            $(btn).before('<div id="tmp-tbh-file-'+counterNext+'" '+classfoto+'></div>');
        }

        if($(btn).attr('data-target')) {
            // msinggle sellect
            $('#tmp-tbh-file-'+counterNext).remove();
            var Target = $(btn).attr('data-target');
            var multiple = "";
        } else {
            // multiple select
            $('#'+modalname+'').attr('data-multiple',"true");
            var Target = '#tmp-tbh-file-'+counterNext;
            var multiple = "&multiple=1";
        }
        if($(btn).data("multiple") == true) {
            $('#'+modalname+'').attr('data-multiple',"true");
            var multiple = "&multiple=1";
        }
        $('#'+modalname+'').modal({
            show: true,
            backdrop: false,
        });
        if($(btn).hasClass('insert-url')) {
            $('#'+modalname+'').addClass('insert-url');
        }
		if($(this).hasClass('forminputgroup')) {
			$('#modal-general').addClass('forminputgroup');
		}			
        $('#load-galeri').load(linkfile+'&modalname='+modalname+foto+multiple, function(response, status, xhr) {
          if (status == "error") {
            var msg = "Load Data Error!";
            $('#'+modalname+'').modal('hide');
            swal("Error!", msg + xhr.status + " " + xhr.statusText );
          }
        });
        $('#'+modalname).attr('aria-label', label);
        $('#'+modalname).attr('data-target', Target);
};
// terbilang
var digit3 = function(feed) {

	//mendefinisikan satuan 
	var units = ['', 'ribu ', 'juta', 'milyar', 'triliun', 'kuadriliun','kuantiliun','sekstiliun','septiliun','oktiliun','noniliun','desiliun'];
	//Mendefinisikan bilangan
	var angka = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
	//membuat function untuk memecah bilangan menjadi array beranggota 3 digit
  
	  var number = currency(feed).split(',');
  
	//menginisiasi luaran
	var output = '';
  
	var segment3 = number[0].split('.');
	//Membilang setiap segmen 3 digit
	$.each(segment3, function(i, v) {
	  if (v * 1 != 0) {
		//memecah 3 digit menjadi arrau 1 digit
		if(v.length < 3){
		  v = ('00'+v).substr(-3,3);
		}
		var digit = v.split('');
  
		//menentukan nilai ratusan
		output += digit[0] == '1' ?
		  'seratus' :
		  (digit[0]!='0' ? angka[digit[0]] + ' ratus ' : '');
  
		//menentukan nilai puluhan
		if (digit[1] == '1') {
		  output += (digit[2] == '0') ? ' sepuluh ' : (digit[2] == '1' ? ' se' : angka[digit[2]]) + 'belas ';
		} else if (digit[1] != '0') {
		  output += angka[digit[1]] + ' puluh ' + angka[digit[2]] + ' ';
		} else {
		  if (digit[0] == '0' && digit[1] == '0' && digit[2] == '1') {
			output += (i == segment3.length - 2) ? 'se' : 'satu ';
		  } else {
			output += angka[digit[2]] + ' ';
		  }
		}
		output += units[segment3.length - i - 1] + ' ';
	  }
	})
  
	var decimal = '';
	  if(typeof number[1] != 'undefined'){
		  decimal = ' koma ';
		  angka[0] = ' nol';
		  $.each(number[1].split(''), function(i, v){
			  decimal += ' ' + angka[v];
		  })
	  }
  
	return output + decimal ;
  }
  
  var currency = function(feed, number){
  
	if(typeof number != 'undefined' && ! isNaN(number)){
	  feed  = Math.round(feed*10^(-number))*10^number;
	}
  
	var segment = feed.split('.');
  
	  while (/(\d+)(\d{3})/.test(segment[0])) {
	  segment[0] = segment[0].replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
	}
  
	return segment[0] + (typeof segment[1] != 'undefined' ? ','+segment[1] : '');
  }
	layeredCanvas = function ( id ) {

		/*
		cara pakai
		var myCanvas = new layeredCanvas( "theCanvas" );

		myCanvas.addLayer( {
			id: 'background',
			render: function( canvas, ctx ) {
				ctx.fillStyle = "black";
				ctx.fillRect( 0, 0, canvas.width, canvas.height );
			}
		})
		.addLayer( {
			id: 'squares',
			render: function( canvas, ctx ) {
				ctx.fillStyle = "#E5E059";
				ctx.fillRect( 50, 50, 150, 150 );

				ctx.fillStyle = "#BDD358";
				ctx.fillRect( 350, 75, 150, 150 );

				ctx.fillStyle = "#E5625E";
				ctx.fillRect( 50, 250, 100, 250 );
			}
		})
		.addLayer( {
			id: 'circles',
			render: function( canvas, ctx ) {
				ctx.fillStyle = "#558B6E";
				ctx.beginPath();
				ctx.arc( 75, 75, 80, 0, 2 * Math.PI );
				ctx.fill();

				ctx.beginPath();
				ctx.fillStyle = "#88A09E";
				ctx.arc( 275, 275, 150, 0, 2 * Math.PI );
				ctx.fill();

				ctx.beginPath();
				ctx.fillStyle = "#704C5E";
				ctx.arc( 450, 450, 50, 0, 2 * Math.PI );
				ctx.fill();
			}
		})
		.addLayer( {
			id: 'triangles',
			render: function( canvas, ctx ) {
				ctx.fillStyle = "#DAF7A6";
				ctx.beginPath();
				ctx.moveTo(120, 400);
				ctx.lineTo(250, 300);
				ctx.lineTo(300, 500);
				ctx.closePath();
				ctx.fill();

				ctx.fillStyle = "#FFC300";
				ctx.beginPath();
				ctx.moveTo(400, 100);
				ctx.lineTo(350, 300);
				ctx.lineTo(230, 200);
				ctx.closePath();
				ctx.fill();

				ctx.fillStyle = "#C70039";
				ctx.beginPath();
				ctx.moveTo(100, 100);
				ctx.lineTo(100, 300);
				ctx.lineTo(300, 300);
				ctx.closePath();
				ctx.fill();
			}
		});

		myCanvas.render();

		// end cara pakai
		*/
		this.layers = [];
		var extend = function ( defaults, options ) {
			var extended = {} , prop;
			for (prop in defaults) {
				if (Object.prototype.hasOwnProperty.call(defaults, prop))
					extended[prop] = defaults[prop];
			}
			for (prop in options) {
				if (Object.prototype.hasOwnProperty.call(options, prop))
					extended[prop] = options[prop];
			}
			return extended;
		};
	
		this.addLayer = function( obj ) {
	
			layer = extend( {
				id: Math.random().toString(36).substr(2, 5),
				show: true,
				render: function( canvas, ctx ) {}
			}, obj );
	
			if ( this.getLayer( layer.id ) !== false ) {
				console.log( 'Layer already exists' );
				console.log( obj );
				return false;
			}
			
			this.layers.push( layer );
			return this;
		};
		
		this.getLayer = function( id ) {
			var length = this.layers.length;
			for ( var i = 0; i < length; i++ ) {
				if ( this.layers[i].id === id )
					return this.layers[i];
			}
			return false;
		};
		
		this.removeLayer = function( id ) {
			var length = this.layers.length;
			for ( var i = 0; i < length; i++ ) {
				if ( this.layers[i].id === id ) {
					removed = this.layers[i];
					this.layers.splice( i, 1 );
					return removed;
				}
			}
			return false;
		};
		
		this.render = function() {
			var canvas = this.canvas;
			var ctx = this.ctx2d;
			this.layers.forEach( function( item, index, array ) {
				if ( item.show )
					item.render( canvas, ctx );
			});
		};
		
		this.canvas = document.getElementById( id );
		this.ctx2d = this.canvas.getContext( '2d' );
	};
	// print url to bluetooth printer
	async function getImageDataUrl(url) {
		const response = await fetch(url);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}
	function dataUrlToHex(dataUrl) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'Anonymous';
			img.src = dataUrl;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const hexString = imageDataToHex(imageData);
				resolve(hexString);
			};
			img.onerror = reject;
		});
	}
	
	function imageDataToHex(imageData) {
		const data = imageData.data;
		let hexString = '';
		for (let i = 0; i < data.length; i += 4) {
			const r = data[i].toString(16).padStart(2, '0');
			const g = data[i + 1].toString(16).padStart(2, '0');
			const b = data[i + 2].toString(16).padStart(2, '0');
			hexString += r + g + b;
		}
		return hexString;
	}
	async function convertImageUrlToHex(url) {
		try {
			const dataUrl = await getImageDataUrl(url);
			const hexString = await dataUrlToHex(dataUrl);
			console.log(hexString);
		} catch (error) {
			console.error('Error converting image:', error);
		}
	}