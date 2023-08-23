var isTouchDevice = 'ontouchstart' in document.documentElement;

if (isTouchDevice) {
    $("body").addClass("touch");
}

$("body,html").addClass("stamping");

$(window).mousemove(function(e) {
    $(".word").css("top",e.clientY + "px").css("left",e.clientX + "px");
});

var currentWord = 0;
var words = ["Brendan","Griffiths","is","a","graphic","designer","programmer","and","educator","based","in","New","York","City"];
var typing = false;
var done = false;
var poster = [];
$(".word").html(words[currentWord]);

function resetWords() {
    currentWord = 0;
    $(".word").html(words[currentWord]);
    $("body,html").addClass("stamping");
    if (!isTouchDevice) {
        $(".word").show();
    }
    $(".reset").addClass("spinner");
    setTimeout(function() {
      $(".control-panel").removeClass("on");
    }, 200);
    setTimeout(function() {
      $(".reset").removeClass("spinner");
    }, 900);
    done = false;
    //$(".drop").remove();
    var timekeeper = 0;
    var droppedwords = [];
    $(".drop").each(function() {
        droppedwords.push($(this));
        setTimeout(function(passed) {
            droppedwords.shift().remove();
        }, timekeeper);
        timekeeper = timekeeper + 60;
    })
}

function stampWord(x,y,word) {
    poster.push([x, y, word]);
    $(".stage").append("<div class='drop sizing' style='top:" + y + "px;left:" + x + "px'>" + word + "</div>");
}

$(".stage").click(function(e) {
    $("a").addClass("on");
    if (!done) {
        if (typing) {
            stampWord(e.clientX, e.clientY, $(".word").html());
            $(".word").html(words[currentWord]);
            typing = false;
        } else {
            stampWord(e.clientX, e.clientY, words[currentWord]);
            currentWord++;
            if (currentWord == words.length) {
                done = true;
                $("body,html").removeClass("stamping");
                $(".word").hide();
                $(".control-panel").addClass("on");
            }
            $(".word").html(words[currentWord]);
        }
    }
});

$(".reset").click(function(e) {
    e.stopPropagation();
    resetWords();
    poster = [];
});

$(".download").click(function(e) {
    e.stopPropagation();
    var container = document.getElementById('output'); // full page 
            html2canvas(container).then(function(canvas) {
                var link = document.createElement("a");
                document.body.appendChild(link);
                link.download = "brendan-griffiths.png";
                link.href = canvas.toDataURL("image/png");
                link.target = '_blank';
                link.click();
            });
});


$(window).keypress(function(e) {
  if(e.keyCode != 13) {
    if (!typing) {
      $(".word").html(e.key);
      typing = true;
    } else {
      $(".word").append(e.key);
    }
  }
});

$(window).keydown(function(e) {
  if (typing && e.keyCode == 8) {
    $(".word").html($(".word").html().slice(0,-1));
  }
});

