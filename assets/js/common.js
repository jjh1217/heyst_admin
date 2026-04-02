//Eenter key submit 방지
function enterBrakey(e) { 
    if(e.keyCode==13 && e.srcElement.type != "textarea") 
    return false; 
}

//로딩 - 보여주기 함수
function loadingShow() {
    let loadingItem = `<section class="loading-box"></section>`;
    $("body").append(loadingItem);
    $(".loading-box").fadeIn(170);
}

//로딩 - 숨기기 함수
function loadingHide() {
    $(".loading-box").fadeOut(170), function(){
        $(".loading-box").remove();
    };
}

//로그아웃
$(document).on("click", "header .logout", function(){
    lastTxt = "로그인 페이지로 이동합니다.<br>로그아웃 하시겠습니까?"
    lastDone = `<button type="button" class="confirm-done btn">확인</button>`;
    confirmLast(lastTxt, lastDone);
    $(".confirm-done").addClass("logout_done");
});

//메뉴 - 모바일 - 열기
$(document).on("click", "header .mobileMeun", function(){
    $(this).toggleClass("on");
    if($(this).hasClass("on")) {
        $(".menu-wrap").show();
        $(".menu-box").animate({left : "0"}, 300);
    } else {
        $(".menu-box").animate({left : "-100%"}, 300, function(){
            $(".menu-wrap").hide();
        });
    }
});

//메뉴 - 드롭다운
$(document).on("click", ".menu-box .item > span", function(){
    $(".menu-box .item > span").removeClass("on");
    $(".menu-box .item .sub").slideUp(170);
    if ($(this).siblings(".sub").is(":hidden")){
        $(this).addClass("on");
        $(this).siblings(".sub").slideDown(170);
    } else{
        $(this).removeClass("on");
        $(this).siblings(".sub").slideUp(170);
    }
});

//drop - 열기
$(document).on("click", ".drop", function(){
    if($(this).hasClass("on")) {
        $(this).removeClass("on");
        $(this).siblings(".drop-item").slideUp(170);
    } else {
        $(".drop").removeClass("on");
        $(this).addClass("on");
        $(".drop-item").slideUp(170);
        $(this).siblings(".drop-item").slideDown(170);
    }
});

//검색 - tab
$(document).on("click", ".tab_box .item", function(){
    $(".tab_box .item").removeClass("on");
    $(this).addClass("on");
});

//검색 - select
$(document).on("click", ".form-search .drop-item > span", function(){
    let dropVal = $(this).text();
    $(this).closest(".drop-box").find(".drop").text(dropVal);
    $(this).closest(".drop-box").find("input").val(dropVal);
});

//검색 - submit
$(document).on("click", ".form-search .btn", function(){
    let searchVal = $(this).closest(".form-search").children("input").val();
    if(searchVal == "") {
        gateTxt = "검색어를 입력해 주세요."
        confirmGate(gateTxt);
    } else {
        $(this).attr("type", "submit");
    }
});

//list - 체크
$(document).on("click", ".listChk input[type='checkbox']", function(){
    if($(this).attr("id") == "chk_all") {
        if($("#chk_all").is(":checked")) {
            $(".listChk input[type='checkbox']").prop("checked", true);
        } else {
            $(".listChk input[type='checkbox']").prop("checked", false);
        }
    } else {
        let itemLeng = $(".listChk.chkItem input[type='checkbox']").length;
        let chkLeng = $(".listChk.chkItem input[type='checkbox']:checked").length;
        if(itemLeng == chkLeng) {
            $(".listChk #chk_all").prop("checked", true);
        } else {
            $(".listChk #chk_all").prop("checked", false);
        }
    }
});

//list - 삭제
$(document).on("click", ".list_delBtb", function(){
    if($(".listChk.chkItem input[type='checkbox']").is(":checked")) {
        loadingShow();
        setTimeout(() => {
            $(".listChk.chkItem input[type='checkbox']:checked").closest(".item").remove();
            $(".listChk input[type='checkbox']").prop("checked", false);
            loadingHide();
            if($(".list_box > ul > .item").length == 1) {
                let listNone = `<div class="list_none">
                                    <p>
                                        등록된 목록이 없습니다.<br>
                                        목록을 등록해 주세요.
                                    </p>
                                </div>`;
                $(".list_box").after(listNone).remove();
            }
        }, 2000);
    } else if($(".list_box").length) {
        gateTxt = "삭제할 목록을 선택 해주세요."
        confirmGate(gateTxt);
    } else {
        gateTxt = "등록된 목록이 없습니다."
        confirmGate(gateTxt);
    }
});

