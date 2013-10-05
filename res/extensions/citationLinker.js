define([
    "classes/Extension",
    "citation-linker"
], function(Extension, citationLinker) {

    var citationLinkerParser = new Extension("citationLinkerParser", "Markdown citation linker");

    var eventMgr = undefined;
    citationLinkerParser.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    citationLinkerParser.onPagedownConfigure = function(editor) {
        var converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
            citationLinker.addCitationLinkerToPagedownConverter(safeConverter);
        });
    };

    return citationLinkerParser;
});