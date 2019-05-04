var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
var opr = navigator.userAgent.indexOf("Opera");

if (ie4 || ns6)
    document.onclick = hidemenu;

//Contents for menu 1
var menu1 = new Array();
menu1[0] = '<p style="line-height: 160%" align="left"><a href=team.php class=menu>Our Team</a><br>';
menu1[1] = '<a href=rsvp.php class=menu>RSVP Advantage</a><br>';

//Contents for menu 3
var menu3 = new Array()
menu3[0] = '<p style="line-height: 160%" align="left"><a href=commu1.asp class=menu>Panther Ridge</a><br>';
menu3[1] = '<a href=commu3.php class=menu>Twin Rivers</a><br>';
menu3[2] = '<a href=commu0.php class=menu>The Founders Club</a><br>';
menu3[3] = '<a href=commu4.php class=menu>Casa di Compagni</a><br>';

//Contents for menu 4
var menu4 = new Array();
menu4[0] = '<p style="line-height: 160%" align="left"><a href=services.asp class=menu>Our Services</a><br>';
menu4[1] = '<a href=affiliates2.php class=menu>Affiliates</a><br>';

/****************************************************
 PopUp Window
****************************************************/
var win = null;
function NewWindow(mypage, myname, w, h, scroll, pos) {
    if (pos == "random") { LeftPosition = (screen.width) ? Math.floor(Math.random() * (screen.width - w)) : 100; TopPosition = (screen.height) ? Math.floor(Math.random() * ((screen.height - h) - 75)) : 100; }
    if (pos == "center") { LeftPosition = (screen.width) ? (screen.width - w) / 2 : 100; TopPosition = (screen.height) ? (screen.height - h) / 2 : 100; }
    else if ((pos != "center" && pos != "random") || pos == null) { LeftPosition = 0; TopPosition = 20 }
    settings = 'width=' + w + ',height=' + h + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
    win = window.open(mypage, myname, settings);
}
// -->
//reusable/////////////////////////////

function dropit(e, whichone) {
    curmenuID = ns6 ? document.getElementById(whichone).id : eval(whichone).id;
    if (window.themenu && themenu.id != curmenuID) {
        themenuStyle.visibility = ns4 ? "hide" : "hidden";
        themenu = ns6 ? document.getElementById(whichone) : eval(whichone);
        themenuStyle = (ns6 || ie4) ? themenu.style : themenu;
        themenuoffsetX = (ie4 && opr == -1) ? document.body.scrollLeft : 0;
        themenuoffsetY = (ie4 && opr == -1) ? document.body.scrollTop : 0;
        themenuStyle.left = ns6 || ns4 ? e.pageX - e.layerX : themenuoffsetX + event.clientX - event.offsetX;
        themenuStyle.top = ns6 || ns4 ? e.pageY - e.layerY + 19 : themenuoffsetY + event.clientY - event.offsetY + 24;
        hiddenconst = (ns6 || ie4) ? "hidden" : "hide";
        if (themenuStyle.visibility == hiddenconst) {
            themenuStyle.visibility = (ns6 || ie4) ? "visible" : "show";
            themenuStyle.zIndex = zindex++;
        }
    } else {
        hidemenu()
        return false
    }
}

function hidemenu() {
    if ((ie4 || ns6) && window.themenu)
        themenuStyle.visibility = "hidden";
    else if (ns4)
        themenu.visibility = "hide";
}

function fadepic() {
    if (curpos < 100) {
        curpos += 10;
        if (tempobj.filters)
            tempobj.filters.alpha.opacity = curpos;
        else if (tempobj.style.MozOpacity)
            tempobj.style.MozOpacity = curpos / 100;
    } else {
        clearInterval(dropslide)
        nextcanvas = (curcanvas == "canvas0") ? "canvas0" : "canvas1";
        tempobj = ie4 ? eval("document.all." + nextcanvas) : document.getElementById(nextcanvas);
        tempobj.innerHTML = '<img src="' + fadeimages[nextimageindex] + '">';
        nextimageindex = (nextimageindex < fadeimages.length - 1) ? nextimageindex + 1 : 0;
        setTimeout("rotateimage()", pause);
    }
}

function rotateimage() {
    if (ie4 || dom) {
        resetit(curcanvas);
        var crossobj = tempobj = ie4 ? eval("document.all." + curcanvas) : document.getElementById(curcanvas);
        crossobj.style.zIndex++;
        var temp = 'setInterval("fadepic()",50)';
        dropslide = eval(temp);
        curcanvas = (curcanvas == "canvas0") ? "canvas1" : "canvas0";
    } else {
        document.images.defaultslide.src = fadeimages[curimageindex];
        curimageindex = (curimageindex < fadeimages.length - 1) ? curimageindex + 1 : 0;
    }
}

function resetit(what) {
    curpos = 10
    var crossobj = ie4 ? eval("document.all." + what) : document.getElementById(what)
    if (crossobj.filters)
        crossobj.filters.alpha.opacity = curpos
    else if (crossobj.style.MozOpacity)
        crossobj.style.MozOpacity = curpos / 100
}

function startit() {
    var crossobj = ie4 ? eval("document.all." + curcanvas) : document.getElementById(curcanvas)
    crossobj.innerHTML = '<img src="' + fadeimages[curimageindex] + '">'
    rotateimage()
}