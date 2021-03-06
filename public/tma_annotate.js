tinymce.PluginManager.add('tma_annotate', function(editor, url) {

        var state;

        function tma_hide_action() {
            state = !state;
            editor.fire('tma_annotatehide', {
                state: state
            });
            body = editor.getBody();

            if (state) { // Hide
                current = editor.getContent();
                tinymce.each( editor.$('span.annotation'), function(node) {
                  editor.dom.remove(node, true);
                });
            } else { // Show
                if (!body) {
                    $(body).html('');
                }else {
                    $(body).html(current);
                }
            }
        }

        function tma_toggleHide() {
            var self = this;
            editor.on('tma_annotatehide', function(e) {
                self.active(e.state);
            });
        }

        editor.addCommand('tma_cmd_hide', tma_hide_action);

        // Create annotation
        editor.addButton('tma_annotate', {
            title: 'Crear comentario',//TMA.tooltips.annotation_create,
            image: '/img/annotation.png',
            // image: `${process.env.PUBLIC_URL}/img/annotation.png`,
            onclick: function() {
                annotation = '';
                color = '#F0E465';
                node = editor.selection.getNode();
                nodeName = node.nodeName;

                if (nodeName == 'SPAN') {
                    nodeDataAnnotation = $(node).attr("data-annotation");
                    nodeDataStyle = $(node).css("background-color");

                    // Retrieve annotation and color
                    if (nodeDataAnnotation) {
                        annotation = nodeDataAnnotation;
                        var ctx = document.createElement('canvas').getContext('2d');
                        ctx.strokeStyle = nodeDataStyle;
                        var color = ctx.strokeStyle;
                    }
                }

                var selectedText = editor.selection.getContent();
                var selectedTextLength = selectedText.length;

                if (selectedTextLength > 0 || node.className == 'annotation') {
                    if (node.className == 'annotation') {
                        selectedText = node.innerHTML;
                    }
                    editor.windowManager.open({
                        title: 'Agregar anotación',//TMA.tooltips.annotation_settings,
                        body: [{
                            type: 'textbox',
                            name: 'annotation',
                            label: 'Mensaje', //TMA.settings.setting_annotation,
                            value: annotation
                        } ,{
                            type: 'colorpicker',
                            name: 'annotationbg',
                            label: 'Color',//TMA.settings.setting_background,
                            value: color
                        }],

                        onsubmit: function(e) {
                            if (e.data.annotation) {
                                var dataAnnotation = e.data.annotation;
                                var color = e.data.annotationbg;

                                if (node.getAttribute("data-annotation")) {
                                    editor.dom.remove(node);
                                }

                                var id =1 + Math.floor(Math.random() * 10000);

                                editor.selection.setContent('<span class="annotation" data-id="'+ id +'" data-author="' + /*TMA.author*/ 'Autor' + '" title="' + dataAnnotation.replace(/"/g,'&quot;') + '" style="background-color: '+color+' ">' + selectedText + '</span>');
                               
                                editor.addComment(id, dataAnnotation)

                            } else {
                                editor.windowManager.alert(' Seleccione texto para comentar' /*TMA.errors.missing_annotation*/);
                                return false;
                            }
                        }
                    });
                } else {
                    editor.windowManager.alert( ' Seleccione texto para comentar' /*TMA.errors.missing_annotation*/, false);
                }
            }
        });

        // Delete annotation
        editor.addButton('tma_annotatedelete', {
            title: 'Eliminar comentario' ,//TMA.tooltips.annotation_delete,
            image: '/img/annotation-delete.png',
            onclick: function() {
                var selectedText = editor.selection.getContent();
                var selectedTextLength = selectedText.length;
                var node = editor.selection.getNode();
                if (selectedTextLength > 0 || node.className == 'annotation') {
                     if (node.className == 'annotation') {
                        selectedText = node.innerHTML;
                    }
                    deletionNode = editor.selection.getNode();
                    replaceNode = deletionNode;
                    
                    deletionNode.setAttribute("style", "");

                    editor.removeComment(deletionNode.getAttribute("data-id"));

                    editor.dom.remove(replaceNode, deletionNode);


                } else {
                    editor.windowManager.alert(' Seleccione texto para comentar' /*TMA.errors.missing_annotation*/);
                }
            }
        });

        // Hide all annotations
        editor.addButton('tma_annotatehide', {
            title: 'Ocultar comentarios',//TMA.tooltips.annotation_hide,
            image: '/img/annotation-hide.png',
            cmd: 'tma_cmd_hide',
            onPostRender: tma_toggleHide
        });

});