$(function(){

    function tagsInit() {
        $('div.tags-container').tagSort({
            items:'.item',
            tagElement:'button',
            tagClassPrefix:'tagsort-',
            itemTagsView:'.item-tags',
            itemTagsElement:'span',
            sortType:'exclusive',
            fadeTime: 0
        });
        
        $('button').addClass("btn btn-default btn-lg");
        $('.item-tags span').addClass("label label-info");
    }

    $.ajax({
        dataType: "json",
        url: "taiwanproducts.json",
        success: function(data) {
            for (var k in data) {
                var d = data[k];
                var url = '#';
                if (k == 'z') {
                    continue;
                }

                var c = '<tr data-item-tags="' + d.tags.join(',') + '" data-item-id="'+k+'" class="item"><td>';
                c += '<div class="item-info">';
                if (d.hasOwnProperty('homepage') && d.homepage != '') {
                    c += '<a href="'+d.homepage+'"><span aria-hidden="true" class="glyphicon glyphicon-home"></span></a> ';
                    url = d.homepage;
                }
                if (d.hasOwnProperty('shop') && d.shop != '') {
                    c += '<a href="'+d.shop+'"><span aria-hidden="true" class="glyphicon glyphicon-shopping-cart"></span></a> ';
                    url = d.shop;
                }
                c += '</div>';
                c += '<div class="item-title"><a href="'+url+'">'+d.title+'</a></div>';
                c += '<div class="item-description">'+d.description+'</div>';
                c += '<h3 class="item-tags"></h3></td></tr>';

                $('#main_table').append(c);
            }
    
            tagsInit();
        }
    });
    
    $(document).on('click','button',function(){
        if ($(this).hasClass('tagsort-active')) {
            $(this).removeClass("btn-default").addClass("btn-primary");
        } else {
            $(this).removeClass("btn-primary").addClass("btn-default");
        }
    });
 
});