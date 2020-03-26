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
                var hlData = it._getData($(this).attr('data-id'));
                if (hlData) {
                    it._handleClick(hlData);
                }
            }).css('cursor', 'pointer');
        },
        _getData: function(id) {
            var hlData = null;
            $.each(this.hyperlinks, function(i, hl) {
                if (id === hl.id) {
                    hlData = hl;
                    return false;
                }
            });
            return hlData;
        },
        _handleClick: function(hyperlink) {
            function parseQueryString(queryString) {
                var query = {};
                var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split('=');
                    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                }
                return query;
            }
            function buildQueryString(query) {
                return '?'+Object.entries(query).map(a => a[0] + '=' + encodeURIComponent(a[1])).join('&');
            }
            function copyToClipboard(text) {
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
            }
            try {
                var parameters = JSON.parse(decodeURIComponent(hyperlink.params.parameters)); 
                var query = parseQueryString(window.location.search);
                query = Object.assign({}, query, parameters);
                query["standAlone"] = "false";
                query = Object.fromEntries(Object.entries(query).filter(([k,v]) => v != null && v.trim() != ""));
                console.log(window.location.origin + window.location.pathname + buildQueryString(query))
                copyToClipboard(window.location.origin + window.location.pathname + buildQueryString(query))
                if (hyperlink.params.doAlert == "true") {
                    alert("Ссылка скопирована!");
                }
            } catch (e) {
                console.error("Error while evaluating code in copy_link: ", e);
            }
        }
    };

    return ReportExecution;
});