//지갑주소 줄임
$(".w-addr").each(function(){
    let w_og = $(this).text();
    let w_sh = w_og.substr(0, 4) + " ··· " + w_og.substr(-4, 4);
    $(this).text(w_sh);
});

//on & off
$(document).on("click", ".on_off", function(){
    if($(this).hasClass("chk")) {
        $(this).css("background-color", "#DDD");
        $(this).find("span").animate({left: "3px"}, 170);
        $(this).removeClass("chk");
    } else {
        $(this).toggleClass("active");
        if($(this).hasClass("active")) {
            $(this).css("background-color", "#6DDD5E");
            $(this).find("span").animate({left: "31px"}, 170);
        } else {
            $(this).css("background-color", "#DDD");
            $(this).find("span").animate({left: "3px"}, 170);
        }
    }
});

//아코디언
$(document).on("click", ".acco_tit", function(){
    $(".acco_box .item > p.sc").scrollTop(0);
    //단일
    if ($(this).hasClass("on")) {
        $(this).removeClass("on");
        $(this).siblings("p").slideUp(150);
    } else {
        $(".acco_tit").removeClass("on");
        $(this).addClass("on");
        $(".acco_box .item > p").slideUp(150);
        $(this).siblings("p").slideDown(150);
    }
});

//form - 체크 - 단일 선택
$(document).on("click", ".form-chk.single input", function(){
    $(this).closest(".form-chk").find("input[type='checkbox']").prop("checked", false);
    $(this).prop("checked", true);
});

//form - 파일 업로드
$(document).on("change", ".form-file > input[type='file']", function(){
    let filieVal = $(this).val();
    if(filieVal != "") { //확장자 체크
        let ext = filieVal.split(".").pop().toLowerCase();
        if($.inArray(ext, ["doc", "ppt", "xls", "hwp", "pdf", "jpg", "png", "gif"]) == -1) {
            return;
        }
    }
    readURL(this);
});

//form - 파일 업로드 함수
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(".form-file .view > img").remove();
            $(".form-file .view").addClass("on");
            $(".form-file .view").append(`<img src="${e.target.result}" alt="NFT">`);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//form - select
$(document).on("click", ".form-select .drop-item > span", function(){
    let select_val = $(this).text();
    $(this).closest(".form-select").find(".drop").text(select_val).addClass("selectOn");
});

//form - 날짜 foucs
$(document).on("focus", ".form-date > input", function(){
    $(this).closest(".form-date").addClass("on");
});

//form - 날짜 blur
$(document).on("blur", ".form-date > input", function(){
    $(this).closest(".form-date").removeClass("on");
});

//form -확인모달 - 열기
$(document).on("click", ".form-btn .btn", function(){
    if($(this).hasClass("confirm-open")) {
        var is_val = true;
        $(".forq input, .forq textarea, .forq.form-select").each(function(){
            if($(this).attr("type") != "checkbox") {
                if($(this).val() != "") {
                    return is_val = true;
                } else if($(this).children(".drop").hasClass("selectOn")) {
                    return is_val = true;
                } else {
                    return is_val = false;
                }
            } else {
                if($(".form-chk.forq").length == $(".form-chk.forq input[type='checkbox']:checked").length) {
                    return is_val = true;
                } else {
                    return is_val = false;
                }
            }
        });
        if(is_val) {
            lastTxt = "입력한 정보로<br>저장 하시겠습니까?"
            lastDone = `<button type="button" class="confirm-done btn">확인</button>`;
            confirmLast(lastTxt, lastDone);
            if($(this).hasClass("tMint_ok")){
                $(".confirm-done").addClass("tMint_done");
            } else if($(this).hasClass("pBanner_ok")){
                $(".confirm-done").addClass("pBanner_done");
            } else if($(this).hasClass("pPopup_ok")){
                $(".confirm-done").addClass("pPopup_done");
            } else if($(this).hasClass("pWallet_ok")){
                $(".confirm-done").addClass("pWallet_done");
            } else if($(this).hasClass("pUser_ok")){
                $(".confirm-done").addClass("pUser_done");
            }
        } else {
            gateTxt = "필수 항목을 확인해 주세요."
            confirmGate(gateTxt);
        }
    } else if(!$(this).hasClass("link")) {
        lastTxt = "목록으로 이동할 경우<br>입력하셨던 내용은 저장되지 않습니다.<br>이동 하시겠습니까?"
        lastDone = `<a href="javascript:history.back();" class="confirm-done btn">확인</a>`;
        confirmLast(lastTxt, lastDone);
    }
});

