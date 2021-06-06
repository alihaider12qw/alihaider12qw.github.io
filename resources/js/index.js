(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {
      // set options for current element
      var settings = $.extend(
        {},
        $.fn.countTo.defaults,
        {
          from: $(this).data("from"),
          to: $(this).data("to"),
          speed: $(this).data("speed"),
          refreshInterval: $(this).data("refresh-interval"),
          decimals: $(this).data("decimals"),
        },
        options
      );

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data("countTo") || {};

      $self.data("countTo", data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof settings.onUpdate == "function") {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData("countTo");
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete == "function") {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 0, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    formatter: formatter, // handler for formatting the value before rendering
    onUpdate: null, // callback method for every time the element is updated
    onComplete: null, // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
})(jQuery);

jQuery(function ($) {
  var scroller = true;
  $(window).scroll(function () {
    var hT = $(".counter").offset().top,
      hH = $(".counter").outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS > hT + hH - wH && scroller) {
      // custom formatting example
      $(".count-number").data("countToOptions", {
        formatter: function (value, options) {
          return value
            .toFixed(options.decimals)
            .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
        },
      });

      // start all the timers
      $(".timer").each(count);
      scroller = false;
    }
  });
  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }
});

/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
$(document).ready(function () {
  var menuClicked = false;
  var subMenuClicked1 = false;
  var subMenuClicked2 = false;
  var subMenuClicked3 = false;
  var menuItemHover = false;

  $('.aoeSubLink1').hover(function () {
      if (subMenuClicked1) {
          $('#aoeSublinkDiv1').css("visibility", "hidden");

          $('.aoeSubLink1').removeClass("activeaoe");
          $('.aoeSubLink1').removeClass("notActiveaoe");
          $('.aoeSubLink1').addClass("notActiveaoe");
      }
      else {
          $('#aoeSublinkDiv1').css("visibility", "visible");
          $('.aoeSubLink1').removeClass("notActiveaoe");
          $('.aoeSubLink1').removeClass("activeaoe");
          $('.aoeSubLink1').addClass("activeaoe");
      }

      subMenuClicked1 = !subMenuClicked1;
  });

  $('.aoeSubLink2').hover(function () {
      if (subMenuClicked2) {
          $('#aoeSublinkDiv2').css("visibility", "hidden");

          $('.aoeSubLink2').removeClass("activeaoe");
          $('.aoeSubLink2').removeClass("notActiveaoe");
          $('.aoeSubLink2').addClass("notActiveaoe");
      }
      else {
          $('#aoeSublinkDiv2').css("visibility", "visible");
          $('.aoeSubLink2').removeClass("notActiveaoe");
          $('.aoeSubLink2').removeClass("activeaoe");
          $('.aoeSubLink2').addClass("activeaoe");
      }

      subMenuClicked2 = !subMenuClicked2;
  });

  $('.aoeSubLink3').hover(function () {

      if (subMenuClicked3) {
          $('#aoeSublinkDiv3').css("visibility", "hidden");

          $('.aoeSubLink3').removeClass("activeaoe");
          $('.aoeSubLink3').removeClass("notActiveaoe");
          $('.aoeSubLink3').addClass("notActiveaoe");
      }
      else {
          $('#aoeSublinkDiv3').css("visibility", "visible");
          $('.aoeSubLink3').removeClass("notActiveaoe");
          $('.aoeSubLink3').removeClass("activeaoe");
          $('.aoeSubLink3').addClass("activeaoe");
      }

      subMenuClicked3 = !subMenuClicked3;
  });
  $('.divRemainsOpen').hover(function () {
      $('#MenuDropDownDiv').css("display", "block");
      $("#aoeunderlineOnhover").removeClass("aoeMenuOpen");
      $("#aoeunderlineOnhover").removeClass("aoeMenuNotOpen");
      $("#aoeunderlineOnhover").addClass("aoeMenuOpen");
  });

  $('.divRemainsOpen').mouseleave(function () {
      $("#aoeunderlineOnhover").removeClass("aoeMenuOpen");
      $("#aoeunderlineOnhover").removeClass("aoeMenuNotOpen");
      $("#aoeunderlineOnhover").addClass("aoeMenuNotOpen");
      $('#MenuDropDownDiv').css("display", "none");
  });

  $(window).on('resize', function () {
      if ($(window).width() < 767) {
          $('#anchor').attr("data-toggle", "dropdown");
          $('#MenuDropDownDiv').css("visibility", "hidden");
          $('#myNavbar').removeClass('menuWidth');
          $('#dropsdowns').css('visibility', 'visible');
          $('#pldIndexdesktop').hide();
          $('#pldIndexMob').show();
      } else {
          $('#anchor').attr("data-toggle", "");
          $('#MenuDropDownDiv').css("visibility", "visible");
          $('.collapse').attr('max-height', '40px');
          $('#myNavbar').addClass('menuWidth');
          $('#dropsdowns').css('visibility', 'hidden');
          $('#pldIndexdesktop').show();
          $('#pldIndexMob').hide();
      }
  });

  $('.dropdown-menu a').click(function (e) {
      if ($(this).attr('href') == "#" || $(this).attr('href') == "")
          e.preventDefault();
      e.stopPropagation();
  });

  $(document).ready(function () {
      $('.dropdown-submenu a.test').on("click", function (e) {
          $(this).next('ul').toggle();
          e.stopPropagation();
          e.preventDefault();
      });

      if ($(window).width() < 767) {
          $('#aoeunderlineOnhover').addClass('onMobAreas');
          $('#navDotsDiv').css("visibility", "hidden");
          var video = $('#bg_video')[0];
          var videoFile;
          //if (!(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)) {
          videoFile = 'images/cell/home/home_main_video_cell.mp4';
          //} else {
          //video.type = 'video/mov'
          //videoFile = 'images/cell/home/home_main_video_cell.mov';
          ////}
          video.src = videoFile;
          video.load();

          video.setAttribute('loop', 'loop');
          video.setAttribute('autoplay', 'autoplay');
          $("video").prop('muted', true)
          video.setAttribute('playsinline', 'playsinline');
          video.setAttribute('webkit-playsinline', 'webkit-playsinline');


          $("#Image1").attr("src", "images/cell/home/01_exercise_bike.jpg");
          $("#Image2").attr("src", "images/cell/home/02_virtual_ride.jpg");
          $("#Image3").attr("src", "images/cell/home/03_ar.jpg");
          $("#punchLineDivIndex").css("background-image", "url('images/cell/home/bg_mission_statement_cell.jpg')");

          $('#pldIndexdesktop').hide();
          $('#pldIndexMob').show();
          $('#myNavbar').removeClass('menuWidth');
          //$('#setPositionDesktop').removeClass('setPos');

          $("#Image3").attr("src", "images/cell/home/03_ar.jpg");
          $("#punchLineDivIndex").css("background-image", "url('images/cell/home/bg_mission_statement_cell.jpg')");
          $('#aoeunderlineOnhover').addClass('onMobAreas');
          $('menuitemAreasOfExp').prop("disabled", false);

          $('#MenuDropDownDiv').css("visibility", "hidden");
          $('#anchor').attr("data-toggle", "dropdown");
      } else {
          var video = $('#bg_video')[0];
          var videoFile = 'images/home/home_main_video.mp4';
          video.src = videoFile;
          video.load();
          $("#Image1").attr("src", "images/home/01_exercise_bike.jpg");
          $("#Image2").attr("src", "images/home/02_virtual_ride.jpg");
          $("#Image3").attr("src", "images/home/03_ar.jpg");
          $("#punchLineDivIndex").css("background-image", "url('images/home/bg_mission_statement.jpg')");
          $("#homeLink").attr("href", "index.html");

          $('#pldIndexdesktop').show();
          $('#pldIndexMob').hide();
          $('#myNavbar').addClass('menuWidth');
          //$('#setPositionDesktop').addClass('setPos');
          $('#aoeunderlineOnhover').removeClass('onMobAreas');
          $('#anchor').attr("data-toggle", "");
          $('menuitemAreasOfExp').prop("disabled", true);
      }

      $('#bg_video').trigger('play');
      var timeout;
      var FireTimeout;
      var scroll = 0;
      var lastScrollTop = 0;
      var fired = true;
      var vidDivOffset = $('body').offset().top;
      var punchLineDivOffset = $('#punchLineDivIndex').offset().top - 300;
      var expandDivOffset = $('#expandDiv').offset().top - 365;
      var siteMapDivOffset = $('#navDiv').offset().top - 700;

      $(window).scroll(function () {
          var winScroll = $(window).scrollTop();

          if (winScroll < punchLineDivOffset && winScroll + 500 > punchLineDivOffset || winScroll > punchLineDivOffset && winScroll - 800 < punchLineDivOffset) {
              $('#span1').css('visibility', 'visible');
              $('#span2').css('visibility', 'visible');
              $('#span3').css('visibility', 'visible');
              $('#span1').addClass('showSpan1');
              $('#span2').addClass('showSpan2');
              $('#span3').addClass('showSpan3');
          }

          if (winScroll < punchLineDivOffset) {
              $('#navDot1').removeClass("navDotNotActive");
              $('#navDot2').removeClass("navDotNotActive");
              $('#navDot3').removeClass("navDotNotActive");
              $('#navDot4').removeClass("navDotNotActive");
              $('#navDot1').removeClass("navDotActive");
              $('#navDot2').removeClass("navDotActive");
              $('#navDot3').removeClass("navDotActive");
              $('#navDot4').removeClass("navDotActive");
              $('#navDot1').addClass("navDotActive");
              $('#navDot2').addClass("navDotNotActive");
              $('#navDot3').addClass("navDotNotActive");
              $('#navDot4').addClass("navDotNotActive");

          }
          else if (winScroll > punchLineDivOffset && winScroll < expandDivOffset) {
              $('#navDot1').removeClass("navDotNotActive");
              $('#navDot2').removeClass("navDotNotActive");
              $('#navDot3').removeClass("navDotNotActive");
              $('#navDot4').removeClass("navDotNotActive");
              $('#navDot1').removeClass("navDotActive");
              $('#navDot2').removeClass("navDotActive");
              $('#navDot3').removeClass("navDotActive");
              $('#navDot4').removeClass("navDotActive");
              $('#navDot1').addClass("navDotNotActive");
              $('#navDot2').addClass("navDotActive");
              $('#navDot3').addClass("navDotNotActive");
              $('#navDot4').addClass("navDotNotActive");

          }
          else if (winScroll > expandDivOffset && winScroll < siteMapDivOffset) {
              $('#navDot1').removeClass("navDotNotActive");
              $('#navDot2').removeClass("navDotNotActive");
              $('#navDot3').removeClass("navDotNotActive");
              $('#navDot4').removeClass("navDotNotActive");
              $('#navDot1').removeClass("navDotActive");
              $('#navDot2').removeClass("navDotActive");
              $('#navDot3').removeClass("navDotActive");
              $('#navDot4').removeClass("navDotActive");
              $('#navDot1').addClass("navDotNotActive");
              $('#navDot2').addClass("navDotNotActive");
              $('#navDot3').addClass("navDotActive");
              $('#navDot4').addClass("navDotNotActive");

          }
          else if (winScroll > siteMapDivOffset) {
              $('#navDot1').removeClass("navDotNotActive");
              $('#navDot2').removeClass("navDotNotActive");
              $('#navDot3').removeClass("navDotNotActive");
              $('#navDot4').removeClass("navDotNotActive");
              $('#navDot1').removeClass("navDotActive");
              $('#navDot2').removeClass("navDotActive");
              $('#navDot3').removeClass("navDotActive");
              $('#navDot4').removeClass("navDotActive");
              $('#navDot1').addClass("navDotNotActive");
              $('#navDot2').addClass("navDotNotActive");
              $('#navDot3').addClass("navDotNotActive");
              $('#navDot4').addClass("navDotActive");
          }

          $('#Image01Div').hover(function () {
              $('#Image01').next().removeClass("CloseUnderDiv");
              $('#Image01').next().addClass("OpenUnderDiv");
          });
          $('#Image01Div').mouseleave(function () {
              $('#Image01').next().removeClass("OpenUnderDiv");
              $('#Image01').next().addClass("CloseUnderDiv");
          });
          $('#Image02Div').hover(function () {
              $('#Image02').next().removeClass("CloseUnderDiv");
              $('#Image02').next().addClass("OpenUnderDiv");
          });
          $('#Image02Div').mouseleave(function () {
              $('#Image02').next().removeClass("OpenUnderDiv");
              $('#Image02').next().addClass("CloseUnderDiv");
          });
          $('#Image03Div').hover(function () {
              $('#Image03').next().removeClass("CloseUnderDiv");
              $('#Image03').next().addClass("OpenUnderDiv");
          });
          $('#Image03Div').mouseleave(function () {
              $('#Image03').next().removeClass("OpenUnderDiv");
              $('#Image03').next().addClass("CloseUnderDiv");
          });

          $('#Image02').mouseleave(function () {
              $('#img1').removeClass("ShrinkImg1For2");
              $('#img2').removeClass("expandImg2");
              $('#img3').removeClass("ShrinkImg3For2");
              $('#img1').addClass("normalWidthImg1");
              $('#img2').addClass("normalWidthImg2");
              $('#img3').addClass("normalWidthImg3");
              $('#Image2').removeClass("expandImage1Margin");
              $('#Image2').addClass('normalWidthImageMargin');

          });

          $('#Image03').mouseleave(function () {
              $('#img1').removeClass("ShrinkImg1For3");
              $('#img2').removeClass("ShrinkImg2For3");
              $('#img3').removeClass("expandImg3");
              $('#img1').addClass("normalWidthImg1");
              $('#img2').addClass("normalWidthImg2");
              $('#img3').addClass("normalWidthImg3");
              $('#Image3').removeClass("expandImage1Margin");
              $('#Image3').addClass('normalWidthImageMargin');
          });
      });

      function stickHeader() {
          var rowViewed = document.getElementById("rowViewed");
          var sticky = rowViewed.offsetTop;

          if (window.pageYOffset >= sticky) {
              alert('add')
              rowViewed.classList.add("sticky")
          } else {
              alert('rem')
              rowViewed.classList.remove("sticky");
          }
      }

      $('#navDot1').click(function () {
          $('html,body').animate({
              scrollTop: $("body").offset().top
          }, 'slow');
          $('#navDot1').removeClass("navDotNotActive");
          $('#navDot2').removeClass("navDotNotActive");
          $('#navDot3').removeClass("navDotNotActive");
          $('#navDot4').removeClass("navDotNotActive");
          $('#navDot1').removeClass("navDotActive");
          $('#navDot2').removeClass("navDotActive");
          $('#navDot3').removeClass("navDotActive");
          $('#navDot4').removeClass("navDotActive");
          $('#navDot1').addClass("navDotActive");
          $('#navDot2').addClass("navDotNotActive");
          $('#navDot3').addClass("navDotNotActive");
          $('#navDot4').addClass("navDotNotActive");

      });

      $('#navDot2').click(function () {
          $('html,body').animate({
              scrollTop: $("#punchLineDivIndex").offset().top
          }, 'slow');
          $('#navDot1').removeClass("navDotNotActive");
          $('#navDot2').removeClass("navDotNotActive");
          $('#navDot3').removeClass("navDotNotActive");
          $('#navDot4').removeClass("navDotNotActive");
          $('#navDot1').removeClass("navDotActive");
          $('#navDot2').removeClass("navDotActive");
          $('#navDot3').removeClass("navDotActive");
          $('#navDot4').removeClass("navDotActive");
          $('#navDot1').addClass("navDotNotActive");
          $('#navDot2').addClass("navDotActive");
          $('#navDot3').addClass("navDotNotActive");
          $('#navDot4').addClass("navDotNotActive");
      });

      $('#navDot3').click(function () {
          $('html,body').animate({
              scrollTop: $("#expandDiv").offset().top
          }, 'slow');
          $('#navDot1').removeClass("navDotNotActive");
          $('#navDot2').removeClass("navDotNotActive");
          $('#navDot3').removeClass("navDotNotActive");
          $('#navDot4').removeClass("navDotNotActive");
          $('#navDot1').removeClass("navDotActive");
          $('#navDot2').removeClass("navDotActive");
          $('#navDot3').removeClass("navDotActive");
          $('#navDot4').removeClass("navDotActive");
          $('#navDot1').addClass("navDotNotActive");
          $('#navDot2').addClass("navDotNotActive");
          $('#navDot3').addClass("navDotActive");
          $('#navDot4').addClass("navDotNotActive");
      });

      $('#navDot4').click(function () {
          $('html,body').animate({
              scrollTop: $(document).height()//$("#siteMapDiv").offset().top -700
          }, 'slow');
          $('#navDot1').removeClass("navDotNotActive");
          $('#navDot2').removeClass("navDotNotActive");
          $('#navDot3').removeClass("navDotNotActive");
          $('#navDot4').removeClass("navDotNotActive");
          $('#navDot1').removeClass("navDotActive");
          $('#navDot2').removeClass("navDotActive");
          $('#navDot3').removeClass("navDotActive");
          $('#navDot4').removeClass("navDotActive");
          $('#navDot1').addClass("navDotNotActive");
          $('#navDot2').addClass("navDotNotActive");
          $('#navDot3').addClass("navDotNotActive");
          $('#navDot4').addClass("navDotActive");
      });


      $('#Image1').hover(function () {
          $('#img1').removeClass("normalWidthImg1");
          $('#img2').removeClass("normalWidthImg2");
          $('#img3').removeClass("normalWidthImg3");
          $('#img1').addClass("expandImg1");
          $('#img2').addClass("ShrinkImg2For1");
          $('#img3').addClass("ShrinkImg3For1");
          $('#Image1').removeClass("normalWidthImageMargin");
          $('#Image1').addClass("expandImage1Margin");
          $('#Image1').attr('src', 'images/home/01_exercise_bike_over.jpg');
          $('#Image1').next().children().eq(1).addClass("textStyleInfoPara");
          $('#Image1').next().children().eq(0).addClass("textStyleInfoHeading");
      });

      $('#Image2').hover(function () {
          $('#img1').removeClass("normalWidthImg1");
          $('#img2').removeClass("normalWidthImg2");
          $('#img3').removeClass("normalWidthImg3");
          $('#img1').addClass("ShrinkImg1For2");
          $('#img2').addClass("expandImg2");
          $('#img3').addClass("ShrinkImg3For2");
          $('#Image2').removeClass("normalWidthImageMargin");
          $('#Image2').addClass("expandImage1Margin");
          $('#Image2').attr('src', 'images/home/02_virtual_ride_over.jpg');
          $('#Image2').next().children().eq(1).addClass("textStyleInfoPara");
          $('#Image2').next().children().eq(0).addClass("textStyleInfoHeading");

      });

      $('#Image3').hover(function () {
          $('#img1').removeClass("normalWidthImg1");
          $('#img2').removeClass("normalWidthImg2");
          $('#img3').removeClass("normalWidthImg3");
          $('#img3').addClass("expandImg3");
          $('#img1').addClass("ShrinkImg1For3");
          $('#img2').addClass("ShrinkImg2For3");
          $('#Image3').removeClass("normalWidthImageMargin");
          $('#Image3').addClass("expandImage1Margin");
          $('#Image3').attr('src', 'images/home/03_ar_over.jpg');
          $('#Image3').next().children().eq(1).addClass("textStyleInfoPara");
          $('#Image3').next().children().eq(0).addClass("textStyleInfoHeading");
      });

      $('#img1').hover(function () {
          $('#img1').removeClass("normalWidthImg1");
          $('#img2').removeClass("normalWidthImg2");
          $('#img3').removeClass("normalWidthImg3");
          $('#img1').addClass("expandImg1");
          $('#img2').addClass("ShrinkImg2For1");
          $('#img3').addClass("ShrinkImg3For1");
          $('#Image1').removeClass("normalWidthImageMargin");
          $('#Image1').addClass("expandImage1Margin");
          $('#Image1').attr('src', 'images/home/01_exercise_bike_over.jpg');
          $('#Image1').next().children().eq(1).addClass("textStyleInfoPara");
          $('#Image1').next().children().eq(0).addClass("textStyleInfoHeading");
      });

      $('#img2').hover(function () {
          $('#img1').removeClass("normalWidthImg1");
          $('#img2').removeClass("normalWidthImg2");
          $('#img3').removeClass("normalWidthImg3");
          $('#img1').addClass("ShrinkImg1For2");
          $('#img2').addClass("expandImg2");
          $('#img3').addClass("ShrinkImg3For2");
          $('#Image2').removeClass("normalWidthImageMargin");
          $('#Image2').addClass("expandImage1Margin");
          $('#Image2').attr('src', 'images/home/02_virtual_ride_over.jpg');
          $('#Image2').next().children().eq(1).addClass("textStyleInfoPara");
          $('#Image2').next().children().eq(0).addClass("textStyleInfoHeading");
      });

      $('#img3').hover(function () {
          $('#img1').removeClass("normalWidthImg1");
          $('#img2').removeClass("normalWidthImg2");
          $('#img3').removeClass("normalWidthImg3");
          $('#img3').addClass("expandImg3");
          $('#img1').addClass("ShrinkImg1For3");
          $('#img2').addClass("ShrinkImg2For3");
          $('#Image3').removeClass("normalWidthImageMargin");
          $('#Image3').addClass("expandImage1Margin");
          $('#Image3').attr('src', 'images/home/03_ar_over.jpg');
          $('#Image3').next().children().eq(1).addClass("textStyleInfoPara");
          $('#Image3').next().children().eq(0).addClass("textStyleInfoHeading");
      });

      $('#img1').mouseleave(function () {
          $('#img1').removeClass("expandImg1");
          $('#img2').removeClass("ShrinkImg2For1");
          $('#img3').removeClass("ShrinkImg3For1");
          $('#img1').addClass("normalWidthImg1");
          $('#img2').addClass("normalWidthImg2");
          $('#img3').addClass("normalWidthImg3");
          $('#Image1').removeClass("expandImage1Margin");
          $('#Image1').addClass('normalWidthImageMargin');
          $('#Image1').attr('src', 'images/home/01_exercise_bike.jpg');
          $('#Image1').next().children().eq(1).removeClass("textStyleInfoPara");
          $('#Image1').next().children().eq(0).removeClass("textStyleInfoHeading");
      });

      $('#img2').mouseleave(function () {
          $('#img1').removeClass("ShrinkImg1For2");
          $('#img2').removeClass("expandImg2");
          $('#img3').removeClass("ShrinkImg3For2");
          $('#img1').addClass("normalWidthImg1");
          $('#img2').addClass("normalWidthImg2");
          $('#img3').addClass("normalWidthImg3");
          $('#Image2').removeClass("expandImage1Margin");
          $('#Image2').addClass('normalWidthImageMargin');
          $('#Image2').attr('src', 'images/home/02_virtual_ride.jpg');
          $('#Image2').next().children().eq(1).removeClass("textStyleInfoPara");
          $('#Image2').next().children().eq(0).removeClass("textStyleInfoHeading");

      });

      $('#img3').mouseleave(function () {
          $('#img1').removeClass("ShrinkImg1For3");
          $('#img2').removeClass("ShrinkImg2For3");
          $('#img3').removeClass("expandImg3");
          $('#img1').addClass("normalWidthImg1");
          $('#img2').addClass("normalWidthImg2");
          $('#img3').addClass("normalWidthImg3");
          $('#Image3').removeClass("expandImage1Margin");
          $('#Image3').addClass('normalWidthImageMargin');
          $('#Image3').attr('src', 'images/home/03_ar.jpg');
          $('#Image3').next().children().eq(1).removeClass("textStyleInfoPara");
          $('#Image3').next().children().eq(0).removeClass("textStyleInfoHeading");

      });

  });
});


