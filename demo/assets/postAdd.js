$(function() {
    $(document).on('click', '[action="save-post"]', function() {
        var title = $.trim($('#title').val());
        var tag = $.trim($('#tag').val());
        var content = $.trim($('#content').val());
        var cTime = new Date().valueOf();
        var uTime = new Date().valueOf();

        $.post('/demo/savePost', {
            'title': title,
            'tag': tag,
            'content': content,
            'cTime': cTime,
            'uTime': uTime
        }, function(data) {
            if(data.status == 'OK') {
                alert('保存成功!');
                setTimeout(function() {
                    if(confirm('是否要跳转到博客的首页?')) {
                        window.location.replace('/demo/blog');
                    }
                    else {
                        //清空form
                        $('#title, #tag, #content').val('');
                    }
                }, 1000);
            }
        })
        return false;
    })
});