//등록 - 팝업 - 확인
$(document).on("click", ".register-moadal .btn", function(){
    if(!$(this).hasClass("confirm-cancel")) {
        var is_val = true;
        $(".forq").each(function(){
            if($(this).find("input[type='text']").val() == "") {
                is_val = false;
            } else if($(this).find("textarea").val() == "") {
                is_val = false;
            } else if($(this).hasClass("form-chk")) {
                if($(this).length != $(this).find("input[type='checkbox']:checked").length) {
                    return is_val = false;
                }
            } else if($(this).hasClass("form-select")) {
                if(!$(this).find(".drop").hasClass("selectOn")) {
                    return is_val = false;
                }
            }
        });
        if(is_val) {
            lastTxt = "입력한 정보로<br>저장 하시겠습니까?"
            lastDone = `<button type="button" class="confirm-done btn">확인</button>`;
            confirmLast(lastTxt, lastDone);
            $(".register-moadal").fadeOut(170, function(){
                $(".register-moadal").remove();
            });
        } else {
            gateTxt = "필수 항목을 확인해 주세요."
            confirmGate(gateTxt);
        }
    }
});

//확인모달 - 닫기
$(document).on("click", ".confirm-cancel, .confirm-done", function(){
    modalClose($(this));
    if($(this).prop("tagName") == "BUTTON") {
        loadingShow();
        setTimeout(() => {
            if($(this).hasClass("logout_done")) {
                $(location).attr("href", "./login.html");
            } else if($(this).hasClass("tMint_done")) {
                $(location).attr("href", "./trans_mint_list.html");
            }  else if($(this).hasClass("pBanner_done")) {
                $(location).attr("href", "./page_banner_list.html");
            }  else if($(this).hasClass("pPopup_done")) {
                $(location).attr("href", "./page_popup_list.html");
            }  else if($(this).hasClass("pWallet_done")) {
                $(location).attr("href", "./page_wallet_list.html");
            }  else if($(this).hasClass("pUser_done")) {
                $(location).attr("href", "./page_user_list.html");
            } else {
                location.reload();
            }
        }, 2000);
    }
});

//확인모달 - gate 호출 함수
function confirmLast(lastTxt, lastDone) {
    let lastItem = `<section class="confirm-modal modal-wrap">
                        <article class="confirm-box modal-box">
                            <p>${lastTxt}</p>
                            <div class="confirm-btn">
                                <span class="confirm-cancel btn light">취소</span>
                                ${lastDone}
                            </div>
                        </article>
                    </section>`;
    $("main").after(lastItem);
    modalScroll($(".confirm-modal"));
}

//확인모달 - gate 호출 함수
function confirmGate(gateTxt) {
    let gateItem = `<section class="confirm-modal modal-wrap">
                        <article class="confirm-box modal-box">
                            <p>${gateTxt}</p>
                            <div class="confirm-btn full">
                                <span class="confirm-done btn">확인</span>
                            </div>
                        </article>
                    </section>`;
    $("main").after(gateItem);
    modalScroll($(".confirm-modal"));
}

//모달 - 열기 함수
function modalScroll(e) {
    $(e).fadeIn(170);
    $("body").addClass("over-hidden");
}

//모달 - 닫기 함수
function modalClose(e) {
    $(e).closest(".modal-wrap").fadeOut(170, function(){
        $(e).closest(".modal-wrap").remove();
        $("body").removeClass("over-hidden");
    });
}

//영역 외 클릭 - 닫기
$(document).on("click", "html",function(e){
    //메뉴
    if($(e.target).hasClass("menu-wrap")) { 
        $(".menu-box").animate({left : "-100%"}, 300, function(){
            $(".menu-wrap").hide();
        });
    }

    //drop
    if(!$(e.target).hasClass("drop")) { 
        $(".drop").removeClass("on");
        $(".drop-item").slideUp(170);
    }

    //모달
    if($(e.target).hasClass("modal-wrap")) { 
        $(".modal-wrap").fadeOut(170, function(){
            $(".modal-wrap").remove();
            $("body").removeClass("over-hidden");
        });
    }

    //아코디언
    if(!$(e.target).hasClass("acco_tit")) { 
        $(".acco_tit").removeClass("on");
        $(".acco_box .item > p").slideUp(150);
    }
});