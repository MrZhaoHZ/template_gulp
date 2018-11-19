function removeCookie() {
    $.fn.cookie('member_id',null);
    $.fn.cookie('login_name',null);
}
exports.removeCookie = removeCookie;
