var format_tanggal = 'YYYY-MM-DD HH:mm:ss';
var simple_format_tanggal = "YYYY-MM-DD";
$(document).ready(function(e) {
  	$('img').each(function(index, element) {
		var attalt	= $(this).attr('alt');
      	var attsrc	= $(this).attr('src');
		if(!attalt) {
			$(this).attr('alt',attsrc);
		}
    });
})
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
// android javascript
// image editor
function action_image(btn) {
	event.preventDefault();
	var modaldata = `<div id="modal-img-editor" class="modal fade" style="z-index:11000;">
	<div class="modal-dialog modal-lg">
	  <div class="modal-content">
		<div class="modal-header">
		  <h4 class="modal-title">Image Editor</h4>
		</div>
		<div class="modal-body">
		  <p>Loading Data.........</p>
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
	if(src) {
		parameter += '&src='+src;
	}
	if(targetElem) {
		parameter += '&targetElem='+targetElem;
	}
  if($(btn).attr("data-width")) {
    parameter += '&width='+$(btn).attr("data-width");
  }
  if($(btn).attr("data-height")) {
    parameter += '&height='+$(btn).attr("data-height");
  }
	$("#modal-img-editor .modal-body").load(docs.link_web+"index.php?rute=common/imageaction"+parameter);
	$('#modal-img-editor').on('hidden.bs.modal', function (e) {
		$('#modal-img-editor').remove();
	});
}
function bataleditimg() {
	var classbody = $("#modal-img-editor").attr("data-classbody");
	console.log(classbody);
	$('#modal-img-editor').modal("hide");		
		$('#modal-img-editor').on('hidden.bs.modal', function (e) {
			$('body').addClass(classbody);
		});
	console.log(classbody);
}
function gotosection(btn, event) {
  var target = $(btn).attr("href");
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $(target).offset().top - 100,
    },
    "slow"
  );
}
// JavaScript Document
function GetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) {
          result = decodeURIComponent(tmp[1]);
          // replace plus with space for GET request
          result = result.replace(/\+/g, ' ');
        }
    }
    return result;
}
function removeFromCart(id_produk,reload=false,jenis=false) {
    event.preventDefault();
    if(jenis == false) {
      jenis = 'inventori';
    }
    $.ajax({
        type: 'POST',
        url: docs.link_web+'index.php?rute=api/cart&term=remove',
        data: {
            id  :  id_produk,
            jenis : jenis,
        }
    }).done(function(result) { 
        $("#modal-cart-front").load(docs.link_web+"index.php?rute=apis/cart&term=modal");
        if(reload == true) {
            window.location.replace(docs.link);
        }
    }).fail(function(response, status, xhr) {
          // gagal
          if(typeof response['responseJSON']['notif'] !== 'undefined') {
            swal( "ERROR!"+response['responseJSON']['code'],response['responseJSON']['notif'],"error");
          } else {
            swal( "ERROR!",'Error Code : '+response['status'],"error");
          }
    });
}
function getJsonAPI(options={},resultData) {
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
/*
getJsonAPI({
    "base_url" : "",
    "page" : 2
},function(results) {
    console.log(results);
});
*/
function getNotifPartner(target) {
	if(target) {
		$.ajax({
			type: 'POST',
			url: docs.link_web+"index.php?rute=apis/notifikasi&term=cek", 
		}).done(function(response) {
          if(response.total > 0) {
            $(target).html('<span class="label label-danger">'+response.total+'</span>');
          }
		});
			
	}
}
function removeElement(target) {
    event.preventDefault();
    $(target).remove();
}
function openNotif() {
    $("#modal-notif-front").remove();
    event.preventDefault();
    var modalcart = '<div id="modal-notif-front"><div class="text-center"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div></div>';
    $(modalcart).insertAfter("footer");
    $("#modal-notif-front").load(docs.link_web+"index.php?rute=apis/notifikasi&term=modal");
    $("#modal-notif-front").css({
        'z-index': 1000,
        'position': 'fixed',
        'bottom'  : '5px',
        'left'    : '5px',
        'right'   : '5px',
        'box-shadow': '0 1px 5px 0 rgba(0, 0, 0, 0.08)',
        'border-radius': '8px',
        'padding' : '15px',
        'background-color' : '#fff',
        'max-height': '100%',
        'overflow'  : 'auto',
    });
}
function openCart() {
    $("#modal-cart-front").remove();
    event.preventDefault();
    var modalcart = '<div id="modal-cart-front"><div class="text-center"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div></div>';
    $(modalcart).insertAfter("#cart-button");
    $("#modal-cart-front").load(docs.link_web+"index.php?rute=apis/cart&term=modal");
    $("#modal-cart-front").css({
        'z-index': 1000,
        'position': 'fixed',
        'max-width': '500px',
        'bottom'  : '5px',
        'left'    : '5px',
        'right'   : '5px',
        'box-shadow': '0 1px 5px 0 rgba(0, 0, 0, 0.08)',
        'border-radius': '8px',
        'padding' : '15px',
        'background-color' : '#FFAD81',
        'max-height': '100%',
        'overflow'  : 'auto',
    });
}
function updateCart(id_produk,qty,reload,jenis,rute,params=[]) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: docs.link_web+'index.php?rute=api/cart&term=update',
        data: {
            id  :  id_produk,
            qty : qty,
            jenis : jenis,
            inputrute : rute,
            params : params,
        }
    }).done(function(result) { 
        $("#modal-cart-front").load(docs.link_web+"index.php?rute=apis/cart&term=modal");
        if(reload == true) {
            $("#btn-proses-order").addClass("disabled");
            window.location.replace(docs.link);
        }
      }).fail(function(response, status, xhr) { 
        if(typeof response['responseJSON']['notif'] !== 'undefined') {
          swal( "ERROR!"+response['responseJSON']['code'],response['responseJSON']['notif'],"error");
        } else {
          swal( "ERROR!",'Error Code : '+response['status'],"error");
        }
    });
}
function addToCart(id_produk,btn,tabel,rute,params=[]) {
  event.preventDefault();
  $(btn).addClass("disabled");
  var textdata = $(btn).text();
  $.ajax({
      type: 'POST',
      url: docs.link_web+'index.php?rute=api/cart&term=add',
      data: {
          id  :  id_produk,
          tabel : tabel,
          inputrute : rute,
          params : params,
      }
  }).done(function(result) { 
    $(btn).removeClass("disabled");
    $(btn).html(textdata); 
    // cart load
    $("#cart-button").show();
    openCart();
  }).fail(function(response, status, xhr) {
    $(btn).removeClass("disabled");
    $(btn).html(textdata); 
    if(typeof response['responseJSON']['notif'] !== 'undefined') {
      swal( "ERROR!"+response['responseJSON']['code'],response['responseJSON']['notif'],"error");
    } else {
      swal( "ERROR!",'Error Code : '+response['status'],"error");
    }
  });
}
// cara pakainya onfocus="formatnomer.angka(this)"
var formatnomer	= {
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
	'matauang'	: function(nilaiawal,ribuan='.',desimal=',') {
		nilaiawal += '';
        x = nilaiawal.split(desimal);
        x1 = x[0];
        x2 = x.length > 1 ? desimal + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ribuan + '$2');
        }
        return x1 + x2;

	}
}// =========================================================================== modal general
$('#modal-general').on('show.bs.modal', function (event) {
  var button 		= $(event.relatedTarget);
  var loaddata	= button.data('link');
  var title	= button.data('title');
  var size 	= button.data('size');
  var modal = $(this)
  var idtarget = button.data("tujuan");
  var zindex = button.data('zindex');
  
        
  var classbody = $("body").attr("class");	
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
  if(size) {
    modal.find('.modal-dialog').addClass(size);
  } else {
    modal.find('.modal-dialog').addClass('modal-lg');
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
function pageIgantion(link_base,target,options) {
    
}