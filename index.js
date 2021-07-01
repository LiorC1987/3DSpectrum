
// USER TAB FUNCTIONALITY
$(".therapist").hide()
$(".guardian").hide()

$( ".users" ).click(function() {
    $(".users").removeClass("user-clicked")
    $(this).addClass("user-clicked")

    
    $(".shown").hide()
    $(".shown").removeClass("shown")
    $("." + $(this).text().toLowerCase()).fadeIn().promise()
    $("." + $(this).text().toLowerCase()).addClass("shown")
  });

// REPORT TAB FUNCTIONALITY

let page = 0
let total = $(".report-box").length
let rpp = $("#reportsCountDropdown").text()
let outOf


if (total > ((page+1)*rpp)) {
    outOf = (page+1)*rpp
} else {
    outOf = total
}
$(".reports-page-summary").text(
    "1-" + rpp + " of " + $(".report-box").length
)

showReports(outOf)

$("#reportSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#reportTable tr.report-box").removeClass("filtered")
    $("#reportTable tr.report-box").filter(function() {
        let check = $(this).text().toLowerCase().indexOf(value) > -1
        if (!check) {
            $(this).addClass("filtered")
        }
        $(this).toggle(check)
    });
    total = $('.report-box:visible').length
    console.log(total)
    updateCount(total)
    showReports(outOf)
  });

$(".reportsCountDropdown").click(function() {
    $("#reportsCountDropdown").text($(this).text()) 
    rpp = $("#reportsCountDropdown").text()
    if (total > ((page+1)*rpp)) {
        outOf = (page+1)*rpp
    } else {
        outOf = total
    }
    let summary = page*rpp+1 + "-" + outOf + " of " + total
    $(".reports-page-summary").text(summary)
    showReports(outOf)
})


$("#reports-right").on("click", function() {
    pageMoveUp() 
});

$("#reports-left").on("click", function() {
    pageMoveDown()
    });


function pageMoveDown() {
    if (page != 0) {
        page -= 1
        rpp = $("#reportsCountDropdown").text()
        outOf = (page+1)*rpp
        let summary = page*rpp+1 + "-" + outOf + " of " + total
        $(".reports-page-summary").text(summary)
        showReports(outOf)
};

}    
function pageMoveUp() {
    if (total > ((page+1)*rpp)) {
        page += 1
        rpp = $("#reportsCountDropdown").text()
        let outOf
        if (total > ((page+1)*rpp)) {
            outOf = (page+1)*rpp
        } else {
            outOf = total
        }
        let summary = page*rpp+1 + "-" + outOf + " of " + total
        $(".reports-page-summary").text(summary)
        showReports(outOf)
    }
};

function showReports(outOf) {
    $(".report-box").not(".filtered").each(function(index, element) {
    if (index >= outOf || index < page*rpp) {
        $(this).hide()
    } else {
        $(this).show()
    }
    })
};

function updateCount(total) {
    if (total === 0) {
        $(".reports-page-summary").text("0-0 of 0")
    } else {
        if (total > ((page+1)*rpp)) {
            outOf = (page+1)*rpp
        } else {
            outOf = total
        }
        let summary = page*rpp+1 + "-" + outOf + " of " + total
        $(".reports-page-summary").text(summary)
    }
    
}
$(".user-status-top, .guardian-verification-top").each(function() {
   if ($(this).text() === " Unfinished") {
    $(this).addClass("unfinished")
   } else if ($(this).text() === " Unverified") {
    $(this).addClass("unverified")
   } else if ($(this).text() === " Verified") {
    $(this).addClass("verified")
   } else if ($(this).text() === " Completed") {
    $(this).addClass("completed")
   }
})

  
$(".report-checkbox").click(function() {
    if ($(this).prop("checked")) {
        $(this).parent().parent().addClass("report-checked")
    } else {
        $(this).parent().parent().removeClass("report-checked")
    }
})



