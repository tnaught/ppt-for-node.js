$(function() {

    var handlers = {
        'addPost': function() {
            window.location.href = "/demo/postAdd";
        }
    };
    $(document).on('click', '[action="post-add"]', function() {
        handlers.addPost();
    });
    var init = function() {
        $.get('/demo/getLatestPost', {}, function(re) {
            if(re.status == 'OK') {
                $.each(re.data[0], function(i, v) {
                    $('#' + i).html(v);
                })
            }
            else {
                alert(re.data);
            }
        })
    };
    init();
})