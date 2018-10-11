SP.SOD.executeFunc("clienttemplates.js", "SPClientTemplates", function () {

    function getBaseHtml(ctx) {
        return SPClientTemplates["_defaultTemplates"].Fields.default.all.all[ctx.CurrentFieldSchema.FieldType][ctx.BaseViewID](ctx);
    }

    function init() {

        SPClientTemplates.TemplateManager.RegisterTemplateOverrides({

            Templates: {
             
                Fields: {
                    "MY_FIELD": {
                        View: function (ctx) {                           
                            var id = Math.floor(Math.random() * 100001);
                            var iframe = document.createElement('iframe');
                            var html = STSHtmlDecode(ctx.CurrentItem["MY_FIELD"]).replaceAll('&nbsp;', '').replaceAll('<br>', '');
                            iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
                            iframe.setAttribute('id', 'iframe_' + id);
                            iframe.setAttribute('height', '250px');
                            iframe.setAttribute('width', '800px');
                            document.body.appendChild(iframe);
                            return '<div data-frame="iframe_' + id + '"></div>';
                        },
                    }
                },
            },

            OnPostRender: function (ctx) {             
                var divFrames = $('div[data-frame]');
                for (var i = 0; i < divFrames.length; i++) {
                    var frameId = divFrames[i].getAttribute('data-frame');
                    $('#' + frameId).appendTo(divFrames[i]);
                }
            },

            ListTemplateType: 100

        });
    }

    RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("/_layouts/15/****/js/CSR_RenderAsHtml.js"), init);
    init();

});
