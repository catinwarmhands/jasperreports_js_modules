define(['jquery'], function($) {
    var ReportExecution = function(arrHyperlinks) {
        this.hyperlinks = arrHyperlinks;
        this.reportInstance = null;
        this.reportContainer = null;
    };

    ReportExecution.prototype = {
        register: function() {
            var it = this;
            $(it.hyperlinks[0].selector).on('click', function(evt) {
                var hlData = it._getHyperlinkData($(this).attr('data-id'));
                if (hlData) {
                    it._handleHyperlinkClick(hlData);
                }
            }).css('cursor', 'pointer');
        },
        _getHyperlinkData: function(id) {
            var hlData = null;
            $.each(this.hyperlinks, function(i, hl) {
                if (id === hl.id) {
                    hlData = hl;
                    return false;
                }
            });
            return hlData;
        },
        _handleHyperlinkClick: function(hyperlink) {
            var params = hyperlink.params;
            try {
                eval(params.code);
            } catch(e) {
                console.error("Error while evaluating code in js_loader: ", e);
            }
        }
    };

    return ReportExecution;
});
