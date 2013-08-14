var edited = function(note) {
    $.ajax('/' + $('#companyId').val() + '/note/' + note.id, {
        type : 'POST',
        data : {
            '_method' : 'PUT',
            'id' : note.id,
            'text' : note.text,
            'lastDate' : new Date()
        },
        dataType : 'json',
        success : function(data) {
            if (data.status == 'ok') {
            } else {
                alsert('更新失败');
            }
        },
    });
}
var created = function(note) {
    $.ajax('/' + $('#companyId').val() + '/note/' + note.id, {
        type : 'POST',
        data : {
            '_method' : 'PUT',
            'text' : note.text,
            'lastDate' : new Date(),
            'posX' : note.pos_x,
            'poxY' : note.pos_y,
            'height' : note.height,
            'width' : note.width
        },
        dataType : 'json',
        success : function(data) {
            if (data.status == 'ok') {
            } else {
                alsert('更新失败');
            }
        },
    });
}

var deleted = function(note) {
    $.ajax('/' + $('#companyId').val() + '/note/' + note.id, {
        type : 'DELETE',
        dataType : 'json',
        success : function(data) {
            if (data.status == 'ok') {
            } else {
                alert('删除失败');
            }
        },
    });
}

var moved = function(note) {
    $.ajax('/' + $('#companyId').val() + '/note/' + note.id, {
        type : 'POST',
        data : {
            '_method' : 'PUT',
            'id' : note.id,
            'posX' : note.pos_x,
            'posY' : note.pos_y,
            'lastDate' : new Date()
        },
        dataType : 'json',
        success : function(data) {
            if (data.status == 'ok') {
            } else {
                alsert('更新失败');
            }
        },
    });
}

var resized = function(note) {
    $.ajax('/' + $('#companyId').val() + '/note/' + note.id, {
        type : 'POST',
        data : {
            '_method' : 'PUT',
            'id' : note.id,
            'height' : note.height,
            'width' : note.width,
            'lastDate' : new Date()
        },
        dataType : 'json',
        success : function(data) {
            if (data.status == 'ok') {
            } else {
                alsert('更新失败');
            }
        },
    });
}

jQuery(document).ready(function() {
    var options = {
        resizable : true,
        controls : true,
        editCallback : edited,
        createCallback : created,
        deleteCallback : deleted,
        moveCallback : moved,
        resizeCallback : resized
    };
    jQuery("#notes").stickyNotes(options);
    var Nodes = [];
    $.get('/' + $('#companyId:hidden').val() + '/note', {}, function(data) {
        var data = data.noteList;
        for (i = 0; i < data.length; i++) {
            var note = {
                id : data[i].id,
                pos_x : data[i].posX,
                pos_y : data[i].posY,
                text : data[i].text,
                height : data[i].height,
                width : data[i].width
            }
            $("#notes").stickyNotes.renderNote(note);
            $("#notes").stickyNotes.notes.push(note);
        }
    }, 'json');
});