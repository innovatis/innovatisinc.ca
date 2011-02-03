function throb(max,fcn){
  var count = 0;

  (function throbber(){
    $('#green_glow').fadeIn('slow',function(){
        $(this).fadeOut('slow',function(){
          count++;
          if(count < max){
            throbber();
          }else if(fcn){
            fcn();
          }
        });
      });
  })();
}

  function animateBusiness(newStart,newStop){
    var offset   = -100,
        business = $('.business'),
        start    = newStart || buildings[buildingIndex].small,
        stop     = newStop  || buildings[buildingIndex].large;

    buildingIndex = (buildingIndex + 1)%3;

    business.attr('id',start);

    business.css({left:offset}).fadeIn(function(){
      (function(){
        offset += 3;
        var continueAnimation = arguments.callee;

        business.css({left:offset+"px"});

        if(offset < 440 || offset > 440 && offset < 1000){
          setTimeout(arguments.callee,30);
        }else if(offset < 1000){
          beltOn = false;

          if($.support.opacity){
            throb(3,function(){
              business.attr('id',stop);
              // funky transition
              offset = 440;
              beltOn = true;
              continueAnimation();
            });
          }else{
            setTimeout(function(){
              business.attr('id',stop);
              offset = 440;
              beltOn = true;
              continueAnimation();
            },3000);
          }
        }else if( offset >= 1000){
          setTimeout(animateBusiness,2000);
        }
      })();
    });
  }

  window.beltOn = true;
  window.houseOn = true;
  window.buildingIndex = 0;
  window.buildings = [
    {
      small: "small_store",
      large: "large_store"
    },
    {
      small: "small_factory",
      large: "large_factory"
    },
    {
      small: "small_building",
      large: "large_building"
    }

  ];

  function animateBelt(){
    var counter  = 0,
        belts    = $('#belt-left,#belt-right');

    (function(){
      if(beltOn){
        counter += 3;
        belts.css("background-position",counter%624 +"px 0");
      }

      setTimeout(arguments.callee,30);
    })();
  }

var Innovatis = Innovatis || {};

(function(){

  Innovatis.form = form = {};
  form.mailPath = '/_strobe/proxy/empty-water-430.heroku.com/mail';

  form.validate = function(){
    var element = $(this),
    val         = $.trim(element.val()),
    inputDiv    = element.closest('.input'),
    required    = /* element.is('[required]') */ inputDiv.hasClass('required'), /* fallback for ie bug */
    empty       = val === "",
    type        = element.attr("type");

    if(required && empty){
      inputDiv.addClass("error");
    }else{
      inputDiv.removeClass("error");
    }
  };

  form.validateAll = function(){
    $("input,textarea").each(form.validate);
    return $(".input.error").length < 1;
  };

})();

$(function(){

  setTimeout(function(){
    $('.fadeIn').fadeIn(2000,function(){
      $('#belt-left,#belt-right').fadeIn(2000,function(){
        $('.business').fadeIn();
      });
    });
  },1000);

  $('#contact_us_now').click(function(){
    $('#contact').slideDown(1000,function(){
      $(window).scrollTo($('#contact'),1000,{axis: 'y'});
      $('.input cite').fadeIn();
    });
    return false;
  },function(){
    $('.input cite').fadeOut('fast');
    $(window).scrollTo(0,1000);
    $('#contact').stop().fadeOut(1100);
    return false;
  });

  $('#form-close').click(function(){
    $('.input cite').fadeOut('fast');
    $(window).scrollTo(0,1000);
    $('#contact').stop().slideUp(1100);
    return false;
  });

  $('#try-again').click(function() {
    $('#contact-form').fadeIn();
    $('.actions').show();
    $('#form_failure').fadeOut();
    return false;
  });

  animateBelt();
  animateBusiness();

  $('#contact-form').submit(function(e){
    var element = $(this);
    if(Innovatis.form.validateAll()){
      $('#contact-form').fadeOut();
      $('.actions').hide();
      $("#form_spinner").fadeIn(100);
      $.ajax({
        type: 'POST',
        url: Innovatis.form.mailPath,
        data: element.serialize(),
        success: function(data) {
          $("#form_spinner").fadeOut();
          $("#form_success").fadeIn();
        },
        failure: function(data) {
          $("#form_spinner").fadeOut();
          $("#form_failure").fadeIn();
        }
      });
    }

    return false;
  });
  $('#contact-form input').keyup(Innovatis.form.validate);
});
