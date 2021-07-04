$('#Image01Div').hover(function() {
    $('#Image01').next().removeClass("closed");
    $('#Image01').next().addClass("opened");
});
$('#Image01Div').mouseleave(function() {
    $('#Image01').next().removeClass("opened");
    $('#Image01').next().addClass("closed");
});
$('#Image02Div').hover(function() {
    $('#Image02').next().removeClass("closed");
    $('#Image02').next().addClass("opened");
});
$('#Image02Div').mouseleave(function() {
    $('#Image02').next().removeClass("opened");
    $('#Image02').next().addClass("closed");
});
$('#Image03Div').hover(function() {
    $('#Image03').next().removeClass("closed");
    $('#Image03').next().addClass("opened");
});
$('#Image03Div').mouseleave(function() {
    $('#Image03').next().removeClass("opened");
    $('#Image03').next().addClass("closed");
});

$('#Image04Div').hover(function() {
    $('#Image04').next().removeClass("closed");
    $('#Image04').next().addClass("opened");
});
$('#Image04Div').mouseleave(function() {
    $('#Image04').next().removeClass("opened");
    $('#Image04').next().addClass("closed");
});

$('#Image05Div').hover(function() {
    $('#Image05').next().removeClass("closed");
    $('#Image05').next().addClass("opened");
});
$('#Image05Div').mouseleave(function() {
    $('#Image05').next().removeClass("opened");
    $('#Image05').next().addClass("closed");
});

setTimeout(function() {
    console.log('Hello world')
    $('#span1').css('visibility', 'visible');
    $('#span2').css('visibility', 'visible');
    $('#span3').css('visibility', 'visible');
    $('#span1').addClass('showSpan1');
    $('#span2').addClass('showSpan2');
    $('#span3').addClass('showSpan3');
}, 1000)

function windowSize() {
    if ($(window).width() < 767) {
        console.log("hide");
        $('#pldIndexMob').show();
        $('#pldIndexdesktop').hide();
    } else {
        console.log("show");
        $('#pldIndexMob').hide();
        $('#pldIndexdesktop').show();
    }
}

windowSize();

$(window).on('resize', function() {
    windowSize();
});